'use strict';

const BUILTIN_SVGS = {
  javaLogo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M38,78 C38,78 48,82 62,78 C70,75 75,70 70,66 C65,62 55,64 45,67 C35,70 30,75 38,78 Z" fill="#5382A1"/><path d="M34,88 C34,88 46,92 64,88 C76,85 82,78 76,73 C70,68 56,71 44,75 C32,79 26,85 34,88 Z" fill="#E76F00"/><path d="M52,15 C45,30 38,42 48,55 C52,45 55,36 50,22 C48,18 52,15 52,15 Z" fill="#E76F00"/><path d="M60,25 C54,38 48,48 58,60 C62,50 64,42 59,31 C57,27 60,25 60,25 Z" fill="#5382A1"/><path d="M32,95 C45,99 68,99 82,95 C74,98 56,101 32,95 Z" fill="#E76F00"/></svg>`,
  coffeeMug: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M22,35 L26,82 C26,88 32,92 38,92 L62,92 C68,92 74,88 74,82 L78,35 Z" fill="#0284C7" stroke="#38BDF8" stroke-width="4"/><path d="M78,45 C86,45 92,52 92,60 C92,68 86,75 76,75" fill="none" stroke="#38BDF8" stroke-width="5" stroke-linecap="round"/><path d="M38,24 C36,18 42,12 38,6" fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/><path d="M50,26 C48,20 54,14 50,8" fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/><path d="M62,24 C60,18 66,12 62,6" fill="none" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/><ellipse cx="50" cy="35" rx="28" ry="8" fill="#0369A1" stroke="#38BDF8" stroke-width="3"/></svg>`,
  gear: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="28" fill="#F59E0B"/><circle cx="50" cy="50" r="12" fill="#1E1E1E"/><g fill="#F59E0B"><rect x="44" y="6" width="12" height="16" rx="3"/><rect x="44" y="78" width="12" height="16" rx="3"/><rect x="6" y="44" width="16" height="12" rx="3"/><rect x="78" y="44" width="16" height="12" rx="3"/><rect x="18" y="18" width="16" height="12" rx="3" transform="rotate(45 26 24)"/><rect x="66" y="66" width="16" height="12" rx="3" transform="rotate(45 74 72)"/><rect x="66" y="18" width="16" height="12" rx="3" transform="rotate(-45 74 24)"/><rect x="18" y="66" width="16" height="12" rx="3" transform="rotate(-45 26 72)"/></g></svg>`,
  shieldGuard: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50,6 L88,22 C88,60 72,86 50,96 C28,86 12,60 12,22 Z" fill="#065F46" stroke="#10B981" stroke-width="4"/><path d="M32,50 L45,64 L72,34" fill="none" stroke="#34D399" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  droneBot: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100"><ellipse cx="60" cy="45" rx="32" ry="20" fill="#10B981" stroke="#34D399" stroke-width="3"/><circle cx="60" cy="42" r="12" fill="#064E3B"/><circle cx="60" cy="42" r="6" fill="#6EE7B7"/><path d="M28,45 L10,30 M92,45 L110,30" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/><ellipse cx="10" cy="30" rx="14" ry="4" fill="#64748B"/><ellipse cx="110" cy="30" rx="14" ry="4" fill="#64748B"/><path d="M48,65 L38,82 M72,65 L82,82" stroke="#64748B" stroke-width="3" stroke-linecap="round"/><ellipse cx="38" cy="82" rx="6" ry="2" fill="#10B981"/><ellipse cx="82" cy="82" rx="6" ry="2" fill="#10B981"/><path d="M50,62 L30,96 L90,96 L70,62 Z" fill="#34D399" opacity="0.25"/></svg>`,
  flameNitro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50,4 C50,4 70,32 70,58 C70,80 58,96 50,96 C42,96 30,80 30,58 C30,32 50,4 50,4 Z" fill="#DC2626"/><path d="M50,24 C50,24 63,44 63,64 C63,78 56,86 50,86 C44,86 37,78 37,64 C37,44 50,24 50,24 Z" fill="#F59E0B"/><path d="M50,46 C50,46 56,58 56,68 C56,76 53,80 50,80 C47,80 44,76 44,68 C44,58 50,46 50,46 Z" fill="#FEF08A"/><polygon points="46,60 54,60 50,74" fill="#FFFFFF"/></svg>`,
  turboMeter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80"><path d="M15,70 A40,40 0 1,1 85,70" fill="none" stroke="#334155" stroke-width="10" stroke-linecap="round"/><path d="M15,70 A40,40 0 0,1 65,33" fill="none" stroke="#F59E0B" stroke-width="10" stroke-linecap="round"/><path d="M65,33 A40,40 0 0,1 85,70" fill="none" stroke="#EF4444" stroke-width="10" stroke-linecap="round"/><circle cx="50" cy="70" r="8" fill="#F8FAFC"/><line x1="50" y1="70" x2="72" y2="40" stroke="#EF4444" stroke-width="4" stroke-linecap="round"/></svg>`,
  cpuSilicon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140"><g stroke="#F59E0B" stroke-width="3" stroke-linecap="round"><line x1="30" y1="5" x2="30" y2="18"/><line x1="55" y1="5" x2="55" y2="18"/><line x1="85" y1="5" x2="85" y2="18"/><line x1="110" y1="5" x2="110" y2="18"/><line x1="30" y1="122" x2="30" y2="135"/><line x1="55" y1="122" x2="55" y2="135"/><line x1="85" y1="122" x2="85" y2="135"/><line x1="110" y1="122" x2="110" y2="135"/><line x1="5" y1="30" x2="18" y2="30"/><line x1="5" y1="55" x2="18" y2="55"/><line x1="5" y1="85" x2="18" y2="85"/><line x1="5" y1="110" x2="18" y2="110"/><line x1="122" y1="30" x2="135" y2="30"/><line x1="122" y1="55" x2="135" y2="55"/><line x1="122" y1="85" x2="135" y2="85"/><line x1="122" y1="110" x2="135" y2="110"/></g><rect x="18" y="18" width="104" height="104" rx="12" fill="#1E293B" stroke="#64748B" stroke-width="3"/><rect x="36" y="36" width="68" height="68" rx="8" fill="#0F172A" stroke="#F59E0B" stroke-width="2.5"/><text x="70" y="76" font-family="-apple-system, sans-serif" font-weight="bold" font-size="22" fill="#F59E0B" text-anchor="middle">CPU</text></svg>`,
  userAvatar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#0284C7"/><circle cx="50" cy="38" r="18" fill="#F8FAFC"/><path d="M22,82 C22,64 36,58 50,58 C64,58 78,64 78,82 Z" fill="#F8FAFC"/></svg>`,
  winOS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88"><path fill="#00ADEF" d="M0,12.5 L36,7.5 L36,42 L0,42 Z M40,7 L88,0 L88,42 L40,42 Z M0,46 L36,46 L36,80.5 L0,75.5 Z M40,46 L88,46 L88,88 L40,81 Z"/></svg>`,
  linuxPenguin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><ellipse cx="50" cy="55" rx="28" ry="32" fill="#FFFFFF" stroke="#000000" stroke-width="4"/><ellipse cx="50" cy="58" rx="20" ry="24" fill="#F8FAFC"/><circle cx="50" cy="25" r="18" fill="#FFFFFF" stroke="#000000" stroke-width="4"/><circle cx="43" cy="22" r="4" fill="#000000"/><circle cx="57" cy="22" r="4" fill="#000000"/><polygon points="46,28 54,28 50,36" fill="#F59E0B"/><ellipse cx="32" cy="85" rx="14" ry="7" fill="#F59E0B"/><ellipse cx="68" cy="85" rx="14" ry="7" fill="#F59E0B"/></svg>`,
  appleLogo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170"><path fill="#FFFFFF" d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.81-11.72-14.33-6.42-10.13-11.38-21.57-14.88-34.33-3.51-12.76-5.26-24.38-5.26-34.86 0-14.04 3.51-25.59 10.53-34.65 7.02-9.06 15.82-13.69 26.4-13.88 4.8 0 10.18 1.25 16.14 3.75 5.96 2.5 9.75 3.8 11.37 3.9 1.84 0 5.8-1.4 11.88-4.2 6.08-2.8 11.28-4.1 15.6-3.9 11.53.5 20.8 4.8 27.81 12.9-10.03 6.1-15 14.5-14.9 25.2.1 8.3 3.3 15.4 9.6 21.3 6.3 5.9 13.9 9.3 22.8 10.2-1.8 5.7-4.1 11.5-6.9 17.4zM119.22 33.15c0-7.2 2.6-13.9 7.8-20.1 5.2-6.2 11.7-10.2 19.5-12.05-.1 1.2-.3 2.5-.6 3.9-.7 4.1-2.3 8.3-4.8 12.6-2.5 4.3-5.9 7.7-10.2 10.2-4.3 2.5-8.2 4-11.7 4.5v-.95z"/></svg>`,
  dockerContainer: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="14" y="34" width="72" height="44" rx="6" fill="#0284C7" stroke="#38BDF8" stroke-width="3"/><line x1="32" y1="34" x2="32" y2="78" stroke="#38BDF8" stroke-width="3"/><line x1="50" y1="34" x2="50" y2="78" stroke="#38BDF8" stroke-width="3"/><line x1="68" y1="34" x2="68" y2="78" stroke="#38BDF8" stroke-width="3"/><rect x="26" y="18" width="16" height="14" rx="2" fill="#38BDF8"/><rect x="46" y="18" width="16" height="14" rx="2" fill="#38BDF8"/></svg>`,
  lockGold: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M32,44 L32,30 C32,18 68,18 68,30 L68,44" fill="none" stroke="#F59E0B" stroke-width="8" stroke-linecap="round"/><rect x="22" y="44" width="56" height="44" rx="10" fill="#D97706" stroke="#FEF08A" stroke-width="3"/><circle cx="50" cy="64" r="6" fill="#1E1E1E"/></svg>`,
  cloudNode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90"><path d="M32,74 L90,74 C104,74 112,64 112,52 C112,41 103,32 92,31 C88,16 74,8 58,8 C40,8 26,20 24,37 C13,39 6,48 6,58 C6,68 16,74 32,74 Z" fill="#0369A1" stroke="#38BDF8" stroke-width="3.5"/></svg>`,
  lightningBolt: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="56,6 22,54 48,54 42,94 78,44 52,44" fill="#F59E0B" stroke="#FEF08A" stroke-width="3" stroke-linejoin="round"/></svg>`,
  globeNet: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#082F49" stroke="#38BDF8" stroke-width="3.5"/><ellipse cx="50" cy="50" rx="18" ry="40" fill="none" stroke="#38BDF8" stroke-width="2.5"/><line x1="10" y1="50" x2="90" y2="50" stroke="#38BDF8" stroke-width="2.5"/><line x1="16" y1="30" x2="84" y2="30" stroke="#38BDF8" stroke-width="2"/><line x1="16" y1="70" x2="84" y2="70" stroke="#38BDF8" stroke-width="2"/></svg>`,
  kafkaLogo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g stroke="#5CE1E6" stroke-width="5" fill="#1E293B"><line x1="36" y1="50" x2="66" y2="26"/><line x1="36" y1="50" x2="66" y2="74"/><line x1="36" y1="50" x2="36" y2="18"/><line x1="36" y1="50" x2="36" y2="82"/><circle cx="36" cy="50" r="14" fill="#0284C7"/><circle cx="36" cy="16" r="9"/><circle cx="36" cy="84" r="9"/><circle cx="68" cy="24" r="10"/><circle cx="68" cy="76" r="10"/></g></svg>`,
  redisCube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,14 88,32 50,50 12,32" fill="#EF4444" stroke="#FCA5A5" stroke-width="2.5"/><polygon points="12,48 50,66 88,48 88,58 50,76 12,58" fill="#DC2626"/><polygon points="12,66 50,84 88,66 88,76 50,94 12,76" fill="#991B1B"/><circle cx="50" cy="31" r="6" fill="#FEF08A"/></svg>`,
  postgresElephant: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M24,36 C24,18 42,12 56,14 C72,16 82,28 80,46 C78,64 70,84 58,84 C52,84 52,66 54,56 C44,62 32,58 26,48 Z" fill="#0284C7" stroke="#7DD3FC" stroke-width="3.5"/><circle cx="62" cy="34" r="4.5" fill="#FFFFFF"/><path d="M54,54 C58,58 66,58 72,52" fill="none" stroke="#BAE6FD" stroke-width="3" stroke-linecap="round"/></svg>`,
  kubernetesWheel: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,6 88,26 94,68 68,94 32,94 6,68 12,26" fill="#1D4ED8" stroke="#60A5FA" stroke-width="3.5"/><circle cx="50" cy="52" r="22" fill="none" stroke="#FFFFFF" stroke-width="4.5"/><circle cx="50" cy="52" r="7" fill="#FFFFFF"/><g stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round"><line x1="50" y1="20" x2="50" y2="84"/><line x1="20" y1="36" x2="80" y2="68"/><line x1="20" y1="68" x2="80" y2="36"/></g></svg>`,
  rustGear: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="34" fill="none" stroke="#F97316" stroke-width="10" stroke-dasharray="12 6"/><circle cx="50" cy="50" r="26" fill="#1E1E1E" stroke="#FB923C" stroke-width="3"/><text x="50" y="61" font-family="-apple-system, sans-serif" font-weight="900" font-size="34" fill="#F97316" text-anchor="middle">R</text></svg>`,
  goGopher: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="20" y="18" width="60" height="68" rx="30" fill="#06B6D4" stroke="#67E8F9" stroke-width="3.5"/><circle cx="38" cy="40" r="9" fill="#FFFFFF"/><circle cx="62" cy="40" r="9" fill="#FFFFFF"/><circle cx="40" cy="40" r="4" fill="#0F172A"/><circle cx="60" cy="40" r="4" fill="#0F172A"/><ellipse cx="50" cy="54" rx="8" ry="5" fill="#FDE047"/><rect x="45" y="58" width="4" height="7" rx="1" fill="#FFFFFF"/><rect x="51" y="58" width="4" height="7" rx="1" fill="#FFFFFF"/></svg>`,
  hardDiskPlatter: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="14" y="12" width="72" height="76" rx="12" fill="#0F172A" stroke="#38BDF8" stroke-width="3.5"/><circle cx="50" cy="46" r="24" fill="#1E293B" stroke="#7DD3FC" stroke-width="3"/><circle cx="50" cy="46" r="8" fill="#38BDF8"/><path d="M50,28 A18,18 0 0,1 68,46" fill="none" stroke="#34D399" stroke-width="3" stroke-linecap="round"/><polygon points="26,74 48,52 53,57 32,78" fill="#FACC15"/><circle cx="28" cy="76" r="5" fill="#F59E0B"/></svg>`,
  ramChip: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100"><rect x="10" y="24" width="100" height="46" rx="8" fill="#064E3B" stroke="#34D399" stroke-width="3.5"/><rect x="22" y="34" width="20" height="26" rx="3" fill="#0F172A" stroke="#6EE7B7" stroke-width="2"/><rect x="50" y="34" width="20" height="26" rx="3" fill="#0F172A" stroke="#6EE7B7" stroke-width="2"/><rect x="78" y="34" width="20" height="26" rx="3" fill="#0F172A" stroke="#6EE7B7" stroke-width="2"/><g fill="#FACC15"><rect x="18" y="70" width="8" height="10" rx="1"/><rect x="32" y="70" width="8" height="10" rx="1"/><rect x="46" y="70" width="8" height="10" rx="1"/><rect x="66" y="70" width="8" height="10" rx="1"/><rect x="80" y="70" width="8" height="10" rx="1"/><rect x="94" y="70" width="8" height="10" rx="1"/></g></svg>`,
  networkCardNic: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100"><rect x="16" y="22" width="88" height="54" rx="8" fill="#0C4A6E" stroke="#38BDF8" stroke-width="3.5"/><rect x="34" y="34" width="34" height="28" rx="5" fill="#0F172A" stroke="#5CE1E6" stroke-width="2.5"/><circle cx="84" cy="38" r="5" fill="#4ADE80"/><circle cx="84" cy="54" r="5" fill="#FACC15"/><path d="M16,32 L6,32 L6,66 L16,66" fill="none" stroke="#94A3B8" stroke-width="4"/><rect x="28" y="76" width="44" height="10" rx="2" fill="#FACC15"/></svg>`,
  rocketBoost: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50,10 C68,26 72,52 68,70 L32,70 C28,52 32,26 50,10 Z" fill="#38BDF8" stroke="#E0F2FE" stroke-width="3"/><circle cx="50" cy="42" r="10" fill="#0F172A" stroke="#FACC15" stroke-width="3"/><polygon points="32,54 16,74 32,70" fill="#F43F5E"/><polygon points="68,54 84,74 68,70" fill="#F43F5E"/><path d="M38,72 L50,94 L62,72 Z" fill="#FACC15"/><path d="M43,72 L50,86 L57,72 Z" fill="#FEF08A"/></svg>`,
  magnifyingGlass: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="44" cy="44" r="26" fill="rgba(56,189,248,0.2)" stroke="#38BDF8" stroke-width="6"/><line x1="63" y1="63" x2="86" y2="86" stroke="#FACC15" stroke-width="9" stroke-linecap="round"/><path d="M32,36 A14,14 0 0,1 52,32" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/></svg>`,
  boxArchive: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="16" y="28" width="68" height="56" rx="8" fill="#4C1D95" stroke="#C084FC" stroke-width="3.5"/><rect x="12" y="16" width="76" height="16" rx="5" fill="#6D28D9" stroke="#E9D5FF" stroke-width="3"/><rect x="44" y="16" width="12" height="68" fill="#FACC15" opacity="0.85"/><rect x="38" y="46" width="24" height="14" rx="4" fill="#0F172A" stroke="#FACC15" stroke-width="2"/></svg>`,
  checkShield: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#064E3B" stroke="#34D399" stroke-width="4"/><path d="M32,52 L45,65 L70,36" fill="none" stroke="#4ADE80" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warningAlert: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,12 90,84 10,84" fill="#7F1D1D" stroke="#F87171" stroke-width="4" stroke-linejoin="round"/><line x1="50" y1="38" x2="50" y2="60" stroke="#FEF08A" stroke-width="7" stroke-linecap="round"/><circle cx="50" cy="73" r="4.5" fill="#FEF08A"/></svg>`
};

const imageCache = {};
const pendingPromises = [];

function register(name, svgMarkup) {
  BUILTIN_SVGS[name] = svgMarkup;
  if (typeof Image !== 'undefined') {
    const p = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgMarkup);
      imageCache[name] = img;
    });
    pendingPromises.push(p);
  }
}

function initBuiltinIcons() {
  if (typeof Image === 'undefined') return Promise.resolve();
  for (const [key, svg] of Object.entries(BUILTIN_SVGS)) {
    if (!imageCache[key]) {
      register(key, svg);
    }
  }
  return Promise.all(pendingPromises);
}

function get(name) {
  return imageCache[name] || null;
}

/**
 * Ergonomic helper to draw a registered SVG icon centered at (cx, cy),
 * with automatic continuous kinetic floating, sonar pulse rings, and rotation physics.
 */
function draw(ctx, name, cx, cy, size = 48, opts = {}) {
  const img = get(name);
  if (!img) return false;
  const alpha = opts.alpha !== undefined ? opts.alpha : 1;
  if (alpha <= 0.01) return false;

  const liveT = opts.timeSec !== undefined
    ? opts.timeSec
    : (typeof window !== 'undefined' && Number.isFinite(window.__studioCurrentTimeSec) ? window.__studioCurrentTimeSec : 0);

  const animate = opts.animate !== false;
  const phase = opts.phase || ((cx * 0.013 + cy * 0.017) % 6.28);
  const floatY = animate ? Math.sin(liveT * 2.8 + phase) * (opts.floatAmp !== undefined ? opts.floatAmp : 4.5) : 0;
  const scalePulse = animate ? 1 + Math.sin(liveT * 3.4 + phase) * 0.035 : 1;

  ctx.save();
  ctx.globalAlpha *= alpha;

  // Expanding sonar pulse ring behind icon
  if (animate && (opts.pulseRing !== false) && (opts.glowColor || opts.ringColor)) {
    const rColor = opts.ringColor || opts.glowColor || '#38BDF8';
    const ringPhase = (liveT * 0.85 + phase * 0.2) % 1;
    const ringR = (size * 0.45) + ringPhase * (size * 0.55);
    ctx.save();
    ctx.strokeStyle = rColor;
    ctx.globalAlpha *= (1 - ringPhase) * 0.45;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy + floatY, ringR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  ctx.translate(cx, cy + floatY);
  if (opts.spin || name === 'gear' || name === 'rustGear' || name === 'kubernetesWheel') {
    ctx.rotate(liveT * (opts.spinSpeed || 0.9));
  } else if (animate && opts.tilt !== false) {
    ctx.rotate(Math.sin(liveT * 2.1 + phase) * 0.045);
  }
  ctx.scale(scalePulse, scalePulse);

  if (opts.glowColor) {
    ctx.shadowColor = opts.glowColor;
    ctx.shadowBlur = opts.glowBlur || 16;
  }
  ctx.drawImage(img, -size / 2, -size / 2, size, size);
  ctx.restore();
  return true;
}

/**
 * Draws an expressive animated icon inside a glowing circular medallion with an orbiting particle
 * and an optional bold title + subtitle below. Ideal for uncluttered, high-impact visual scenes.
 */
function drawBadge(ctx, name, cx, cy, size = 110, opts = {}) {
  const progress = opts.progress !== undefined ? opts.progress : 1;
  if (progress <= 0.01) return false;

  const liveT = opts.timeSec !== undefined
    ? opts.timeSec
    : (typeof window !== 'undefined' && Number.isFinite(window.__studioCurrentTimeSec) ? window.__studioCurrentTimeSec : 0);

  const color = opts.color || '#38BDF8';
  const bg = opts.bg || 'rgba(15, 23, 42, 0.92)';
  const radius = size * 0.68;
  const phase = opts.phase || ((cx * 0.011 + cy * 0.019) % 6.28);

  // Overshoot pop-in scale
  const p = Math.min(1, progress);
  const popScale = p < 0.75
    ? (p / 0.75) * 1.08
    : 1.08 - ((p - 0.75) / 0.25) * 0.08;

  ctx.save();
  ctx.globalAlpha *= p;
  ctx.translate(cx, cy);
  ctx.scale(popScale, popScale);

  // Outer expanding radar ripple
  const ripplePhase = (liveT * 0.75 + phase * 0.2) % 1;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.globalAlpha *= (1 - ripplePhase) * 0.5;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(0, 0, radius + ripplePhase * 34, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Glowing medallion circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Rotating dashed tech ring inside medallion
  ctx.save();
  ctx.rotate(liveT * 0.65 + phase);
  ctx.strokeStyle = color;
  ctx.globalAlpha *= 0.45;
  ctx.lineWidth = 1.6;
  ctx.setLineDash([10, 8]);
  ctx.beginPath();
  ctx.arc(0, 0, radius - 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Orbiting energy particle on medallion rim
  const orbitAngle = liveT * 2.2 + phase;
  const ox = Math.cos(orbitAngle) * radius;
  const oy = Math.sin(orbitAngle) * radius;
  ctx.save();
  ctx.fillStyle = '#FACC15';
  ctx.shadowColor = '#FACC15';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(ox, oy, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Draw the icon inside
  draw(ctx, name, 0, 0, size * 0.74, {
    glowColor: color,
    pulseRing: false,
    timeSec: liveT,
    phase
  });

  // Optional top tag pill
  if (opts.tag) {
    ctx.font = '800 13px "JetBrains Mono", monospace';
    const tw = Math.max(96, ctx.measureText(opts.tag).width + 24);
    ctx.beginPath();
    ctx.roundRect(-tw / 2, -radius - 20, tw, 26, 13);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle = '#090D16';
    ctx.textAlign = 'center';
    ctx.fillText(opts.tag, 0, -radius - 3);
  }

  // Optional title & subtitle below
  if (opts.title) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 23px Inter, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(opts.title, 0, radius + 38);
  }
  if (opts.sub) {
    ctx.fillStyle = opts.subColor || color;
    ctx.font = '600 16.5px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(opts.sub, 0, radius + 66);
  }

  ctx.restore();
  return true;
}

function listNames() {
  return Object.keys(BUILTIN_SVGS);
}

module.exports = {
  BUILTIN_SVGS,
  register,
  initBuiltinIcons,
  get,
  draw,
  drawBadge,
  listNames
};
