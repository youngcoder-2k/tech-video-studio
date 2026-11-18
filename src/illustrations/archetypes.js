'use strict';

const Theme = require('../core/theme');
const Effects = require('../core/draw-effects');
const Connectors = require('../core/connectors');

const { FONTS, GLASS_TINTS } = Theme;

/**
 * Signature ByteByteGo Line-Art Primitives & High-Retention Scene Archetypes (v2.1).
 * Every primitive supports progressive self-drawing (`progress: 0 -> 1`) and dual calling conventions.
 */

// 1. AUTHENTIC 3D STACKED ISOMETRIC WIREFRAME SERVER (Matches ByteByteGo HTTP video)
function isometricServerStack(ctx, cx, cy, opts = {}) {
  const slabs = opts.slabs || 3;
  const rx = opts.rx || 68;
  const ry = opts.ry || 34;
  const slabThickness = opts.thickness || 18;
  const gap = opts.gap || 26;
  const stroke = opts.color || '#5CE1E6';
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const label = opts.label || '';

  if (progress <= 0.01) return { leftX: cx - rx, rightX: cx + rx, cy };

  const totalHeight = (slabs - 1) * gap;
  const startY = cy - totalHeight / 2;

  ctx.save();
  for (let i = slabs - 1; i >= 0; i--) {
    const sy = startY + i * gap;
    const localP = Math.max(0, Math.min(1, (progress * slabs) - (slabs - 1 - i) * 0.45));
    if (localP <= 0.01) continue;

    ctx.save();
    ctx.fillStyle = '#242424';
    ctx.beginPath();
    ctx.moveTo(cx, sy - ry);
    ctx.lineTo(cx + rx, sy);
    ctx.lineTo(cx + rx, sy + slabThickness);
    ctx.lineTo(cx, sy + ry + slabThickness);
    ctx.lineTo(cx - rx, sy + slabThickness);
    ctx.lineTo(cx - rx, sy);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    Effects.strokeDraw(ctx, (c) => {
      c.moveTo(cx, sy - ry);
      c.lineTo(cx + rx, sy);
      c.lineTo(cx, sy + ry);
      c.lineTo(cx - rx, sy);
      c.closePath();

      c.moveTo(cx - rx, sy);
      c.lineTo(cx - rx, sy + slabThickness);
      c.lineTo(cx, sy + ry + slabThickness);
      c.lineTo(cx + rx, sy + slabThickness);
      c.lineTo(cx + rx, sy);
    }, localP, { stroke, lineWidth: 2, pathLength: 620 });

    if (localP > 0.75) {
      ctx.fillStyle = stroke;
      ctx.beginPath();
      ctx.arc(cx - rx * 0.62, sy + ry * 0.38 + slabThickness * 0.45, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx - rx * 0.46, sy + ry * 0.46 + slabThickness * 0.45);
      ctx.lineTo(cx - rx * 0.22, sy + ry * 0.58 + slabThickness * 0.45);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }
  }

  if (label) {
    Effects.typeText(ctx, label, cx, startY + totalHeight + ry + slabThickness + 30, progress, {
      font: `600 17px ${FONTS.sans}`,
      color: '#FFFFFF'
    });
  }
  ctx.restore();
  return { leftX: cx - rx, rightX: cx + rx, cy };
}

// 2. FOLDED-CORNER DOCUMENT WITH RIBBON BADGE (HTML, LOG, JSON, SQL, CLASS)
function foldedFileBadge(ctx, cx, cy, tagOrOpts = 'LOG', maybeOpts = {}) {
  const opts = typeof tagOrOpts === 'object' && tagOrOpts !== null ? tagOrOpts : maybeOpts;
  const tag = typeof tagOrOpts === 'string' ? tagOrOpts : (opts.badge || opts.tag || 'LOG');
  const w = opts.width || 96;
  const h = opts.height || 118;
  const fold = opts.fold || 24;
  const x = cx - w / 2;
  const y = cy - h / 2;
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const outlineColor = opts.outlineColor || '#FFFFFF';
  const ribbonBg = opts.ribbonBg || opts.badgeColor || '#3B82F6';
  const ribbonStroke = opts.ribbonStroke || '';

  if (progress <= 0.01) return;

  ctx.save();
  Effects.strokeDraw(ctx, (c) => {
    c.moveTo(x + 10, y);
    c.lineTo(x + w - fold, y);
    c.lineTo(x + w, y + fold);
    c.lineTo(x + w, y + h - 10);
    c.quadraticCurveTo(x + w, y + h, x + w - 10, y + h);
    c.lineTo(x + 10, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - 10);
    c.lineTo(x, y + 10);
    c.quadraticCurveTo(x, y, x + 10, y);

    c.moveTo(x + w - fold, y);
    c.lineTo(x + w - fold, y + fold);
    c.lineTo(x + w, y + fold);
  }, progress, { stroke: outlineColor, lineWidth: 2.3, pathLength: 520 });

  if (progress > 0.35) {
    const rp = Math.min(1, (progress - 0.35) / 0.65);
    const rw = w + 20;
    const rh = 38;
    const rx = cx - rw / 2;
    const ry = cy + 6;

    ctx.save();
    ctx.globalAlpha *= rp;
    ctx.beginPath();
    ctx.roundRect(rx, ry, rw, rh, 10);
    ctx.fillStyle = ribbonBg;
    ctx.fill();
    if (ribbonStroke) {
      ctx.strokeStyle = ribbonStroke;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 21px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(tag, cx, ry + 26);
    ctx.restore();
  }

  if (opts.caption && progress > 0.5) {
    Effects.typeText(ctx, opts.caption, cx, y + h + 28, (progress - 0.5) * 2, {
      font: `500 16px ${FONTS.sans}`,
      color: '#E2E8F0'
    });
  }
  ctx.restore();
}

// 3. THIN-LINE NEON WIREFRAME BROWSER (`WWW` — Matches ByteByteGo HTTP video)
function wireframeBrowser(ctx, x, y, w = 176, h = 122, opts = {}) {
  const stroke = opts.color || '#5CE1E6';
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const centerLabel = opts.label !== undefined ? opts.label : (opts.centerText !== undefined ? opts.centerText : 'WWW');

  if (progress <= 0.01) return;

  ctx.save();
  Effects.strokeDraw(ctx, (c) => {
    c.roundRect(x, y, w, h, 8);
    c.moveTo(x, y + 24);
    c.lineTo(x + w, y + 24);
    c.roundRect(x + 8, y + 6, w * 0.56, 12, 6);
  }, progress, { stroke, lineWidth: 2, fill: 'rgba(20, 28, 36, 0.55)', pathLength: 780 });

  if (progress > 0.6) {
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(x + w - 34 + i * 11, y + 12, 3, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (centerLabel) {
      ctx.fillStyle = opts.labelColor || '#F59E0B';
      ctx.font = `700 24px ${FONTS.sans}`;
      ctx.textAlign = 'center';
      ctx.fillText(centerLabel, x + w / 2, y + h / 2 + 18);
    }
  }
  ctx.restore();
}

// 4. THIN-LINE WIREFRAME CYLINDER DATABASE (Self-drawing, matches ACID video)
function wireframeCylinderDb(ctx, cx, cy, wOrOpts = {}, hOrUndefined, maybeOpts = {}) {
  const opts = typeof wOrOpts === 'number'
    ? Object.assign({}, maybeOpts, { width: wOrOpts, height: hOrUndefined || 116 })
    : wOrOpts;
  const w = opts.width || 108;
  const h = opts.height || 116;
  const ry = opts.ry || 18;
  const x = cx - w / 2;
  const y = cy - h / 2;
  const stroke = opts.color || '#7DD3FC';
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const label = opts.label !== undefined ? opts.label : 'Database';

  if (progress <= 0.01) return;

  ctx.save();
  Effects.strokeDraw(ctx, (c) => {
    c.ellipse(cx, y + ry, w / 2, ry, 0, 0, Math.PI * 2);
    c.moveTo(x, y + ry);
    c.lineTo(x, y + h - ry);
    c.ellipse(cx, y + h - ry, w / 2, ry, 0, Math.PI, 0, true);
    c.lineTo(x + w, y + ry);
    c.moveTo(x, cy);
    c.ellipse(cx, cy, w / 2, ry, 0, Math.PI, 0, true);
  }, progress, { stroke, lineWidth: 2, fill: 'rgba(56, 189, 248, 0.08)', pathLength: 820 });

  if (label) {
    Effects.typeText(ctx, label, cx, y + h + 26, progress, {
      font: `500 17px ${FONTS.sans}`,
      color: '#FFFFFF'
    });
  }
  ctx.restore();
}

// 5. CRISP CYAN LINE-ART USER BUST (Matches ByteByteGo Alice/Bob Transaction scene)
function lineArtUser(ctx, cx, cy, opts = {}) {
  const scale = opts.scale || 1;
  const stroke = opts.color || '#38BDF8';
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const label = opts.label || '';

  if (progress <= 0.01) return;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  Effects.strokeDraw(ctx, (c) => {
    c.moveTo(-22, -16);
    c.lineTo(-22, -38);
    c.quadraticCurveTo(0, -48, 22, -40);
    c.lineTo(22, -12);
    c.quadraticCurveTo(22, 10, 0, 10);
    c.quadraticCurveTo(-22, 10, -22, -16);

    c.moveTo(-22, -22);
    c.quadraticCurveTo(-4, -18, 8, -28);
    c.quadraticCurveTo(16, -20, 22, -20);

    c.moveTo(-10, 10);
    c.lineTo(-10, 20);
    c.moveTo(10, 10);
    c.lineTo(10, 20);

    c.moveTo(-42, 46);
    c.quadraticCurveTo(-42, 22, -14, 20);
    c.lineTo(0, 32);
    c.lineTo(14, 20);
    c.quadraticCurveTo(42, 22, 42, 46);
    c.closePath();

    c.moveTo(0, 32);
    c.lineTo(0, 46);
  }, progress, { stroke, lineWidth: 2.2, pathLength: 560 });

  ctx.restore();

  if (label) {
    Effects.typeText(ctx, label, cx, cy + 68 * scale, progress, {
      font: `600 16px ${FONTS.sans}`,
      color: '#E2E8F0'
    });
  }
}

// 6. TRANSLUCENT STATE MUTATION CARD (e.g. Alice Account: Before $200 / Debit $100 / Available $100)
function stateMutationCard(ctx, x, y, w, h, opts = {}) {
  const title = opts.title || 'Account State';
  const tint = opts.tint || 'olive';
  const rows = opts.rows || [
    { text: 'Before: $200', highlight: false },
    { text: 'Debit: $100', highlight: true },
    { text: 'Available: $100', highlight: false }
  ];
  const progress = opts.progress !== undefined ? opts.progress : 1;

  if (progress <= 0.01) return;

  ctx.save();
  if (title) {
    ctx.fillStyle = (GLASS_TINTS[tint] || GLASS_TINTS.olive).highlight;
    ctx.font = `600 20px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(title, x + w / 2, y - 16);
  }

  Theme.drawGlassCard(ctx, x, y, w, h, {
    tint,
    radius: 12,
    badge: opts.badge,
    badgeSide: opts.badgeSide,
    progress
  });

  const rowStart = y + (opts.badge ? 54 : 38);
  const rowGap = Math.min(34, (h - 36) / Math.max(1, rows.length));

  rows.forEach((r, idx) => {
    const rp = Math.max(0, Math.min(1, (progress - idx * 0.18) / 0.55));
    if (rp <= 0.01) return;
    const text = typeof r === 'string'
      ? r
      : (r.text || `${r.actor || 'State'}: ${r.before || ''} -> ${r.after || ''}`);
    const isHighlight = Boolean(r.highlight);
    const col = typeof r.highlight === 'string' ? r.highlight : (isHighlight ? '#FACC15' : '#FFFFFF');
    Effects.typeText(ctx, text, x + w / 2, rowStart + idx * rowGap, rp, {
      font: `${isHighlight ? '700' : '500'} 18px ${FONTS.sans}`,
      color: col
    });
  });
  ctx.restore();
}

// 7. BROKEN LINK PLUG + RED FAILURE CROSS-OUT (Matches ByteByteGo ACID failure state)
function brokenLinkPlug(ctx, cx, cy, opts = {}) {
  const baseP = opts.progress !== undefined ? opts.progress : 1;
  const sep = (opts.separation !== undefined ? opts.separation : baseP) * 14;
  const crossProgress = opts.crossProgress !== undefined ? opts.crossProgress : baseP;

  if (baseP <= 0.01) return;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-Math.PI / 4);

  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(-42 - sep, -14, 28, 28, 5);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-14 - sep, -6); ctx.lineTo(-4 - sep, -6);
  ctx.moveTo(-14 - sep, 6); ctx.lineTo(-4 - sep, 6);
  ctx.stroke();

  ctx.strokeStyle = '#C084FC';
  ctx.beginPath();
  ctx.roundRect(10 + sep, -14, 28, 28, 5);
  ctx.stroke();
  ctx.restore();

  if (crossProgress > 0.01) {
    Effects.crossOutFailure(ctx, cx, cy, crossProgress, { size: 42 });
  }

  if (opts.caption && baseP > 0.4) {
    Effects.typeText(ctx, opts.caption, cx, cy + 68, (baseP - 0.4) / 0.6, {
      font: `600 16px ${FONTS.sans}`,
      color: '#FCA5A5'
    });
  }
}

// ============================================================================
// HIGH-RETENTION FULL-SCENE ARCHETYPES
// ============================================================================

// 8. EVOLUTION / MILESTONE TIMELINE STRIP (`HTTP/1 o──▶ HTTP/1.1 o──▶ HTTP/2 o──▶ HTTP/3`)
function evolutionTimeline(ctx, itemsOrCx, yOrOpts = {}, maybeOpts = {}) {
  let items = itemsOrCx;
  let opts = yOrOpts;
  if (typeof itemsOrCx === 'number') {
    opts = Object.assign({}, maybeOpts, { centerY: yOrOpts });
    items = opts.items || ['v1.0', 'v2.0', 'v3.0'];
  }
  const canvasWidth = opts.canvasWidth || 1920;
  const cy = opts.centerY || 540;
  const nodeW = opts.nodeWidth || 186;
  const nodeH = opts.nodeHeight || 66;
  const gap = opts.gap || 135;
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const activeIndex = opts.activeIndex !== undefined ? opts.activeIndex : items.length - 1;

  const totalW = items.length * nodeW + (items.length - 1) * gap;
  const startX = Math.round((canvasWidth - totalW) / 2);

  ctx.save();
  items.forEach((item, i) => {
    const stepThreshold = i / items.length;
    const localP = Math.max(0, Math.min(1, (progress - stepThreshold * 0.7) / 0.35));
    if (localP <= 0.01) return;

    const x = startX + i * (nodeW + gap);
    const y = cy - nodeH / 2;
    const isCurrent = i === activeIndex;
    const label = typeof item === 'string' ? item : item.label;
    const sub = typeof item === 'object' ? item.sub : '';

    ctx.save();
    ctx.globalAlpha *= localP;
    ctx.beginPath();
    ctx.roundRect(x, y, nodeW, nodeH, 14);
    ctx.fillStyle = isCurrent ? 'rgba(234, 179, 8, 0.22)' : 'rgba(24, 24, 24, 0.85)';
    ctx.fill();
    ctx.strokeStyle = isCurrent ? '#FACC15' : '#D4C646';
    ctx.lineWidth = isCurrent ? 3 : 2;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 24px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(label, x + nodeW / 2, cy + 8);

    if (sub) {
      ctx.fillStyle = isCurrent ? '#FEF08A' : '#94A3B8';
      ctx.font = `500 15px ${FONTS.sans}`;
      ctx.fillText(sub, x + nodeW / 2, y + nodeH + 28);
    }
    ctx.restore();

    if (i < items.length - 1) {
      const arrowP = Math.max(0, Math.min(1, (progress - (stepThreshold + 0.08) * 0.7) / 0.25));
      Connectors.solidArrow(ctx, x + nodeW, cy, x + nodeW + gap, cy, {
        progress: arrowP,
        color: '#FFFFFF',
        lineWidth: 2.6
      });
    }
  });
  ctx.restore();
}

// 9. GIANT KINETIC STAT / YEAR HERO SLAM (`2010`, `< 1 ms`, `10,000x` — Matches HTTP 38s)
function heroMetricSlam(ctx, textOrCx, cyOrOpts = {}, maybeOpts = {}) {
  let mainText = textOrCx;
  let opts = cyOrOpts;
  if (typeof textOrCx === 'number' && typeof cyOrOpts === 'number') {
    opts = Object.assign({}, maybeOpts, { cx: textOrCx, cy: cyOrOpts });
    mainText = String(opts.value || opts.text || '2015');
  }
  const cx = opts.cx || 960;
  const cy = opts.cy || 530;
  const color = opts.color || '#2CE5FF';
  const subText = opts.subtitle || opts.sub || '';
  const scale = opts.scale !== undefined ? opts.scale : (opts.progress !== undefined ? opts.progress : 1);
  const fontSize = opts.fontSize || 230;

  if (scale <= 0.01) return;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  ctx.shadowColor = color;
  ctx.shadowBlur = 28;
  ctx.fillStyle = color;
  ctx.font = `800 ${fontSize}px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(mainText, 0, fontSize * 0.32);

  ctx.shadowBlur = 0;
  if (subText) {
    ctx.fillStyle = '#E2E8F0';
    ctx.font = `600 28px ${FONTS.sans}`;
    ctx.fillText(subText, 0, fontSize * 0.32 + 64);
  }
  ctx.restore();
}

// 10. SIDE-BY-SIDE TRANSLUCENT COMPARISON TABLE (Matches Linux BIOS vs UEFI frame 42s)
function comparisonSplitTable(ctx, a1, a2, a3 = {}, a4, a5 = {}) {
  let leftSpec = a1;
  let rightSpec = a2;
  let opts = a3;

  // Support (ctx, x, y, w, h, { leftHeader, rightHeader, rows, progress })
  if (typeof a1 === 'number' && typeof a2 === 'number' && typeof a3 === 'number' && typeof a4 === 'number') {
    const spec = a5 || {};
    const gap = spec.gap || 28;
    const cardW = Math.floor((a3 - gap) / 2);
    const p = spec.progress !== undefined ? spec.progress : 1;
    leftSpec = {
      title: spec.leftHeader || 'Option A',
      headerFill: '#6B7B3A',
      bodyFill: 'rgba(34, 68, 62, 0.72)',
      bullets: (spec.rows || []).map((r) => r.left),
      progress: p
    };
    rightSpec = {
      title: spec.rightHeader || 'Option B',
      headerFill: '#0F766E',
      bodyFill: 'rgba(22, 62, 72, 0.72)',
      bullets: (spec.rows || []).map((r) => r.right),
      progress: p
    };
    opts = { startX: a1, y: a2, cardWidth: cardW, cardHeight: a4, gap };
  }

  const canvasWidth = opts.canvasWidth || 1920;
  const cardW = opts.cardWidth || 620;
  const cardH = opts.cardHeight || 420;
  const gap = opts.gap || 32;
  const y = opts.y || 300;
  const startX = opts.startX !== undefined ? opts.startX : Math.round((canvasWidth - (cardW * 2 + gap)) / 2);

  const cards = [
    { spec: leftSpec, x: startX },
    { spec: rightSpec, x: startX + cardW + gap }
  ];

  cards.forEach(({ spec, x }) => {
    const progress = spec.progress !== undefined ? spec.progress : 1;
    if (progress <= 0.01) return;

    ctx.save();
    ctx.globalAlpha *= progress;

    ctx.beginPath();
    ctx.roundRect(x, y, cardW, cardH, 16);
    ctx.fillStyle = spec.bodyFill || 'rgba(34, 68, 62, 0.72)';
    ctx.fill();
    ctx.strokeStyle = spec.strokeColor || 'rgba(94, 234, 212, 0.35)';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(x, y, cardW, 56, [16, 16, 12, 12]);
    ctx.fillStyle = spec.headerFill || '#6B7B3A';
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 22px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(spec.title || '', x + cardW / 2, y + 36);

    ctx.textAlign = 'left';
    let cursorY = y + 100;
    (spec.bullets || []).forEach((b, idx) => {
      const text = typeof b === 'string' ? b : b.text;
      const isHighlighted = (typeof b === 'object' && b.highlight) || spec.highlightIndex === idx;
      ctx.fillStyle = isHighlighted ? '#FACC15' : '#F8FAFC';
      ctx.font = `${isHighlighted ? '600' : '500'} 19px ${FONTS.sans}`;

      const words = (`•  ${text}`).split(' ');
      let line = '';
      const maxW = cardW - 56;
      for (const word of words) {
        const testLine = line ? `${line} ${word}` : word;
        if (ctx.measureText(testLine).width > maxW) {
          ctx.fillText(line, x + 28, cursorY);
          line = '    ' + word;
          cursorY += 28;
        } else {
          line = testLine;
        }
      }
      if (line) {
        ctx.fillText(line, x + 28, cursorY);
        cursorY += 38;
      }
    });

    ctx.restore();
  });
}

// 11. SWIMLANE PROTOCOL SEQUENCE DIAGRAM (TCP Handshake, OAuth2, Raft, 2PC)
function swimlaneSequence(ctx, a1, a2, a3 = {}, a4, a5 = {}) {
  let actors = a1;
  let messages = a2;
  let opts = a3;

  // Support (ctx, x, y, w, h, { actors, messages, progress })
  if (typeof a1 === 'number' && typeof a2 === 'number' && typeof a3 === 'number' && typeof a4 === 'number') {
    const spec = a5 || {};
    actors = spec.actors || [];
    messages = spec.messages || [];
    opts = {
      startX: a1 + 95,
      topY: a2 + 30,
      bottomY: a2 + a4 - 20,
      spanWidth: Math.max(200, a3 - 190),
      progress: spec.progress
    };
  }

  const canvasWidth = opts.canvasWidth || 1920;
  const topY = opts.topY || 220;
  const bottomY = opts.bottomY || 780;
  const spanW = opts.spanWidth || 1240;
  const startX = opts.startX !== undefined ? opts.startX : Math.round((canvasWidth - spanW) / 2);
  const stepX = actors.length > 1 ? spanW / (actors.length - 1) : 0;
  const progress = opts.progress !== undefined ? opts.progress : 1;

  const actorXs = actors.map((_, i) => Math.round(startX + i * stepX));

  ctx.save();
  actors.forEach((act, i) => {
    const ax = actorXs[i];
    const name = typeof act === 'string' ? act : act.name;
    const color = (typeof act === 'object' && act.color) || '#38BDF8';

    ctx.beginPath();
    ctx.roundRect(ax - 95, topY - 26, 190, 50, 12);
    ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `700 18px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(name, ax, topY + 6);

    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.lineWidth = 2;
    ctx.setLineDash([7, 6]);
    ctx.beginPath();
    ctx.moveTo(ax, topY + 26);
    ctx.lineTo(ax, bottomY);
    ctx.stroke();
    ctx.setLineDash([]);
  });

  const msgAreaStart = topY + 78;
  const msgGap = Math.min(92, (bottomY - msgAreaStart - 30) / Math.max(1, messages.length));

  messages.forEach((m, idx) => {
    const mp = m.progress !== undefined
      ? m.progress
      : Math.max(0, Math.min(1, (progress * messages.length) - idx));
    if (mp <= 0.01) return;

    const x1 = actorXs[m.from];
    const x2 = actorXs[m.to];
    const y1 = msgAreaStart + idx * msgGap;
    const y2 = y1 + (m.slope !== undefined ? m.slope : 22);
    const col = m.color || '#5CE1E6';

    Connectors.solidArrow(ctx, x1, y1, x2, y2, {
      progress: mp,
      dashed: Boolean(m.dashed),
      label: m.label,
      color: col,
      labelOffset: -14,
      labelBg: false
    });

    if (m.failed && mp > 0.7) {
      Effects.crossOutFailure(ctx, (x1 + x2) / 2, (y1 + y2) / 2, (mp - 0.7) / 0.3, { size: 32 });
    }
  });
  ctx.restore();
}

// 12. CONSISTENT HASH RING (Distributed Systems: DynamoDB, Cassandra, Sharding)
function consistentHashRing(ctx, cx, cy, radius, nodesOrOpts = [], maybeOpts = {}) {
  const isArray = Array.isArray(nodesOrOpts);
  const opts = isArray ? maybeOpts : (nodesOrOpts || {});
  const nodes = isArray ? nodesOrOpts : (opts.nodes || []);
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const tokenAngle = opts.tokenAngle !== undefined ? opts.tokenAngle : (opts.keyAngle !== undefined ? opts.keyAngle : 0);

  if (progress <= 0.01) return;

  ctx.save();
  Effects.strokeDraw(ctx, (c) => {
    c.arc(cx, cy, radius, 0, Math.PI * 2);
  }, progress, { stroke: '#475569', lineWidth: 3, pathLength: Math.round(2 * Math.PI * radius) + 40 });

  if (opts.sweepToAngle !== undefined && progress > 0.6) {
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, tokenAngle, opts.sweepToAngle);
    ctx.stroke();
  }

  nodes.forEach((n) => {
    const nx = cx + Math.cos(n.angle) * radius;
    const ny = cy + Math.sin(n.angle) * radius;
    ctx.fillStyle = n.color || '#10B981';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(nx, ny, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    const lx = cx + Math.cos(n.angle) * (radius + 42);
    const ly = cy + Math.sin(n.angle) * (radius + 42);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 15px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(n.label, lx, ly + 5);
  });

  if (opts.showToken !== false && progress > 0.5) {
    const kx = cx + Math.cos(tokenAngle) * radius;
    const ky = cy + Math.sin(tokenAngle) * radius;
    ctx.fillStyle = '#FACC15';
    ctx.shadowColor = '#FACC15';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(kx, ky, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  ctx.restore();
}

// 13. B-TREE / INDEX HIERARCHY (Database Indexes, File Systems, Compilers)
function bTreeHierarchy(ctx, cx, topY, opts = {}) {
  const rootKeys = (opts.root || opts.rootKeys || ['30', '70']).map(String);
  const children = (opts.children || [
    { keys: ['10', '20'], active: false },
    { keys: ['42', '55'], active: true },
    { keys: ['80', '95'], active: false }
  ]).map((c, idx) => ({
    keys: (c.keys || []).map(String),
    active: c.active !== undefined ? c.active : opts.highlightBranch === idx
  }));
  const progress = opts.progress !== undefined ? opts.progress : 1;

  if (progress <= 0.01) return;

  function drawKeyNode(nx, ny, keys, active) {
    const cellW = 54;
    const w = keys.length * cellW;
    const h = 44;
    const x = nx - w / 2;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, ny, w, h, 8);
    ctx.fillStyle = active ? 'rgba(16, 185, 129, 0.28)' : 'rgba(30, 41, 59, 0.85)';
    ctx.fill();
    ctx.strokeStyle = active ? '#34D399' : '#38BDF8';
    ctx.lineWidth = active ? 2.8 : 2;
    ctx.stroke();

    keys.forEach((k, idx) => {
      if (idx > 0) {
        ctx.beginPath();
        ctx.moveTo(x + idx * cellW, ny);
        ctx.lineTo(x + idx * cellW, ny + h);
        ctx.stroke();
      }
      ctx.fillStyle = active ? '#FEF08A' : '#FFFFFF';
      ctx.font = `700 16px ${FONTS.mono}`;
      ctx.textAlign = 'center';
      ctx.fillText(k, x + idx * cellW + cellW / 2, ny + 28);
    });
    ctx.restore();
    return { x, y: ny, w, h };
  }

  ctx.save();
  ctx.globalAlpha *= progress;
  drawKeyNode(cx, topY, rootKeys, true);

  const childY = topY + 130;
  const spacing = opts.spacing || 210;
  const startX = cx - ((children.length - 1) * spacing) / 2;

  children.forEach((ch, i) => {
    const childCx = startX + i * spacing;
    Connectors.solidArrow(ctx, cx + (i - 1) * 28, topY + 44, childCx, childY, {
      color: ch.active ? '#34D399' : '#64748B',
      lineWidth: ch.active ? 2.8 : 1.8
    });
    drawKeyNode(childCx, childY, ch.keys, ch.active);
  });
  ctx.restore();
}

// 14. SEGMENTED NETWORK PACKET / PROTOCOL FRAME (`[ IP | TCP | TLS | HTTP Payload ]`)
function networkPacketFrame(ctx, a1, a2, a3, a4 = {}, a5 = {}) {
  let cx = a1;
  let cy = a2;
  let segments = a3;
  let opts = a4;

  // Support (ctx, x, y, w, h, { segments, progress })
  if (typeof a3 === 'number' && typeof a4 === 'number') {
    opts = Object.assign({}, a5, { height: a4 });
    cx = a1 + a3 / 2;
    cy = a2 + a4 / 2;
    segments = (opts.segments || []).map((s) => ({
      label: s.label,
      sub: s.sub,
      width: s.width || Math.round((s.ratio || 0.25) * a3),
      border: s.border || s.color || '#38BDF8',
      bg: s.bg || 'rgba(30, 41, 59, 0.72)'
    }));
  }

  const h = opts.height || 64;
  const totalW = segments.reduce((s, seg) => s + (seg.width || 160), 0);
  let cursorX = cx - totalW / 2;
  const progress = opts.progress !== undefined ? opts.progress : 1;

  if (progress <= 0.01) return;

  ctx.save();
  segments.forEach((seg, i) => {
    const sw = seg.width || 160;
    const lp = Math.max(0, Math.min(1, (progress * segments.length) - i * 0.5));
    if (lp > 0.01) {
      ctx.save();
      ctx.globalAlpha *= lp;
      const radii = i === 0
        ? [10, 0, 0, 10]
        : (i === segments.length - 1 ? [0, 10, 10, 0] : 0);

      ctx.beginPath();
      ctx.roundRect(cursorX, cy - h / 2, sw, h, radii);
      ctx.fillStyle = seg.bg || 'rgba(2, 132, 199, 0.35)';
      ctx.fill();
      ctx.strokeStyle = seg.border || '#38BDF8';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `700 16px ${FONTS.sans}`;
      ctx.textAlign = 'center';
      ctx.fillText(seg.label, cursorX + sw / 2, cy + (seg.sub ? -2 : 6));

      if (seg.sub) {
        ctx.fillStyle = '#CBD5E1';
        ctx.font = `12px ${FONTS.mono}`;
        ctx.fillText(seg.sub, cursorX + sw / 2, cy + 18);
      }
      ctx.restore();
    }
    cursorX += sw;
  });
  ctx.restore();
}

// 15. API GATEWAY / REVERSE PROXY LOAD BALANCER ROUTER (1 -> 3 Fan-out distributor)
function loadBalancerRouter(ctx, cx, cy, opts = {}) {
  const radius = opts.radius || 58;
  const stroke = opts.color || '#5CE1E6';
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const label = opts.label !== undefined ? opts.label : 'Load Balancer';
  const algorithm = opts.algorithm || 'Round-Robin';

  if (progress <= 0.01) return;

  ctx.save();
  Effects.strokeDraw(ctx, (c) => {
    c.arc(cx, cy, radius, 0, Math.PI * 2);
    // Internal diamond router symbol
    c.moveTo(cx - 28, cy);
    c.lineTo(cx + 22, cy - 22);
    c.moveTo(cx - 28, cy);
    c.lineTo(cx + 24, cy);
    c.moveTo(cx - 28, cy);
    c.lineTo(cx + 22, cy + 22);
  }, progress, { stroke, lineWidth: 2.4, fill: 'rgba(15, 23, 42, 0.85)', pathLength: 520 });

  if (progress > 0.6) {
    ctx.fillStyle = '#FACC15';
    ctx.beginPath();
    ctx.arc(cx - 28, cy, 5, 0, Math.PI * 2);
    ctx.fill();

    [-22, 0, 22].forEach((dy) => {
      ctx.fillStyle = '#4ADE80';
      ctx.beginPath();
      ctx.arc(cx + 23, cy + dy, 4.5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = '#94A3B8';
    ctx.font = `600 12px ${FONTS.mono}`;
    ctx.textAlign = 'center';
    ctx.fillText(algorithm, cx, cy + radius - 14);
  }

  if (label) {
    Effects.typeText(ctx, label, cx, cy + radius + 28, progress, {
      font: `600 17px ${FONTS.sans}`,
      color: '#FFFFFF'
    });
  }
  ctx.restore();
}

// 16. KAFKA / PUB-SUB PARTITIONED OFFSET LOG STREAM
function pubSubTopicBox(ctx, x, y, w = 460, h = 110, opts = {}) {
  const title = opts.title || 'Topic: orders-stream (Partition 0)';
  const offsets = opts.offsets || ['#101', '#102', '#103', '#104', 'HEAD'];
  const activeSlot = opts.activeSlot !== undefined ? opts.activeSlot : offsets.length - 1;
  const progress = opts.progress !== undefined ? opts.progress : 1;

  if (progress <= 0.01) return;

  ctx.save();
  Theme.drawGlassCard(ctx, x, y, w, h, {
    tint: opts.tint || 'teal',
    radius: 12,
    progress
  });

  ctx.fillStyle = '#E2E8F0';
  ctx.font = `600 15px ${FONTS.sans}`;
  ctx.textAlign = 'left';
  ctx.fillText(title, x + 20, y + 26);

  const cellGap = 8;
  const padX = 20;
  const cellW = Math.floor((w - padX * 2 - (offsets.length - 1) * cellGap) / offsets.length);
  const cellH = 46;
  const cellY = y + 42;

  offsets.forEach((slotText, idx) => {
    const sp = Math.max(0, Math.min(1, (progress * offsets.length) - idx * 0.4));
    if (sp <= 0.01) return;
    const cx = x + padX + idx * (cellW + cellGap);
    const isHead = idx === activeSlot;

    ctx.save();
    ctx.globalAlpha *= sp;
    ctx.beginPath();
    ctx.roundRect(cx, cellY, cellW, cellH, 7);
    ctx.fillStyle = isHead ? 'rgba(250, 204, 21, 0.24)' : 'rgba(15, 23, 42, 0.78)';
    ctx.fill();
    ctx.strokeStyle = isHead ? '#FACC15' : '#38BDF8';
    ctx.lineWidth = isHead ? 2.4 : 1.5;
    ctx.stroke();

    ctx.fillStyle = isHead ? '#FEF08A' : '#FFFFFF';
    ctx.font = `700 14px ${FONTS.mono}`;
    ctx.textAlign = 'center';
    ctx.fillText(slotText, cx + cellW / 2, cellY + 28);
    ctx.restore();
  });
  ctx.restore();
}

// 17. MICROSERVICE CIRCUIT BREAKER KNIFE-SWITCH (`CLOSED` vs `OPEN (TRIPPED)`)
function circuitBreakerSwitch(ctx, cx, cy, opts = {}) {
  const isOpen = opts.state === 'OPEN' || Boolean(opts.tripped);
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const label = opts.label || (isOpen ? 'OPEN (Fast Fail 503)' : 'CLOSED (Healthy Flow)');
  const color = isOpen ? '#F87171' : '#4ADE80';

  if (progress <= 0.01) return;

  ctx.save();
  ctx.globalAlpha *= progress;

  // Left and right terminal posts
  const leftX = cx - 56;
  const rightX = cx + 56;

  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(leftX - 36, cy);
  ctx.lineTo(leftX, cy);
  ctx.moveTo(rightX, cy);
  ctx.lineTo(rightX + 36, cy);
  ctx.stroke();

  // Switch pivot blade
  const angle = isOpen ? -0.58 : 0;
  ctx.save();
  ctx.translate(leftX, cy);
  ctx.rotate(angle);
  ctx.strokeStyle = color;
  ctx.lineWidth = 4.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(110, 0);
  ctx.stroke();
  ctx.restore();

  // Terminal nodes
  [leftX, rightX].forEach((tx) => {
    ctx.fillStyle = '#1E293B';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(tx, cy, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  ctx.fillStyle = color;
  ctx.font = `700 16px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(label, cx, cy + 40);
  ctx.restore();
}

// 18. CDN GLOBAL EDGE POP WIREFRAME GLOBE
function cdnEdgeGlobe(ctx, cx, cy, radius = 85, opts = {}) {
  const stroke = opts.color || '#38BDF8';
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const label = opts.label !== undefined ? opts.label : 'Global Edge CDN';
  const pops = opts.pops || [
    { x: -0.45, y: -0.25, name: 'US-East' },
    { x: 0.15, y: -0.35, name: 'EU-West' },
    { x: 0.52, y: 0.22, name: 'AP-East' }
  ];

  if (progress <= 0.01) return;

  ctx.save();
  Effects.strokeDraw(ctx, (c) => {
    c.arc(cx, cy, radius, 0, Math.PI * 2);
    c.ellipse(cx, cy, radius * 0.48, radius, 0, 0, Math.PI * 2);
    c.ellipse(cx, cy, radius, radius * 0.38, 0, 0, Math.PI * 2);
  }, progress, { stroke, lineWidth: 2, fill: 'rgba(12, 74, 110, 0.22)', pathLength: 960 });

  if (progress > 0.55) {
    pops.forEach((p) => {
      const px = cx + p.x * radius;
      const py = cy + p.y * radius;
      ctx.fillStyle = '#4ADE80';
      ctx.beginPath();
      ctx.arc(px, py, 5.5, 0, Math.PI * 2);
      ctx.fill();

      if (p.name) {
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `600 13px ${FONTS.sans}`;
        ctx.textAlign = 'center';
        ctx.fillText(p.name, px, py - 11);
      }
    });
  }

  if (label) {
    Effects.typeText(ctx, label, cx, cy + radius + 28, progress, {
      font: `600 17px ${FONTS.sans}`,
      color: '#FFFFFF'
    });
  }
  ctx.restore();
}

// 19. TOKEN BUCKET RATE LIMITER VISUALIZER
function rateLimiterBucket(ctx, cx, cy, opts = {}) {
  const w = opts.width || 116;
  const h = opts.height || 126;
  const fillLevel = opts.fillLevel !== undefined ? opts.fillLevel : 0.65;
  const progress = opts.progress !== undefined ? opts.progress : 1;
  const tokens = opts.tokens !== undefined ? opts.tokens : 4;
  const label = opts.label !== undefined ? opts.label : 'Token Bucket (100 req/s)';

  if (progress <= 0.01) return;

  const topW = w;
  const botW = w * 0.78;
  const yTop = cy - h / 2;
  const yBot = cy + h / 2;

  ctx.save();
  // Liquid capacity fill
  if (progress > 0.4) {
    const fh = h * Math.max(0.1, Math.min(1, fillLevel)) * progress;
    const fy = yBot - fh;
    ctx.fillStyle = fillLevel > 0.25 ? 'rgba(56, 189, 248, 0.26)' : 'rgba(248, 113, 113, 0.28)';
    ctx.beginPath();
    ctx.moveTo(cx - topW * 0.44, fy);
    ctx.lineTo(cx + topW * 0.44, fy);
    ctx.lineTo(cx + botW / 2, yBot);
    ctx.lineTo(cx - botW / 2, yBot);
    ctx.closePath();
    ctx.fill();
  }

  // Bucket wireframe trapezoid
  Effects.strokeDraw(ctx, (c) => {
    c.moveTo(cx - topW / 2, yTop);
    c.lineTo(cx - botW / 2, yBot);
    c.lineTo(cx + botW / 2, yBot);
    c.lineTo(cx + topW / 2, yTop);
  }, progress, { stroke: '#5CE1E6', lineWidth: 2.6, pathLength: 420 });

  // Gold tokens inside bucket
  if (progress > 0.6) {
    for (let i = 0; i < tokens; i++) {
      const tx = cx - 26 + (i % 3) * 26;
      const ty = yBot - 22 - Math.floor(i / 3) * 24;
      ctx.fillStyle = '#FACC15';
      ctx.beginPath();
      ctx.arc(tx, ty, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (label) {
    Effects.typeText(ctx, label, cx, yBot + 28, progress, {
      font: `600 16px ${FONTS.sans}`,
      color: '#FFFFFF'
    });
  }
  ctx.restore();
}

module.exports = {
  isometricServerStack,
  foldedFileBadge,
  wireframeBrowser,
  wireframeCylinderDb,
  lineArtUser,
  stateMutationCard,
  brokenLinkPlug,
  evolutionTimeline,
  heroMetricSlam,
  comparisonSplitTable,
  swimlaneSequence,
  consistentHashRing,
  bTreeHierarchy,
  networkPacketFrame,
  loadBalancerRouter,
  pubSubTopicBox,
  circuitBreakerSwitch,
  cdnEdgeGlobe,
  rateLimiterBucket
};
