'use strict';

const PALETTES = {
  charcoal: {
    bg: '#1E1E1E',
    bgWave: '#171717',
    surface: '#111827',
    surfaceElevated: '#1E293B',
    border: '#334155',
    textPrimary: '#FFFFFF',
    textSecondary: '#CBD5E1',
    textMuted: '#94A3B8'
  },
  midnight: {
    bg: '#0F172A',
    bgWave: '#0B1120',
    surface: '#1E293B',
    surfaceElevated: '#334155',
    border: '#475569',
    textPrimary: '#F8FAFC',
    textSecondary: '#E2E8F0',
    textMuted: '#94A3B8'
  }
};

const ACCENTS = {
  cyan: { primary: '#0284C7', bright: '#38BDF8', dark: '#082F49', soft: '#E0F2FE' },
  emerald: { primary: '#059669', bright: '#10B981', light: '#34D399', dark: '#022C22', mid: '#064E3B', soft: '#A7F3D0' },
  amber: { primary: '#D97706', bright: '#F59E0B', dark: '#451A03', mid: '#78350F', soft: '#FEF08A' },
  purple: { primary: '#8A4F80', bright: '#A855F7', dark: '#311E2D', mid: '#701A75', soft: '#F5D0FE' },
  indigo: { primary: '#4F46E5', bright: '#6366F1', dark: '#1E1B4B', mid: '#4338CA', soft: '#C7D2FE' },
  rose: { primary: '#E11D48', bright: '#EF4444', dark: '#450A0A', mid: '#881337', soft: '#FCA5A5' }
};

const FONTS = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace'
};

function drawBackground(ctx, width = 1920, height = 1080, paletteName = 'charcoal') {
  const p = PALETTES[paletteName] || PALETTES.charcoal;
  ctx.save();
  ctx.fillStyle = p.bg;
  ctx.fillRect(0, 0, width, height);

  // Signature subtle organic background waves (adds depth without visual clutter)
  ctx.fillStyle = p.bgWave;
  ctx.beginPath();
  ctx.arc(width * 0.91, height * 0.88, height * 0.44, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(width * 0.08, height * 0.14, height * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * Clean Top Header — Strictly NO third-party channel watermarks.
 * Left: Crisp topic title. Right: Chapter breadcrumb (e.g., "01. Compilation & Portability").
 */
function drawTopHeader(ctx, title, chapterText = '', options = {}) {
  const width = options.width || 1920;
  const accentColor = options.accentColor || ACCENTS.cyan.bright;
  const marginX = options.marginX || 80;

  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `600 36px ${FONTS.sans}`;
  ctx.textAlign = 'left';
  ctx.fillText(title, marginX, 72);

  if (chapterText) {
    ctx.fillStyle = accentColor;
    ctx.font = `600 18px ${FONTS.sans}`;
    ctx.textAlign = 'right';
    ctx.fillText(chapterText, width - marginX, 68);
  }
  ctx.restore();
}

/**
 * Concise Bottom Takeaway Pill (Recommended <= 8 words).
 */
function drawTakeawayPill(ctx, text, options = {}) {
  const canvasWidth = options.canvasWidth || 1920;
  const y = options.y || 855;
  const bg = options.bg || ACCENTS.cyan.primary;
  const border = options.border || ACCENTS.cyan.bright;
  const alpha = options.alpha !== undefined ? options.alpha : 1;

  if (alpha <= 0) return;

  ctx.save();
  ctx.globalAlpha *= alpha;
  ctx.font = `600 19px ${FONTS.sans}`;
  const measured = ctx.measureText(text).width;
  const w = Math.max(540, Math.min(canvasWidth - 240, measured + 96));
  const h = 58;
  const x = (canvasWidth - w) / 2;

  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 29);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.strokeStyle = border;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText(text, x + w / 2, y + h / 2 + 6.5);
  ctx.restore();
}

module.exports = {
  PALETTES,
  ACCENTS,
  FONTS,
  drawBackground,
  drawTopHeader,
  drawTakeawayPill
};
