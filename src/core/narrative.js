'use strict';

/**
 * Narrative-First Content Architecture & Theory Progression Engine (v3.0.0)
 * Learned and adapted from JuneYaooo/rea-video (`rea_video/narrative.py` & `rea_video/playbook.py`).
 *
 * Core Principle from rea-video:
 * "A remake that only swaps the subject keeps someone else's argument. The narrative line is the
 *  part worth keeping: the order of the steps and what each one is for, to be refilled with the
 *  creator's own architecture, benchmarks, and cases."
 *
 * Enforces the 8 Narrative Roles (`hook`, `context`, `turn`, `info`, `proof`, `payoff`, `mood`, `cta`),
 * maps each role to its strongest ByteByteGo visual style, scaffolds story blueprints, and audits
 * any Blueprint JSON for storytelling retention, visual diversity, and natural speech pacing.
 */

const NARRATIVE_ROLES = {
  hook: {
    code: 'hook',
    labelEn: 'Grab Attention (Hook)',
    labelVi: 'Mở đầu gây tò mò (Hook)',
    guide: 'Open with a sharp paradox, surprising benchmark contrast, or painful production failure in the first 10 seconds.',
    recommendedVisuals: ['versus-gauge', 'comparison-cards', 'pill-chain'],
    idealWords: [15, 22]
  },
  context: {
    code: 'context',
    labelEn: 'Set the Scene (Naive Baseline)',
    labelVi: 'Đặt bối cảnh & Cách làm cũ',
    guide: 'Show the naive or traditional approach first so the viewer feels why the bottleneck exists.',
    recommendedVisuals: ['flat-step-flow', 'comparison-cards', 'dashed-group-stack'],
    idealWords: [16, 22]
  },
  turn: {
    code: 'turn',
    labelEn: 'Architectural Turn (Core Insight)',
    labelVi: 'Bước ngoặt tư duy ("Nhưng...")',
    guide: 'Introduce the counter-intuitive design flip that breaks the bottleneck.',
    recommendedVisuals: ['pill-chain', 'dashed-group-stack', 'zero-copy-dma'],
    idealWords: [16, 22]
  },
  info: {
    code: 'info',
    labelEn: 'Layered Mechanics (Theory Step)',
    labelVi: 'Triển khai lý thuyết từng lớp',
    guide: 'Explain ONE clear architectural mechanism, data structure, or flow step per beat without overcrowding.',
    recommendedVisuals: ['commit-log-stream', 'wireframe-fanout', 'partition-mesh', 'flat-step-flow', 'quorum-triangle'],
    idealWords: [16, 23]
  },
  proof: {
    code: 'proof',
    labelEn: 'Show Evidence (Benchmark / Contrast)',
    labelVi: 'Bằng chứng & Đối chiếu số liệu',
    guide: 'Prove the theory with concrete latency/throughput metrics, before/after gauges, or real production scale.',
    recommendedVisuals: ['versus-gauge', 'comparison-cards', 'pill-chain'],
    idealWords: [15, 22]
  },
  payoff: {
    code: 'payoff',
    labelEn: 'Deliver Conclusion (Golden Rules)',
    labelVi: 'Chốt kiến trúc & Quy tắc vàng',
    guide: 'Synthesize the entire video into an actionable Production Architect Scorecard or memorable mental model.',
    recommendedVisuals: ['scorecard', 'comparison-cards'],
    idealWords: [16, 23]
  },
  mood: {
    code: 'mood',
    labelEn: 'Visual Breather / Transition',
    labelVi: 'Nhịp thở chuyển hồi',
    guide: 'Brief visual reset or hero metric callout before pivoting to a new architectural layer.',
    recommendedVisuals: ['pill-chain', 'versus-gauge'],
    idealWords: [10, 16]
  },
  cta: {
    code: 'cta',
    labelEn: 'Call to Action',
    labelVi: 'Gợi mở chủ đề tiếp theo',
    guide: 'Concise closing takeaway or invitation to explore the next system design deep dive.',
    recommendedVisuals: ['pill-chain', 'scorecard'],
    idealWords: [10, 18]
  }
};

/**
 * Proven ByteByteGo / rea-video Explainer Narrative Arcs.
 */
const EXPLAINER_ARCS = {
  'quick-explainer-60s': {
    name: 'Quick 60s System Design Explainer (6 Beats)',
    beatDurationSec: 10,
    scenes: [
      {
        chapter: '01. The Paradox & Naive Bottleneck',
        backdrop: 'waves',
        beats: [
          { role: 'hook', type: 'versus-gauge' },
          { role: 'context', type: 'flat-step-flow' }
        ]
      },
      {
        chapter: '02. The Architectural Breakthrough',
        backdrop: 'blueprint',
        beats: [
          { role: 'turn', type: 'pill-chain' },
          { role: 'info', type: 'wireframe-fanout' }
        ]
      },
      {
        chapter: '03. Proof & Production Golden Rules',
        backdrop: 'waves',
        beats: [
          { role: 'proof', type: 'comparison-cards' },
          { role: 'payoff', type: 'scorecard' }
        ]
      }
    ]
  },
  'speed-paradox-2min': {
    name: '2-Minute High-Retention Speed Paradox (12 Beats)',
    beatDurationSec: 10,
    scenes: [
      {
        chapter: '01. The Speed Paradox & Core Flip',
        backdrop: 'waves',
        beats: [
          { role: 'hook', type: 'comparison-cards' },
          { role: 'context', type: 'flat-step-flow' },
          { role: 'turn', type: 'commit-log-stream' }
        ]
      },
      {
        chapter: '02. Core Engine Mechanics (Layer 1)',
        backdrop: 'blueprint',
        beats: [
          { role: 'info', type: 'wireframe-fanout' },
          { role: 'info', type: 'dashed-group-stack' },
          { role: 'proof', type: 'versus-gauge' }
        ]
      },
      {
        chapter: '03. Scaling & Fault Tolerance (Layer 2)',
        backdrop: 'spotlight',
        beats: [
          { role: 'info', type: 'partition-mesh' },
          { role: 'info', type: 'quorum-triangle' },
          { role: 'proof', type: 'pill-chain' }
        ]
      },
      {
        chapter: '04. Production Mastery & Golden Rules',
        backdrop: 'waves',
        beats: [
          { role: 'turn', type: 'zero-copy-dma' },
          { role: 'proof', type: 'comparison-cards' },
          { role: 'payoff', type: 'scorecard' }
        ]
      }
    ]
  },
  'deep-dive-3min': {
    name: '3-Minute ByteByteGo Deep Dive (15 Beats)',
    beatDurationSec: 12,
    scenes: [
      {
        chapter: '01. The Hook & Traditional Bottleneck',
        backdrop: 'waves',
        beats: [
          { role: 'hook', type: 'pill-chain' },
          { role: 'context', type: 'wireframe-fanout' },
          { role: 'turn', type: 'flat-step-flow' }
        ]
      },
      {
        chapter: '02. Internal Architecture (Layer 1)',
        backdrop: 'blueprint',
        beats: [
          { role: 'info', type: 'dashed-group-stack' },
          { role: 'info', type: 'comparison-cards' },
          { role: 'proof', type: 'flat-step-flow' }
        ]
      },
      {
        chapter: '03. Execution & Performance Engine (Layer 2)',
        backdrop: 'spotlight',
        beats: [
          { role: 'context', type: 'flat-step-flow' },
          { role: 'turn', type: 'versus-gauge' },
          { role: 'info', type: 'pill-chain' }
        ]
      },
      {
        chapter: '04. Reliability & Scale Under Load (Layer 3)',
        backdrop: 'isometric',
        beats: [
          { role: 'info', type: 'commit-log-stream' },
          { role: 'info', type: 'partition-mesh' },
          { role: 'proof', type: 'comparison-cards' }
        ]
      },
      {
        chapter: '05. Real-World Proof & Production Rules',
        backdrop: 'waves',
        beats: [
          { role: 'info', type: 'dashed-group-stack' },
          { role: 'proof', type: 'versus-gauge' },
          { role: 'payoff', type: 'scorecard' }
        ]
      }
    ]
  }
};

/**
 * Scaffolds a Narrative-First JSON Blueprint following rea-video's 8-role story line.
 */
function scaffoldNarrativeBlueprint(topic = 'How Modern Systems Work', arcKey = 'deep-dive-3min') {
  const arc = EXPLAINER_ARCS[arcKey] || EXPLAINER_ARCS['deep-dive-3min'];
  let beatCounter = 0;

  return {
    title: topic,
    palette: 'byteByteGoTrue',
    fps: 30,
    persona: 'senior-sa',
    narrativeArc: arcKey,
    scenes: arc.scenes.map((sc, scIdx) => ({
      id: `scene-${scIdx + 1}`,
      chapter: sc.chapter,
      backdrop: sc.backdrop,
      beats: sc.beats.map((b) => {
        beatCounter++;
        const roleMeta = NARRATIVE_ROLES[b.role] || NARRATIVE_ROLES.info;
        return {
          role: b.role,
          point: `[Beat ${beatCounter} — ${roleMeta.labelEn}]: ${roleMeta.guide}`,
          type: b.type,
          duration: arc.beatDurationSec,
          narration: `Write 16 to 21 clear words here for ${topic}. Split into two crisp sentences for natural pauses.`,
          takeaway: `${topic} — Key Takeaway #${beatCounter}`,
          tag: b.role.toUpperCase()
        };
      })
    }))
  };
}

/**
 * Audits a Blueprint JSON against rea-video's Content, Narrative Arc, Visual Diversity,
 * and Speech Pacing principles.
 */
function auditBlueprintNarrative(blueprint) {
  const scenes = Array.isArray(blueprint && blueprint.scenes) ? blueprint.scenes : [];
  const allBeats = [];
  let cursor = 0;

  scenes.forEach((sc, scIdx) => {
    (sc.beats || []).forEach((b, bIdx) => {
      const dur = Number(b.duration) || 10;
      const words = String(b.narration || '').trim().split(/\s+/).filter(Boolean).length;
      const sentences = String(b.narration || '').trim().split(/(?<=[.?!])\s+/).filter(Boolean).length;
      const estWpm = dur > 0 ? Math.round((words / Math.max(1, dur - 1.2)) * 60) : 0;

      allBeats.push({
        index: allBeats.length + 1,
        sceneIndex: scIdx + 1,
        beatInScene: bIdx + 1,
        start: cursor,
        end: cursor + dur,
        duration: dur,
        role: (b.role || '').toLowerCase() || (allBeats.length === 0 ? 'hook' : (b.type === 'scorecard' ? 'payoff' : 'info')),
        type: sc.whiteboard ? 'whiteboard' : (b.type || 'icon-flow'),
        isPersistentWhiteboard: Boolean(sc.whiteboard),
        words,
        sentences,
        estWpm,
        point: b.point || b.takeaway || ''
      });
      cursor += dur;
    });
  });

  const warnings = [];
  const rolesPresent = new Set(allBeats.map((b) => b.role));
  let score = 100;

  if (allBeats.length === 0) {
    return { score: 0, totalDurationSec: 0, beatCount: 0, rolesPresent: [], narrativeLine: [], warnings: ['Blueprint contains 0 beats.'] };
  }

  // 1. Check rea-video core story pillars (hook -> context/turn -> info -> proof -> payoff)
  if (allBeats[0].role !== 'hook') {
    warnings.push('Beat #1 should have role "hook" to grab attention in the first 10 seconds.');
    score -= 12;
  }
  if (!rolesPresent.has('proof')) {
    warnings.push('Missing "proof" beat (concrete benchmarks, throughput gauges, or comparison cards).');
    score -= 10;
  }
  if (!rolesPresent.has('payoff')) {
    warnings.push('Missing "payoff" beat (closing synthesis / Production Architect Scorecard).');
    score -= 10;
  }

  // 2. Check Visual Style Variety (never repeat exact same static template on consecutive beats; persistent whiteboard scenes are continuous by design)
  let repeatCount = 0;
  for (let i = 1; i < allBeats.length; i++) {
    if (!allBeats[i].isPersistentWhiteboard && allBeats[i].type === allBeats[i - 1].type) {
      repeatCount++;
      warnings.push(`Visual monotony at Beat #${allBeats[i].index}: "${allBeats[i].type}" repeats immediately after Beat #${allBeats[i - 1].index}.`);
    }
  }
  score -= Math.min(25, repeatCount * 8);

  // 2B. Visual-First Icon Rule & Anti-Overlap Layout Audit for Whiteboard Scenes (v4.1.0)
  scenes.forEach((sc, scIdx) => {
    if (!sc.whiteboard || !Array.isArray(sc.whiteboard.actors)) return;
    const nonGroup = sc.whiteboard.actors.filter((a) => a.kind !== 'group');
    const withIcons = nonGroup.filter((a) => a.icon || (Array.isArray(a.icons) && a.icons.length > 0) || a.kind === 'icon');
    const iconRatio = nonGroup.length ? withIcons.length / nonGroup.length : 1;
    if (nonGroup.length >= 2 && iconRatio < 0.7) {
      warnings.push(`Scene ${scIdx + 1} (${sc.id || scIdx + 1}): Only ${Math.round(iconRatio * 100)}% of whiteboard actors have visual icons/logos (target >= 70% for intuitive ByteByteGo clarity).`);
      score -= 8;
    }

    const byId = new Map(sc.whiteboard.actors.map((a) => [a.id, a]));
    // Check safe top header clearance (y - h/2 >= 215)
    sc.whiteboard.actors.forEach((a) => {
      const h = a.h || (a.kind === 'icon' ? 160 : a.kind === 'pill' ? 76 : 210);
      const topY = (a.y || 540) - h / 2;
      if (topY < 215) {
        warnings.push(`Scene ${scIdx + 1}: Actor "${a.id}" top edge (${Math.round(topY)}px) enters the top header safe zone (< 215px).`);
        score -= 4;
      }
    });

    // Check connected actor clearance (>= 80px edge gap so arrows never squish!)
    const allActions = []
      .concat(Array.isArray(sc.whiteboard.actions) ? sc.whiteboard.actions : [])
      .concat(...(sc.beats || []).map((b) => Array.isArray(b.actions) ? b.actions : []));
    const checkedPairs = new Set();
    allActions.forEach((act) => {
      if ((act.type === 'connect' || act.type === 'packet') && act.from && act.to) {
        const key = `${act.from}->${act.to}`;
        if (checkedPairs.has(key)) return;
        checkedPairs.add(key);
        const a = byId.get(act.from);
        const b = byId.get(act.to);
        if (!a || !b) return;
        const aw = a.w || 340, ah = a.h || 200;
        const bw = b.w || 340, bh = b.h || 200;
        const gapX = Math.abs(b.x - a.x) - (aw + bw) / 2;
        const gapY = Math.abs(b.y - a.y) - (ah + bh) / 2;
        const edgeGap = Math.max(gapX, gapY);
        if (edgeGap < 75) {
          warnings.push(`Scene ${scIdx + 1}: Connected actors "${a.id}" -> "${b.id}" have only ${Math.round(edgeGap)}px clearance (target >= 85px so arrows & packets breathe cleanly).`);
          score -= 4;
        }
      }
    });
  });

  // 3. Check Speech Pacing & Sentence Breathability (avoid babbling or overcrowded beats)
  allBeats.forEach((b) => {
    if (b.words > 26) {
      warnings.push(`Beat #${b.index} has ${b.words} words (too dense for ${b.duration}s; target 16-22 words for clear Steffan pacing).`);
      score -= 5;
    }
    if (b.words > 14 && b.sentences < 2) {
      warnings.push(`Beat #${b.index} is one long run-on sentence (${b.words} words). Split into 2 sentences so automatic 280ms breath pauses trigger.`);
      score -= 3;
    }
  });

  const uniqueTypes = [...new Set(allBeats.map((b) => b.type))];
  const allWhiteboard = allBeats.every((b) => b.isPersistentWhiteboard);
  if (!allWhiteboard && uniqueTypes.length < Math.min(4, allBeats.length)) {
    warnings.push(`Low visual diversity: only ${uniqueTypes.length} visual styles used across ${allBeats.length} beats.`);
    score -= 10;
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    totalDurationSec: cursor,
    beatCount: allBeats.length,
    uniqueVisualStyles: uniqueTypes,
    rolesPresent: [...rolesPresent],
    narrativeLine: allBeats,
    warnings
  };
}

module.exports = {
  NARRATIVE_ROLES,
  EXPLAINER_ARCS,
  scaffoldNarrativeBlueprint,
  auditBlueprintNarrative
};
