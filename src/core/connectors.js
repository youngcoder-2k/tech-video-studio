'use strict';

const { FONTS } = require('./theme');

/**
 * Signature ByteByteGo Connector: Origin dot o- - - -> Clean Arrowhead.
 */
function dashedArrow(ctx, x1, y1, x2, y2, opts = {}) {
  const progress = opts.progress !== undefined ? opts.progress : 1;
  if (progress <= 0.01) return;

  const color = opts.color || '#38BDF8';
  const lw = opts.lineWidth || 3;
  const label = opts.label || '';
  const labelOffset = opts.labelOffset !== undefined ? opts.labelOffset : -14;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lw;

  // Origin dot
  ctx.beginPath();
  ctx.arc(x1, y1, 5, 0, Math.PI * 2);
  ctx.fill();

  const p = Math.min(1, progress);
  const curX = x1 + (x2 - x1) * p;
  const curY = y1 + (y2 - y1) * p;

  ctx.beginPath();
  ctx.setLineDash(opts.dash || [8, 6]);
  ctx.moveTo(x1, y1);
  ctx.lineTo(curX, curY);
  ctx.stroke();
  ctx.setLineDash([]);

  if (p >= 0.94) {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const headlen = 12;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }

  if (label && p > 0.4) {
    ctx.font = `600 15px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.fillText(label, (x1 + x2) / 2, (y1 + y2) / 2 + labelOffset);
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
 * Glowing fiber-optic pointer laser beam (ideal for Memory References, RPC streams, Direct DMA).
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
  ctx.lineWidth = 3.5;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x1, y1, 6, 0, Math.PI * 2);
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
    ctx.arc(x2, y2, 6, 0, Math.PI * 2);
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
 * Dual Request / Response arrows (ideal for HTTP GET/200, gRPC, DB Query/Result).
 */
function bidirectional(ctx, x1, y1, x2, y2, timeSec, opts = {}) {
  const gap = opts.gap || 16;
  const reqColor = opts.reqColor || '#38BDF8';
  const resColor = opts.resColor || '#10B981';
  const reqProgress = opts.reqProgress !== undefined ? opts.reqProgress : 1;
  const resProgress = opts.resProgress !== undefined ? opts.resProgress : 1;

  dashedArrow(ctx, x1, y1 - gap, x2, y2 - gap, {
    progress: reqProgress,
    color: reqColor,
    label: opts.reqLabel || '',
    labelOffset: -12
  });
  if (reqProgress > 0.85) {
    pulseOrb(ctx, x1, y1 - gap, x2, y2 - gap, timeSec, { color: reqColor });
  }

  dashedArrow(ctx, x2, y2 + gap, x1, y1 + gap, {
    progress: resProgress,
    color: resColor,
    label: opts.resLabel || '',
    labelOffset: 24
  });
  if (resProgress > 0.85) {
    pulseOrb(ctx, x2, y2 + gap, x1, y1 + gap, timeSec, { color: resColor, phase: 0.5 });
  }
}

module.exports = {
  dashedArrow,
  pulseOrb,
  laserBeam,
  bidirectional
};
