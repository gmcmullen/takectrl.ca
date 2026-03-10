/**
 * CTRL - Canadian Tech Rights Lab
 * Main site JavaScript
 *
 * This script is loaded with `defer` so the DOM is fully parsed when it runs.
 * All direct DOM queries below are safe without waiting for DOMContentLoaded.
 */

const helpDialog  = document.getElementById('help-dialog');
const themeToggle = document.querySelector('.theme-toggle');

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
// Shortcuts are suppressed while the help dialog is open (Esc closes it natively).
// Shortcuts are also suppressed when focus is inside a form field.
// ---------------------------------------------------------------------------
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (helpDialog.open) return;

  const key = e.key.toLowerCase();

  if (key === 'h') {
    helpDialog.showModal();

    // Announce to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent =
      'CTRL keyboard shortcuts: M — main page, P — previous page, ' +
      'L — toggle light/dark mode, R — randomise header, ' +
      '1 through 9 — navigate sidebar menu items, Escape — close this dialog.';
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 3000);

  } else if (key === 'm') {
    window.location.href = '/';

  } else if (key === 'p') {
    window.history.back();

  } else if (key === 'l') {
    document.body.classList.toggle('light-mode');
    const newTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    themeToggle.setAttribute('aria-pressed', newTheme === 'light' ? 'true' : 'false');
    themeToggle.setAttribute(
      'aria-label',
      `Currently in ${newTheme} mode. Click to switch to ${newTheme === 'light' ? 'dark' : 'light'} mode.`
    );

  } else if (key === 'r') {
    randomiseHeader();

  } else if (key >= '1' && key <= '9') {
    // Scoped to sidebar links only — avoids matching unrelated page links
    const menuItems = document.querySelectorAll('.sidebar a');
    const index = parseInt(key) - 1;
    if (menuItems[index]) menuItems[index].click();
  }
});

// ---------------------------------------------------------------------------
// Theme toggle button
// ---------------------------------------------------------------------------
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const newTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);

  // Sync ARIA state
  themeToggle.setAttribute('aria-pressed', newTheme === 'light' ? 'true' : 'false');
  themeToggle.setAttribute(
    'aria-label',
    `Currently in ${newTheme} mode. Click to switch to ${newTheme === 'light' ? 'dark' : 'light'} mode.`
  );

  // Announce to screen readers
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = `Theme switched to ${newTheme} mode`;
  document.body.appendChild(announcement);
  setTimeout(() => document.body.removeChild(announcement), 1000);
});
