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

/**
 * Expanding concentric sonar/radar pulse rings behind a focal component.
 */
function sonarPulse(ctx, cx, cy, timeSec = 0, opts = {}) {
  const color = opts.color || '#38BDF8';
  const rings = opts.rings || 3;
  const minR = opts.minRadius || 36;
  const maxR = opts.maxRadius || 125;
  const speed = opts.speed || 0.7;

  ctx.save();
  ctx.strokeStyle = color;
  for (let i = 0; i < rings; i++) {
    const phase = ((timeSec * speed) + (i / rings)) % 1;
    const r = minR + (maxR - minR) * phase;
    ctx.globalAlpha = (1 - phase) * (opts.alpha || 0.42);
    ctx.lineWidth = 2.4 * (1 - phase * 0.5);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * High-velocity stream of glowing message capsules flying between two coordinates.
 */
function dataStreamParticles(ctx, x1, y1, x2, y2, timeSec = 0, opts = {}) {
  const count = opts.count || 4;
  const color = opts.color || '#34D399';
  const speed = opts.speed || 1.1;
  const angle = Math.atan2(y2 - y1, x2 - x1);

  ctx.save();
  for (let i = 0; i < count; i++) {
    const p = ((timeSec * speed) + (i / count)) % 1;
    const px = x1 + (x2 - x1) * p;
    const py = y1 + (y2 - y1) * p;

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.roundRect(-14, -5, 28, 10, 5);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(-6, -2.5, 12, 5, 2.5);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

/**
 * Animated radial speedometer / throughput gauge dial with glowing needle and live counter.
 */
function liveGaugeArc(ctx, cx, cy, radius = 90, progress = 1, opts = {}) {
  const color = opts.color || '#34D399';
  const trackColor = opts.trackColor || 'rgba(51, 65, 85, 0.55)';
  const fillRatio = Math.max(0, Math.min(1, (opts.valueRatio !== undefined ? opts.valueRatio : 0.88) * progress));
  const startAngle = Math.PI * 0.8;
  const sweepAngle = Math.PI * 1.4;

  ctx.save();
  // Background track arc
  ctx.strokeStyle = trackColor;
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(cx, cy, radius, startAngle, startAngle + sweepAngle);
  ctx.stroke();

  // Active glowing value arc
  if (fillRatio > 0.01) {
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, startAngle + sweepAngle * fillRatio);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // Animated needle
  const needleAngle = startAngle + sweepAngle * fillRatio;
  const nx = cx + Math.cos(needleAngle) * (radius - 20);
  const ny = cy + Math.sin(needleAngle) * (radius - 20);
  ctx.strokeStyle = '#FACC15';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(nx, ny);
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(cx, cy, 8, 0, Math.PI * 2);
  ctx.fill();

  if (opts.label) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `800 26px ${FONTS.mono}`;
    ctx.textAlign = 'center';
    ctx.fillText(opts.label, cx, cy + radius * 0.55);
  }
  if (opts.sub) {
    ctx.fillStyle = color;
    ctx.font = `600 15px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(opts.sub, cx, cy + radius * 0.82);
  }
  ctx.restore();
}

module.exports = {
  strokeDraw,
  typeText,
  crossOutFailure,
  sparkBurst,
  sonarPulse,
  dataStreamParticles,
  liveGaugeArc
};
