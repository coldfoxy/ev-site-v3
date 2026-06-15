/* ============================================================
   ЭВ — газетная версия. Лёгкий скрипт:
   1. Появление блоков при прокрутке.
   2. Мобильное меню (бургер).
   Тексты/цвета меняются в index.html и css/style.css.
   ============================================================ */
(() => {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; // анимации выключены в системе?

  /* ---------- 1. Появление при прокрутке ---------- */
  const items = document.querySelectorAll('.reveal');
  if (prefersReduced) {
    items.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- 2. Мобильное меню ---------- */
  const burger = document.querySelector('.mb-burger');
  const menu = document.getElementById('mobile-menu');
  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false))); // клик по пункту — закрыть
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
})();
