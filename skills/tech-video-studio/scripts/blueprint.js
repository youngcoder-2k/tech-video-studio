'use strict';

/**
 * Declarative ByteByteGo Blueprint Compiler (v2.8.0)
 *
 * Allows users and AI agents to generate full 1080p Kinetic ByteByteGo technical explainer videos
 * from a clean, high-level JSON Blueprint — with zero raw Canvas boilerplate.
 *
 * Visual defaults are calibrated directly to real ByteByteGo videos measured via `rea-video`:
 * - Ground Colour: `#232323` (`byteByteGoTrue`)
 * - Drawn Coverage: `6% - 12%` (`88% - 94%` clean negative space)
 * - Staggered Kinetic Micro-Beats every ~2.5-3.2s + Continuous Comet Streams & Sonar Ripples
 * - Tight Senior SA Narration Cadence (`rate=-10%`, `avgGap ~0.28s`, `showCaptions: false`, zero whoosh SFX)
 */

const fs = require('fs');
const path = require('path');

/**
 * Returns a starter declarative JSON Blueprint that users can customize and render immediately.
 */
function createStarterBlueprint(title = 'Why Modern Distributed Systems Scale') {
  return {
    title,
    palette: 'byteByteGoTrue',
    fps: 30,
    persona: 'senior-sa',
    scenes: [
      {
        id: 'scene-1-bottleneck-vs-fast',
        chapter: '01. Bottleneck vs High-Throughput Architecture',
        backdrop: 'dotMatrix',
        beats: [
          {
            type: 'versus-gauge',
            duration: 10,
            narration: 'Why do high-throughput streaming engines outperform traditional queues? The secret is replacing random disk seeks with sequential append-only writes.',
            left: { icon: 'hardDiskPlatter', tag: 'RANDOM SEEK ❌', title: 'Scattered Disk I/O', value: 100, unit: 'KB/s', color: '#EF4444' },
            center: { icon: 'rocketBoost', value: 6000, label: 'x FASTER', color: '#FACC15' },
            right: { value: 600, unit: 'MB/s', sub: 'Sequential Stream ✔', valueRatio: 0.94, color: '#34D399' },
            takeaway: 'Sequential Disk Writes Are Up to 6,000x Faster Than Random Disk Seeks',
            tag: '6,000x SPEEDUP'
          },
          {
            type: 'icon-flow',
            duration: 10,
            narration: 'Instead of copying bytes across user space and kernel space, zero-copy transfers stream directly from kernel page cache to the network card.',
            nodes: [
              { icon: 'ramChip', tag: 'OS PAGECACHE', title: 'Kernel RAM Buffer', sub: 'sendfile() Syscall', color: '#FACC15' },
              { icon: 'networkCardNic', tag: '10GbE NIC ✔', title: 'Direct DMA Stream', sub: '0 CPU Data Copies', color: '#34D399' }
            ],
            arrowLabel: 'Direct Memory Access (0 CPU Cycles)',
            arrowColor: '#34D399',
            takeaway: 'Zero-Copy DMA Bypasses User Space to Saturate 10+ Gbps Network Links',
            tag: 'ZERO-COPY DMA'
          }
        ]
      }
    ]
  };
}

/**
 * Compiles a Declarative JSON Blueprint into a standalone, offline-ready HTML5 Canvas file
 * powered by `tech-video-studio.bundle.js`.
 */
function compileBlueprintToHtml(blueprint, opts = {}) {
  const bundleSrc = opts.bundleSrc || './tech-video-studio.bundle.js';
  const title = blueprint.title || 'Technical Architecture Explainer';
  const palette = blueprint.palette || 'byteByteGoTrue';
  const fps = blueprint.fps || 30;
  const serialized = JSON.stringify(blueprint, null, 2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title.replace(/</g, '&lt;')}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #232323; width: 1920px; height: 1080px; overflow: hidden; }
    #canvas { display: block; width: 1920px; height: 1080px; }
  </style>
  <script src="${bundleSrc}"></script>
</head>
<body>
  <canvas id="canvas" width="1920" height="1080"></canvas>
  <script>
    const { Theme, Effects, Connectors, Icons, Illustrations, createVideo } = window.TechVideoStudio;
    const BLUEPRINT = ${serialized};

    function renderBeatBody(ctx, beat, helpers, t) {
      const { stagger, countUp } = helpers;
      const type = beat.type || 'icon-flow';

      if (type === 'versus-gauge') {
        const p1 = stagger(0, 0.45, 0.7);
        const p2 = stagger(1, 0.5, 0.7);
        const p3 = stagger(2, 0.55, 0.75);
        const p4 = stagger(3, 0.6, 0.6);

        const L = beat.left || {};
        Icons.drawBadge(ctx, L.icon || 'hardDiskPlatter', 460, 435, 130, {
          color: L.color || '#EF4444',
          tag: L.tag || 'BOTTLENECK ❌',
          title: L.title || 'Slow Path',
          sub: L.value !== undefined ? \`\${countUp(L.value, 1.5, 0.2)} \${L.unit || ''}\`.trim() : (L.sub || ''),
          progress: p1,
          timeSec: t
        });

        const C = beat.center || {};
        if (p2 > 0.05) {
          ctx.save();
          ctx.globalAlpha *= p2;
          Effects.sonarPulse(ctx, 960, 430, t, { color: C.color || '#FACC15', minRadius: 35, maxRadius: 115 });
          Icons.draw(ctx, C.icon || 'rocketBoost', 960, 410, 96, { glowColor: C.color || '#FACC15', timeSec: t });
          ctx.fillStyle = '#FEF08A';
          ctx.font = \`900 30px \${Theme.FONTS.mono}\`;
          ctx.textAlign = 'center';
          const cText = C.value !== undefined ? \`\${countUp(C.value, 1.8, 0.5)}\${C.label || 'x FASTER'}\` : (C.label || 'VS');
          ctx.fillText(cText, 960, 515);
          ctx.restore();
        }

        const R = beat.right || {};
        if (p3 > 0.05) {
          ctx.save();
          ctx.globalAlpha *= p3;
          Effects.sonarPulse(ctx, 1460, 425, t, { color: R.color || '#34D399', minRadius: 55, maxRadius: 150 });
          Effects.liveGaugeArc(ctx, 1460, 430, 118, p3, {
            color: R.color || '#34D399',
            valueRatio: R.valueRatio !== undefined ? R.valueRatio : 0.92,
            label: R.value !== undefined ? \`\${countUp(R.value, 1.8, 0.7)} \${R.unit || ''}\`.trim() : (R.label || 'FAST'),
            sub: R.sub || 'Optimized Path ✔'
          });
          ctx.restore();
        }

        if (beat.takeaway && p4 > 0.05) {
          Theme.drawTakeawayPill(ctx, beat.takeaway, {
            variant: beat.takeawayVariant || 'banner',
            tag: beat.tag || 'KEY INSIGHT',
            border: R.color || '#34D399',
            alpha: p4
          });
        }
        return;
      }

      if (type === 'commit-log-stream') {
        const p1 = stagger(0, 0.4, 0.65);
        const p2 = stagger(1, 0.5, 0.75);
        const p3 = stagger(2, 0.65, 0.6);
        const src = beat.source || {};

        Icons.drawBadge(ctx, src.icon || 'lightningBolt', 350, 470, 115, {
          color: src.color || '#FACC15',
          tag: src.tag || 'EVENT STREAM',
          title: src.title || 'Incoming Events',
          sub: src.sub || 'O(1) Append',
          progress: p1,
          timeSec: t
        });

        if (p2 > 0.2) {
          Connectors.flowArrow(ctx, 460, 470, 660, 470, t, {
            color: src.color || '#FACC15',
            lineWidth: 3,
            label: beat.arrowLabel || 'O(1) Append',
            orbs: 3
          });
          Effects.dataStreamParticles(ctx, 470, 470, 650, 470, t, { color: src.color || '#FACC15', count: 3, speed: 1.4 });
        }

        Illustrations.byteArrayTape(ctx, 680, 415, 1020, 110, {
          title: beat.tapeTitle || 'Immutable Commit Log',
          progress: p2,
          cells: beat.cells
        });

        if (beat.takeaway && p3 > 0.05) {
          Theme.drawTakeawayPill(ctx, beat.takeaway, {
            variant: 'banner',
            tag: beat.tag || 'COMMIT LOG',
            border: '#FACC15',
            alpha: p3
          });
        }
        return;
      }

      if (type === 'zero-copy-dma') {
        const p1 = stagger(0, 0.35, 0.65);
        const p2 = stagger(1, 0.5, 0.7);
        const p3 = stagger(2, 0.65, 0.6);

        if (p1 > 0.1) {
          ctx.save();
          ctx.globalAlpha *= p1 * 0.78;
          ctx.beginPath();
          ctx.roundRect(560, 195, 800, 64, 32);
          ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
          ctx.fill();
          ctx.strokeStyle = '#34D399';
          ctx.lineWidth = 2;
          ctx.setLineDash([8, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = '#6EE7B7';
          ctx.font = \`800 18px \${Theme.FONTS.mono}\`;
          ctx.textAlign = 'center';
          ctx.fillText(beat.bypassBanner || '▲ USER-SPACE BYPASSED — ZERO CPU DATA COPIES ✔', 960, 234);
          ctx.restore();
        }

        const L = beat.left || {};
        const R = beat.right || {};
        Icons.drawBadge(ctx, L.icon || 'ramChip', 480, 500, 135, {
          color: L.color || '#FACC15',
          tag: L.tag || 'KERNEL PAGECACHE',
          title: L.title || 'OS RAM Buffer',
          sub: L.sub || 'sendfile() Syscall',
          progress: p1,
          timeSec: t
        });

        if (p2 > 0.05) {
          Connectors.flowArrow(ctx, 645, 500, 1275, 500, t, {
            progress: p2,
            color: '#34D399',
            lineWidth: 4,
            label: beat.arrowLabel || 'Direct Memory Access (DMA — 0 CPU)',
            orbs: 4,
            speed: 1.6
          });
          Effects.dataStreamParticles(ctx, 660, 500, 1260, 500, t, { color: '#34D399', count: 5, speed: 1.5 });
        }

        Icons.drawBadge(ctx, R.icon || 'networkCardNic', 1440, 500, 135, {
          color: R.color || '#34D399',
          tag: R.tag || 'NIC TX BUFFER ✔',
          title: R.title || '10+ Gbps Wire Speed',
          sub: R.sub || 'Direct Hardware Transfer',
          progress: p2,
          timeSec: t
        });

        if (beat.takeaway && p3 > 0.05) {
          Theme.drawTakeawayPill(ctx, beat.takeaway, {
            variant: 'banner',
            tag: beat.tag || 'ZERO-COPY DMA',
            border: '#34D399',
            alpha: p3
          });
        }
        return;
      }

      if (type === 'batch-flow') {
        const p1 = stagger(0, 0.4, 0.65);
        const p2 = stagger(1, 0.5, 0.7);
        const p3 = stagger(2, 0.6, 0.6);

        Illustrations.pubSubTopicBox(ctx, 220, 400, 620, 150, {
          title: beat.batchTitle || 'RecordAccumulator (64KB Batch)',
          tint: beat.tint || 'teal',
          offsets: beat.offsets || ['Msg #1', 'Msg #2', 'Msg #3', 'Msg #4', 'READY ⚡'],
          activeSlot: (beat.offsets ? beat.offsets.length - 1 : 4),
          progress: p1
        });

        if (p2 > 0.05) {
          Connectors.flowArrow(ctx, 860, 475, 1240, 475, t, {
            progress: p2,
            color: '#34D399',
            lineWidth: 3.6,
            label: beat.arrowLabel || '1 Single Batch RPC',
            orbs: 3
          });
          Effects.dataStreamParticles(ctx, 870, 475, 1230, 475, t, { color: '#38BDF8', count: 3, speed: 1.3 });
        }

        const dst = beat.target || {};
        Icons.drawBadge(ctx, dst.icon || 'kafkaLogo', 1430, 475, 135, {
          color: dst.color || '#34D399',
          tag: dst.tag || 'BROKER ✔',
          title: dst.title || '1M+ Events/sec',
          sub: dst.sub || 'Single Sequential Append',
          progress: p2,
          timeSec: t
        });

        if (beat.takeaway && p3 > 0.05) {
          Theme.drawTakeawayPill(ctx, beat.takeaway, {
            variant: 'banner',
            tag: beat.tag || 'BATCHING',
            border: '#38BDF8',
            alpha: p3
          });
        }
        return;
      }

      if (type === 'partition-mesh') {
        const p1 = stagger(0, 0.35, 0.8);
        const p2 = stagger(1, 0.65, 0.6);
        Illustrations.partitionConsumerMesh(ctx, 220, 225, 1480, 530, {
          progress: p1,
          timeSec: t,
          partitions: beat.partitions
        });
        if (beat.takeaway && p2 > 0.05) {
          Theme.drawTakeawayPill(ctx, beat.takeaway, { variant: 'pill', border: '#38BDF8', alpha: p2 });
        }
        return;
      }

      if (type === 'quorum-triangle') {
        const p1 = stagger(0, 0.35, 0.75);
        const p2 = stagger(1, 0.65, 0.6);
        Effects.sonarPulse(ctx, 960, 465, t, { color: '#FACC15', minRadius: 45, maxRadius: 195 });
        Illustrations.quorumTriangleMesh(ctx, 960, 470, {
          radius: 215,
          progress: p1,
          timeSec: t,
          nodes: beat.nodes
        });
        if (beat.takeaway && p2 > 0.05) {
          Theme.drawTakeawayPill(ctx, beat.takeaway, { variant: 'pill', border: '#34D399', alpha: p2 });
        }
        return;
      }

      if (type === 'scorecard') {
        const p1 = stagger(0, 0.35, 0.85);
        const p2 = stagger(1, 0.65, 0.6);
        Illustrations.scorecardMatrix(ctx, 360, 230, 1200, 580, {
          progress: p1,
          items: beat.items
        });
        if (beat.takeaway && p2 > 0.05) {
          Theme.drawTakeawayPill(ctx, beat.takeaway, { variant: 'terminal', alpha: p2 });
        }
        return;
      }

      // Default: 'icon-flow' (2 or 3 large animated icon medallions connected by glowing comet streams)
      const nodes = Array.isArray(beat.nodes) && beat.nodes.length ? beat.nodes : [
        { icon: 'cpuSilicon', tag: 'SOURCE', title: 'Input Stage', color: '#38BDF8' },
        { icon: 'checkShield', tag: 'TARGET', title: 'Output Stage', color: '#34D399' }
      ];
      const count = Math.min(3, nodes.length);
      const xs = count === 2 ? [500, 1420] : [380, 960, 1540];
      const size = count === 2 ? 132 : 120;

      nodes.slice(0, count).forEach((node, idx) => {
        const pn = stagger(idx, 0.42, 0.65);
        Icons.drawBadge(ctx, node.icon || 'cpuSilicon', xs[idx], 455, size, {
          color: node.color || '#38BDF8',
          tag: node.tag,
          title: node.title,
          sub: node.sub,
          progress: pn,
          timeSec: t
        });
        if (node.crossOut && pn > 0.7) {
          Effects.crossOutFailure(ctx, xs[idx], 455, (pn - 0.7) / 0.3, { size: 92 });
        }
        if (idx < count - 1) {
          const pa = stagger(idx + 1, 0.45, 0.65);
          const lbl = Array.isArray(beat.arrowLabels) ? beat.arrowLabels[idx] : (beat.arrowLabel || '');
          const col = Array.isArray(beat.arrowColors) ? beat.arrowColors[idx] : (beat.arrowColor || node.color || '#34D399');
          Connectors.flowArrow(ctx, xs[idx] + size + 16, 455, xs[idx + 1] - size - 16, 455, t, {
            progress: pa,
            color: col,
            lineWidth: 3.2,
            label: lbl,
            orbs: 3
          });
        }
      });

      const pBanner = stagger(count, 0.5, 0.6);
      if (beat.takeaway && pBanner > 0.05) {
        Theme.drawTakeawayPill(ctx, beat.takeaway, {
          variant: beat.takeawayVariant || 'banner',
          tag: beat.tag || 'KEY INSIGHT',
          border: beat.border || '#34D399',
          alpha: pBanner
        });
      }
    }

    const compiledScenes = (BLUEPRINT.scenes || []).map((sc, scIdx) => {
      const beats = Array.isArray(sc.beats) ? sc.beats : [];
      let cursor = 0;
      const timedBeats = beats.map((b) => {
        const dur = b.duration || 10;
        const entry = { ...b, startSec: cursor, endSec: cursor + dur };
        cursor += dur;
        return entry;
      });
      const totalSceneDur = cursor || sc.duration || 20;

      return {
        id: sc.id || \`scene-\${scIdx + 1}\`,
        chapter: sc.chapter || \`0\${scIdx + 1}. Section \${scIdx + 1}\`,
        duration: totalSceneDur,
        qaTime: Math.min(totalSceneDur - 1, 4.5),
        backdrop: sc.backdrop || 'dotMatrix',
        transition: sc.transition || 'fade',
        sfx: [],
        captions: timedBeats
          .filter((b) => b.narration && b.narration.trim())
          .map((b) => ({
            start: Number((b.startSec + 0.1).toFixed(2)),
            end: Number((b.endSec - 0.15).toFixed(2)),
            text: b.narration.trim()
          })),
        render(ctx, { localT, t }) {
          timedBeats.forEach((b, bIdx) => {
            Theme.withBeat(ctx, localT, b.startSec, b.endSec, (helpers) => {
              renderBeatBody(ctx, b, helpers, t);
            }, { noFadeOut: bIdx === timedBeats.length - 1 });
          });
        }
      };
    });

    createVideo({
      title: BLUEPRINT.title || 'Technical Architecture Explainer',
      palette: BLUEPRINT.palette || 'byteByteGoTrue',
      fps: BLUEPRINT.fps || 30,
      persona: BLUEPRINT.persona || 'senior-sa',
      showCaptions: false,
      scenes: compiledScenes
    });
  </script>
</body>
</html>
`;
}

function writeBlueprintHtml(blueprintPath, outHtmlPath, opts = {}) {
  const raw = JSON.parse(fs.readFileSync(blueprintPath, 'utf8'));
  const html = compileBlueprintToHtml(raw, opts);
  fs.mkdirSync(path.dirname(outHtmlPath), { recursive: true });
  fs.writeFileSync(outHtmlPath, html, 'utf8');
  return { blueprint: raw, outHtmlPath };
}

module.exports = {
  createStarterBlueprint,
  compileBlueprintToHtml,
  writeBlueprintHtml
};
