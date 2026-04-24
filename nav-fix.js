(function () {
  'use strict';

  /* ======================================================
     ZUUZ nav-fix.js v2 — universal nav patch
     Handles BOTH nav types:
       A) Old pages: .nav-item + .dropdown  (index.html)
       B) New pages: .nav-item + .dd  (new AI-generated)
     Fixes:
       1. Remove arrow text from nav triggers
       2. Click-toggle dropdowns (click open, click again to close)
       3. Close on outside mousedown (fires before click, no re-open)
       4. Mobile hamburger menu
  ====================================================== */

  /* -- CSS injection -- */
  var s = document.createElement('style');
  s.textContent =
    /* disable CSS hover-open on new pages */
    '.nav-item:hover .dd{display:none!important}' +
        /* disable CSS hover-open on old pages */
    '.nav-item:hover .dropdown{display:none!important}' +
    /* open class drives visibility */
    '.nav-item.open .dd{display:block!important;pointer-events:all!important}' +
    '.nav-item.open .dropdown{display:block!important;pointer-events:all!important}' +
    /* closed dropdowns non-interactive */
    '.dd{pointer-events:none}' +
    /* dropdown button styles */
    '.dd button.dd-btn,.dropdown button.dd-btn{display:block;width:100%;text-align:left;padding:9px 14px;border-radius:6px;font-size:13px;font-weight:500;color:#888899;background:none;border:none;cursor:pointer;font-family:inherit;transition:background .15s}' +
    '.dd button.dd-btn:hover,.dropdown button.dd-btn:hover{background:rgba(255,255,255,.06);color:#fff}' +
    /* mobile burger */
    '#zuuz-burger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;z-index:300}' +
    '#zuuz-burger span{display:block;width:24px;height:2px;background:#fff;border-radius:2px;transition:all .3s}' +
    '#zuuz-mob{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(8,8,16,.97);z-index:9999;padding:80px 24px 40px;overflow-y:auto}' +
    '#zuuz-mob.open{display:block}' +
    '#zuuz-mob-x{position:fixed;top:20px;right:20px;background:none;border:none;color:#fff;font-size:32px;cursor:pointer;line-height:1;z-index:10000}' +
    '.zm-links a{display:block;font-size:17px;font-weight:700;color:#fff;padding:13px 0;border-bottom:1px solid #1a1a2e;text-decoration:none;cursor:pointer}' +
    '.zm-links a:hover{color:#a3f3ff}' +
    '.zm-sec{font-size:10px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:#555570;padding:16px 0 6px}' +
    '.zm-ctas{display:flex;flex-direction:column;gap:12px;margin-top:28px}' +
    '.zm-ctas a{display:block;text-align:center;padding:14px;border-radius:8px;font-weight:700;font-size:15px;text-decoration:none;cursor:pointer}' +
    '.zm-p{background:#0018FF;color:#fff}' +
    '.zm-g{border:1px solid #333;color:#fff}' +
    '@media(max-width:900px){.nav-links,.nav-ctas,.nl-wrap{display:none!important}#zuuz-burger{display:flex!important}}' +
    '@media(max-width:768px){body{overflow-x:hidden!important}nav{padding:0 20px!important}.container{padding:0 20px!important}.grid-2,.grid-3,.grid-4,.impact-grid{grid-template-columns:1fr!important}.dept-wrap{grid-template-columns:1fr!important}.footer-grid{grid-template-columns:1fr 1fr!important}}';
  document.head.appendChild(s);

  /* -- 1. Remove arrows from nav triggers -- */
  document.querySelectorAll('.nl, .nav-link').forEach(function (el) {
    el.childNodes.forEach(function (node) {
      if (node.nodeType === 3) {
        node.textContent = node.textContent.replace(/[\u25be\u25bc\u25b4\u25b2\u25be\u25bf\u25c2\u25b8\u276e\u276f\u2039\u203a\u02c2\u02c3\u27e8\u27e9▾▼▴▲]/g, '').replace(/\s+$/, '');
      }
    });
    el.querySelectorAll('span').forEach(function (sp) {
      if (/^[\u25be\u25bc\u25b4\u25b2▾▼▴▲\s]*$/.test(sp.textContent)) sp.remove();
    });
  });

  /* -- 2. Click-toggle dropdowns -- */
  document.querySelectorAll('.nav-item').forEach(function (item) {
    var trigger = item.querySelector('.nl') || item.querySelector('.nav-link');
    var panel = item.querySelector('.dd') || item.querySelector('.dropdown');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', function (ev) {
      ev.stopPropagation();
      var wasOpen = item.classList.contains('open');
      /* close all */
      document.querySelectorAll('.nav-item.open').forEach(function (o) { o.classList.remove('open'); });
      /* toggle: re-open only if it was closed */
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* -- 3. Close on outside mousedown (fires before click so no re-open) -- */
  document.addEventListener('mousedown', function (e) {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.nav-item.open').forEach(function (o) { o.classList.remove('open'); });
    }
  });

  /* -- 4. Hamburger -- */
  var navEl = document.getElementById('nav');
  if (navEl && !document.getElementById('zuuz-burger')) {
    var burger = document.createElement('button');
    burger.id = 'zuuz-burger';
    burger.setAttribute('aria-label', 'Open menu');
    burger.innerHTML = '<span></span><span></span><span></span>';
    navEl.appendChild(burger);
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      var mob = document.getElementById('zuuz-mob');
      if (mob) mob.classList.add('open');
    });
  }

  /* -- 5. Mobile overlay -- */
  if (!document.getElementById('zuuz-mob')) {
    var mob = document.createElement('div');
    mob.id = 'zuuz-mob';
    mob.innerHTML =
      '<button id="zuuz-mob-x">&times;</button>' +
      '<div class="zm-links">' +
      '<div class="zm-sec">Platform</div>' +
      '<a onclick="location.href=\'zuuz-platform-overview.html\'" >Platform Overview</a>' +
      '<a onclick="location.href=\'zuuz-ai-agents.html\'" >AI Agents</a>' +
      '<a onclick="location.href=\'zuuz-workflow-automation.html\'" >Workflow Automation</a>' +
      '<a onclick="location.href=\'zuuz-unified-search.html\'" >Unified Search</a>' +
      '<div class="zm-sec">Solutions</div>' +
      '<a onclick="location.href=\'zuuz-solutions-industry.html\'" >By Industry</a>' +
      '<a onclick="location.href=\'zuuz-solutions-role.html\'" >By Role</a>' +
      '<a onclick="location.href=\'zuuz-solutions-usecase.html\'" >By Use Case</a>' +
      '<div class="zm-sec">Why ZUUZ</div>' +
      '<a onclick="location.href=\'zuuz-how-zuuz-works.html\'" >How ZUUZ Works</a>' +
      '<a onclick="location.href=\'zuuz-case-studies.html\'" >Case Studies</a>' +
      '<a onclick="location.href=\'zuuz-roi-calculator.html\'" >ROI Calculator</a>' +
      '<div class="zm-sec">Resources</div>' +
      '<a onclick="location.href=\'zuuz-blogs.html\'" >Blog</a>' +
      '<a onclick="location.href=\'zuuz-documentation.html\'" >Docs</a>' +
      '<a onclick="location.href=\'zuuz-contact.html\'" >Contact</a>' +
      '<a onclick="location.href=\'zuuz-company.html\'" >About</a>' +
      '<a onclick="location.href=\'pricing/index.html\'" >Pricing</a>' +
      '</div>' +
      '<div class="zm-ctas">' +
      '<a class="zm-g" onclick="location.href=\'zuuz-signin.html\'" >Sign in</a>' +
      '<a class="zm-p" onclick="location.href=\'zuuz-book-demo.html\'" >Book a demo</a>' +
      '</div>';
    document.body.appendChild(mob);
    document.getElementById('zuuz-mob-x').addEventListener('click', function () {
      mob.classList.remove('open');
    });
  }

  /* -- 6. Nav scroll shadow -- */
  window.addEventListener('scroll', function () {
    var n = document.getElementById('nav');
    if (n) n.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

})();
