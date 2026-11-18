'use strict';

/**
 * Procedural Broadcast Motion Sound Effects (SFX) Synthesizer (48kHz Stereo WAV).
 * Zero external audio files required! Generates clean, subtle tactile UI/motion cues:
 * - 'pop': Soft marimba/sine pop when a diagram node enters
 * - 'whoosh': Filtered noise sweep when the virtual camera zooms or pans
 * - 'draw': Subtle felt-pen / digital shimmer during vector stroke self-drawing
 * - 'tick': Crisp micro-click for counters / timeline steps
 * - 'success': Warm harmonic major fifth chime for Verified / OK states
 * - 'error': Low damped dual-tone thud for Broken Link / Failure states
 */

const fs = require('fs');

const SAMPLE_RATE = 48000;

function writeWavStereo16(filePath, leftFloat, rightFloat) {
  const numSamples = leftFloat.length;
  const dataBytes = numSamples * 4; // 2 channels * 2 bytes
  const buf = Buffer.alloc(44 + dataBytes);

  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + dataBytes, 4);
  buf.write('WAVE', 8);
  buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16); // PCM chunk size
  buf.writeUInt16LE(1, 20);  // PCM format
  buf.writeUInt16LE(2, 22);  // Stereo
  buf.writeUInt32LE(SAMPLE_RATE, 24);
  buf.writeUInt32LE(SAMPLE_RATE * 4, 28);
  buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(dataBytes, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const l = Math.max(-0.98, Math.min(0.98, leftFloat[i]));
    const r = Math.max(-0.98, Math.min(0.98, rightFloat[i]));
    buf.writeInt16LE(Math.round(l * 32767), offset);
    buf.writeInt16LE(Math.round(r * 32767), offset + 2);
    offset += 4;
  }

  fs.writeFileSync(filePath, buf);
}

function mixCue(left, right, startSample, type, gain = 0.22) {
  const maxLen = left.length;

  if (type === 'pop') {
    const dur = Math.floor(0.09 * SAMPLE_RATE);
    for (let i = 0; i < dur && startSample + i < maxLen; i++) {
      const t = i / SAMPLE_RATE;
      const env = Math.exp(-t * 48) * Math.sin(Math.min(1, t * 400) * Math.PI * 0.5);
      const freq = 320 + 260 * Math.exp(-t * 35);
      const s = Math.sin(2 * Math.PI * freq * t) * env * gain;
      left[startSample + i] += s;
      right[startSample + i] += s;
    }
  } else if (type === 'tick') {
    const dur = Math.floor(0.035 * SAMPLE_RATE);
    for (let i = 0; i < dur && startSample + i < maxLen; i++) {
      const t = i / SAMPLE_RATE;
      const env = Math.exp(-t * 140);
      const s = Math.sin(2 * Math.PI * 1150 * t) * env * (gain * 0.65);
      left[startSample + i] += s;
      right[startSample + i] += s;
    }
  } else if (type === 'whoosh') {
    const dur = Math.floor(0.42 * SAMPLE_RATE);
    let lpL = 0;
    let lpR = 0;
    for (let i = 0; i < dur && startSample + i < maxLen; i++) {
      const u = i / dur;
      const env = Math.sin(Math.PI * u) ** 1.8;
      const alpha = 0.04 + 0.14 * Math.sin(Math.PI * u);
      const nL = (Math.random() * 2 - 1);
      const nR = (Math.random() * 2 - 1);
      lpL += alpha * (nL - lpL);
      lpR += alpha * (nR - lpR);
      const pan = 0.35 + 0.3 * u;
      left[startSample + i] += lpL * env * gain * (1 - pan * 0.4);
      right[startSample + i] += lpR * env * (0.6 + pan * 0.4);
    }
  } else if (type === 'draw') {
    const dur = Math.floor(0.28 * SAMPLE_RATE);
    let state = 0;
    for (let i = 0; i < dur && startSample + i < maxLen; i++) {
      const u = i / dur;
      const env = Math.sin(Math.PI * u);
      state += 0.08 * ((Math.random() * 2 - 1) - state);
      const tone = Math.sin(2 * Math.PI * (520 + 180 * u) * (i / SAMPLE_RATE)) * 0.35;
      const s = (state * 0.5 + tone) * env * (gain * 0.45);
      left[startSample + i] += s;
      right[startSample + i] += s;
    }
  } else if (type === 'success') {
    const dur = Math.floor(0.45 * SAMPLE_RATE);
    for (let i = 0; i < dur && startSample + i < maxLen; i++) {
      const t = i / SAMPLE_RATE;
      const env1 = Math.exp(-t * 9);
      const env2 = t > 0.055 ? Math.exp(-(t - 0.055) * 8) : 0;
      const c5 = Math.sin(2 * Math.PI * 523.25 * t) * env1;
      const g5 = Math.sin(2 * Math.PI * 783.99 * t) * env2;
      const s = (c5 * 0.55 + g5 * 0.65) * (gain * 0.75);
      left[startSample + i] += s * 0.95;
      right[startSample + i] += s * 1.05;
    }
  } else if (type === 'error') {
    const dur = Math.floor(0.32 * SAMPLE_RATE);
    for (let i = 0; i < dur && startSample + i < maxLen; i++) {
      const t = i / SAMPLE_RATE;
      const env = Math.exp(-t * 14);
      const s = (Math.sin(2 * Math.PI * 165 * t) + 0.6 * Math.sin(2 * Math.PI * 155 * t)) * env * (gain * 0.7);
      left[startSample + i] += s;
      right[startSample + i] += s;
    }
  }
}

/**
 * Generates a full-duration stereo WAV file from cue events.
 * @param {string} outWavPath
 * @param {number} durationSec
 * @param {Array<{time:number, type:string, volume?:number}>} cues
 */
function synthesizeSfxTrack(outWavPath, durationSec, cues = []) {
  const totalSamples = Math.ceil(durationSec * SAMPLE_RATE);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);

  for (const cue of cues) {
    const idx = Math.max(0, Math.floor((cue.time || 0) * SAMPLE_RATE));
    if (idx < totalSamples) {
      mixCue(left, right, idx, cue.type || 'pop', cue.volume !== undefined ? cue.volume : 0.20);
    }
  }

  writeWavStereo16(outWavPath, left, right);
  return outWavPath;
}

module.exports = {
  synthesizeSfxTrack
};
