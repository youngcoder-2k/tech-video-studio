'use strict';

/**
 * Cinematic 2D Virtual Camera Engine (ByteByteGo After-Effects Style).
 * Enables Overview -> Smooth Zoom-In to Focus Node -> Pan Across Pipeline -> Reset to Wide.
 */

function createCameraState(width = 1920, height = 1080) {
  return {
    camX: width / 2,
    camY: height / 2,
    camZoom: 1,
    __camWidth: width,
    __camHeight: height
  };
}

/**
 * Adds a smooth camera zoom + pan tween onto a GSAP timeline.
 * @param {object} tl - GSAP timeline
 * @param {object} state - Scene state containing camX, camY, camZoom
 * @param {object} target - { x, y, zoom, duration, ease }
 * @param {number} atTime - Timeline start timestamp
 */
function zoomTo(tl, state, target, atTime) {
  return tl.to(state, {
    camX: target.x !== undefined ? target.x : 960,
    camY: target.y !== undefined ? target.y : 540,
    camZoom: target.zoom !== undefined ? target.zoom : 1.5,
    duration: target.duration !== undefined ? target.duration : 1.1,
    ease: target.ease || 'power3.inOut'
  }, atTime);
}

/**
 * Resets virtual camera smoothly back to full 1920x1080 wide framing.
 */
function reset(tl, state, atTime, duration = 1.0) {
  const w = state.__camWidth || 1920;
  const h = state.__camHeight || 1080;
  return tl.to(state, {
    camX: w / 2,
    camY: h / 2,
    camZoom: 1,
    duration,
    ease: 'power3.inOut'
  }, atTime);
}

/**
 * Applies the virtual camera transform to `ctx` around `(state.camX, state.camY)`.
 * Call before drawing world-space diagram elements; header/takeaway stay screen-space!
 */
function apply(ctx, state, width = 1920, height = 1080) {
  const cx = state.camX !== undefined ? state.camX : width / 2;
  const cy = state.camY !== undefined ? state.camY : height / 2;
  const z = state.camZoom !== undefined ? state.camZoom : 1;

  ctx.save();
  if (Math.abs(z - 1) > 0.0005 || Math.abs(cx - width / 2) > 0.5 || Math.abs(cy - height / 2) > 0.5) {
    ctx.translate(width / 2, height / 2);
    ctx.scale(z, z);
    ctx.translate(-cx, -cy);
  }
}

function restore(ctx) {
  ctx.restore();
}

module.exports = {
  createCameraState,
  zoomTo,
  reset,
  apply,
  restore
};
