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
  } else if (type === 'whoosh' || type === 'draw') {
    // Intentionally silent: avoid any harsh white-noise / static "whoosh" sweeps during transitions
    return;
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

/**
 * Generates a warm, studio-subtle Ambient Tech Underscore Pad (-27 dB) + crisp UI micro-pops
 * (zero white-noise whooshes) so technical explainers feel alive and broadcast-polished.
 *
 * @param {string} outWavPath
 * @param {number} durationSec
 * @param {Array<{time:number, type?:string, volume?:number}>} cues
 * @param {object} opts - { bgmGain?: number, includeBgm?: boolean }
 */
function synthesizeAmbientBedAndPops(outWavPath, durationSec, cues = [], opts = {}) {
  const totalSamples = Math.ceil(durationSec * SAMPLE_RATE);
  const left = new Float32Array(totalSamples);
  const right = new Float32Array(totalSamples);
  const includeBgm = opts.includeBgm !== false;
  const bgmGain = opts.bgmGain !== undefined ? opts.bgmGain : 0.034;

  // 1. Warm minimalist lo-fi / tech explainer chord bed (Cmaj9 -> Am9 -> Fmaj9 -> G6)
  if (includeBgm) {
    const chords = [
      [130.81, 196.00, 246.94, 293.66], // C3, G3, B3, D4
      [110.00, 164.81, 196.00, 246.94], // A2, E3, G3, B3
      [87.31,  130.81, 164.81, 196.00], // F2, C3, E3, G3
      [98.00,  146.83, 196.00, 246.94]  // G2, D3, G3, B3
    ];
    const barSec = 4.0;
    const fadeEdge = Math.min(1.5, durationSec * 0.15);

    for (let i = 0; i < totalSamples; i++) {
      const t = i / SAMPLE_RATE;
      const barIdx = Math.floor(t / barSec) % chords.length;
      const barPos = (t % barSec) / barSec;
      const chord = chords[barIdx];

      // Smooth crossfade envelope across each 4-second chord bar
      const barEnv = Math.sin(Math.min(1, barPos * 6) * Math.PI * 0.5) *
        Math.sin(Math.min(1, (1 - barPos) * 6) * Math.PI * 0.5);
      // Gentle breathing LFO (0.25 Hz)
      const breath = 0.82 + 0.18 * Math.sin(2 * Math.PI * 0.25 * t);
      // Global fade in/out
      const edgeEnv = Math.min(1, t / Math.max(0.1, fadeEdge)) *
        Math.min(1, (durationSec - t) / Math.max(0.1, fadeEdge));

      let sumL = 0;
      let sumR = 0;
      for (let n = 0; n < chord.length; n++) {
        const f = chord[n];
        // Slight stereo detune for lush studio warmth
        sumL += Math.sin(2 * Math.PI * f * t) * (n === 0 ? 0.38 : 0.22);
        sumR += Math.sin(2 * Math.PI * (f * 1.0015) * t + n * 0.4) * (n === 0 ? 0.38 : 0.22);
      }

      const env = barEnv * breath * edgeEnv * bgmGain;
      left[i] += sumL * env;
      right[i] += sumR * env;
    }
  }

  // 2. Crisp micro-pop / tick accents synced to visual step reveals (never whoosh)
  for (const cue of cues) {
    const idx = Math.max(0, Math.floor((cue.time || 0) * SAMPLE_RATE));
    if (idx < totalSamples) {
      mixCue(left, right, idx, cue.type || 'pop', cue.volume !== undefined ? cue.volume : 0.15);
    }
  }

  writeWavStereo16(outWavPath, left, right);
  return outWavPath;
}

module.exports = {
  synthesizeSfxTrack,
  synthesizeAmbientBedAndPops
};
