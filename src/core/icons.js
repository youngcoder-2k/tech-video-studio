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
  globeNet: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#082F49" stroke="#38BDF8" stroke-width="3.5"/><ellipse cx="50" cy="50" rx="18" ry="40" fill="none" stroke="#38BDF8" stroke-width="2.5"/><line x1="10" y1="50" x2="90" y2="50" stroke="#38BDF8" stroke-width="2.5"/><line x1="16" y1="30" x2="84" y2="30" stroke="#38BDF8" stroke-width="2"/><line x1="16" y1="70" x2="84" y2="70" stroke="#38BDF8" stroke-width="2"/></svg>`
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

function listNames() {
  return Object.keys(BUILTIN_SVGS);
}

module.exports = {
  BUILTIN_SVGS,
  register,
  initBuiltinIcons,
  get,
  listNames
};
