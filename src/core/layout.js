'use strict';

/**
 * Mathematical Layout & Symmetry Engine.
 * Eliminates off-center pipelines, asymmetric margins, and transform leaks.
 */

/**
 * Centers a multi-stage horizontal pipeline across the canvas width.
 * @param {number[]} widths - Width of each stage in pixels, e.g. [280, 360, 310, 340]
 * @param {object} [opts]
 * @param {number} [opts.gap=110] - Connector gap between stages
 * @param {number} [opts.canvasWidth=1920]
 * @param {number} [opts.centerY=450]
 * @param {number} [opts.height=360]
 * @returns {{ stages: Array<{x:number, y:number, w:number, h:number, cx:number, cy:number, right:number}>, connectors: Array<{x1:number, y1:number, x2:number, y2:number}>, marginX: number }}
 */
function horizontalPipeline(widths, opts = {}) {
  const gap = opts.gap !== undefined ? opts.gap : 110;
  const canvasWidth = opts.canvasWidth || 1920;
  const centerY = opts.centerY || 450;
  const defaultH = opts.height || 360;
  const heights = opts.heights || widths.map(() => defaultH);

  const totalStagesWidth = widths.reduce((sum, w) => sum + w, 0);
  const totalGapsWidth = Math.max(0, widths.length - 1) * gap;
  const totalWidth = totalStagesWidth + totalGapsWidth;
  const marginX = Math.round((canvasWidth - totalWidth) / 2);

  const stages = [];
  const connectors = [];
  let cursorX = marginX;

  for (let i = 0; i < widths.length; i++) {
    const w = widths[i];
    const h = heights[i];
    const x = cursorX;
    const y = Math.round(centerY - h / 2);
    stages.push({
      index: i,
      x,
      y,
      w,
      h,
      cx: Math.round(x + w / 2),
      cy: centerY,
      right: x + w
    });

    if (i < widths.length - 1) {
      connectors.push({
        x1: x + w,
        y1: centerY,
        x2: x + w + gap,
        y2: centerY
      });
    }
    cursorX += w + gap;
  }

  return { stages, connectors, marginX, totalWidth };
}

/**
 * Symmetrical Left vs Right split layout (e.g. Stack vs Heap, Client vs Server).
 */
function splitColumns(leftWidth = 460, rightWidth = 460, opts = {}) {
  const gap = opts.gap !== undefined ? opts.gap : 520;
  const canvasWidth = opts.canvasWidth || 1920;
  const centerY = opts.centerY || 480;
  const height = opts.height || 440;

  const totalWidth = leftWidth + gap + rightWidth;
  const marginX = Math.round((canvasWidth - totalWidth) / 2);
  const y = Math.round(centerY - height / 2);

  const left = {
    x: marginX,
    y,
    w: leftWidth,
    h: height,
    cx: Math.round(marginX + leftWidth / 2),
    cy: centerY,
    right: marginX + leftWidth
  };

  const rightX = marginX + leftWidth + gap;
  const right = {
    x: rightX,
    y,
    w: rightWidth,
    h: height,
    cx: Math.round(rightX + rightWidth / 2),
    cy: centerY,
    right: rightX + rightWidth
  };

  return {
    left,
    right,
    bridge: { x1: left.right, y1: centerY, x2: right.x, y2: centerY },
    marginX
  };
}

/**
 * Calculates vertical Y targets centered around centerY for 1 -> N fan-out trees.
 */
function fanOutTargets(count, opts = {}) {
  const centerY = opts.centerY || 450;
  const spacing = opts.spacing || 150;
  const targetX = opts.targetX || 1300;
  const targetWidth = opts.targetWidth || 320;

  const totalSpan = (count - 1) * spacing;
  const startY = centerY - totalSpan / 2;

  return Array.from({ length: count }, (_, i) => {
    const cy = Math.round(startY + i * spacing);
    return {
      index: i,
      x: targetX,
      cy,
      cx: Math.round(targetX + targetWidth / 2),
      w: targetWidth
    };
  });
}

/**
 * Safe scale/fade wrapper around a pivot point (cx, cy).
 */
function scaleAround(ctx, cx, cy, scale, drawFn, alpha = 1) {
  if (scale <= 0.001 || alpha <= 0.001) return;
  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.translate(-cx, -cy);
  drawFn();
  ctx.restore();
}

module.exports = {
  horizontalPipeline,
  splitColumns,
  fanOutTargets,
  scaleAround
};
