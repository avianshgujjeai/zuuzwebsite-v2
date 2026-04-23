// ZUUZ nav-fix.js — click/tap dropdowns + mobile menu
(function () {
  /* ── 1. Dropdown click/tap toggle ── */
  document.querySelectorAll('.nav-item').forEach(function (item) {
    var link = item.querySelector('.nav-link');
    var dd = item.querySelector('.dropdown');
    if (!dd) return;

    // Remove CSS hover dependency — handle open/close via JS
    link.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = item.classList.contains('open');
      // Close all others
      document.querySelectorAll('.nav-item.open').forEach(function (o) {
        o.classList.remove('open');
      });
      if (!isOpen) item.classList.add('open');
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-item.open').forEach(function (o) {
      o.classList.remove('open');
    });
  });

  /* ── 2. Mobile hamburger toggle ── */
  var burger = document.getElementById('nav-burger');
  var mobileMenu = document.getElementById('mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = mobileMenu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      burger.innerHTML = open
        ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });

    // Mobile accordion sub-menus
    mobileMenu.querySelectorAll('.mob-item').forEach(function (mi) {
      var hd = mi.querySelector('.mob-hd');
      var bd = mi.querySelector('.mob-bd');
      if (!hd || !bd) return;
      hd.addEventListener('click', function () {
        var open = mi.classList.toggle('open');
        bd.style.maxHeight = open ? bd.scrollHeight + 'px' : '0';
      });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
      if (!mobileMenu.contains(e.target) && e.target !== burger) {
        mobileMenu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        burger.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
      }
    });
  }

  /* ── 3. Demo modal for booking ── */
  var dm = document.getElementById('dm');
  if (dm) {
    dm.addEventListener('click', function (e) {
      if (e.target === dm) dm.style.display = 'none';
    });
  }
})();
