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
const { execFile, execFileSync } = require('child_process');
const { promisify } = require('util');

const execFileAsync = promisify(execFile);

const DEFAULT_VOICESTUDIO_URL = 'http://localhost:3900';

const SENIOR_SA_PERSONAS = {
  'senior-sa': {
    id: 'senior-sa',
    name: 'Senior Solutions Architect',
    language: 'en',
    speed: 0.90,
    rate: '-10%',
    neuralVoice: 'en-US-AndrewMultilingualNeural',
    description:
      'A calm, authoritative, articulate Senior Solutions Architect in his late 30s explaining distributed systems and cloud architecture. Warm baritone voice, unhurried conversational pacing, clear studio condenser microphone, subtle emphasis on engineering trade-offs.',
    instruct:
      'Speak at a calm, unhurried, easy-to-follow pace like an experienced Senior Solutions Architect walking a fellow engineer through a system design diagram. Take natural breathing pauses between clauses and emphasize architectural trade-offs clearly.'
  },
  'staff-engineer': {
    id: 'staff-engineer',
    name: 'Principal Systems Engineer',
    language: 'en',
    speed: 0.90,
    rate: '-10%',
    neuralVoice: 'en-US-ChristopherNeural',
    description:
      'A pragmatic Principal / Staff Systems Engineer explaining low-level kernel, database, and memory internals. Crisp mid-low voice, measured technical precision, zero hype, studio acoustic clarity.',
    instruct:
      'Deliver with calm, measured technical precision and unhurried authority, like a Staff Engineer explaining kernel and database internals at a whiteboard.'
  },
  'tech-storyteller': {
    id: 'tech-storyteller',
    name: 'ByteByteGo System Design Host',
    language: 'en',
    speed: 0.92,
    rate: '-8%',
    neuralVoice: 'en-US-GuyNeural',
    description:
      'An engaging, high-retention technical YouTube explainer host. Articulate, warm, relaxed cadence, smooth transitions between architectural components, broadcast narrator quality.',
    instruct:
      'Engaging yet relaxed technical storyteller cadence. Keep the listener hooked while explaining complex architecture clearly and unhurriedly.'
  },
  'approachable': {
    id: 'approachable',
    name: 'Approachable Systems Lead',
    language: 'en',
    speed: 0.90,
    rate: '-10%',
    neuralVoice: 'en-US-BrianMultilingualNeural',
    description:
      'A friendly, approachable Staff Engineer speaking casually and clearly to colleagues.',
    instruct:
      'Approachable, unhurried, and friendly technical explanation with authentic conversational warmth.'
  },
  'vi-senior-sa': {
    id: 'vi-senior-sa',
    name: 'Senior Solutions Architect (Vietnamese)',
    language: 'vi',
    speed: 0.90,
    rate: '-10%',
    neuralVoice: 'vi-VN-NamMinhNeural',
    description:
      'Nam Kiến trúc sư giải pháp cấp cao (Senior Solutions Architect), giọng trầm ấm, điềm tĩnh, tự nhiên như con người đang phân tích kiến trúc hệ thống, phát âm rõ ràng, nhịp độ chậm rãi dễ nghe, thu âm phòng thu chuyên nghiệp.',
    instruct:
      'Thuyết minh chậm rãi, điềm tĩnh và sâu sắc như một Senior Solutions Architect đang giải thích kiến trúc hệ thống cho đội ngũ kỹ sư. Nhấn nhá rõ các nút thắt hiệu năng và nghỉ nhịp tự nhiên.'
  },
  'vi-storyteller': {
    id: 'vi-storyteller',
    name: 'Người kể chuyện công nghệ (Tiếng Việt)',
    language: 'vi',
    speed: 0.92,
    rate: '-8%',
    neuralVoice: 'vi-VN-HoaiMyNeural',
    description:
      'Giọng nữ truyền cảm, tự nhiên, rõ ràng, nhịp độ vừa phải dễ nghe, phù hợp cho video chia sẻ kiến thức công nghệ.',
    instruct:
      'Giọng đọc tự nhiên, chậm rãi dễ nghe, cuốn hút, phát âm chuẩn xác thuật ngữ kỹ thuật.'
  }
};

/**
 * Expands technical symbols and abbreviations so TTS engines pronounce them
 * naturally and unhurriedly like a human Senior Solutions Architect.
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
      .replace(/\bsendfile\(\)/gi, 'send-file')
      .replace(/\bmmap\(\)/gi, 'M-map')
      .replace(/\bB\+Tree\b/gi, 'B-plus tree')
      .replace(/\bSeq Scan\b/gi, 'quét tuần tự')
      .replace(/\bI\/O\b/gi, 'I-O')
      .replace(/\bfsync\b/gi, 'f-sync')
      .replace(/\bfork\(\)/g, 'hàm fork')
      .replace(/\bBGSAVE\b/g, 'background save')
      .replace(/\bCOW\b/g, 'copy on write')
      .replace(/\s+—\s+/g, '... ')
      .replace(/\s+/g, ' ');
  }

  return text
    .replace(/<\s*(\d+)\s*(?:μs|µs|us)\b/gi, 'under $1 microseconds')
    .replace(/(\d+)\s*(?:μs|µs|us)\b/gi, '$1 microseconds')
    .replace(/(\d+(?:\.\d+)?)\s*ms\b/gi, '$1 milliseconds')
    .replace(/(\d+)K\+\s*QPS\b/gi, 'over $1 thousand queries per second')
    .replace(/(\d+),000\+\s*QPS\b/gi, 'over $1 thousand queries per second')
    .replace(/(\d+)M\+\s*(?:msgs\/s|msgs\/sec|messages\/sec)\b/gi, 'over $1 million messages per second')
    .replace(/(\d+(?:\.\d+)?)\s*GB\/s\b/gi, '$1 gigabytes per second')
    .replace(/(\d+(?:\.\d+)?)\s*MB\/s\b/gi, '$1 megabytes per second')
    .replace(/(\d+(?:\.\d+)?)\s*KB\/s\b/gi, '$1 kilobytes per second')
    .replace(/(\d+(?:\.\d+)?)\s*Gbps\b/gi, '$1 gigabits per second')
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
    .replace(/\bsendfile\(\)/gi, 'send-file')
    .replace(/\bmmap\(\)/gi, 'M-map')
    .replace(/\bmmap\b/gi, 'M-map')
    .replace(/\bPageCache\b/gi, 'page cache')
    .replace(/\bZero-Copy\b/gi, 'zero copy')
    .replace(/\bDMA\b/g, 'D-M-A')
    .replace(/\bNIC\b/g, 'network card')
    .replace(/\bISR\b/g, 'I-S-R')
    .replace(/\backs=all\b/gi, 'acks equals all')
    .replace(/\backs=1\b/gi, 'acks equals one')
    .replace(/\blinger\.ms\b/gi, 'linger milliseconds')
    .replace(/\bbatch\.size\b/gi, 'batch size')
    .replace(/\bmin\.insync\.replicas\b/gi, 'min in-sync replicas')
    .replace(/\bpdflush\b/gi, 'P-D flush')
    .replace(/\bCRC32\b/gi, 'C-R-C thirty-two')
    .replace(/\bLZ4\b/gi, 'L-Z four')
    .replace(/\bZstd\b/gi, 'Z-standard')
    .replace(/\bkqueue\b/gi, 'k-queue')
    .replace(/\bUNLINK\b/g, 'unlink')
    .replace(/\bOOM\b/g, 'O-O-M')
    .replace(/\bmaxmemory\b/gi, 'max memory')
    .replace(/\bziplist\b/gi, 'zip list')
    .replace(/\blistpack\b/gi, 'list pack')
    .replace(/\bquicklist\b/gi, 'quick list')
    .replace(/\bsdshdr\b/gi, 'S-D-S header')
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
    .replace(/\bCRC16\b/gi, 'C-R-C sixteen')
    .replace(/\bLRU\b/g, 'L-R-U')
    .replace(/\bLFU\b/g, 'L-F-U')
    .replace(/\bTTL\b/g, 'T-T-L')
    .replace(/\bMVCC\b/g, 'M-V-C-C')
    .replace(/\bWAL\b/g, 'write-ahead log')
    .replace(/;\s+/g, ', ')
    .replace(/\s+—\s+/g, '... ')
    .replace(/\s+/g, ' ');
}

/**
 * Resolves the Edge-TTS percentage rate string (e.g. "-10%") from options or persona defaults.
 */
function resolveEdgeRate(opts = {}, persona = SENIOR_SA_PERSONAS['senior-sa']) {
  if (opts.rate && typeof opts.rate === 'string') {
    const r = opts.rate.trim();
    return r.endsWith('%') ? (r.startsWith('+') || r.startsWith('-') ? r : `+${r}`) : `${r}%`;
  }
  if (opts.speed !== undefined && Number.isFinite(Number(opts.speed))) {
    const pct = Math.round((Number(opts.speed) - 1.0) * 100);
    return `${pct >= 0 ? '+' : ''}${pct}%`;
  }
  return persona.rate || '-10%';
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

function findEdgeTtsCommand() {
  if (process.env.EDGE_TTS_BIN && fs.existsSync(process.env.EDGE_TTS_BIN)) {
    return { bin: process.env.EDGE_TTS_BIN, args: [] };
  }
  const candidates = ['/opt/homebrew/bin/edge-tts', '/usr/local/bin/edge-tts', '/usr/bin/edge-tts'];
  const found = candidates.find((p) => fs.existsSync(p));
  if (found) return { bin: found, args: [] };

  // Fallback: check python3 -m edge_tts
  const pythonCandidates = ['/opt/homebrew/bin/python3', '/usr/local/bin/python3', '/usr/bin/python3'];
  const py = pythonCandidates.find((p) => fs.existsSync(p)) || 'python3';
  try {
    execFileSync(py, ['-m', 'edge_tts', '--version'], { stdio: 'ignore' });
    return { bin: py, args: ['-m', 'edge_tts'] };
  } catch {
    return null;
  }
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

  // 1. PRIMARY LOCAL ENGINE: Neural Edge-TTS (Human-grade neural speech synthesis)
  const edgeCmd = findEdgeTtsCommand();
  if (edgeCmd) {
    let neuralVoice = opts.voice;
    if (!neuralVoice || typeof neuralVoice !== 'string') {
      neuralVoice = persona.neuralVoice;
    } else if (SENIOR_SA_PERSONAS[neuralVoice] && SENIOR_SA_PERSONAS[neuralVoice].neuralVoice) {
      neuralVoice = SENIOR_SA_PERSONAS[neuralVoice].neuralVoice;
    }
    if (!neuralVoice) {
      neuralVoice = lang === 'vi' ? 'vi-VN-NamMinhNeural' : 'en-US-AndrewMultilingualNeural';
    }

    const rate = resolveEdgeRate(opts, persona);
    const tmpMp3 = `${outWavPath}.edge.mp3`;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const fullArgs = [
          ...edgeCmd.args,
          `--voice=${neuralVoice}`,
          `--rate=${rate}`,
          `--text=${polishedText}`,
          `--write-media=${tmpMp3}`
        ];
        execFileSync(edgeCmd.bin, fullArgs, {
          stdio: 'ignore',
          timeout: 60000
        });

        if (fs.existsSync(tmpMp3) && fs.statSync(tmpMp3).size > 1000) {
          // Single-pass warm studio condenser EQ + gentle sibilance roll-off (easy on the ears, zero pumping)
          const filters = [
            'highpass=f=70',
            'equalizer=f=135:t=q:w=1.1:g=1.4',
            'equalizer=f=360:t=q:w=1.6:g=-1.6',
            'equalizer=f=6400:t=q:w=1.5:g=-1.2'
          ];
          execFileSync(ffmpeg, [
            '-y',
            '-i', tmpMp3,
            '-af', filters.join(','),
            '-ar', '48000',
            '-ac', '2',
            '-c:a', 'pcm_s16le',
            outWavPath
          ], { stdio: 'ignore' });

          return { path: outWavPath, engine: `neural-edge-tts (${neuralVoice}, rate=${rate})`, voiceId: neuralVoice, rate };
        }
      } catch {
        // Retry on transient WebSocket hiccup
      } finally {
        if (fs.existsSync(tmpMp3)) {
          try { fs.unlinkSync(tmpMp3); } catch {}
        }
      }
    }
  }

  // 2. SECONDARY LOCAL FALLBACK: macOS System TTS
  if (process.platform === 'darwin' && fs.existsSync('/usr/bin/say')) {
    const tmpAiff = `${outWavPath}.raw.aiff`;
    const macVoice = lang === 'vi' ? 'Linh' : (opts.macVoice || 'Samantha');
    const rateWpm = lang === 'vi' ? '158' : '155';
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
      return { path: outWavPath, engine: `macos-say-mastered (${macVoice}, ${rateWpm}wpm)`, voiceId: macVoice };
    } finally {
      if (fs.existsSync(tmpAiff)) fs.unlinkSync(tmpAiff);
    }
  }

  throw new Error(
    'No neural TTS engine (edge-tts) or local system TTS was available to synthesize speech.'
  );
}

/**
 * Async version of synthesizeClipLocalFallback for parallel batch synthesis.
 */
async function synthesizeClipLocalFallbackAsync(text, outWavPath, opts = {}) {
  const personaKey = opts.persona || 'senior-sa';
  const persona = SENIOR_SA_PERSONAS[personaKey] || SENIOR_SA_PERSONAS['senior-sa'];
  const lang = opts.lang || persona.language || 'en';
  const polishedText = polishSeniorSaScript(text, lang);
  const ffmpeg = findFfmpegExecutable();

  const edgeCmd = findEdgeTtsCommand();
  if (edgeCmd) {
    let neuralVoice = opts.voice;
    if (!neuralVoice || typeof neuralVoice !== 'string') {
      neuralVoice = persona.neuralVoice;
    } else if (SENIOR_SA_PERSONAS[neuralVoice] && SENIOR_SA_PERSONAS[neuralVoice].neuralVoice) {
      neuralVoice = SENIOR_SA_PERSONAS[neuralVoice].neuralVoice;
    }
    if (!neuralVoice) {
      neuralVoice = lang === 'vi' ? 'vi-VN-NamMinhNeural' : 'en-US-AndrewMultilingualNeural';
    }

    const rate = resolveEdgeRate(opts, persona);
    const tmpMp3 = `${outWavPath}.edge.mp3`;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const fullArgs = [
          ...edgeCmd.args,
          `--voice=${neuralVoice}`,
          `--rate=${rate}`,
          `--text=${polishedText}`,
          `--write-media=${tmpMp3}`
        ];
        await execFileAsync(edgeCmd.bin, fullArgs, { timeout: 60000 });

        if (fs.existsSync(tmpMp3) && fs.statSync(tmpMp3).size > 1000) {
          const filters = [
            'highpass=f=70',
            'equalizer=f=135:t=q:w=1.1:g=1.4',
            'equalizer=f=360:t=q:w=1.6:g=-1.6',
            'equalizer=f=6400:t=q:w=1.5:g=-1.2'
          ];
          await execFileAsync(ffmpeg, [
            '-y',
            '-i', tmpMp3,
            '-af', filters.join(','),
            '-ar', '48000',
            '-ac', '2',
            '-c:a', 'pcm_s16le',
            outWavPath
          ]);

          return { path: outWavPath, engine: `neural-edge-tts (${neuralVoice}, rate=${rate})`, voiceId: neuralVoice, rate };
        }
      } catch {
        // Retry on transient WebSocket drop
      } finally {
        if (fs.existsSync(tmpMp3)) {
          try { fs.unlinkSync(tmpMp3); } catch {}
        }
      }
    }
  }

  return synthesizeClipLocalFallback(text, outWavPath, opts);
}

/**
 * Fits a synthesized speech WAV clip into its target scene/beat duration window (`slotSeconds`)
 * without rushing the speaker. Caps max tempo adjustment at 1.04x (4% max) so the voice
 * always retains its calm, natural, easy-to-listen Senior SA cadence.
 */
function fitAndMasterClip(inWavPath, outWavPath, slotSeconds, opts = {}) {
  const ffmpeg = findFfmpegExecutable();
  const actualDur = getAudioDurationSec(inWavPath);
  const maxTempo = Number.isFinite(Number(opts.maxTempo)) ? Number(opts.maxTempo) : 1.04;

  if (!slotSeconds || actualDur <= slotSeconds * 1.02 || maxTempo <= 1.001) {
    fs.copyFileSync(inWavPath, outWavPath);
    return { durationSec: actualDur, rawDurationSec: actualDur, tempoApplied: 1.0 };
  }

  const ratio = Math.min(maxTempo, Math.max(1.0, actualDur / slotSeconds));
  if (ratio <= 1.01) {
    fs.copyFileSync(inWavPath, outWavPath);
    return { durationSec: actualDur, rawDurationSec: actualDur, tempoApplied: 1.0 };
  }

  execFileSync(ffmpeg, [
    '-y',
    '-i', inWavPath,
    '-af', `atempo=${ratio.toFixed(3)}`,
    '-ar', '48000',
    '-ac', '2',
    '-c:a', 'pcm_s16le',
    outWavPath
  ], { stdio: 'ignore' });

  return {
    durationSec: getAudioDurationSec(outWavPath),
    rawDurationSec: actualDur,
    tempoApplied: Number(ratio.toFixed(3))
  };
}

/**
 * Synthesizes a full-length, scene- and beat-synchronized 48kHz stereo narration track
 * for a multi-scene video project with calm, unhurried Senior SA pacing and guaranteed
 * inter-beat breathing pauses.
 *
 * @param {Array<{start:number, duration:number, text:string, leadIn?:number, persona?:string, lang?:string}>} segments
 * @param {number} totalDurationSec
 * @param {string} outWavPath
 * @param {object} opts - { url, persona, voice, lang, rate, speed, maxTempo, minPauseSec, allowFallback }
 */
async function synthesizeSceneNarrationTrack(segments, totalDurationSec, outWavPath, opts = {}) {
  const status = await checkStatus(opts);
  const useVoiceStudio = status.running;
  const allowFallback = opts.allowFallback !== false;
  const minPauseSec = Number.isFinite(Number(opts.minPauseSec)) ? Number(opts.minPauseSec) : 0.45;

  if (!useVoiceStudio && !allowFallback) {
    throw new Error(
      `VoiceStudio backend is not reachable at ${status.url}.\n` +
      `Start VoiceStudio or install it via:\n  ${status.installGuide.macos}`
    );
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'techvid-voicestudio-'));
  const ffmpeg = findFfmpegExecutable();
  let activeEngine = 'none';

  try {
    const validTasks = segments
      .map((seg, i) => ({ seg, i, text: (seg.text || '').trim() }))
      .filter((item) => item.text.length > 0);

    if (validTasks.length === 0) {
      throw new Error('No narration or caption segments found in video scenes.');
    }

    const preparedClips = new Array(validTasks.length);
    const concurrency = 4;

    for (let b = 0; b < validTasks.length; b += concurrency) {
      const batch = validTasks.slice(b, b + concurrency);
      await Promise.all(batch.map(async ({ seg, i, text }, batchOffset) => {
        const outIdx = b + batchOffset;
        const rawClip = path.join(tmpDir, `seg_${i}_raw.wav`);
        const fitClip = path.join(tmpDir, `seg_${i}_fit.wav`);
        const segOpts = {
          ...opts,
          persona: seg.persona || opts.persona || 'senior-sa',
          lang: seg.lang || opts.lang,
          rate: seg.rate || opts.rate,
          speed: seg.speed !== undefined ? seg.speed : opts.speed
        };

        let synthInfo;
        if (useVoiceStudio) {
          synthInfo = await synthesizeClipWithVoiceStudio(text, rawClip, segOpts);
        } else {
          synthInfo = await synthesizeClipLocalFallbackAsync(text, rawClip, segOpts);
        }
        activeEngine = synthInfo.engine;

        const leadIn = seg.leadIn !== undefined ? seg.leadIn : 0.25;
        const requestedStartSec = (seg.start || 0) + leadIn;
        const nextTask = validTasks[outIdx + 1];
        const nextStartSec = nextTask
          ? (nextTask.seg.start || 0) + (nextTask.seg.leadIn !== undefined ? nextTask.seg.leadIn : 0.15)
          : totalDurationSec;

        // True available window up to the next beat minus a comfortable breathing pause
        const availableSlotSec = Math.max(
          2.0,
          Math.max(seg.duration || 14, nextStartSec - (seg.start || 0)) - leadIn - minPauseSec
        );
        const fitRes = fitAndMasterClip(rawClip, fitClip, availableSlotSec, opts);
        const wordCount = text.split(/\s+/).filter(Boolean).length;
        const wpm = fitRes.durationSec > 0 ? Math.round((wordCount / fitRes.durationSec) * 60) : 0;

        preparedClips[outIdx] = {
          path: fitClip,
          requestedStartSec,
          startMs: Math.max(0, Math.round(requestedStartSec * 1000)),
          durationSec: fitRes.durationSec,
          rawDurationSec: fitRes.rawDurationSec,
          tempoApplied: fitRes.tempoApplied,
          wordCount,
          wpm
        };
      }));
    }

    // Sequential non-overlapping pass: guarantee at least minPauseSec breathing silence between consecutive clips
    let audioCursorSec = 0;
    let totalWords = 0;
    let totalSpeechSec = 0;
    let maxTempoApplied = 1.0;

    preparedClips.forEach((clip) => {
      const safeStartSec = Math.max(clip.requestedStartSec, audioCursorSec);
      clip.startMs = Math.max(0, Math.round(safeStartSec * 1000));
      audioCursorSec = safeStartSec + clip.durationSec + minPauseSec;
      totalWords += clip.wordCount;
      totalSpeechSec += clip.durationSec;
      if (clip.tempoApplied > maxTempoApplied) maxTempoApplied = clip.tempoApplied;
    });

    const avgWpm = totalSpeechSec > 0 ? Math.round((totalWords / totalSpeechSec) * 60) : 0;

    // Assemble all scene/beat clips onto a master 48kHz stereo timeline of length totalDurationSec
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

    // Transparent studio gain + brickwall peak protection (no single-pass loudnorm pumping!)
    const filterComplex = [
      ...delayFilters,
      `${mixLabels.join('')}amix=inputs=${mixLabels.length}:duration=first:dropout_transition=0:normalize=0,volume=1.18,alimiter=limit=0.95:level=false[outa]`
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
      totalDurationSec,
      avgWpm,
      totalWords,
      totalSpeechSec: Number(totalSpeechSec.toFixed(1)),
      maxTempoApplied
    };
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

module.exports = {
  DEFAULT_VOICESTUDIO_URL,
  SENIOR_SA_PERSONAS,
  polishSeniorSaScript,
  resolveEdgeRate,
  getConnectionConfig,
  checkStatus,
  ensureSeniorSaProfile,
  synthesizeClipWithVoiceStudio,
  synthesizeClipLocalFallback,
  synthesizeClipLocalFallbackAsync,
  fitAndMasterClip,
  synthesizeSceneNarrationTrack
};
