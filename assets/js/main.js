/**
 * CTRL - Canadian Tech Rights Lab
 * Main site JavaScript
 *
 * This script is loaded with `defer` so the DOM is fully parsed when it runs.
 * All direct DOM queries below are safe without waiting for DOMContentLoaded.
 */

const helpDialog  = document.getElementById('help-dialog');
const themeToggle = document.querySelector('.theme-toggle');
const modeToggles = document.querySelectorAll('.mode-toggle');

// ---------------------------------------------------------------------------
// Screen reader announcements — briefly injects a live region, then removes it
// ---------------------------------------------------------------------------
function announce(text, priority = 'polite', duration = 1000) {
  const el = document.createElement('div');
  el.setAttribute('aria-live', priority);
  el.setAttribute('aria-atomic', 'true');
  el.className = 'sr-only';
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => document.body.removeChild(el), duration);
}

// ---------------------------------------------------------------------------
// Theme initialisation — reads localStorage and applies saved preference
// ---------------------------------------------------------------------------
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  themeToggle.setAttribute('aria-pressed', 'true');
  themeToggle.setAttribute('aria-label', 'Currently in light mode. Click to switch to dark mode.');
}

// ---------------------------------------------------------------------------
// Theme toggle — flips light/dark mode, persists it, and syncs ARIA state
// ---------------------------------------------------------------------------
function toggleTheme(announceChange) {
  document.body.classList.toggle('light-mode');
  const newTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);

  themeToggle.setAttribute('aria-pressed', newTheme === 'light' ? 'true' : 'false');
  themeToggle.setAttribute(
    'aria-label',
    `Currently in ${newTheme} mode. Click to switch to ${newTheme === 'light' ? 'dark' : 'light'} mode.`
  );

  if (announceChange) announce(`Theme switched to ${newTheme} mode`);
}

// ---------------------------------------------------------------------------
// Mode toggle buttons — syncs the [R]/[P] hint buttons' pressed state
// ---------------------------------------------------------------------------
function syncModeButton(mode, on) {
  modeToggles.forEach((btn) => {
    if (btn.dataset.mode === mode) btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

// ---------------------------------------------------------------------------
// Reading mode — swaps body copy to Georgia for long-form readability.
// Navigation, ASCII header, and layout are untouched. Persisted like theme.
// ---------------------------------------------------------------------------
const savedReadingMode = localStorage.getItem('readingMode');
if (savedReadingMode === 'on') {
  document.body.classList.add('reading-mode');
}
syncModeButton('reading', document.body.classList.contains('reading-mode'));

function toggleReadingMode(announceChange) {
  if (document.body.classList.contains('print-preview')) togglePrintPreview(false);

  document.body.classList.toggle('reading-mode');
  const on = document.body.classList.contains('reading-mode');
  localStorage.setItem('readingMode', on ? 'on' : 'off');
  syncModeButton('reading', on);

  if (announceChange) announce(`Reading mode ${on ? 'enabled' : 'disabled'}`);
}

// ---------------------------------------------------------------------------
// Print preview — on-screen look at the printer-friendly layout (also used
// automatically by @media print when actually printing). Not persisted —
// it's a momentary preview, not a standing preference.
// ---------------------------------------------------------------------------
function togglePrintPreview(announceChange) {
  if (document.body.classList.contains('reading-mode')) toggleReadingMode(false);

  document.body.classList.toggle('print-preview');
  const on = document.body.classList.contains('print-preview');
  syncModeButton('print', on);

  if (announceChange) announce(`Print preview ${on ? 'enabled' : 'disabled'}`);
}

// ---------------------------------------------------------------------------
// ASCII header randomiser — uses cloneNode to avoid innerHTML assignment
// ---------------------------------------------------------------------------
function randomiseHeader() {
  const headers = document.querySelectorAll('#ascii-headers .header');
  if (!headers.length) return;
  const randomIndex = Math.floor(Math.random() * headers.length);
  const target = document.getElementById('ascii-header');
  const clone   = headers[randomIndex].cloneNode(true);
  target.replaceChildren(...Array.from(clone.childNodes));
}

randomiseHeader();

// ---------------------------------------------------------------------------
// Help dialog
// ---------------------------------------------------------------------------
document.querySelector('.dialog-close').addEventListener('click', () => {
  helpDialog.close();
});

// ---------------------------------------------------------------------------
// Keyboard navigation
// While the help dialog is open, only X (or the dialog's native Escape
// handling) does anything — other shortcuts are suppressed.
// Shortcuts are also suppressed when focus is inside a form field.
// ---------------------------------------------------------------------------
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  const key = e.key.toLowerCase();

  if (helpDialog.open) {
    if (key === 'x') helpDialog.close();
    return;
  }

  if (key === 'h') {
    helpDialog.showModal();
    announce(
      'CTRL keyboard shortcuts: H — help, M — main page, ' +
      'L — toggle light/dark mode, R — toggle reading mode, P — toggle print view, ' +
      'B — randomize ASCII banner, 0 through 9 — navigate sidebar menu items, ' +
      'X or Escape — close this dialog.',
      'assertive',
      3000
    );

  } else if (key === 'm') {
    window.location.href = '/';

  } else if (key === 'l') {
    toggleTheme(false);

  } else if (key === 'r') {
    toggleReadingMode(true);

  } else if (key === 'p') {
    togglePrintPreview(true);

  } else if (key === 'b') {
    randomiseHeader();

  } else if (key >= '0' && key <= '9') {
    // Scoped to sidebar links only — avoids matching unrelated page links
    const menuItems = document.querySelectorAll('.sidebar a');
    const index = key === '0' ? 9 : parseInt(key) - 1;
    if (menuItems[index]) menuItems[index].click();
  }
});

// ---------------------------------------------------------------------------
// Theme toggle button
// ---------------------------------------------------------------------------
themeToggle.addEventListener('click', () => {
  toggleTheme(true);
});

// ---------------------------------------------------------------------------
// Mode hint buttons ([R] Reading Mode / [P] Print View, under each page title)
// ---------------------------------------------------------------------------
modeToggles.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.dataset.mode === 'reading') toggleReadingMode(true);
    else if (btn.dataset.mode === 'print') togglePrintPreview(true);
  });
});
