'use strict';

const { FONTS } = require('./theme');

/**
 * Progressive Vector Self-Draw & Kinetic Typography Effects.
 * Replicates After Effects Trim Paths (`strokeDashoffset`) and character reveals.
 */

/**
 * Self-draws any arbitrary canvas path progressively from 0 -> 1.
 * @param {CanvasRenderingContext2D} ctx
 * @param {function} buildPathFn - Function calling ctx.moveTo / lineTo / arc / bezierCurveTo / roundRect
 * @param {number} progress - 0.0 to 1.0
 * @param {object} style - { stroke, lineWidth, fill, fillAfter, pathLength }
 */
function strokeDraw(ctx, buildPathFn, progress = 1, style = {}) {
  if (progress <= 0.005) return;
  const p = Math.min(1, progress);
  const estLen = style.pathLength || 1200;

  ctx.save();
  ctx.beginPath();
  buildPathFn(ctx);

  if (style.fill && p > (style.fillAfter !== undefined ? style.fillAfter : 0.65)) {
    const fillAlpha = Math.min(1, (p - (style.fillAfter || 0.65)) / 0.35);
    ctx.save();
    ctx.globalAlpha *= fillAlpha;
    ctx.fillStyle = style.fill;
    ctx.fill();
    ctx.restore();
  }

  ctx.strokeStyle = style.stroke || '#5CE1E6';
  ctx.lineWidth = style.lineWidth || 2.5;
  ctx.lineCap = style.lineCap || 'round';
  ctx.lineJoin = style.lineJoin || 'round';

  if (p < 0.999) {
    ctx.setLineDash([estLen * p, estLen]);
  }
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

/**
 * Progressive character-by-character typewriter text reveal (matching ByteByteGo label reveals).
 */
function typeText(ctx, text, x, y, progress = 1, style = {}) {
  if (!text || progress <= 0.01) return;
  const count = Math.max(1, Math.ceil(text.length * Math.min(1, progress)));
  const slice = text.slice(0, count);

  ctx.save();
  ctx.fillStyle = style.color || '#FFFFFF';
  ctx.font = style.font || `600 17px ${FONTS.sans}`;
  ctx.textAlign = style.align || 'center';
  ctx.fillText(slice, x, y);
  ctx.restore();
}

/**
 * Animated two-stroke red failure cross-out `✕` (matching ByteByteGo broken link / error state).
 */
function crossOutFailure(ctx, cx, cy, progress = 1, opts = {}) {
  if (progress <= 0.01) return;
  const r = (opts.size || 38) / 2;
  const color = opts.color || '#EF4444';

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = opts.lineWidth || 6;
  ctx.lineCap = 'round';
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;

  // Stroke 1 (0 -> 0.5)
  const p1 = Math.min(1, progress * 2);
  ctx.beginPath();
  ctx.moveTo(cx - r, cy - r);
  ctx.lineTo(cx - r + 2 * r * p1, cy - r + 2 * r * p1);
  ctx.stroke();

  // Stroke 2 (0.5 -> 1.0)
  if (progress > 0.5) {
    const p2 = Math.min(1, (progress - 0.5) * 2);
    ctx.beginPath();
    ctx.moveTo(cx + r, cy - r);
    ctx.lineTo(cx + r - 2 * r * p2, cy - r + 2 * r * p2);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Radial spark burst when an event / error / optimization triggers.
 */
function sparkBurst(ctx, cx, cy, progress, opts = {}) {
  if (progress <= 0.01 || progress >= 0.99) return;
  const rays = opts.rays || 8;
  const maxR = opts.radius || 46;
  const color = opts.color || '#FACC15';

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.globalAlpha *= (1 - progress);

  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * Math.PI * 2;
    const r1 = maxR * 0.35 * progress;
    const r2 = maxR * progress;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
    ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
    ctx.stroke();
  }
  ctx.restore();
}

module.exports = {
  strokeDraw,
  typeText,
  crossOutFailure,
  sparkBurst
};
