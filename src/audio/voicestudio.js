'use strict';

/**
 * Native Integration with debpalash/VoiceStudio (https://github.com/debpalash/VoiceStudio)
 * + Senior Solutions Architect (Senior SA) Voice Persona & Broadcast Narration Engine.
 *
 * Capabilities:
 * 1. Connects to local/remote VoiceStudio backend (`http://localhost:3900` or `VOICESTUDIO_URL`)
 *    or local `voicestudio` CLI binary.
 * 2. Designs & saves authentic "Senior Solutions Architect" voice profiles via
 *    VoiceStudio's `/design/describe` + `/profiles` (`voicestudio voices design`) or
 *    clones reference audio (`voicestudio voices clone`).
 * 3. Polishes technical system-design scripts so terms like `O(log N)`, `p99`, `epoll`,
 *    `fsync`, `< 100 μs`, `100K+ QPS`, `BGSAVE`, `gRPC` are pronounced naturally like a human Senior SA.
 * 4. Synthesizes scene-synchronized 48kHz stereo narration tracks via VoiceStudio's
 *    `/generate` or `/v1/audio/speech` endpoints, rate-fits each clip into its scene window,
 *    and applies studio condenser EQ + EBU R128 (-14 LUFS) broadcast mastering.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const DEFAULT_VOICESTUDIO_URL = 'http://localhost:3900';

const SENIOR_SA_PERSONAS = {
  'senior-sa': {
    id: 'senior-sa',
    name: 'Senior Solutions Architect',
    language: 'en',
    speed: 1.0,
    description:
      'A calm, authoritative, articulate Senior Solutions Architect in his late 30s explaining distributed systems and cloud architecture. Warm baritone voice, natural conversational pacing, clear studio condenser microphone, subtle emphasis on engineering trade-offs.',
    instruct:
      'Speak like an experienced Senior Solutions Architect walking a fellow engineer through a system design diagram. Calm, confident, conversational, natural breathing pauses, clear emphasis on architectural trade-offs and latency metrics.'
  },
  'staff-engineer': {
    id: 'staff-engineer',
    name: 'Principal Systems Engineer',
    language: 'en',
    speed: 1.02,
    description:
      'A pragmatic Principal / Staff Systems Engineer explaining low-level kernel, database, and memory internals. Crisp mid-low voice, measured technical precision, zero hype, studio acoustic clarity.',
    instruct:
      'Deliver with crisp technical precision and calm authority, like a Staff Engineer explaining kernel and database internals at a whiteboard.'
  },
  'tech-storyteller': {
    id: 'tech-storyteller',
    name: 'ByteByteGo System Design Host',
    language: 'en',
    speed: 1.03,
    description:
      'An engaging, high-retention technical YouTube explainer host. Articulate, warm, dynamic cadence, smooth transitions between architectural components, broadcast narrator quality.',
    instruct:
      'Engaging technical storyteller cadence. Keep the listener hooked while explaining complex architecture clearly and concisely.'
  },
  'vi-senior-sa': {
    id: 'vi-senior-sa',
    name: 'Senior Solutions Architect (Vietnamese)',
    language: 'vi',
    speed: 1.0,
    description:
      'Nam Kiến trúc sư giải pháp cấp cao (Senior Solutions Architect), giọng trầm ấm, điềm tĩnh, tự nhiên như con người đang phân tích kiến trúc hệ thống, phát âm rõ ràng, nhịp độ vừa phải, thu âm phòng thu chuyên nghiệp.',
    instruct:
      'Thuyết minh tự nhiên, điềm tĩnh và sâu sắc như một Senior Solutions Architect đang giải thích kiến trúc hệ thống cho đội ngũ kỹ sư. Nhấn nhá rõ các nút thắt hiệu năng và trade-off.'
  }
};

/**
 * Expands technical symbols and abbreviations so TTS engines pronounce them
 * naturally like a human Senior Solutions Architect.
 */
function polishSeniorSaScript(rawText, lang = 'en') {
  if (!rawText) return '';
  let text = String(rawText).trim();

  if (lang === 'vi') {
    return text
      .replace(/<\s*(\d+)\s*(?:μs|µs|us)\b/gi, 'dưới $1 micro giây')
      .replace(/(\d+)\s*(?:μs|µs|us)\b/gi, '$1 micro giây')
      .replace(/(\d+)\s*ms\b/gi, '$1 mili giây')
      .replace(/(\d+)K\+\s*QPS\b/gi, 'hơn $1 nghìn truy vấn mỗi giây')
      .replace(/\bQPS\b/g, 'truy vấn mỗi giây')
      .replace(/\bO\(1\)/g, 'O 1')
      .replace(/\bO\(log\s*N\)/gi, 'O log N')
      .replace(/\bepoll_wait\(\)/g, 'e-poll wait')
      .replace(/\bepoll\b/gi, 'e-poll')
      .replace(/\bB\+Tree\b/gi, 'B-plus tree')
      .replace(/\bSeq Scan\b/gi, 'quét tuần tự')
      .replace(/\bI\/O\b/gi, 'I-O')
      .replace(/\bfsync\b/gi, 'f-sync')
      .replace(/\bfork\(\)/g, 'hàm fork')
      .replace(/\bBGSAVE\b/g, 'background save')
      .replace(/\bCOW\b/g, 'copy on write')
      .replace(/\s+/g, ' ');
  }

  return text
    .replace(/<\s*(\d+)\s*(?:μs|µs|us)\b/gi, 'under $1 microseconds')
    .replace(/(\d+)\s*(?:μs|µs|us)\b/gi, '$1 microseconds')
    .replace(/(\d+(?:\.\d+)?)\s*ms\b/gi, '$1 milliseconds')
    .replace(/(\d+)K\+\s*QPS\b/gi, 'over $1 thousand queries per second')
    .replace(/(\d+),000\+\s*QPS\b/gi, 'over $1 thousand queries per second')
    .replace(/\bQPS\b/g, 'queries per second')
    .replace(/\bO\(1\)/g, 'O of 1')
    .replace(/\bO\(log\s*N\)/gi, 'O log N')
    .replace(/\bO\(N\)/g, 'O of N')
    .replace(/\bB\+Tree\b/gi, 'B-plus tree')
    .replace(/\bSeq Scan\b/gi, 'sequential scan')
    .replace(/\bEXPLAIN ANALYZE\b/gi, 'explain analyze')
    .replace(/\bCTE\b/g, 'C-T-E')
    .replace(/\bI\/O\b/gi, 'I-O')
    .replace(/\bOLTP\b/gi, 'O-L-T-P')
    .replace(/\bp99\b/gi, 'P ninety-nine')
    .replace(/\bp95\b/gi, 'P ninety-five')
    .replace(/\bepoll_wait\(\)/g, 'e-poll wait')
    .replace(/\bepoll\b/gi, 'e-poll')
    .replace(/\bkqueue\b/gi, 'k-queue')
    .replace(/\bfsync\b/gi, 'f-sync')
    .replace(/\bfork\(\)/g, 'fork')
    .replace(/\bBGSAVE\b/g, 'background save')
    .replace(/\bdump\.rdb\b/gi, 'dump dot R-D-B')
    .replace(/\bappendonly\.aof\b/gi, 'append-only dot A-O-F')
    .replace(/\bZREVRANGEBYSCORE\b/g, 'Z-rev-range-by-score')
    .replace(/\bHSET\b/g, 'H-set')
    .replace(/\bHGET\b/g, 'H-get')
    .replace(/\bINCR\b/g, 'increment')
    .replace(/\bLPUSH\b/g, 'L-push')
    .replace(/\bRPOP\b/g, 'R-pop')
    .replace(/\bgRPC\b/g, 'g-R-P-C')
    .replace(/\bNVMe\b/g, 'N-V-M-e')
    .replace(/\bDRAM\b/g, 'D-RAM')
    .replace(/\s+/g, ' ');
}

function getConnectionConfig(opts = {}) {
  const url = String(opts.url || process.env.VOICESTUDIO_URL || DEFAULT_VOICESTUDIO_URL).replace(/\/+$/, '');
  const apiKey = opts.apiKey || process.env.VOICESTUDIO_API_KEY || '';
  return { url, apiKey };
}

function findVoiceStudioCli() {
  if (process.env.VOICESTUDIO_BIN && fs.existsSync(process.env.VOICESTUDIO_BIN)) {
    return process.env.VOICESTUDIO_BIN;
  }
  const candidates = [
    '/opt/homebrew/bin/voicestudio',
    '/usr/local/bin/voicestudio',
    path.join(os.homedir(), '.local/bin/voicestudio'),
    '/Applications/VoiceStudio.app/Contents/MacOS/voicestudio'
  ];
  return candidates.find((p) => fs.existsSync(p)) || null;
}

function findFfmpegExecutable() {
  if (process.env.FFMPEG_PATH && fs.existsSync(process.env.FFMPEG_PATH)) {
    return process.env.FFMPEG_PATH;
  }
  const candidates = ['/opt/homebrew/bin/ffmpeg', '/usr/local/bin/ffmpeg', '/usr/bin/ffmpeg'];
  return candidates.find((p) => fs.existsSync(p)) || 'ffmpeg';
}

function findFfprobeExecutable() {
  const candidates = ['/opt/homebrew/bin/ffprobe', '/usr/local/bin/ffprobe', '/usr/bin/ffprobe'];
  return candidates.find((p) => fs.existsSync(p)) || 'ffprobe';
}

function getAudioDurationSec(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  try {
    const ffprobe = findFfprobeExecutable();
    const out = execFileSync(ffprobe, [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      filePath
    ], { encoding: 'utf8' }).trim();
    const val = parseFloat(out);
    return Number.isFinite(val) ? val : 0;
  } catch {
    return 0;
  }
}

async function httpJson(url, method = 'GET', payload = null, apiKey = '', timeoutMs = 8000) {
  const headers = { Accept: 'application/json' };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
  if (payload !== null) headers['Content-Type'] = 'application/json';

  const res = await fetch(url, {
    method,
    headers,
    body: payload !== null ? JSON.stringify(payload) : undefined,
    signal: AbortSignal.timeout(timeoutMs)
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    const detail = (data && (data.detail || data.message || data.error)) || `HTTP ${res.status}`;
    const err = new Error(`VoiceStudio API error (${res.status}): ${detail}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

/**
 * Checks whether debpalash/VoiceStudio backend or CLI is available and lists saved voices.
 */
async function checkStatus(opts = {}) {
  const { url, apiKey } = getConnectionConfig(opts);
  const cliPath = findVoiceStudioCli();
  const appInstalled = fs.existsSync('/Applications/VoiceStudio.app');

  try {
    const health = await httpJson(`${url}/health`, 'GET', null, apiKey, 3500);
    let profiles = [];
    try {
      const pList = await httpJson(`${url}/profiles`, 'GET', null, apiKey, 3500);
      if (Array.isArray(pList)) profiles = pList;
    } catch {
      try {
        const vList = await httpJson(`${url}/v1/audio/voices`, 'GET', null, apiKey, 3500);
        if (vList && Array.isArray(vList.voices)) profiles = vList.voices;
      } catch {
        // Ignore secondary voice listing error
      }
    }

    return {
      running: true,
      url,
      version: health.version || 'active',
      cliPath,
      appInstalled,
      profiles,
      personas: Object.keys(SENIOR_SA_PERSONAS)
    };
  } catch (err) {
    return {
      running: false,
      url,
      cliPath,
      appInstalled,
      error: err.message,
      personas: Object.keys(SENIOR_SA_PERSONAS),
      installGuide: {
        macos: 'brew tap debpalash/tap && brew trust --cask debpalash/tap/voicestudio && brew install --cask debpalash/tap/voicestudio',
        oneCommand: 'curl -fsSL https://voicestudio.sh/install | sh',
        docker: 'docker run -p 3900:3900 ghcr.io/debpalash/voicestudio:latest'
      }
    };
  }
}

/**
 * Designs or retrieves a Senior Solutions Architect voice profile in VoiceStudio.
 */
async function ensureSeniorSaProfile(opts = {}) {
  const personaKey = opts.persona || 'senior-sa';
  const persona = SENIOR_SA_PERSONAS[personaKey] || SENIOR_SA_PERSONAS['senior-sa'];
  const targetName = opts.name || persona.name;
  const description = opts.description || persona.description;
  const language = opts.language || persona.language || 'Auto';
  const { url, apiKey } = getConnectionConfig(opts);

  // 1. Check if profile already exists on the running VoiceStudio server
  try {
    const profiles = await httpJson(`${url}/profiles`, 'GET', null, apiKey, 5000);
    if (Array.isArray(profiles)) {
      const existing = profiles.find(
        (p) => p.id === opts.voice || (p.name && p.name.toLowerCase() === targetName.toLowerCase())
      );
      if (existing) {
        return { profileId: existing.id, name: existing.name, created: false, persona };
      }
    }
  } catch {
    // Proceed to design or CLI fallback
  }

  // 2. If VoiceStudio CLI is available, we can invoke `voicestudio voices design`
  const cliPath = findVoiceStudioCli();
  if (cliPath) {
    try {
      const cliArgs = [
        '--json',
        'voices', 'design',
        '--name', targetName,
        '--language', language,
        '--description', description
      ];
      if (opts.engine) cliArgs.push('--engine', opts.engine);
      const out = execFileSync(cliPath, cliArgs, { encoding: 'utf8', timeout: 30000 });
      const parsed = JSON.parse(out);
      if (parsed && parsed.id) {
        return { profileId: parsed.id, name: parsed.name || targetName, created: true, persona };
      }
    } catch {
      // Fall back to direct REST API design
    }
  }

  // 3. Direct REST API: POST /design/describe -> POST /profiles
  const described = await httpJson(`${url}/design/describe`, 'POST', { description }, apiKey, 15000);
  const form = new FormData();
  form.append('name', targetName);
  form.append('language', language);
  form.append('kind', 'design');
  if (opts.engine) form.append('engine', opts.engine);
  if (described && described.attrs) {
    form.append('vd_states', JSON.stringify(described.attrs));
  }
  form.append('instruct', (described && described.instruct) || persona.instruct);

  const headers = {};
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  const res = await fetch(`${url}/profiles`, {
    method: 'POST',
    headers,
    body: form,
    signal: AbortSignal.timeout(20000)
  });

  if (!res.ok) {
    throw new Error(`Failed to create Senior SA voice profile on VoiceStudio (${res.status})`);
  }
  const created = await res.json();
  return {
    profileId: created.id || targetName,
    name: created.name || targetName,
    created: true,
    persona
  };
}

/**
 * Synthesizes a single speech clip using debpalash/VoiceStudio REST API or CLI.
 */
async function synthesizeClipWithVoiceStudio(text, outWavPath, opts = {}) {
  const { url, apiKey } = getConnectionConfig(opts);
  const personaKey = opts.persona || 'senior-sa';
  const persona = SENIOR_SA_PERSONAS[personaKey] || SENIOR_SA_PERSONAS['senior-sa'];
  const polishedText = polishSeniorSaScript(text, opts.lang || persona.language);
  const speed = opts.speed || persona.speed || 1.0;
  const instruct = opts.instruct || persona.instruct;

  // Resolve or design voice profile if not explicitly provided
  let voiceId = opts.voice;
  if (!voiceId) {
    try {
      const ensured = await ensureSeniorSaProfile({ ...opts, persona: personaKey });
      voiceId = ensured.profileId;
    } catch {
      voiceId = 'alloy'; // OpenAI-compatible fallback alias supported by VoiceStudio /v1/audio/speech
    }
  }

  // Try native /generate endpoint first so --instruct delivery directions are honored
  const headers = {};
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  try {
    const form = new FormData();
    form.append('text', polishedText);
    form.append('profile_id', voiceId);
    form.append('speed', String(speed));
    if (instruct) form.append('instruct', instruct);
    if (opts.engine) form.append('engine', opts.engine);
    if (opts.lang) form.append('language', opts.lang);

    const genRes = await fetch(`${url}/generate`, {
      method: 'POST',
      headers,
      body: form,
      signal: AbortSignal.timeout(120000)
    });

    if (genRes.ok) {
      const ct = genRes.headers.get('content-type') || '';
      if (ct.includes('audio/') || ct.includes('octet-stream')) {
        const buf = Buffer.from(await genRes.arrayBuffer());
        fs.writeFileSync(outWavPath, buf);
        return { path: outWavPath, engine: 'voicestudio-native', voiceId };
      }
      if (ct.includes('json')) {
        const data = await genRes.json();
        const audioUrl = data.audio_url || (data.output ? `/audio/${encodeURIComponent(data.output)}` : null);
        if (audioUrl) {
          const dlUrl = audioUrl.startsWith('http') ? audioUrl : `${url}${audioUrl}`;
          const audioRes = await fetch(dlUrl, { headers, signal: AbortSignal.timeout(30000) });
          if (audioRes.ok) {
            fs.writeFileSync(outWavPath, Buffer.from(await audioRes.arrayBuffer()));
            return { path: outWavPath, engine: 'voicestudio-native', voiceId };
          }
        }
      }
    }
  } catch {
    // Fall through to /v1/audio/speech
  }

  // Fallback to VoiceStudio's OpenAI-compatible /v1/audio/speech endpoint
  const speechHeaders = { 'Content-Type': 'application/json', ...headers };
  const speechRes = await fetch(`${url}/v1/audio/speech`, {
    method: 'POST',
    headers: speechHeaders,
    body: JSON.stringify({
      model: opts.model || 'tts-1-hd',
      voice: voiceId,
      input: polishedText,
      speed,
      response_format: 'wav'
    }),
    signal: AbortSignal.timeout(120000)
  });

  if (!speechRes.ok) {
    const errText = await speechRes.text();
    throw new Error(`VoiceStudio /v1/audio/speech returned ${speechRes.status}: ${errText.slice(0, 240)}`);
  }

  const audioBuf = Buffer.from(await speechRes.arrayBuffer());
  if (audioBuf.length < 44 || audioBuf.toString('ascii', 0, 4) === '{"er') {
    throw new Error('VoiceStudio returned non-audio payload');
  }
  fs.writeFileSync(outWavPath, audioBuf);
  return { path: outWavPath, engine: 'voicestudio-v1-speech', voiceId };
}

/**
 * Local macOS / System Neural Fallback when VoiceStudio daemon is not running yet,
 * enhanced with Senior SA Broadcast Condenser EQ & Dynamics Mastering via FFmpeg.
 */
function synthesizeClipLocalFallback(text, outWavPath, opts = {}) {
  const personaKey = opts.persona || 'senior-sa';
  const persona = SENIOR_SA_PERSONAS[personaKey] || SENIOR_SA_PERSONAS['senior-sa'];
  const lang = opts.lang || persona.language || 'en';
  const polishedText = polishSeniorSaScript(text, lang);
  const ffmpeg = findFfmpegExecutable();

  if (process.platform === 'darwin' && fs.existsSync('/usr/bin/say')) {
    const tmpAiff = `${outWavPath}.raw.aiff`;
    const macVoice = lang === 'vi' ? 'Linh' : (opts.macVoice || 'Samantha');
    const rateWpm = lang === 'vi' ? '175' : '172';
    try {
      execFileSync('/usr/bin/say', ['-v', macVoice, '-r', rateWpm, '-o', tmpAiff, polishedText], {
        stdio: 'ignore',
        timeout: 60000
      });
      // Apply Senior SA Studio Condenser EQ (warm low-mid presence + de-harsh + broadcast compressor)
      execFileSync(ffmpeg, [
        '-y',
        '-i', tmpAiff,
        '-af', 'highpass=f=75,equalizer=f=135:t=q:w=1.1:g=3.0,equalizer=f=3400:t=q:w=1.4:g=1.5,acompressor=threshold=-19dB:ratio=2.6:attack=12:release=160',
        '-ar', '48000',
        '-ac', '2',
        '-c:a', 'pcm_s16le',
        outWavPath
      ], { stdio: 'ignore' });
      return { path: outWavPath, engine: `macos-say-mastered (${macVoice})`, voiceId: macVoice };
    } finally {
      if (fs.existsSync(tmpAiff)) fs.unlinkSync(tmpAiff);
    }
  }

  throw new Error(
    'VoiceStudio backend is not running at http://localhost:3900 and no local system TTS fallback was found.'
  );
}

/**
 * Fits a synthesized speech WAV clip into its target scene duration window (`slotSeconds`)
 * and normalizes it to 48kHz stereo PCM WAV.
 */
function fitAndMasterClip(inWavPath, outWavPath, slotSeconds) {
  const ffmpeg = findFfmpegExecutable();
  const actualDur = getAudioDurationSec(inWavPath);
  const filters = [
    'highpass=f=75',
    'equalizer=f=130:t=q:w=1.2:g=2.2',
    'acompressor=threshold=-18dB:ratio=2.5:attack=15:release=180'
  ];

  // If the speech clip is longer than the scene slot, speed it up smoothly (up to 1.28x max)
  if (slotSeconds > 0 && actualDur > slotSeconds) {
    const ratio = Math.min(1.28, Math.max(1.0, actualDur / slotSeconds));
    if (ratio > 1.01) {
      filters.push(`atempo=${ratio.toFixed(3)}`);
    }
  }

  execFileSync(ffmpeg, [
    '-y',
    '-i', inWavPath,
    '-af', filters.join(','),
    '-ar', '48000',
    '-ac', '2',
    '-c:a', 'pcm_s16le',
    outWavPath
  ], { stdio: 'ignore' });

  return getAudioDurationSec(outWavPath);
}

/**
 * Synthesizes a full-length, scene-synchronized 48kHz stereo narration track
 * for a multi-scene video project.
 *
 * @param {Array<{start:number, duration:number, text:string, persona?:string, lang?:string}>} segments
 * @param {number} totalDurationSec
 * @param {string} outWavPath
 * @param {object} opts - { url, persona, voice, lang, allowFallback }
 */
async function synthesizeSceneNarrationTrack(segments, totalDurationSec, outWavPath, opts = {}) {
  const status = await checkStatus(opts);
  const useVoiceStudio = status.running;
  const allowFallback = opts.allowFallback !== false;

  if (!useVoiceStudio && !allowFallback) {
    throw new Error(
      `VoiceStudio backend is not reachable at ${status.url}.\n` +
      `Start VoiceStudio or install it via:\n  ${status.installGuide.macos}`
    );
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'techvid-voicestudio-'));
  const ffmpeg = findFfmpegExecutable();
  const preparedClips = [];
  let activeEngine = 'none';

  try {
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      const text = (seg.text || '').trim();
      if (!text) continue;

      const rawClip = path.join(tmpDir, `seg_${i}_raw.wav`);
      const fitClip = path.join(tmpDir, `seg_${i}_fit.wav`);
      const segOpts = {
        ...opts,
        persona: seg.persona || opts.persona || 'senior-sa',
        lang: seg.lang || opts.lang
      };

      let synthInfo;
      if (useVoiceStudio) {
        synthInfo = await synthesizeClipWithVoiceStudio(text, rawClip, segOpts);
      } else {
        synthInfo = synthesizeClipLocalFallback(text, rawClip, segOpts);
      }
      activeEngine = synthInfo.engine;

      const leadIn = 0.35;
      const slotSeconds = Math.max(1.5, (seg.duration || 15) - leadIn - 0.35);
      const finalDur = fitAndMasterClip(rawClip, fitClip, slotSeconds);

      preparedClips.push({
        path: fitClip,
        startMs: Math.max(0, Math.round(((seg.start || 0) + leadIn) * 1000)),
        durationSec: finalDur
      });
    }

    if (preparedClips.length === 0) {
      throw new Error('No narration or caption segments found in video scenes.');
    }

    // Assemble all scene clips onto a master 48kHz stereo timeline of length totalDurationSec
    const inputs = ['-f', 'lavfi', '-t', String(totalDurationSec), '-i', 'anullsrc=r=48000:cl=stereo'];
    const delayFilters = [];
    const mixLabels = ['[0:a]'];

    preparedClips.forEach((clip, idx) => {
      inputs.push('-i', clip.path);
      const inIdx = idx + 1;
      const lbl = `[a${inIdx}]`;
      delayFilters.push(`[${inIdx}:a]adelay=${clip.startMs}|${clip.startMs}${lbl}`);
      mixLabels.push(lbl);
    });

    const filterComplex = [
      ...delayFilters,
      `${mixLabels.join('')}amix=inputs=${mixLabels.length}:duration=first:dropout_transition=0:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[outa]`
    ].join(';');

    execFileSync(ffmpeg, [
      '-y',
      ...inputs,
      '-filter_complex', filterComplex,
      '-map', '[outa]',
      '-ar', '48000',
      '-ac', '2',
      '-c:a', 'pcm_s16le',
      outWavPath
    ], { stdio: 'ignore' });

    return {
      outWavPath,
      engine: activeEngine,
      voicestudioConnected: useVoiceStudio,
      clipCount: preparedClips.length,
      totalDurationSec
    };
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

module.exports = {
  DEFAULT_VOICESTUDIO_URL,
  SENIOR_SA_PERSONAS,
  polishSeniorSaScript,
  getConnectionConfig,
  checkStatus,
  ensureSeniorSaProfile,
  synthesizeClipWithVoiceStudio,
  synthesizeClipLocalFallback,
  synthesizeSceneNarrationTrack
};
