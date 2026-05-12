// Countdown timer — 48h early-bird, persists in localStorage
(function() {
  'use strict';
  const DURATION_MS = 48 * 60 * 60 * 1000;
  const STORAGE_KEY = 'audit_konstr_timer_start';

  function getEndTime() {
    let start = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    const now = Date.now();
    if (!start || isNaN(start) || (now - start) > DURATION_MS) {
      start = now;
      try { localStorage.setItem(STORAGE_KEY, String(start)); } catch (e) {}
    }
    return start + DURATION_MS;
  }

  function pad(n) { return String(Math.max(0, n)).padStart(2, '0'); }

  function render(end) {
    const elH = document.getElementById('t-h');
    const elM = document.getElementById('t-m');
    const elS = document.getElementById('t-s');
    if (!elH) return;
    let diff = end - Date.now();
    if (diff < 0) diff = 0;
    const totalSec = Math.floor(diff / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    elH.textContent = pad(h);
    elM.textContent = pad(m);
    elS.textContent = pad(s);
    const aria = document.getElementById('timer');
    if (aria) aria.setAttribute('aria-label', `До конца акции: ${h} часов ${m} минут ${s} секунд`);
  }

  document.addEventListener('DOMContentLoaded', function() {
    const end = getEndTime();
    render(end);
    setInterval(function() { render(end); }, 1000);
  });
})();
