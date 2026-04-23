(function () {
  'use strict';

  /* ── Inject CSS ── */
  var s = document.createElement('style');
  s.textContent = [
    '#nav-burger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;z-index:200}',
    '#nav-burger span{display:block;width:24px;height:2px;background:#fff;border-radius:2px;transition:all .3s}',
    '#mobile-nav{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(8,8,16,.97);z-index:999;padding:80px 24px 40px;overflow-y:auto}',
    '#mobile-nav.open{display:block}',
    '.mob-close{position:absolute;top:20px;right:20px;background:none;border:none;color:#fff;font-size:32px;cursor:pointer;line-height:1;z-index:1000}',
    '.mob-links a{display:block;font-size:17px;font-weight:700;color:#fff;padding:13px 0;border-bottom:1px solid #1a1a2e;text-decoration:none}',
    '.mob-links a:hover{color:#a3f3ff}',
    '.mob-section-title{font-size:10px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:#555570;padding:16px 0 6px}',
    '.mob-ctas{display:flex;flex-direction:column;gap:12px;margin-top:28px}',
    '.mob-ctas a{display:block;text-align:center;padding:14px;border-radius:8px;font-weight:700;font-size:15px;text-decoration:none}',
    '.mob-btn-p{background:#0018FF;color:#fff}',
    '.mob-btn-g{border:1px solid #333;color:#fff}',
    '.nav-item.open .dropdown{display:block!important}',
    '.dropdown a{display:block;padding:9px 14px;border-radius:6px;font-size:13px;font-weight:500;color:#888899;text-decoration:none;transition:background .15s}',
    '.dropdown a:hover{background:rgba(255,255,255,.06);color:#fff}',
    '@media(max-width:900px){.nav-links,.nav-ctas{display:none!important}#nav-burger{display:flex!important}}',
    '@media(max-width:768px){.container{padding:0 20px}.grid-2,.grid-3,.grid-4,.impact-grid{grid-template-columns:1fr!important}.dept-wrap{grid-template-columns:1fr!important}.footer-grid{grid-template-columns:1fr 1fr!important}.hero{padding:100px 0 60px}.section{padding:60px 0}nav{padding:0 20px}body{overflow-x:hidden}}'
  ].join('');
  document.head.appendChild(s);

  /* ── Replace nav dropdowns with working links ── */
  var navMap = {
    'Platform': [
      ['Platform Overview', 'zuuz-platform-overview-v2.html'],
      ['AI Agents', 'zuuz-agent-library.html'],
      ['Workflow Automation', 'zuuz-workflow-automation.html'],
      ['Unified Search', 'zuuz-unified-search.html'],
      ['Decision Intelligence', 'zuuz-decision-intelligence.html'],
      ['Agent-to-Agent (A2A)', 'zuuz-a2a.html'],
      ['Universal Connectivity', 'zuuz-integrations.html'],
      ['Security & Governance', 'zuuz-security.html'],
      ['Pricing', 'pricing/index.html']
    ],
    'Solutions': [
      ['By Industry', 'zuuz-solutions-industry.html'],
      ['By Role', 'zuuz-solutions-role.html'],
      ['By Use Case', 'zuuz-solutions-usecase.html'],
      ['ROI Calculator', 'zuuz-roi-calculator.html']
    ],
    'Why ZUUZ': [
      ['How ZUUZ Works', 'zuuz-how-zuuz-works.html'],
      ['Case Studies', 'zuuz-case-studies.html'],
      ['Comparison', 'zuuz-comparison.html'],
      ['Customer Stories', 'zuuz-case-studies.html']
    ],
    'Resources': [
      ['Blog', 'zuuz-blogs.html'],
      ['Documentation', 'zuuz-documentation.html'],
      ['API Reference', 'zuuz-api-reference.html'],
      ['Contact', 'zuuz-contact.html']
    ]
  };

  document.querySelectorAll('.nav-item').forEach(function (item) {
    var link = item.querySelector('.nav-link');
    if (!link) return;
    var label = link.textContent.replace(/[▾\s]/g, '').trim();
    var entries = navMap[label];
    if (!entries) return;

    /* rebuild dropdown with real hrefs */
    var dd = item.querySelector('.dropdown');
    if (dd) {
      dd.innerHTML = entries.map(function (e) {
        return '<a href="' + e[1] + '">' + e[0] + '</a>';
      }).join('');
    }

    /* click toggle */
    link.addEventListener('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.nav-item.open').forEach(function (o) { o.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  /* close on outside click */
  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-item.open').forEach(function (o) { o.classList.remove('open'); });
  });

  /* ── Hamburger button ── */
  var navEl = document.getElementById('nav');
  if (navEl) {
    var burger = document.createElement('button');
    burger.id = 'nav-burger';
    burger.setAttribute('aria-label', 'Open menu');
    burger.innerHTML = '<span></span><span></span><span></span>';
    navEl.appendChild(burger);
  }

  /* ── Mobile nav ── */
  var mob = document.createElement('div');
  mob.id = 'mobile-nav';
  mob.innerHTML = '<button class="mob-close" id="mob-close">&times;</button>' +
    '<div class="mob-links">' +
    '<div class="mob-section-title">Platform</div>' +
    '<a href="zuuz-platform-overview-v2.html">Platform Overview</a>' +
    '<a href="zuuz-agent-library.html">AI Agents</a>' +
    '<a href="zuuz-integrations.html">Integrations</a>' +
    '<a href="zuuz-security.html">Security & Governance</a>' +
    '<div class="mob-section-title">Solutions</div>' +
    '<a href="zuuz-solutions-industry.html">By Industry</a>' +
    '<a href="zuuz-solutions-role.html">By Role</a>' +
    '<a href="zuuz-solutions-usecase.html">By Use Case</a>' +
    '<div class="mob-section-title">Why ZUUZ</div>' +
    '<a href="zuuz-how-zuuz-works.html">How ZUUZ Works</a>' +
    '<a href="zuuz-case-studies.html">Case Studies</a>' +
    '<a href="zuuz-roi-calculator.html">ROI Calculator</a>' +
    '<div class="mob-section-title">Resources</div>' +
    '<a href="zuuz-blogs.html">Blog</a>' +
    '<a href="zuuz-documentation.html">Docs</a>' +
    '<a href="zuuz-contact.html">Contact</a>' +
    '<a href="zuuz-company.html">About</a>' +
    '<a href="pricing/index.html">Pricing</a>' +
    '</div>' +
    '<div class="mob-ctas">' +
    '<a href="zuuz-signin.html" class="mob-btn-g">Sign in</a>' +
    '<a href="zuuz-book-demo.html" class="mob-btn-p">Book a demo &rarr;</a>' +
    '</div>';
  document.body.appendChild(mob);

  document.getElementById('nav-burger') && document.getElementById('nav-burger').addEventListener('click', function (e) {
    e.stopPropagation();
    mob.classList.add('open');
  });
  document.getElementById('mob-close').addEventListener('click', function () { mob.classList.remove('open'); });

  /* ── Industry card clicks ── */
  var indLinks = ['zuuz-solutions-industry.html','zuuz-solutions-industry.html','zuuz-solutions-industry.html','zuuz-solutions-industry.html','zuuz-solutions-industry.html','zuuz-solutions-industry.html'];
  document.querySelectorAll('.ind-card').forEach(function (c, i) {
    c.style.cursor = 'pointer';
    c.addEventListener('click', function () { window.location.href = indLinks[i] || 'zuuz-solutions-industry.html'; });
  });

  /* ── Nav scroll class ── */
  window.addEventListener('scroll', function () {
    var n = document.getElementById('nav');
    if (n) n.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

})();
