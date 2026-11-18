'use strict';

const { FONTS } = require('../core/theme');
const Icons = require('../core/icons');
const Connectors = require('../core/connectors');

/**
 * Rich, Domain-Specific Visual Illustrations Library.
 * Designed specifically to prevent "Repeated Dashed Box + Pill Monotony".
 */

// 1. REALISTIC IDE CODE EDITOR WINDOW
function codeEditorWindow(ctx, x, y, w, h, opts = {}) {
  const fileName = opts.fileName || 'App.java';
  const iconName = opts.icon || 'javaLogo';
  const lines = opts.lines || [
    { text: 'public class App {', color: '#F43F5E' },
    { text: '  public static void main() {', color: '#38BDF8' },
    { text: '    int a = 10, b = 20;', color: '#E2E8F0' },
    { text: '    System.out.println(a + b);', color: '#10B981' },
    { text: '  }', color: '#38BDF8' },
    { text: '}', color: '#F43F5E' }
  ];

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 12);
  ctx.fillStyle = '#111827';
  ctx.fill();
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Title bar
  ctx.beginPath();
  ctx.roundRect(x, y, w, 36, [12, 12, 0, 0]);
  ctx.fillStyle = '#1F2937';
  ctx.fill();

  // Traffic lights
  const dots = ['#EF4444', '#F59E0B', '#10B981'];
  dots.forEach((col, idx) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(x + 20 + idx * 16, y + 18, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  // Active file tab
  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.roundRect(x + 76, y + 6, 130, 30, [6, 6, 0, 0]);
  ctx.fill();
  ctx.fillStyle = '#E5E7EB';
  ctx.font = `600 13px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(fileName, x + 141, y + 25);

  const iconImg = Icons.get(iconName);
  if (iconImg) {
    ctx.drawImage(iconImg, x + w - 38, y + 6, 24, 24);
  }

  lines.forEach((line, i) => {
    const ly = y + 68 + i * 27;
    ctx.fillStyle = '#4B5563';
    ctx.font = `12px ${FONTS.mono}`;
    ctx.textAlign = 'right';
    ctx.fillText(String(i + 1), x + 28, ly);

    ctx.fillStyle = line.color || '#E2E8F0';
    ctx.font = `13.5px ${FONTS.mono}`;
    ctx.textAlign = 'left';
    ctx.fillText(line.text, x + 42, ly);
  });
  ctx.restore();
}

// 2. BINARY / BYTECODE CAPSULE
function bytecodeCapsule(ctx, x, y, w, h, opts = {}) {
  const title = opts.title || 'App.class (Bytecode)';
  const badgeTitle = opts.badgeTitle || '0xCAFEBABE';
  const badgeSub = opts.badgeSub || 'Magic Class Header';
  const iconName = opts.icon || 'coffeeMug';
  const opcodes = opts.opcodes || ['0: iload_1', '1: iload_2', '2: iadd', '3: ireturn'];

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#064E3B';
  ctx.fill();
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(x, y, w, 38, [14, 14, 0, 0]);
  ctx.fillStyle = '#065F46';
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(title, x + w / 2, y + 24);

  ctx.fillStyle = '#022C22';
  ctx.beginPath();
  ctx.roundRect(x + 18, y + 50, w - 36, 50, 8);
  ctx.fill();
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const iconImg = Icons.get(iconName);
  if (iconImg) {
    ctx.drawImage(iconImg, x + 28, y + 56, 38, 38);
  }
  ctx.fillStyle = '#F59E0B';
  ctx.font = `bold 16px ${FONTS.mono}`;
  ctx.textAlign = 'left';
  ctx.fillText(badgeTitle, x + 76, y + 74);
  ctx.fillStyle = '#94A3B8';
  ctx.font = `12px ${FONTS.sans}`;
  ctx.fillText(badgeSub, x + 76, y + 91);

  ctx.fillStyle = '#34D399';
  ctx.font = `13.5px ${FONTS.mono}`;
  opcodes.forEach((op, idx) => {
    ctx.fillText(op, x + 32, y + 134 + idx * 26);
  });
  ctx.restore();
}

// 3. ROTATING MECHANICAL GEAR NODE
function compilerGear(ctx, cx, cy, angleDeg, opts = {}) {
  const size = opts.size || 72;
  const label = opts.label || 'javac';
  const iconImg = Icons.get('gear');

  ctx.save();
  if (iconImg) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((angleDeg * Math.PI) / 180);
    ctx.drawImage(iconImg, -size / 2, -size / 2, size, size);
    ctx.restore();
  }
  if (label) {
    ctx.fillStyle = opts.color || '#F59E0B';
    ctx.font = `bold 16px ${FONTS.sans}`;
    ctx.textAlign = 'center';
    ctx.fillText(label, cx, cy + size / 2 + 24);
  }
  ctx.restore();
}

// 4. DISTINCT HARDWARE MACHINES: 'pc' | 'server' | 'laptop'
function hardwareMachine(ctx, x, cy, opts = {}) {
  const w = opts.width || 330;
  const h = opts.height || 96;
  const y = cy - h / 2;
  const type = opts.type || 'pc';
  const title = opts.title || 'Workstation';
  const status = opts.status || 'Runtime OK ✓';
  const iconImg = opts.osIcon ? Icons.get(opts.osIcon) : null;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#1E293B';
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  ctx.stroke();

  if (type === 'pc') {
    ctx.fillStyle = '#0284C7';
    ctx.fillRect(x + 22, cy - 28, 48, 36);
    ctx.fillStyle = '#64748B';
    ctx.fillRect(x + 42, cy + 8, 8, 12);
    ctx.fillRect(x + 34, cy + 20, 24, 4);
  } else if (type === 'server') {
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x + 18, cy - 22, 56, 44);
    ctx.fillStyle = '#F59E0B';
    ctx.fillRect(x + 22, cy - 16, 28, 6);
    ctx.fillStyle = '#10B981';
    ctx.beginPath(); ctx.arc(x + 60, cy - 13, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + 60, cy - 3, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#64748B';
    ctx.fillRect(x + 22, cy + 2, 48, 14);
  } else if (type === 'laptop') {
    ctx.fillStyle = '#CBD5E1';
    ctx.fillRect(x + 20, cy - 24, 52, 34);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x + 24, cy - 20, 44, 26);
    ctx.fillStyle = '#94A3B8';
    ctx.fillRect(x + 14, cy + 10, 64, 6);
  }

  const textStartX = iconImg ? x + 150 : x + 94;
  if (iconImg) {
    ctx.drawImage(iconImg, x + 88, cy - 24, 46, 46);
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 18px ${FONTS.sans}`;
  ctx.textAlign = 'left';
  ctx.fillText(title, textStartX, cy - 4);

  ctx.fillStyle = opts.statusColor || '#10B981';
  ctx.font = `600 13.5px ${FONTS.sans}`;
  ctx.fillText(status, textStartX, cy + 20);
  ctx.restore();
}

// 5. MULTI-TIER VAULT SAFE (ClassLoaders, CPU Cache L1/L2/L3, Auth Tiers)
function tieredVault(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || '1. ClassLoader Vault';
  const accent = opts.accent || '#D97706';
  const tiers = opts.tiers || [
    { name: 'Bootstrap Tier', sub: 'Core JDK (java.base)', bg: '#78350F', text: '#FEF08A' },
    { name: 'Platform Tier', sub: 'Extensions & Drivers', bg: '#854D0E', text: '#FEF08A' },
    { name: 'Application Tier', sub: 'User App & Libraries', bg: '#9A3412', text: '#FED7AA' }
  ];

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#292524';
  ctx.fill();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.roundRect(x + 24, y - 18, w - 48, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  tiers.forEach((t, i) => {
    const ty = y + 44 + i * 94;
    ctx.beginPath();
    ctx.roundRect(x + 20, ty, w - 40, 76, 10);
    ctx.fillStyle = t.bg || '#78350F';
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = t.text || '#FEF08A';
    ctx.font = `bold 16px ${FONTS.sans}`;
    ctx.textAlign = 'left';
    ctx.fillText(t.name, x + 38, ty + 31);

    ctx.fillStyle = '#E2E8F0';
    ctx.font = `13px ${FONTS.sans}`;
    ctx.fillText(t.sub, x + 38, ty + 54);

    // Gold vault lock indicator
    ctx.fillStyle = '#FEF08A';
    ctx.beginPath();
    ctx.arc(x + w - 46, ty + 38, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#78350F';
    ctx.fillRect(x + w - 48, ty + 34, 4, 8);
  });
  ctx.restore();
}

// 6. HOLOGRAPHIC X-RAY SECURITY SCANNER CHAMBER
function xraySecurityScanner(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || '2. Security Verifier';
  const radarProgress = opts.radarProgress !== undefined ? opts.radarProgress : 0;
  const checks = opts.checks || [
    '✓ Type Safety: VALID',
    '✓ Stack Bounds: VALID',
    '✓ Pointer Safety: VALID'
  ];
  const shieldTitle = opts.shieldTitle || '🚫 Attack Deflection Shield';
  const shieldNote = opts.shieldNote || 'Blocks buffer overflows & illegal pointers';

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#022C22';
  ctx.fill();
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.roundRect(x + 24, y - 18, w - 48, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  ctx.fillStyle = '#064E3B';
  ctx.beginPath();
  ctx.roundRect(x + 20, y + 40, w - 40, 165, 10);
  ctx.fill();
  ctx.strokeStyle = '#34D399';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const shieldImg = Icons.get('shieldGuard');
  if (shieldImg) {
    ctx.drawImage(shieldImg, x + 36, y + 72, 96, 96);
  }

  if (radarProgress > 0 && radarProgress < 1) {
    const scanY = y + 44 + radarProgress * 155;
    ctx.strokeStyle = '#6EE7B7';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#6EE7B7';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(x + 22, scanY);
    ctx.lineTo(x + w - 22, scanY);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  ctx.fillStyle = '#A7F3D0';
  ctx.font = `bold 14px ${FONTS.mono}`;
  ctx.textAlign = 'left';
  checks.forEach((chk, idx) => {
    ctx.fillText(chk, x + 150, y + 88 + idx * 32);
  });

  // Deflection alert box
  ctx.fillStyle = '#450A0A';
  ctx.beginPath();
  ctx.roundRect(x + 20, y + 225, w - 40, 88, 10);
  ctx.fill();
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#FCA5A5';
  ctx.font = `bold 14.5px ${FONTS.sans}`;
  ctx.fillText(shieldTitle, x + 36, y + 258);

  ctx.fillStyle = '#FEE2E2';
  ctx.font = `13px ${FONTS.sans}`;
  ctx.fillText(shieldNote, x + 36, y + 286);
  ctx.restore();
}

// 7. LIFO EXECUTION STACK CHAMBER
function lifoStackChamber(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || 'Thread Execution Stack (LIFO)';
  const frames = opts.frames || [
    { name: 'calculateTax()', sub: 'rate = 0.08', bg: '#166534', active: false },
    { name: 'getUserProfile()', sub: 'ref -> HEAP', bg: '#0284C7', active: true },
    { name: 'main()', sub: 'entry point', bg: '#334155', active: false }
  ];

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#082F49';
  ctx.fill();
  ctx.strokeStyle = '#0284C7';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#0284C7';
  ctx.beginPath();
  ctx.roundRect(x + 24, y - 18, w - 48, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  let activeAnchorY = y + h / 2;

  frames.forEach((f, i) => {
    const fy = y + 52 + i * 96;
    if (f.active) activeAnchorY = fy + 40;

    ctx.beginPath();
    ctx.roundRect(x + 24, fy, w - 48, 80, 10);
    ctx.fillStyle = f.bg || '#1E293B';
    ctx.fill();
    ctx.strokeStyle = f.active ? '#38BDF8' : '#64748B';
    ctx.lineWidth = f.active ? 2.5 : 1;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold 16px ${FONTS.mono}`;
    ctx.textAlign = 'left';
    ctx.fillText(f.name, x + 40, fy + 34);

    ctx.fillStyle = '#E0F2FE';
    ctx.font = `13px ${FONTS.sans}`;
    ctx.fillText(f.sub || '', x + 40, fy + 58);

    ctx.fillStyle = f.active ? '#F59E0B' : '#94A3B8';
    ctx.font = `bold 12px ${FONTS.mono}`;
    ctx.textAlign = 'right';
    ctx.fillText(f.active ? 'ACTIVE REF •' : `Frame #${frames.length - i}`, x + w - 38, fy + 34);
  });

  ctx.restore();
  return { anchorX: x + w, anchorY: activeAnchorY };
}

// 8. 3D HEAP MEMORY GRID + AUTONOMOUS GC SWEEPER DRONE
function memoryHeapGrid(ctx, x, y, w, h, timeSec, opts = {}) {
  const header = opts.header || 'Shared Heap Memory Grid';
  const liveTitle = opts.liveTitle || 'User ("Alice")';
  const liveSub = opts.liveSub || 'id: 101 | $250.00';
  const deadTitle = opts.deadTitle || '💀 Dead Object';
  const deadSub = opts.deadSub || '0 pointers [Severed]';

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#311E2D';
  ctx.fill();
  ctx.strokeStyle = '#8A4F80';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#8A4F80';
  ctx.beginPath();
  ctx.roundRect(x + 24, y - 18, w - 48, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  // Memory grid lines
  ctx.strokeStyle = '#4A044E';
  ctx.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(x + 32, y + 90 + i * 52);
    ctx.lineTo(x + w - 32, y + 90 + i * 52);
    ctx.stroke();
  }

  // Live Object Card
  const liveX = x + 36;
  const liveY = y + 72;
  ctx.beginPath();
  ctx.roundRect(liveX, liveY, 244, 96, 12);
  ctx.fillStyle = '#7C2D12';
  ctx.fill();
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  const avatarImg = Icons.get('userAvatar');
  if (avatarImg) {
    ctx.drawImage(avatarImg, liveX + 16, liveY + 17, 62, 62);
  }
  ctx.fillStyle = '#FED7AA';
  ctx.font = `bold 16px ${FONTS.sans}`;
  ctx.textAlign = 'left';
  ctx.fillText(liveTitle, liveX + 90, liveY + 40);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `13px ${FONTS.mono}`;
  ctx.fillText(liveSub, liveX + 90, liveY + 66);

  // Dead Object Card
  const deadX = x + 36;
  const deadY = y + 204;
  ctx.beginPath();
  ctx.roundRect(deadX, deadY, 244, 92, 12);
  ctx.fillStyle = '#450A0A';
  ctx.fill();
  ctx.strokeStyle = '#EF4444';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#FCA5A5';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.fillText(deadTitle, deadX + 22, deadY + 38);
  ctx.fillStyle = '#FECDD3';
  ctx.font = `13px ${FONTS.sans}`;
  ctx.fillText(deadSub, deadX + 22, deadY + 64);

  // Hovering Autonomous GC Drone
  const droneX = x + w - 98;
  const droneY = y + 178 + Math.sin(timeSec * 3.2) * 8;
  const droneImg = Icons.get('droneBot');
  if (droneImg) {
    ctx.drawImage(droneImg, droneX - 52, droneY - 42, 104, 86);
  }
  ctx.fillStyle = '#10B981';
  ctx.font = `bold 14px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText('GC Sweeper Bot', droneX, droneY + 66);
  ctx.fillStyle = '#A7F3D0';
  ctx.font = `12px ${FONTS.sans}`;
  ctx.fillText('Reclaiming RAM', droneX, droneY + 84);

  ctx.restore();
  return { targetX: liveX, targetY: liveY + 48 };
}

// 9. SEQUENTIAL INSTRUCTION READER (Interpreters, Parsers, WAL Logs)
function sequentialReader(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || '1. Bytecode Interpreter';
  const items = opts.items || ['0: iload_1', '1: iload_2', '2: iadd', '3: ireturn'];
  const activeIndex = opts.activeIndex !== undefined ? opts.activeIndex : 1;
  const footer = opts.footer || 'Instant 0ms Startup';

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#1E1B4B';
  ctx.fill();
  ctx.strokeStyle = '#6366F1';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#6366F1';
  ctx.beginPath();
  ctx.roundRect(x + 20, y - 18, w - 40, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  items.forEach((op, i) => {
    const active = i === activeIndex;
    ctx.fillStyle = active ? '#4338CA' : '#0F172A';
    ctx.beginPath();
    ctx.roundRect(x + 20, y + 48 + i * 52, w - 40, 42, 8);
    ctx.fill();
    ctx.strokeStyle = active ? '#818CF8' : '#334155';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = active ? '#FFFFFF' : '#94A3B8';
    ctx.font = `bold 14px ${FONTS.mono}`;
    ctx.textAlign = 'left';
    ctx.fillText(op, x + 38, y + 75 + i * 52);
  });

  ctx.fillStyle = '#A5B4FC';
  ctx.font = `600 13.5px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(footer, x + w / 2, y + h - 32);
  ctx.restore();
}

// 10. HOTSPOT TACHOMETER & NITRO FORGE
function turboForge(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || '2. HotSpot JIT Turbocharger';
  const counterLabel = opts.counterLabel || 'Loop Counter';
  const countVal = opts.countValue !== undefined ? opts.countValue : 10000;
  const flameScale = opts.flameScale || 1;
  const title = opts.title || 'C2 Optimizer Active';
  const sub = opts.sub || 'Compiles Hot Paths';

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#451A03';
  ctx.fill();
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#D97706';
  ctx.beginPath();
  ctx.roundRect(x + 20, y - 18, w - 40, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  const meterImg = Icons.get('turboMeter');
  if (meterImg) {
    ctx.drawImage(meterImg, x + 26, y + 42, 98, 78);
  }

  ctx.fillStyle = '#78350F';
  ctx.beginPath();
  ctx.roundRect(x + 136, y + 46, w - 158, 68, 10);
  ctx.fill();

  ctx.fillStyle = '#FED7AA';
  ctx.font = `13px ${FONTS.sans}`;
  ctx.textAlign = 'left';
  ctx.fillText(counterLabel, x + 152, y + 70);

  ctx.fillStyle = '#F59E0B';
  ctx.font = `bold 20px ${FONTS.mono}`;
  ctx.fillText(`${Math.floor(countVal).toLocaleString()}x`, x + 152, y + 97);

  const flameImg = Icons.get('flameNitro');
  if (flameImg) {
    ctx.save();
    ctx.translate(x + w / 2, y + 195);
    ctx.scale(flameScale, flameScale);
    ctx.drawImage(flameImg, -40, -40, 80, 80);
    ctx.restore();
  }

  ctx.fillStyle = '#FEF08A';
  ctx.font = `bold 16px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(title, x + w / 2, y + 262);

  ctx.fillStyle = '#FED7AA';
  ctx.font = `13px ${FONTS.sans}`;
  ctx.fillText(sub, x + w / 2, y + 286);
  ctx.restore();
}

// 11. NATIVE ASSEMBLY / MACHINE CODE TERMINAL
function nativeAssemblyBlock(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || '3. Native Machine Code';
  const lines = opts.lines || [
    'movl  %edi, %eax',
    'addl  %esi, %eax',
    'retq  (x86_64 / ARM)',
    '01001000 10001001',
    '11000000 11000011'
  ];
  const footer = opts.footer || 'Zero Interpreter Overhead';

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#064E3B';
  ctx.fill();
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.roundRect(x + 20, y - 18, w - 40, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  ctx.fillStyle = '#022C22';
  ctx.beginPath();
  ctx.roundRect(x + 20, y + 48, w - 40, 220, 10);
  ctx.fill();
  ctx.strokeStyle = '#34D399';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#34D399';
  ctx.font = `bold 13.5px ${FONTS.mono}`;
  ctx.textAlign = 'left';
  lines.forEach((ln, idx) => {
    ctx.fillText(ln, x + 36, y + 84 + idx * 36);
  });

  ctx.fillStyle = '#A7F3D0';
  ctx.font = `600 13.5px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(footer, x + w / 2, y + h - 32);
  ctx.restore();
}

// 12. BARE-METAL SILICON CPU DIE + HARDWARE REGISTERS
function siliconCpuDie(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || '4. Bare-Metal Silicon';
  const cpuPulse = opts.cpuPulse || 1;
  const registers = opts.registers || [
    'RAX: 0x0000001E (30)',
    'RBX: 0x0000000A (10)',
    'RCX: 0x00000014 (20)'
  ];

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.roundRect(x + 20, y - 18, w - 40, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  const cpuImg = Icons.get('cpuSilicon');
  if (cpuImg) {
    ctx.save();
    ctx.translate(x + w / 2, y + 108);
    ctx.scale(cpuPulse, cpuPulse);
    ctx.drawImage(cpuImg, -58, -58, 116, 116);
    ctx.restore();
  }

  ctx.fillStyle = '#1E293B';
  ctx.beginPath();
  ctx.roundRect(x + 22, y + 190, w - 44, 110, 10);
  ctx.fill();
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#38BDF8';
  ctx.font = `bold 13.5px ${FONTS.mono}`;
  ctx.textAlign = 'left';
  registers.forEach((reg, i) => {
    ctx.fillText(reg, x + 38, y + 222 + i * 28);
  });
  ctx.restore();
}

// 13. WEB BROWSER CLIENT VIEWPORT (For Networking / HTTP / Frontend-Backend videos)
function browserClient(ctx, x, y, w, h, opts = {}) {
  const url = opts.url || 'https://api.app.io';
  const headline = opts.headline || 'Web Client';
  const status = opts.status || 'TLS 1.3 Active';

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 12);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(x, y, w, 42, [12, 12, 0, 0]);
  ctx.fillStyle = '#1E293B';
  ctx.fill();

  ['#EF4444', '#F59E0B', '#10B981'].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x + 18 + i * 14, y + 21, 4.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // URL Bar
  ctx.fillStyle = '#0F172A';
  ctx.beginPath();
  ctx.roundRect(x + 66, y + 9, w - 82, 24, 12);
  ctx.fill();
  ctx.fillStyle = '#38BDF8';
  ctx.font = `12px ${FONTS.mono}`;
  ctx.textAlign = 'left';
  ctx.fillText('🔒 ' + url, x + 78, y + 25);

  const globeImg = Icons.get('globeNet');
  if (globeImg) {
    ctx.drawImage(globeImg, x + w / 2 - 36, y + 66, 72, 72);
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 18px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(headline, x + w / 2, y + 170);

  ctx.fillStyle = '#10B981';
  ctx.font = `600 13.5px ${FONTS.sans}`;
  ctx.fillText(status, x + w / 2, y + 196);
  ctx.restore();
}

// 14. 3D ISOMETRIC MULTI-PLATTER DATABASE (For SQL, ACID, Sharding, Replication)
function isometricDatabase(ctx, x, y, w, h, opts = {}) {
  const title = opts.title || 'Primary DB';
  const sub = opts.sub || 'PostgreSQL • WAL';
  const color = opts.color || '#38BDF8';
  const fill = opts.fill || '#082F49';
  const platters = opts.platters || 3;

  ctx.save();
  const ry = 22;
  const platterH = Math.floor((h - 50) / platters);

  for (let i = platters - 1; i >= 0; i--) {
    const py = y + 10 + i * platterH;
    ctx.fillStyle = fill;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.moveTo(x, py + ry);
    ctx.lineTo(x, py + platterH);
    ctx.ellipse(x + w / 2, py + platterH, w / 2, ry, 0, Math.PI, 0, true);
    ctx.lineTo(x + w, py + ry);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(x + w / 2, py + ry, w / 2, ry, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#0C4A6E';
    ctx.fill();
    ctx.stroke();
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 17px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(title, x + w / 2, y + h - 8);

  if (sub) {
    ctx.fillStyle = '#94A3B8';
    ctx.font = `13px ${FONTS.sans}`;
    ctx.fillText(sub, x + w / 2, y + h + 14);
  }
  ctx.restore();
}

// 15. STREAMING MESSAGE QUEUE PIPE (Kafka, RabbitMQ, Event Bus)
function messageQueuePipe(ctx, x, y, w, h, timeSec, opts = {}) {
  const title = opts.title || 'Kafka Topic Partition';
  const color = opts.color || '#F59E0B';
  const slots = opts.slots || 5;

  ctx.save();
  ctx.fillStyle = '#1E293B';
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, h / 2);
  ctx.fill();
  ctx.stroke();

  const innerPad = 24;
  const slotW = (w - innerPad * 2 - (slots - 1) * 12) / slots;
  const shift = ((timeSec * 0.9) % 1) * (slotW + 12);

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x + 12, y + 8, w - 24, h - 16, (h - 16) / 2);
  ctx.clip();

  for (let i = -1; i < slots + 1; i++) {
    const sx = x + innerPad + i * (slotW + 12) + shift;
    ctx.fillStyle = '#78350F';
    ctx.strokeStyle = '#FBBF24';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(sx, y + 16, slotW, h - 32, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#FEF08A';
    ctx.font = `bold 12px ${FONTS.mono}`;
    ctx.textAlign = 'center';
    ctx.fillText(`msg`, sx + slotW / 2, y + h / 2 + 4);
  }
  ctx.restore();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 16px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(title, x + w / 2, y - 14);
  ctx.restore();
}

// 16. HIGH-SPEED RAM CACHE MATRIX (Redis, Memcached, Page Cache)
function cacheMemoryMatrix(ctx, x, y, w, h, timeSec, opts = {}) {
  const header = opts.header || 'Redis In-Memory Cache';
  const cols = opts.cols || 3;
  const rows = opts.rows || 3;
  const hotCell = Math.floor(timeSec * 2) % (cols * rows);

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = '#2E0816';
  ctx.fill();
  ctx.strokeStyle = '#F43F5E';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#E11D48';
  ctx.beginPath();
  ctx.roundRect(x + 20, y - 18, w - 40, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);

  const padX = 24;
  const padY = 44;
  const gap = 12;
  const cellW = (w - padX * 2 - (cols - 1) * gap) / cols;
  const cellH = (h - padY - 36 - (rows - 1) * gap) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const cx = x + padX + c * (cellW + gap);
      const cy = y + padY + r * (cellH + gap);
      const isHot = idx === hotCell;

      ctx.fillStyle = isHot ? '#10B981' : '#4C0519';
      ctx.strokeStyle = isHot ? '#6EE7B7' : '#881337';
      ctx.lineWidth = isHot ? 2 : 1;
      ctx.beginPath();
      ctx.roundRect(cx, cy, cellW, cellH, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isHot ? '#022C22' : '#FECDD3';
      ctx.font = `bold 12px ${FONTS.mono}`;
      ctx.textAlign = 'center';
      ctx.fillText(isHot ? 'HIT ⚡' : `k:${idx + 1}`, cx + cellW / 2, cy + cellH / 2 + 4);
    }
  }

  ctx.fillStyle = '#FDA4AF';
  ctx.font = `600 13px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText('Sub-millisecond O(1) RAM Lookup', x + w / 2, y + h - 14);
  ctx.restore();
}

// 17. STAGE PANEL (Clean labeled stage container for custom compositions)
function stagePanel(ctx, x, y, w, h, opts = {}) {
  const header = opts.header || 'Stage';
  const accent = opts.accent || '#8A4F80';
  const bg = opts.bg || '#311E2D';

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 14);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.roundRect(x + 20, y - 18, w - 40, 36, 18);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold 15px ${FONTS.sans}`;
  ctx.textAlign = 'center';
  ctx.fillText(header, x + w / 2, y + 5);
  ctx.restore();
}

// Helper for inner step blocks when needed inside a custom stagePanel
function stepBlock(ctx, x, y, w, h, title, sub, opts = {}) {
  const bg = opts.bg || '#701A75';
  const titleColor = opts.titleColor || '#F5D0FE';

  ctx.save();
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 10);
  ctx.fill();

  ctx.fillStyle = titleColor;
  ctx.font = `bold 16px ${FONTS.mono}`;
  ctx.textAlign = 'left';
  ctx.fillText(title, x + 20, y + 30);

  if (sub) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `13px ${FONTS.sans}`;
    ctx.fillText(sub, x + 20, y + 52);
  }
  ctx.restore();
}

module.exports = {
  codeEditorWindow,
  bytecodeCapsule,
  compilerGear,
  hardwareMachine,
  tieredVault,
  xraySecurityScanner,
  lifoStackChamber,
  memoryHeapGrid,
  sequentialReader,
  turboForge,
  nativeAssemblyBlock,
  siliconCpuDie,
  browserClient,
  isometricDatabase,
  messageQueuePipe,
  cacheMemoryMatrix,
  stagePanel,
  stepBlock,
  // Expose Connectors convenience
  Connectors
};
