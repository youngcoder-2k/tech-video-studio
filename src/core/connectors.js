'use strict';

const { FONTS } = require('./theme');

function drawArrowhead(ctx, x, y, angle, headlen = 12) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x - headlen * Math.cos(angle - Math.PI / 6), y - headlen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x - headlen * Math.cos(angle + Math.PI / 6), y - headlen * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}

/**
 * Crisp Solid ByteByteGo Arrow: Origin dot o──────▶ Clean Arrowhead (like HTTP GET & Linux Boot).
 */
function solidArrow(ctx, x1, y1, x2, y2, opts = {}) {
  const progress = opts.progress !== undefined ? opts.progress : 1;
  if (progress <= 0.01) return;

  const color = opts.color || '#FFFFFF';
  const lw = opts.lineWidth || 2.5;
  const label = opts.label || '';
  const labelOffset = opts.labelOffset !== undefined ? opts.labelOffset : -14;
  const p = Math.min(1, progress);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lw;

  if (opts.originDot !== false) {
    ctx.beginPath();
    ctx.arc(x1, y1, 4.8, 0, Math.PI * 2);
    ctx.fill();
  }

  const curX = x1 + (x2 - x1) * p;
  const curY = y1 + (y2 - y1) * p;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(curX, curY);
  ctx.stroke();

  const angle = Math.atan2(y2 - y1, x2 - x1);
  drawArrowhead(ctx, curX, curY, angle, 11.5);

  if (label && p > 0.35) {
    ctx.font = opts.labelFont || `600 16px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = opts.labelColor || color;
    ctx.fillText(label, (x1 + x2) / 2, (y1 + y2) / 2 + labelOffset);
  }
  ctx.restore();
}

/**
 * Signature Dashed ByteByteGo Arrow: Origin dot o- - - -▶ Clean Arrowhead.
 */
function dashedArrow(ctx, x1, y1, x2, y2, opts = {}) {
  const progress = opts.progress !== undefined ? opts.progress : 1;
  if (progress <= 0.01) return;

  const color = opts.color || '#38BDF8';
  const lw = opts.lineWidth || 2.6;
  const label = opts.label || '';
  const labelOffset = opts.labelOffset !== undefined ? opts.labelOffset : -14;
  const p = Math.min(1, progress);

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lw;

  if (opts.originDot !== false) {
    ctx.beginPath();
    ctx.arc(x1, y1, 4.8, 0, Math.PI * 2);
    ctx.fill();
  }

  const curX = x1 + (x2 - x1) * p;
  const curY = y1 + (y2 - y1) * p;

  ctx.beginPath();
  ctx.setLineDash(opts.dash || [7, 5]);
  ctx.moveTo(x1, y1);
  ctx.lineTo(curX, curY);
  ctx.stroke();
  ctx.setLineDash([]);

  if (p >= 0.92) {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    drawArrowhead(ctx, x2, y2, angle, 11.5);
  }

  if (label && p > 0.4) {
    ctx.font = opts.labelFont || `600 15px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = opts.labelColor || color;
    ctx.fillText(label, (x1 + x2) / 2, (y1 + y2) / 2 + labelOffset);
  }
  ctx.restore();
}

/**
 * Orthogonal Rounded-Corner Elbow Connector: o───┐
 *                                               └───▶
 * Prevents diagonal line crossings in complex architecture diagrams!
 */
function elbowArrow(ctx, points, opts = {}) {
  const progress = opts.progress !== undefined ? opts.progress : 1;
  if (!points || points.length < 2 || progress <= 0.01) return;

  const color = opts.color || '#FFFFFF';
  const lw = opts.lineWidth || 2.5;
  const radius = opts.radius !== undefined ? opts.radius : 12;
  const dashed = Boolean(opts.dashed);

  // Calculate total polyline length
  let totalLen = 0;
  for (let i = 0; i < points.length - 1; i++) {
    totalLen += Math.hypot(points[i + 1][0] - points[i][0], points[i + 1][1] - points[i][1]);
  }

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lw;

  if (opts.originDot !== false) {
    ctx.beginPath();
    ctx.arc(points[0][0], points[0][1], 4.8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length - 1; i++) {
    ctx.arcTo(points[i][0], points[i][1], points[i + 1][0], points[i + 1][1], radius);
  }
  const last = points[points.length - 1];
  ctx.lineTo(last[0], last[1]);

  if (dashed) {
    ctx.setLineDash([7, 5]);
  } else if (progress < 0.999) {
    ctx.setLineDash([totalLen * progress, totalLen]);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  if (progress >= 0.95) {
    const prev = points[points.length - 2];
    const angle = Math.atan2(last[1] - prev[1], last[0] - prev[0]);
    drawArrowhead(ctx, last[0], last[1], angle, 11.5);
  }

  if (opts.label && progress > 0.5) {
    const midIdx = Math.floor((points.length - 1) / 2);
    const mx = (points[midIdx][0] + points[midIdx + 1][0]) / 2;
    const my = (points[midIdx][1] + points[midIdx + 1][1]) / 2;
    ctx.font = `600 14.5px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(opts.label, mx, my - 10);
  }
  ctx.restore();
}

/**
 * Traveling data packet orb along a connector segment.
 */
function pulseOrb(ctx, x1, y1, x2, y2, timeSec, opts = {}) {
  const color = opts.color || '#38BDF8';
  const speed = opts.speed || 1.4;
  const offset = opts.phase || 0;
  const p = ((timeSec * speed) + offset) % 1.0;
  const px = x1 + (x2 - x1) * p;
  const py = y1 + (y2 - y1) * p;

  ctx.save();
  ctx.beginPath();
  ctx.arc(px, py, 7.5, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.38;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(px, py, 3.8, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.globalAlpha = 1.0;
  ctx.fill();
  ctx.restore();
}

/**
 * Glowing fiber-optic pointer laser beam.
 */
function laserBeam(ctx, x1, y1, x2, y2, timeSec, opts = {}) {
  const progress = opts.progress !== undefined ? opts.progress : 1;
  if (progress <= 0.01) return;

  const color = opts.color || '#38BDF8';
  const label = opts.label || '';
  const p = Math.min(1, progress);
  const ex = x1 + (x2 - x1) * p;
  const ey = y1 + (y2 - y1) * p;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3.2;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x1, y1, 5.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.setLineDash([10, 8]);
  ctx.lineDashOffset = -timeSec * 48;
  ctx.moveTo(x1, y1);
  ctx.lineTo(ex, ey);
  ctx.stroke();
  ctx.setLineDash([]);

  if (p >= 0.95) {
    ctx.shadowBlur = 16;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(x2, y2, 5.5, 0, Math.PI * 2);
    ctx.fill();
  }

  if (label && p > 0.5) {
    ctx.shadowBlur = 0;
    ctx.fillStyle = color;
    ctx.font = `bold 15px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(label, (x1 + x2) / 2, (y1 + y2) / 2 - 16);
  }
  ctx.restore();
}

/**
 * Dual Request / Response arrows (supports both ByteByteGo crisp solid white lines and dashed mode).
 */
function bidirectional(ctx, x1, y1, x2, y2, timeSec, opts = {}) {
  const gap = opts.gap || 16;
  const solid = opts.solid !== undefined ? opts.solid : true;
  const reqColor = opts.reqColor || (solid ? '#FFFFFF' : '#38BDF8');
  const resColor = opts.resColor || (solid ? '#FFFFFF' : '#10B981');
  const reqProgress = opts.reqProgress !== undefined ? opts.reqProgress : 1;
  const resProgress = opts.resProgress !== undefined ? opts.resProgress : 1;
  const fn = solid ? solidArrow : dashedArrow;

  fn(ctx, x1, y1 - gap, x2, y2 - gap, {
    progress: reqProgress,
    color: reqColor,
    label: opts.reqLabel || '',
    labelOffset: -12
  });
  if (reqProgress > 0.85 && opts.packets !== false) {
    pulseOrb(ctx, x1, y1 - gap, x2, y2 - gap, timeSec, { color: '#38BDF8' });
  }

  fn(ctx, x2, y2 + gap, x1, y1 + gap, {
    progress: resProgress,
    color: resColor,
    label: opts.resLabel || '',
    labelOffset: 24
  });
  if (resProgress > 0.85 && opts.packets !== false) {
    pulseOrb(ctx, x2, y2 + gap, x1, y1 + gap, timeSec, { color: '#10B981', phase: 0.5 });
  }
}

module.exports = {
  solidArrow,
  dashedArrow,
  elbowArrow,
  pulseOrb,
  laserBeam,
  bidirectional
};
