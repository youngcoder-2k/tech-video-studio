'use strict';

/**
 * Authentic ByteByteGo-Caliber Dark Studio Design System (v2.0)
 * Forensically tuned to #262626 charcoal, two-layer organic corner waves,
 * translucent tinted glass cards, and crisp geometric technical typography.
 */

const PALETTES = {
  byteCharcoal: {
    bg: '#262626',
    blobOuter: '#2E2E2E',
    blobInner: '#353535',
    surface: '#1C1C1C',
    surfaceElevated: '#2A2E37',
    border: '#475569',
    textPrimary: '#FFFFFF',
    textSecondary: '#E2E8F0',
    textMuted: '#9CA3AF'
  },
  charcoal: {
    bg: '#222222',
    blobOuter: '#2A2A2A',
    blobInner: '#313131',
    surface: '#141821',
    surfaceElevated: '#1E293B',
    border: '#334155',
    textPrimary: '#FFFFFF',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8'
  },
  midnight: {
    bg: '#0F172A',
    blobOuter: '#15203B',
    blobInner: '#1E293B',
    surface: '#1E293B',
    surfaceElevated: '#334155',
    border: '#475569',
    textPrimary: '#F8FAFC',
    textSecondary: '#E2E8F0',
    textMuted: '#94A3B8'
  }
};

// Signature ByteByteGo Translucent Glass Tints (rgba fill + high-contrast stroke)
const GLASS_TINTS = {
  teal: {
    fill: 'rgba(24, 128, 138, 0.28)',
    headerBg: '#2A8C96',
    stroke: '#38BDF8',
    highlight: '#5EEAD4'
  },
  olive: {
    fill: 'rgba(168, 152, 48, 0.28)',
    headerBg: '#B8A428',
    stroke: '#EAB308',
    highlight: '#FEF08A'
  },
  plum: {
    fill: 'rgba(132, 68, 122, 0.28)',
    headerBg: '#8A4F80',
    stroke: '#C084FC',
    highlight: '#F5D0FE'
  },
  emerald: {
    fill: 'rgba(18, 132, 98, 0.28)',
    headerBg: '#10B981',
    stroke: '#34D399',
    highlight: '#A7F3D0'
  },
  slate: {
    fill: 'rgba(38, 72, 68, 0.52)',
    headerBg: '#6B7B3A',
    stroke: '#475569',
    highlight: '#FDE047'
  },
  crimson: {
    fill: 'rgba(153, 27, 27, 0.30)',
    headerBg: '#DC2626',
    stroke: '#F87171',
    highlight: '#FCA5A5'
  }
};

const ACCENTS = {
  cyan: { primary: '#0284C7', bright: '#38E8FF', line: '#5CE1E6', dark: '#082F49', soft: '#E0F2FE' },
  emerald: { primary: '#059669', bright: '#10B981', light: '#34D399', dark: '#022C22', mid: '#064E3B', soft: '#A7F3D0' },
  amber: { primary: '#D97706', bright: '#F59E0B', yellow: '#FACC15', dark: '#451A03', mid: '#78350F', soft: '#FEF08A' },
  purple: { primary: '#8A4F80', bright: '#A855F7', dark: '#311E2D', mid: '#701A75', soft: '#F5D0FE' },
  indigo: { primary: '#4F46E5', bright: '#6366F1', dark: '#1E1B4B', mid: '#4338CA', soft: '#C7D2FE' },
  rose: { primary: '#E11D48', bright: '#EF4444', dark: '#450A0A', mid: '#881337', soft: '#FCA5A5' }
};

const FONTS = {
  sans: '"DIN Alternate", "Bahnschrift", "Plus Jakarta Sans", "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
};

/**
 * Draws the studio background with authentic organic bezier waves or atmospheric speedlines.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 * @param {string} paletteName
 * @param {object} [opts] - { backdrop: 'waves'|'speedlines'|'blueprint'|'clean', timeSec: 0 }
 */
function drawBackground(ctx, width = 1920, height = 1080, paletteName = 'byteCharcoal', opts = {}) {
  const p = PALETTES[paletteName] || PALETTES.byteCharcoal;
  const backdrop = opts.backdrop || 'waves';
  const t = opts.timeSec || 0;

  ctx.save();
  ctx.fillStyle = p.bg;
  ctx.fillRect(0, 0, width, height);

  if (backdrop === 'waves') {
    // Authentic ByteByteGo two-layer organic wave silhouette in bottom-right
    ctx.fillStyle = p.blobOuter;
    ctx.beginPath();
    ctx.moveTo(width * 0.56, height);
    ctx.bezierCurveTo(width * 0.58, height * 0.80, width * 0.72, height * 0.82, width * 0.77, height * 0.66);
    ctx.bezierCurveTo(width * 0.83, height * 0.48, width * 0.94, height * 0.52, width, height * 0.62);
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = p.blobInner;
    ctx.beginPath();
    ctx.moveTo(width * 0.73, height);
    ctx.bezierCurveTo(width * 0.76, height * 0.88, width * 0.85, height * 0.76, width * 0.92, height * 0.80);
    ctx.bezierCurveTo(width * 0.96, height * 0.82, width * 0.98, height * 0.78, width, height * 0.76);
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();
  } else if (backdrop === 'speedlines') {
    // Atmospheric high-speed streaks (for Evolution / Performance scenes)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 18; i++) {
      const y = ((i * 63) % (height - 160)) + 100;
      const len = 180 + (i % 5) * 90;
      const speed = 220 + (i % 4) * 80;
      const x = ((t * speed + i * 210) % (width + len)) - len;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + len, y);
      ctx.stroke();
    }
  } else if (backdrop === 'blueprint') {
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.045)';
    ctx.lineWidth = 1;
    const step = 48;
    for (let x = 0; x < width; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.09)';
    for (let x = 0; x < width; x += step * 4) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += step * 4) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
  } else if (backdrop === 'dotMatrix') {
    const grad = ctx.createRadialGradient(width * 0.5, height * 0.5, 80, width * 0.5, height * 0.5, 920);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.06)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    const step = 36;
    for (let x = 36; x < width; x += step) {
      for (let y = 110; y < height - 40; y += step) {
        ctx.fillRect(x, y, 2, 2);
      }
    }
  } else if (backdrop === 'isometric') {
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.045)';
    ctx.lineWidth = 1;
    const step = 64;
    for (let x = -height; x < width + height; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height * 1.4, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x, height);
      ctx.lineTo(x + height * 1.4, 0);
      ctx.stroke();
    }
  } else if (backdrop === 'spotlight') {
    const grad = ctx.createRadialGradient(width * 0.5, height * 0.52, 40, width * 0.5, height * 0.52, 760);
    grad.addColorStop(0, 'rgba(250, 204, 21, 0.075)');
    grad.addColorStop(0.5, 'rgba(16, 185, 129, 0.035)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  } else if (backdrop === 'splitHorizontal') {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
    ctx.fillRect(0, height * 0.52, width, height * 0.48);
  }

  ctx.restore();
}

/**
 * Clean Top Header — Strictly NO third-party watermarks.
 * Includes optional subtle progress indicator pill on top-right.
 */
function drawTopHeader(ctx, title, chapterText = '', options = {}) {
  const width = options.width || 1920;
  const accentColor = options.accentColor || '#38BDF8';
  const marginX = options.marginX || 64;

  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `600 36px ${FONTS.sans}`;
  ctx.textAlign = 'left';
  ctx.fillText(title, marginX, 68);

  if (chapterText) {
    ctx.font = `600 16px ${FONTS.sans}`;
    const textW = ctx.measureText(chapterText).width;
    const pillW = textW + 36;
    const pillH = 34;
    const pillX = width - marginX - pillW;
    const pillY = 40;

    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 17);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = accentColor;
    ctx.textAlign = 'center';
    ctx.fillText(chapterText, pillX + pillW / 2, pillY + 22.5);
  }

  // Optional thin timeline progress bar at very bottom edge
  if (typeof options.progress === 'number' && options.progress > 0) {
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(0, 1076, width, 4);
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 1076, width * Math.min(1, options.progress), 4);
  }
  ctx.restore();
}

/**
 * Authentic ByteByteGo Translucent Glass Container (supports solid or dashed border + self-draw progress).
 */
function drawGlassCard(ctx, x, y, w, h, opts = {}) {
  const tint = GLASS_TINTS[opts.tint || 'teal'] || GLASS_TINTS.teal;
  const radius = opts.radius !== undefined ? opts.radius : 14;
  const dashed = opts.dashed !== undefined ? opts.dashed : false;
  const drawProgress = opts.progress !== undefined ? opts.progress : 1;

  if (drawProgress <= 0.01) return;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, radius);

  if (opts.fill !== false) {
    ctx.save();
    ctx.globalAlpha *= Math.min(1, drawProgress * 1.25);
    ctx.fillStyle = opts.fillColor || tint.fill;
    ctx.fill();
    ctx.restore();
  }

  ctx.strokeStyle = opts.strokeColor || tint.stroke;
  ctx.lineWidth = opts.lineWidth || 2;
  if (dashed) {
    ctx.setLineDash([7, 5]);
  } else if (drawProgress < 0.999) {
    const perim = 2 * (w + h);
    ctx.setLineDash([perim * drawProgress, perim]);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  if (opts.badge) {
    ctx.font = `600 18px ${FONTS.sans}`;
    const bw = Math.max(150, ctx.measureText(opts.badge).width + 44);
    const bh = 38;
    let bx = x + (w - bw) / 2;
    if (opts.badgeSide === 'left') {
      bx = x + Math.min(28, Math.max(12, (w - bw) / 2));
    } else if (opts.badgeSide === 'right') {
      bx = x + w - bw - Math.min(28, Math.max(12, (w - bw) / 2));
    }
    const by = y + (opts.badgeInside ? 18 : -bh / 2);

    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 10);
    ctx.fillStyle = opts.badgeBg || tint.headerBg;
    ctx.fill();

    ctx.fillStyle = opts.badgeTextColor || '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.fillText(opts.badge, bx + bw / 2, by + 25);
  }

  if (opts.subtitle) {
    const sw = w - 44;
    const sh = 36;
    const sx = x + 22;
    const sy = y + (opts.badgeInside ? 68 : 30);

    ctx.beginPath();
    ctx.roundRect(sx, sy, sw, sh, 8);
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    ctx.fill();
    ctx.strokeStyle = opts.strokeColor || tint.stroke;
    ctx.lineWidth = 1.2;
    ctx.setLineDash([5, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = `500 14.5px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(opts.subtitle, sx + sw / 2, sy + 23);
  }

  ctx.restore();
}

/**
 * Concise Bottom Takeaway Callout — Supports multiple visual styles:
 * variant: 'pill' (default) | 'banner' | 'terminal' | 'badge'
 */
function drawTakeawayPill(ctx, text, options = {}) {
  const canvasWidth = options.canvasWidth || 1920;
  const y = options.y || 925;
  const variant = options.variant || 'pill';
  const alpha = options.alpha !== undefined ? options.alpha : 1;

  if (alpha <= 0.01) return;

  ctx.save();
  ctx.globalAlpha *= alpha;

  if (variant === 'banner') {
    const accent = options.border || '#10B981';
    const tag = options.tag || 'KEY INSIGHT';
    ctx.font = `600 18px ${FONTS.sans}`;
    const textW = ctx.measureText(text).width;
    const tagW = 148;
    const w = Math.max(640, Math.min(canvasWidth - 200, textW + tagW + 76));
    const h = 52;
    const x = (canvasWidth - w) / 2;

    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 10);
    ctx.fillStyle = options.bg || 'rgba(15, 23, 42, 0.88)';
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1.6;
    ctx.stroke();

    // Left accent bar + tag box
    ctx.beginPath();
    ctx.roundRect(x, y, tagW, h, [10, 0, 0, 10]);
    ctx.fillStyle = accent;
    ctx.fill();

    ctx.fillStyle = '#090D16';
    ctx.font = `700 14px ${FONTS.mono}`;
    ctx.textAlign = 'center';
    ctx.fillText(tag, x + tagW / 2, y + h / 2 + 5);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `600 18px ${FONTS.sans}`;
    ctx.textAlign = 'left';
    ctx.fillText(text, x + tagW + 24, y + h / 2 + 6);
    ctx.restore();
    return;
  }

  if (variant === 'terminal') {
    const accent = options.border || '#FACC15';
    const prefix = options.tag || '⚡ ARCHITECT RULE //';
    ctx.font = `600 17px ${FONTS.mono}`;
    const fullText = `${prefix}  ${text}`;
    const measured = ctx.measureText(fullText).width;
    const w = Math.max(620, Math.min(canvasWidth - 180, measured + 68));
    const h = 50;
    const x = (canvasWidth - w) / 2;

    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 8);
    ctx.fillStyle = 'rgba(12, 16, 23, 0.92)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.55)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Left glowing stripe
    ctx.fillStyle = accent;
    ctx.fillRect(x, y + 6, 5, h - 12);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#FEF08A';
    ctx.fillText(fullText, x + w / 2, y + h / 2 + 6);
    ctx.restore();
    return;
  }

  const bg = options.bg || 'rgba(2, 132, 199, 0.28)';
  const border = options.border || '#38BDF8';
  ctx.font = `600 19px ${FONTS.sans}`;
  const measured = ctx.measureText(text).width;
  const w = Math.max(500, Math.min(canvasWidth - 240, measured + 88));
  const h = 54;
  const x = (canvasWidth - w) / 2;

  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 27);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.strokeStyle = border;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText(text, x + w / 2, y + h / 2 + 6.5);
  ctx.restore();
}

/**
 * Dims everything outside a spotlight rectangle to guide viewer focus.
 * Supports both drawSpotlightMask(ctx, { x, y, w, h }, strength) and drawSpotlightMask(ctx, width, height, { x, y, rx, ry, alpha }).
 */
function drawSpotlightMask(ctx, arg1, arg2 = 0.65, arg3 = 1920, arg4 = 1080) {
  let focusRect = arg1;
  let strength = arg2;
  let width = arg3;
  let height = arg4;

  if (typeof arg1 === 'number' && typeof arg2 === 'number' && typeof arg3 === 'object' && arg3 !== null) {
    width = arg1;
    height = arg2;
    const spec = arg3;
    strength = spec.alpha !== undefined ? spec.alpha : 0.65;
    const rw = spec.w !== undefined ? spec.w : (spec.rx || 180) * 2;
    const rh = spec.h !== undefined ? spec.h : (spec.ry || 140) * 2;
    focusRect = {
      x: spec.w !== undefined ? spec.x : (spec.x || 960) - rw / 2,
      y: spec.h !== undefined ? spec.y : (spec.y || 540) - rh / 2,
      w: rw,
      h: rh,
      pad: spec.pad
    };
  }

  if (!focusRect || strength <= 0.01) return;
  const pad = focusRect.pad !== undefined ? focusRect.pad : 20;
  const rx = focusRect.x - pad;
  const ry = focusRect.y - pad;
  const rw = focusRect.w + pad * 2;
  const rh = focusRect.h + pad * 2;

  ctx.save();
  ctx.fillStyle = `rgba(18, 18, 18, ${Math.min(0.85, strength)})`;
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.roundRect(rx, ry, rw, rh, 18);
  ctx.fill('evenodd');
  ctx.restore();
}

/**
 * Broadcast Subtitles / Synchronized Voiceover Caption Bar.
 */
function drawCaptionBar(ctx, text, options = {}) {
  if (!text) return;
  const canvasWidth = options.canvasWidth || 1920;
  const y = options.y || 988;
  const alpha = options.alpha !== undefined ? options.alpha : 1;
  if (alpha <= 0.01) return;

  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.font = `500 21px ${FONTS.sans}`;
  const tw = ctx.measureText(text).width + 48;
  const th = 44;
  const tx = (canvasWidth - tw) / 2;

  ctx.beginPath();
  ctx.roundRect(tx, y, tw, th, 10);
  ctx.fillStyle = 'rgba(15, 15, 15, 0.84)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = options.color || '#F8FAFC';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvasWidth / 2, y + 29);
  ctx.restore();
}

/**
 * Animated Broadcast Voiceover Equalizer / Senior SA Narrator Pill.
 */
function drawSpeakerWave(ctx, timeSec = 0, options = {}) {
  const x = options.x !== undefined ? options.x : 64;
  const y = options.y !== undefined ? options.y : 988;
  const label = options.label || 'Senior SA';
  const color = options.color || '#5CE1E6';
  const alpha = options.alpha !== undefined ? options.alpha : 1;
  if (alpha <= 0.01) return;

  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.font = `600 14px ${FONTS.sans}`;
  const textW = ctx.measureText(label).width;
  const pillW = textW + 64;
  const pillH = 38;

  ctx.beginPath();
  ctx.roundRect(x, y, pillW, pillH, 19);
  ctx.fillStyle = 'rgba(18, 24, 32, 0.86)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(92, 225, 230, 0.35)';
  ctx.lineWidth = 1.3;
  ctx.stroke();

  // Animated 5-bar voice waveform
  const barX0 = x + 16;
  const midY = y + pillH / 2;
  ctx.fillStyle = color;
  for (let i = 0; i < 5; i++) {
    const amp = 4 + 9 * Math.abs(Math.sin(timeSec * 7.5 + i * 1.15));
    ctx.beginPath();
    ctx.roundRect(barX0 + i * 5, midY - amp / 2, 3, amp, 1.5);
    ctx.fill();
  }

  ctx.fillStyle = '#E2E8F0';
  ctx.textAlign = 'left';
  ctx.fillText(label, x + 46, y + 24);
  ctx.restore();
}

/**
 * Sequential Beat Stage Manager — Ensures only ONE focal visual act is on screen at any moment!
 * Smoothly glides & fades the active beat in at `startSec`, animates its `progress` (0 -> 1),
 * applies continuous subtle kinetic camera breathing, provides staggered choreography helpers
 * (`stagger`, `pulse`, `countUp`), and cleanly fades out at `endSec`.
 */
function withBeat(ctx, localT, startSec, endSec, drawFn, opts = {}) {
  if (localT < startSec || localT > endSec) return;
  const fadeIn = opts.fadeIn !== undefined ? opts.fadeIn : 0.4;
  const fadeOut = opts.fadeOut !== undefined ? opts.fadeOut : 0.38;
  const drawDur = opts.drawDuration !== undefined ? opts.drawDuration : 1.1;

  const elapsed = localT - startSec;
  const beatSpan = Math.max(0.5, endSec - startSec);
  const remaining = endSec - localT;

  const rawIn = fadeIn > 0 ? Math.min(1, elapsed / fadeIn) : 1;
  const rawOut = (opts.noFadeOut || fadeOut <= 0) ? 1 : Math.min(1, remaining / fadeOut);

  // Smooth cubic ease out
  const easeIn = 1 - ((1 - rawIn) ** 3);
  const easeOut = 1 - ((1 - rawOut) ** 2);
  const alpha = Math.max(0, Math.min(1, Math.min(easeIn, easeOut)));
  if (alpha <= 0.01) return;

  const rawProg = Math.min(1, elapsed / Math.max(0.1, drawDur));
  const progress = 1 - ((1 - rawProg) ** 2.5);
  const offsetY = (1 - easeIn) * (opts.slideY !== undefined ? opts.slideY : 20);

  // Continuous kinetic micro-zoom & float across the beat so the canvas never feels static
  const beatRatio = Math.min(1, elapsed / beatSpan);
  const kineticScale = opts.kineticCamera === false ? 1 : (0.982 + beatRatio * 0.032);
  const kineticFloatY = opts.kineticCamera === false ? 0 : Math.sin(elapsed * 1.6) * 2.5;

  const stagger = (index = 0, delayStep = 0.48, dur = 0.68) => {
    const t = Math.max(0, elapsed - index * delayStep);
    const p = Math.min(1, t / Math.max(0.08, dur));
    return 1 - ((1 - p) ** 2.6);
  };

  const pulse = (speed = 2.6, phase = 0) => 0.5 + 0.5 * Math.sin(elapsed * speed + phase);

  const countUp = (target, dur = 2.0, delay = 0.35) => {
    const t = Math.max(0, elapsed - delay);
    const p = Math.min(1, t / Math.max(0.1, dur));
    const eased = 1 - ((1 - p) ** 3);
    return Math.round(target * eased);
  };

  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.translate(960, 520 + offsetY + kineticFloatY);
  ctx.scale(kineticScale, kineticScale);
  ctx.translate(-960, -520);
  drawFn({ alpha, progress, beatT: elapsed, beatRatio, stagger, pulse, countUp });
  ctx.restore();
}

module.exports = {
  PALETTES,
  GLASS_TINTS,
  ACCENTS,
  FONTS,
  drawBackground,
  drawTopHeader,
  drawGlassCard,
  drawTakeawayPill,
  drawSpotlightMask,
  drawCaptionBar,
  drawSpeakerWave,
  withBeat
};
