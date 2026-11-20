'use strict';

/**
 * TechVideoStudio v4.0.0 — Composable Living Whiteboard & Causal Choreography Engine
 *
 * Instead of wiping the screen between hardcoded slide templates, ByteByteGo videos
 * work like a living architectural whiteboard:
 *   - Actors (servers, DBs, queues, caches, memory bars, code blocks, groups, icons)
 *     persist on a continuous 1920x1080 canvas across multiple narration beats.
 *   - Causal Actions execute on a normalized (p: 0..1) or second-based (at) timeline:
 *       spawn, connect, packet, mutate, focus, resetCamera, spotlight, callout, appendItem
 *   - Packets physically travel along edges and trigger state mutations on arrival.
 *   - Camera smoothly zooms/pans to inspect internal mechanics, then pulls back out.
 */

const Theme = require('./theme');
const Camera = require('./camera');
const Effects = require('./draw-effects');
const Connectors = require('./connectors');
const Icons = require('./icons');

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function easeOutCubic(t) {
  const x = clamp01(t);
  return 1 - Math.pow(1 - x, 3);
}

function easeInOutCubic(t) {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeOutBack(t) {
  const x = clamp01(t);
  const c1 = 1.45;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

/**
 * Resolve an action's start time (seconds) and duration (seconds) against total duration.
 * Supports either `at` (absolute seconds) or `p` (0..1 fraction of totalDuration).
 */
function resolveActionTiming(action, totalDuration) {
  const dur = Math.max(0.15, action.dur != null ? action.dur : (action.pDur != null ? action.pDur * totalDuration : 0.75));
  let start = 0;
  if (action.at != null) {
    start = action.at;
  } else if (action.p != null) {
    start = action.p * totalDuration;
  }
  return { start, dur, end: start + dur };
}

/**
 * Compute anchor point on an actor's bounding box facing another actor.
 */
function getActorBounds(actor) {
  const w = actor.w || (actor.kind === 'icon' ? 160 : actor.kind === 'pill' ? 260 : 380);
  const h = actor.h || (actor.kind === 'icon' ? 160 : actor.kind === 'pill' ? 76 : 210);
  return {
    cx: actor.x,
    cy: actor.y,
    x: actor.x - w / 2,
    y: actor.y - h / 2,
    w,
    h
  };
}

function getEdgeEndpoints(fromActor, toActor, pad = 10) {
  const a = getActorBounds(fromActor);
  const b = getActorBounds(toActor);
  const dx = b.cx - a.cx;
  const dy = b.cy - a.cy;

  if (Math.abs(dx) >= Math.abs(dy)) {
    const dir = dx >= 0 ? 1 : -1;
    return {
      x1: a.cx + dir * (a.w / 2 + pad),
      y1: a.cy,
      x2: b.cx - dir * (b.w / 2 + pad),
      y2: b.cy
    };
  }
  const dir = dy >= 0 ? 1 : -1;
  return {
    x1: a.cx,
    y1: a.cy + dir * (a.h / 2 + pad),
    x2: b.cx,
    y2: b.cy - dir * (b.h / 2 + pad)
  };
}

/**
 * Evaluate the complete deterministic state of the whiteboard at time `t` (in seconds).
 * Pure function of (spec, t, totalDuration) — guarantees 100% frame-exact FFmpeg renders.
 */
function evaluateWhiteboardState(spec, t, totalDuration) {
  const safeDur = Math.max(1, totalDuration || 10);
  const actors = new Map();
  const baseActors = Array.isArray(spec.actors) ? spec.actors : [];

  for (const raw of baseActors) {
    const initiallyVisible = raw.initial === true || (raw.spawnAt == null && raw.spawnP == null && !(spec.actions || []).some((a) => a.type === 'spawn' && a.target === raw.id));
    let spawnP = initiallyVisible ? 1 : 0;
    if (raw.spawnAt != null) {
      spawnP = clamp01((t - raw.spawnAt) / (raw.spawnDur || 0.55));
    } else if (raw.spawnP != null) {
      spawnP = clamp01((t - raw.spawnP * safeDur) / (raw.spawnDur || 0.55));
    }
    actors.set(raw.id, {
      ...raw,
      items: Array.isArray(raw.items) ? raw.items.slice() : [],
      spawnProgress: spawnP,
      alpha: 1,
      spotlight: false,
      crossOutProgress: 0,
      pulseAt: null,
      meter: raw.meter != null ? raw.meter : null,
      badge: raw.badge || null,
      badgeColor: raw.badgeColor || raw.color || '#38BDF8',
      borderColor: raw.borderColor || raw.color || '#E5E7EB',
      fillColor: raw.fillColor || null,
      status: raw.status || null,
      sub: raw.sub || ''
    });
  }

  const edges = [];
  const baseEdges = Array.isArray(spec.edges) ? spec.edges : [];
  for (const e of baseEdges) {
    const start = e.at != null ? e.at : (e.p != null ? e.p * safeDur : 0);
    const dur = e.dur || 0.5;
    const progress = clamp01((t - start) / dur);
    edges.push({ ...e, progress });
  }

  const activePackets = [];
  const activeCallouts = [];
  const sparks = [];

  // Camera state (defaults to full 1920x1080 center view)
  let camX = 960;
  let camY = 540;
  let camZoom = 1.0;

  // Spotlight tracking (last active spotlight wins)
  let spotlightTargets = null;
  let spotlightDim = 0.58;

  const actions = Array.isArray(spec.actions) ? spec.actions : [];
  for (const action of actions) {
    const { start, dur, end } = resolveActionTiming(action, safeDur);

    if (action.type === 'spawn') {
      const actor = actors.get(action.target);
      if (actor && t >= start) {
        actor.spawnProgress = Math.max(actor.spawnProgress, clamp01((t - start) / dur));
      }
      continue;
    }

    if (action.type === 'connect') {
      if (t >= start) {
        const progress = clamp01((t - start) / dur);
        edges.push({
          from: action.from,
          to: action.to,
          label: action.label || '',
          color: action.color || '#FFFFFF',
          style: action.style || 'solid',
          curve: action.curve,
          dashed: action.dashed,
          progress
        });
      }
      continue;
    }

    if (action.type === 'packet') {
      const count = Math.max(1, action.count || 1);
      const stagger = action.stagger != null ? action.stagger : 0.28;
      for (let i = 0; i < count; i++) {
        const pStart = start + i * stagger;
        const pEnd = pStart + dur;
        if (t >= pStart && t <= pEnd) {
          activePackets.push({
            from: action.from,
            to: action.to,
            label: action.label || '',
            color: action.color || '#FACC15',
            progress: easeInOutCubic((t - pStart) / dur),
            curve: action.curve
          });
        }
        // Arrival spark & subtle target highlight right as packet lands
        if (action.sparkOnArrive !== false && t >= pEnd && t <= pEnd + 0.55) {
          const toActor = actors.get(action.to);
          if (toActor) {
            sparks.push({
              x: toActor.x,
              y: toActor.y,
              progress: clamp01((t - pEnd) / 0.55),
              color: action.color || '#34D399'
            });
          }
        }
      }
      continue;
    }

    if (action.type === 'mutate') {
      const actor = actors.get(action.target);
      if (actor && t >= start) {
        const mProg = clamp01((t - start) / Math.max(0.25, dur));
        if (action.badge !== undefined) actor.badge = action.badge;
        if (action.badgeColor) actor.badgeColor = action.badgeColor;
        if (action.borderColor) actor.borderColor = action.borderColor;
        if (action.fillColor) actor.fillColor = action.fillColor;
        if (action.sub !== undefined) actor.sub = action.sub;
        if (action.label !== undefined) actor.label = action.label;
        if (action.status !== undefined) actor.status = action.status;
        if (action.meter != null) {
          const fromMeter = actor.meter != null ? actor.meter : 0;
          actor.meter = fromMeter + (action.meter - fromMeter) * easeOutCubic(mProg);
        }
        if (action.crossOut) {
          actor.crossOutProgress = Math.max(actor.crossOutProgress, mProg);
        }
        if (t <= start + 0.6) {
          actor.pulseAt = clamp01((t - start) / 0.6);
        }
      }
      continue;
    }

    if (action.type === 'appendItem') {
      const actor = actors.get(action.target);
      if (actor && t >= start) {
        actor.items.push({
          text: action.text || '',
          color: action.color || '#E5E7EB',
          progress: clamp01((t - start) / Math.max(0.25, dur))
        });
      }
      continue;
    }

    if (action.type === 'spotlight') {
      if (t >= start && (action.until == null || t <= action.until) && (action.pUntil == null || t <= action.pUntil * safeDur)) {
        spotlightTargets = new Set(Array.isArray(action.targets) ? action.targets : [action.target]);
        spotlightDim = action.dimAlpha != null ? action.dimAlpha : 0.62;
      }
      continue;
    }

    if (action.type === 'clearSpotlight') {
      if (t >= start) spotlightTargets = null;
      continue;
    }

    if (action.type === 'callout') {
      const callEnd = action.until != null ? action.until : (action.pUntil != null ? action.pUntil * safeDur : end);
      if (t >= start && t <= callEnd) {
        const enterP = clamp01((t - start) / 0.35);
        const exitP = t > callEnd - 0.3 ? clamp01((callEnd - t) / 0.3) : 1;
        activeCallouts.push({
          target: action.target,
          x: action.x,
          y: action.y,
          text: action.text || '',
          side: action.side || 'top',
          color: action.color || '#FACC15',
          alpha: Math.min(enterP, exitP),
          progress: enterP
        });
      }
      continue;
    }

    if (action.type === 'focus') {
      if (t >= start) {
        const fProg = easeInOutCubic(clamp01((t - start) / dur));
        let tx = action.x != null ? action.x : 960;
        let ty = action.y != null ? action.y : 540;
        if (action.target && actors.has(action.target)) {
          const a = actors.get(action.target);
          tx = a.x;
          ty = a.y;
        }
        const tz = action.zoom != null ? action.zoom : 1.32;
        camX = camX + (tx - camX) * fProg;
        camY = camY + (ty - camY) * fProg;
        camZoom = camZoom + (tz - camZoom) * fProg;
      }
      continue;
    }

    if (action.type === 'resetCamera') {
      if (t >= start) {
        const rProg = easeInOutCubic(clamp01((t - start) / dur));
        camX = camX + (960 - camX) * rProg;
        camY = camY + (540 - camY) * rProg;
        camZoom = camZoom + (1.0 - camZoom) * rProg;
      }
      continue;
    }
  }

  // Apply spotlight dimming
  if (spotlightTargets) {
    for (const [id, actor] of actors.entries()) {
      if (spotlightTargets.has(id)) {
        actor.spotlight = true;
        actor.alpha = 1;
      } else if (actor.kind !== 'group') {
        actor.alpha = spotlightDim;
      }
    }
  }

  return {
    actors,
    edges,
    activePackets,
    activeCallouts,
    sparks,
    camera: { x: camX, y: camY, zoom: camZoom }
  };
}

/**
 * Draw a single actor according to its `kind`.
 */
function drawActor(ctx, actor, t) {
  if (actor.spawnProgress <= 0.01) return;
  const p = actor.spawnProgress;
  const scale = actor.kind === 'group' ? 1 : (0.86 + 0.14 * easeOutBack(p));
  const b = getActorBounds(actor);

  ctx.save();
  ctx.globalAlpha = clamp01(p * 1.4) * actor.alpha;
  ctx.translate(b.cx, b.cy);
  ctx.scale(scale, scale);
  ctx.translate(-b.cx, -b.cy);

  const strokeCol = actor.status === 'error'
    ? '#F87171'
    : actor.status === 'hot'
      ? '#FB923C'
      : actor.status === 'ok'
        ? '#34D399'
        : actor.borderColor;

  // 1. Dashed Architectural Group Container (label pill sits cleanly ON top border — never floats into header!)
  if (actor.kind === 'group') {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(b.x, b.y, b.w, b.h, 18);
    ctx.fillStyle = actor.fillColor || 'rgba(255,255,255,0.025)';
    ctx.fill();
    ctx.setLineDash([14, 10]);
    ctx.strokeStyle = strokeCol || 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.setLineDash([]);

    if (actor.label) {
      ctx.font = `800 22px ${Theme.FONTS.sans}`;
      const hasGrpIcon = Boolean(actor.icon);
      const labelW = ctx.measureText(actor.label).width;
      const pillW = labelW + (hasGrpIcon ? 64 : 32);
      const pillH = 38;
      const pillX = b.x + 24;
      const pillY = b.y - pillH / 2;

      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 10);
      ctx.fillStyle = '#232323';
      ctx.fill();
      ctx.strokeStyle = strokeCol || 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      if (hasGrpIcon) {
        Icons.draw(ctx, actor.icon, pillX + 24, b.y, 24, { animate: false });
      }
      ctx.fillStyle = strokeCol || '#E5E7EB';
      ctx.textAlign = 'left';
      ctx.fillText(actor.label, pillX + (hasGrpIcon ? 44 : 16), b.y + 8);
    }
    ctx.restore();
    ctx.restore();
    return;
  }

  // 2. Icon Medallion Actor (zero wobble — rock solid)
  if (actor.kind === 'icon') {
    if (actor.spotlight) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(b.cx, b.cy, Math.max(b.w, b.h) * 0.56, 0, Math.PI * 2);
      ctx.strokeStyle = strokeCol;
      ctx.lineWidth = 4;
      ctx.shadowColor = strokeCol;
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.restore();
    }
    Icons.drawBadge(ctx, actor.icon || 'cpuSilicon', b.cx, b.cy, Math.min(b.w, b.h) * 0.5, {
      color: strokeCol,
      tag: actor.badge,
      title: actor.label,
      sub: actor.sub,
      progress: p,
      timeSec: t
    });
    if (actor.crossOutProgress > 0.02) {
      Effects.crossOutFailure(ctx, b.cx, b.cy, actor.crossOutProgress, { size: Math.min(b.w, b.h) * 0.42 });
    }
    ctx.restore();
    return;
  }

  // 3. Pill Actor (ByteByteGo crisp rounded pill with optional crisp icon)
  if (actor.kind === 'pill') {
    ctx.beginPath();
    ctx.roundRect(b.x, b.y, b.w, b.h, b.h / 2);
    ctx.fillStyle = actor.fillColor || (actor.spotlight ? 'rgba(16, 185, 129, 0.25)' : 'rgba(20, 24, 30, 0.94)');
    ctx.fill();
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = actor.spotlight ? 4.5 : 3.5;
    if (actor.spotlight) {
      ctx.shadowColor = strokeCol;
      ctx.shadowBlur = 16;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `800 24px ${Theme.FONTS.sans}`;
    if (actor.icon) {
      const iconSize = Math.min(38, b.h * 0.58);
      const labelW = ctx.measureText(actor.label || '').width;
      const totalW = iconSize + 14 + labelW;
      const startX = b.cx - totalW / 2;
      Icons.draw(ctx, actor.icon, startX + iconSize / 2, b.cy, iconSize, { animate: false });
      ctx.textAlign = 'left';
      ctx.fillText(actor.label || '', startX + iconSize + 14, b.cy + 8);
    } else {
      ctx.textAlign = 'center';
      ctx.fillText(actor.label || '', b.cx, b.cy + 8);
    }
    if (actor.crossOutProgress > 0.02) {
      Effects.crossOutFailure(ctx, b.cx, b.cy, actor.crossOutProgress, { size: b.h * 0.48 });
    }
    ctx.restore();
    return;
  }

  // 4. Cylinder Database / Storage Actor (with optional icon + generous spacing)
  if (actor.kind === 'cylinder') {
    const ry = 22;
    ctx.fillStyle = actor.fillColor || '#2C2C2C';
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = actor.spotlight ? 4.5 : 3.5;
    if (actor.spotlight) {
      ctx.shadowColor = strokeCol;
      ctx.shadowBlur = 18;
    }
    // Body
    ctx.beginPath();
    ctx.moveTo(b.x, b.y + ry);
    ctx.lineTo(b.x, b.y + b.h - ry);
    ctx.ellipse(b.cx, b.y + b.h - ry, b.w / 2, ry, 0, Math.PI, 0, true);
    ctx.lineTo(b.x + b.w, b.y + ry);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Top cap
    ctx.beginPath();
    ctx.ellipse(b.cx, b.y + ry, b.w / 2, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#343434';
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    const hasCylIcon = Boolean(actor.icon);
    const labelY = hasCylIcon ? b.cy + 24 : b.cy + 6;
    if (hasCylIcon) {
      Icons.draw(ctx, actor.icon, b.cx, b.cy - 22, 46, { animate: false });
    }
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `800 24px ${Theme.FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(actor.label || '', b.cx, labelY);
    if (actor.sub) {
      ctx.fillStyle = '#CBD5E1';
      ctx.font = `600 18px ${Theme.FONTS.mono}`;
      ctx.fillText(actor.sub, b.cx, labelY + 32);
    }
    if (actor.badge) {
      drawActorBadge(ctx, b.x + b.w - 10, b.y - 6, actor.badge, actor.badgeColor);
    }
    if (actor.crossOutProgress > 0.02) {
      Effects.crossOutFailure(ctx, b.cx, b.cy, actor.crossOutProgress, { size: 46 });
    }
    ctx.restore();
    return;
  }

  // 5. Visual-First Architectural Card / Memory Bar / Code Block Actor (generous spacing, zero cramped text!)
  ctx.beginPath();
  ctx.roundRect(b.x, b.y, b.w, b.h, 16);
  ctx.fillStyle = actor.fillColor || (actor.kind === 'code' ? '#181C22' : '#2A2D34');
  ctx.fill();
  ctx.strokeStyle = strokeCol;
  ctx.lineWidth = actor.spotlight ? 4.5 : 3.5;
  if (actor.spotlight) {
    ctx.shadowColor = strokeCol;
    ctx.shadowBlur = 18;
  }
  ctx.stroke();
  ctx.shadowBlur = 0;

  const hasIcon = Boolean(actor.icon);
  const hasItems = Array.isArray(actor.items) && actor.items.length > 0;
  const hasMeter = actor.meter != null;
  const hasLogoStrip = Array.isArray(actor.icons) && actor.icons.length > 0;

  // Mode A: Hero Icon Card (clean visual icon centered above title + sub — ByteByteGo visual-first standard!)
  if (hasIcon && !hasItems && !hasMeter && !hasLogoStrip) {
    const iconSize = Math.min(68, b.h * 0.38);
    const iconCy = b.y + b.h * 0.34;

    // Soft circular icon medallion
    ctx.save();
    ctx.beginPath();
    ctx.arc(b.cx, iconCy, iconSize * 0.68, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fill();
    ctx.strokeStyle = strokeCol;
    ctx.globalAlpha *= 0.45;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    Icons.draw(ctx, actor.icon, b.cx, iconCy, iconSize, { animate: false });

    const titleY = iconCy + iconSize * 0.68 + 34;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `800 25px ${Theme.FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(actor.label || '', b.cx, titleY);

    if (actor.sub) {
      ctx.fillStyle = '#CBD5E1';
      ctx.font = `600 18px ${Theme.FONTS.mono}`;
      ctx.fillText(actor.sub, b.cx, titleY + 32);
    }
  } else {
    // Mode B: Structured Header + Generous Spacing + Divider + Items / Meter / Multi-Logo Strip
    const headerPadTop = 26;
    const iconBadgeSize = 46;
    const textLeftX = hasIcon ? b.x + 88 : b.cx;
    const titleY = b.y + headerPadTop + 22;

    if (hasIcon) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(b.x + 48, b.y + headerPadTop + 26, 28, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.fill();
      ctx.restore();
      Icons.draw(ctx, actor.icon, b.x + 48, b.y + headerPadTop + 26, iconBadgeSize, { animate: false });
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `800 24px ${Theme.FONTS.sans}`;
    ctx.textAlign = hasIcon ? 'left' : 'center';
    ctx.fillText(actor.label || '', textLeftX, titleY);

    if (actor.sub) {
      ctx.fillStyle = '#CBD5E1';
      ctx.font = `600 18px ${Theme.FONTS.mono}`;
      ctx.textAlign = hasIcon ? 'left' : 'center';
      ctx.fillText(actor.sub, textLeftX, titleY + 32);
    }

    // Subtle divider between header and body content
    const dividerY = b.y + (actor.sub ? 96 : 76);
    if (hasItems || hasLogoStrip) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(b.x + 22, dividerY);
      ctx.lineTo(b.x + b.w - 22, dividerY);
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }

    // Dynamic appended items with airy 38px vertical rhythm
    if (hasItems) {
      const startY = dividerY + 36;
      const rowH = 38;
      actor.items.slice(0, 6).forEach((item, idx) => {
        const text = typeof item === 'string' ? item : item.text;
        const col = typeof item === 'string' ? '#E5E7EB' : (item.color || '#E5E7EB');
        const itemP = typeof item === 'string' ? 1 : (item.progress != null ? item.progress : 1);
        ctx.save();
        ctx.globalAlpha *= itemP;
        ctx.fillStyle = col;
        ctx.font = `600 20px ${actor.kind === 'code' ? Theme.FONTS.mono : Theme.FONTS.sans}`;
        ctx.textAlign = 'left';
        ctx.fillText(text, b.x + 26, startY + idx * rowH);
        ctx.restore();
      });
    }

    // Multi-Logo Strip (e.g. Linux + Apple + Windows logos for cross-platform clarity!)
    if (hasLogoStrip) {
      const logos = actor.icons.slice(0, 5);
      const logoSize = 36;
      const gap = 26;
      const stripW = logos.length * logoSize + (logos.length - 1) * gap;
      const stripStartX = b.cx - stripW / 2 + logoSize / 2;
      const stripY = b.y + b.h - 36;
      logos.forEach((iconName, idx) => {
        Icons.draw(ctx, iconName, stripStartX + idx * (logoSize + gap), stripY, logoSize, { animate: false });
      });
    }

    // Live fill meter (for Heap / Eden / Queue / CPU load)
    if (hasMeter) {
      const padX = 24;
      const barW = b.w - padX * 2;
      const barH = 26;
      const barY = b.y + b.h - 46;
      ctx.beginPath();
      ctx.roundRect(b.x + padX, barY, barW, barH, 8);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fill();
      const fillW = Math.max(0, barW * clamp01(actor.meter));
      if (fillW > 2) {
        const mCol = actor.meter > 0.85 ? '#F87171' : (actor.meter > 0.6 ? '#FACC15' : '#34D399');
        ctx.beginPath();
        ctx.roundRect(b.x + padX, barY, fillW, barH, 8);
        ctx.fillStyle = mCol;
        ctx.fill();
      }
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `700 16px ${Theme.FONTS.mono}`;
      ctx.textAlign = 'right';
      ctx.fillText(`${Math.round(clamp01(actor.meter) * 100)}%`, b.x + b.w - padX - 8, barY + 19);
    }
  }

  // Status badge pill on top-right corner
  if (actor.badge) {
    drawActorBadge(ctx, b.x + b.w - 12, b.y - 4, actor.badge, actor.badgeColor);
  }

  // Mutation pulse ring
  if (actor.pulseAt != null && actor.pulseAt < 1) {
    ctx.save();
    ctx.globalAlpha *= (1 - actor.pulseAt) * 0.7;
    ctx.beginPath();
    ctx.roundRect(b.x - 8 * actor.pulseAt, b.y - 8 * actor.pulseAt, b.w + 16 * actor.pulseAt, b.h + 16 * actor.pulseAt, 18);
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 3.5;
    ctx.stroke();
    ctx.restore();
  }

  if (actor.crossOutProgress > 0.02) {
    Effects.crossOutFailure(ctx, b.cx, b.cy, actor.crossOutProgress, { size: Math.min(b.w, b.h) * 0.36 });
  }

  ctx.restore();
}

function drawActorBadge(ctx, rightX, topY, text, color) {
  ctx.save();
  ctx.font = `800 17px ${Theme.FONTS.mono}`;
  const tw = ctx.measureText(text).width + 24;
  const bh = 32;
  ctx.beginPath();
  ctx.roundRect(rightX - tw, topY - bh / 2, tw, bh, 16);
  ctx.fillStyle = color || '#38BDF8';
  ctx.fill();
  ctx.fillStyle = '#0B1120';
  ctx.textAlign = 'center';
  ctx.fillText(text, rightX - tw / 2, topY + 6);
  ctx.restore();
}

/**
 * Draw an animated flying packet along the edge between two actors.
 */
function drawPacket(ctx, fromActor, toActor, packet) {
  const ep = getEdgeEndpoints(fromActor, toActor, 8);
  let px, py;
  if (packet.curve) {
    const mx = (ep.x1 + ep.x2) / 2;
    const my = (ep.y1 + ep.y2) / 2 + packet.curve;
    const u = 1 - packet.progress;
    px = u * u * ep.x1 + 2 * u * packet.progress * mx + packet.progress * packet.progress * ep.x2;
    py = u * u * ep.y1 + 2 * u * packet.progress * my + packet.progress * packet.progress * ep.y2;
  } else {
    px = ep.x1 + (ep.x2 - ep.x1) * packet.progress;
    py = ep.y1 + (ep.y2 - ep.y1) * packet.progress;
  }

  ctx.save();
  const label = packet.label || '';
  ctx.font = `800 18px ${Theme.FONTS.mono}`;
  const pw = Math.max(46, ctx.measureText(label).width + 28);
  const ph = 36;

  ctx.shadowColor = packet.color;
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.roundRect(px - pw / 2, py - ph / 2, pw, ph, 18);
  ctx.fillStyle = packet.color;
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.strokeStyle = '#18181B';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  if (label) {
    ctx.fillStyle = '#0F172A';
    ctx.textAlign = 'center';
    ctx.fillText(label, px, py + 6);
  }
  ctx.restore();
}

/**
 * Draw a crisp ByteByteGo-style callout annotation pointing cleanly to an actor's OUTER border
 * (never stabbing through card text or overlapping top status badges!).
 */
function drawCallout(ctx, callout, actors) {
  let tx = callout.x || 960;
  let ty = callout.y || 540;
  let edgeX = tx;
  let edgeY = ty;
  let cx = tx;
  let cy = ty - 110;
  const bh = 52;

  if (callout.target && actors.has(callout.target)) {
    const targetActor = actors.get(callout.target);
    const b = getActorBounds(targetActor);
    tx = b.cx;
    ty = b.cy;
    const extraBadgeClear = targetActor.badge ? 22 : 0;
    if (callout.side === 'bottom') {
      edgeX = b.cx;
      edgeY = b.y + b.h + 6;
      cx = b.cx;
      cy = edgeY + 56;
    } else if (callout.side === 'left') {
      edgeX = b.x - 6;
      edgeY = b.cy;
      cx = edgeX - 180;
      cy = b.cy;
    } else if (callout.side === 'right') {
      edgeX = b.x + b.w + 6;
      edgeY = b.cy;
      cx = edgeX + 180;
      cy = b.cy;
    } else {
      edgeX = b.cx;
      edgeY = b.y - 6 - extraBadgeClear * 0.4;
      cx = b.cx;
      cy = edgeY - 58 - extraBadgeClear * 0.5;
    }
  }

  ctx.save();
  ctx.globalAlpha = callout.alpha;
  ctx.font = `700 21px ${Theme.FONTS.sans}`;
  const tw = ctx.measureText(callout.text).width + 44;

  // Stem connects pill edge neatly to actor outer border — ZERO overlap with text!
  let stemStartX = cx;
  let stemStartY = cy;
  if (cy < edgeY) stemStartY = cy + bh / 2;
  else if (cy > edgeY) stemStartY = cy - bh / 2;
  else if (cx < edgeX) stemStartX = cx + tw / 2;
  else stemStartX = cx - tw / 2;

  ctx.beginPath();
  ctx.moveTo(stemStartX, stemStartY);
  ctx.lineTo(edgeX, edgeY);
  ctx.strokeStyle = callout.color;
  ctx.lineWidth = 3;
  ctx.setLineDash([7, 5]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Anchor dot on target outer edge
  ctx.beginPath();
  ctx.arc(edgeX, edgeY, 5, 0, Math.PI * 2);
  ctx.fillStyle = callout.color;
  ctx.fill();

  // Callout pill
  ctx.beginPath();
  ctx.roundRect(cx - tw / 2, cy - bh / 2, tw, bh, 14);
  ctx.fillStyle = '#181C22';
  ctx.fill();
  ctx.strokeStyle = callout.color;
  ctx.lineWidth = 2.8;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText(callout.text, cx, cy + 7);
  ctx.restore();
}

/**
 * Render a complete Composable Whiteboard scene at time `t` (in seconds).
 * Enforces a strict Safe Diagram Stage (y = 198..960) so zoomed cameras NEVER collide with the beat header!
 */
function renderScene(ctx, spec, t, totalDuration, opts = {}) {
  const state = evaluateWhiteboardState(spec, t, totalDuration);

  // Optional beat header (drawn in screen space before camera transform)
  if (spec.title && opts.drawHeader !== false) {
    Theme.drawBeatHeader(ctx, spec.title, spec.subtitle || '', {
      alpha: clamp01(t / 0.35),
      accent: spec.accent || '#38BDF8'
    });
  }

  // Strict Safe Diagram Stage Clip + Stage-Centered Camera Transform (y = 198..960, centerY = 580)
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 198, 1920, 765);
  ctx.clip();

  const z = state.camera.zoom || 1;
  const cx = state.camera.x != null ? state.camera.x : 960;
  const cy = state.camera.y != null ? state.camera.y : 580;
  if (Math.abs(z - 1) > 0.0005 || Math.abs(cx - 960) > 0.5 || Math.abs(cy - 580) > 0.5) {
    // Pivot zoomed framing around the safe stage center (960, 580) instead of raw 540 so zoomed objects stay well clear of the header!
    const stageCenterY = Math.abs(z - 1) > 0.01 ? 585 : 540;
    ctx.translate(960, stageCenterY);
    ctx.scale(z, z);
    ctx.translate(-cx, -(Math.abs(z - 1) > 0.01 ? cy : 540));
  }

  // Layer 1: Group containers (behind everything)
  for (const actor of state.actors.values()) {
    if (actor.kind === 'group') drawActor(ctx, actor, t);
  }

  // Layer 2: Connecting edges
  for (const edge of state.edges) {
    if (edge.progress <= 0.01) continue;
    const fromActor = state.actors.get(edge.from);
    const toActor = state.actors.get(edge.to);
    if (!fromActor || !toActor) continue;
    const ep = getEdgeEndpoints(fromActor, toActor, 10);
    if (edge.curve) {
      Connectors.curvedArrow(ctx, ep.x1, ep.y1, ep.x2, ep.y2, {
        progress: edge.progress,
        color: edge.color || '#FFFFFF',
        lineWidth: 3,
        bend: edge.curve,
        label: edge.label || ''
      });
    } else if (edge.style === 'flow') {
      Connectors.flowArrow(ctx, ep.x1, ep.y1, ep.x2, ep.y2, t, {
        progress: edge.progress,
        color: edge.color || '#38BDF8',
        lineWidth: 3,
        label: edge.label || '',
        orbs: 2
      });
    } else {
      Connectors.solidArrow(ctx, ep.x1, ep.y1, ep.x2, ep.y2, {
        progress: edge.progress,
        color: edge.color || '#FFFFFF',
        lineWidth: 3,
        dashed: edge.dashed || edge.style === 'dashed',
        label: edge.label || '',
        timeSec: t
      });
    }
  }

  // Layer 3: Foreground actors
  for (const actor of state.actors.values()) {
    if (actor.kind !== 'group') drawActor(ctx, actor, t);
  }

  // Layer 4: Flying data packets
  for (const packet of state.activePackets) {
    const fromActor = state.actors.get(packet.from);
    const toActor = state.actors.get(packet.to);
    if (fromActor && toActor) {
      drawPacket(ctx, fromActor, toActor, packet);
    }
  }

  // Layer 5: Arrival sparks & callouts
  for (const sp of state.sparks) {
    Effects.sparkBurst(ctx, sp.x, sp.y, sp.progress, { color: sp.color, count: 10, maxRadius: 48 });
  }
  for (const callout of state.activeCallouts) {
    drawCallout(ctx, callout, state.actors);
  }

  ctx.restore();

  // Optional bottom takeaway pill (drawn in screen space)
  if (spec.takeaway) {
    const pTakeaway = clamp01((t - totalDuration * 0.72) / 0.5);
    if (pTakeaway > 0.05) {
      Theme.drawTakeawayPill(ctx, spec.takeaway, {
        variant: 'pill',
        border: spec.accent || '#34D399',
        alpha: pTakeaway
      });
    }
  }

  return state;
}

/**
 * Extract crisp soft micro-pop/tick SFX cues automatically from a whiteboard's causal actions.
 */
function extractSfxCues(spec, sceneStartSec, totalDuration) {
  const cues = [];
  const actions = Array.isArray(spec.actions) ? spec.actions : [];
  for (const action of actions) {
    const { start, end } = resolveActionTiming(action, totalDuration);
    if (action.type === 'spawn' || action.type === 'callout') {
      cues.push({ time: Number((sceneStartSec + start).toFixed(2)), type: 'pop' });
    } else if (action.type === 'packet') {
      cues.push({ time: Number((sceneStartSec + end).toFixed(2)), type: 'tick' });
    } else if (action.type === 'mutate') {
      cues.push({ time: Number((sceneStartSec + start).toFixed(2)), type: 'tick' });
    }
  }
  return cues;
}

module.exports = {
  evaluateWhiteboardState,
  renderScene,
  extractSfxCues
};
