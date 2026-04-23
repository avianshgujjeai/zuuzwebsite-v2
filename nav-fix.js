(function () {
  'use strict';

  /* ── 1. Inject mobile nav CSS ── */
  var style = document.createElement('style');
  style.textContent = [
    '/* Mobile nav CSS */',
    '#nav-burger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;z-index:200;}',
    '#nav-burger span{display:block;width:24px;height:2px;background:#fff;border-radius:2px;transition:all .3s;}',
    '#mobile-nav{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(8,8,16,.97);z-index:150;padding:80px 24px 40px;overflow-y:auto;}',
    '#mobile-nav.open{display:block;}',
    '.mobile-nav-close{position:absolute;top:20px;right:20px;background:none;border:none;color:#fff;font-size:28px;cursor:pointer;line-height:1;}',
    '.mobile-nav-links a{display:block;font-size:18px;font-weight:700;color:#fff;padding:14px 0;border-bottom:1px solid #1a1a2e;text-decoration:none;}',
    '.mobile-nav-links a:hover{color:#a3f3ff;}',
    '.mobile-nav-section{margin-bottom:8px;}',
    '.mobile-nav-section-title{font-size:11px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:#555570;padding:16px 0 8px;}',
    '.mobile-nav-ctas{display:flex;flex-direction:column;gap:12px;margin-top:32px;}',
    '.mobile-nav-ctas a{display:block;text-align:center;padding:14px;border-radius:8px;font-weight:700;font-size:15px;}',
    '.mobile-btn-primary{background:#0018FF;color:#fff;}',
    '.mobile-btn-ghost{border:1px solid #1a1a2e;color:#fff;}',
    '/* Dropdown open state */',
    '.nav-item.open .dropdown{display:block !important;}',
    '/* Responsive */',
    '@media(max-width:900px){',
    '  .nav-links,.nav-ctas{display:none !important;}',
    '  #nav-burger{display:flex !important;}',
    '}',
    '@media(max-width:768px){',
    '  .container{padding:0 20px;}',
    '  .grid-2,.grid-3,.grid-4,.impact-grid{grid-template-columns:1fr !important;}',
    '  .dept-wrap{grid-template-columns:1fr !important;}',
    '  .footer-grid{grid-template-columns:1fr 1fr !important;}',
    '  .hero{padding:100px 0 60px;}',
    '  .section{padding:60px 0;}',
    '  nav{padding:0 20px;}',
    '  body{overflow-x:hidden;}',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  /* ── 2. Inject mobile nav HTML ── */
  var mobileNav = document.createElement('div');
  mobileNav.id = 'mobile-nav';
  mobileNav.innerHTML = [
    '<button class="mobile-nav-close" id="mobile-nav-close" aria-label="Close menu">&times;</button>',
    '<div class="mobile-nav-links">',
    '  <div class="mobile-nav-section">',
    '    <div class="mobile-nav-section-title">Platform</div>',
    '    <a href="zuuz-platform-overview-v2.html">Platform Overview</a>',
    '    <a href="zuuz-agent-library.html">Agent Library</a>',
    '    <a href="zuuz-integrations.html">Integrations</a>',
    '    <a href="zuuz-security.html">Security & Compliance</a>',
    '  </div>',
    '  <div class="mobile-nav-section">',
    '    <div class="mobile-nav-section-title">Solutions</div>',
    '    <a href="zuuz-solutions-industry.html">By Industry</a>',
    '    <a href="zuuz-solutions-role.html">By Role</a>',
    '    <a href="zuuz-solutions-usecase.html">By Use Case</a>',
    '  </div>',
    '  <div class="mobile-nav-section">',
    '    <div class="mobile-nav-section-title">Why ZUUZ</div>',
    '    <a href="zuuz-roi-calculator.html">ROI Calculator</a>',
    '    <a href="zuuz-case-studies.html">Case Studies</a>',
    '    <a href="zuuz-comparison.html">Comparison</a>',
    '  </div>',
    '  <div class="mobile-nav-section">',
    '    <div class="mobile-nav-section-title">Resources</div>',
    '    <a href="zuuz-blogs.html">Blog</a>',
    '    <a href="zuuz-docs.html">Documentation</a>',
    '    <a href="zuuz-contact.html">Contact</a>',
    '  </div>',
    '  <a href="zuuz-company.html">About</a>',
    '  <a href="pricing/index.html">Pricing</a>',
    '</div>',
    '<div class="mobile-nav-ctas">',
    '  <a href="zuuz-signin.html" class="mobile-btn-ghost">Sign in</a>',
    '  <a href="zuuz-book-demo.html" class="mobile-btn-primary">Book a demo &rarr;</a>',
    '</div>'
  ].join('\n');
  document.body.appendChild(mobileNav);

  /* ── 3. Inject hamburger button into nav ── */
  var navEl = document.getElementById('nav');
  if (navEl) {
    var burger = document.createElement('button');
    burger.id = 'nav-burger';
    burger.setAttribute('aria-label', 'Open menu');
    burger.innerHTML = '<span></span><span></span><span></span>';
    navEl.appendChild(burger);

    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileNav.classList.add('open');
    });
  }

  /* ── 4. Close mobile nav ── */
  document.getElementById('mobile-nav-close').addEventListener('click', function () {
    mobileNav.classList.remove('open');
  });
  mobileNav.addEventListener('click', function (e) {
    if (e.target === mobileNav) mobileNav.classList.remove('open');
  });

  /* ── 5. Desktop dropdown click/tap toggle ── */
  document.querySelectorAll('.nav-item').forEach(function (item) {
    var link = item.querySelector('.nav-link');
    var dd = item.querySelector('.dropdown');
    if (!dd || !link) return;

    // Remove CSS hover — use JS open class instead
    link.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.nav-item.open').forEach(function (o) {
        o.classList.remove('open');
      });
      if (!isOpen) item.classList.add('open');
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-item.open').forEach(function (o) {
      o.classList.remove('open');
    });
  });

  /* ── 6. Fix industry card links ── */
  var indCards = document.querySelectorAll('.ind-card');
  var indLinks = [
    'zuuz-solutions-industry.html#retail',
    'zuuz-solutions-industry.html#banking',
    'zuuz-solutions-industry.html#healthcare',
    'zuuz-solutions-industry.html#manufacturing',
    'zuuz-solutions-industry.html#professional-services',
    'zuuz-solutions-industry.html#insurance'
  ];
  indCards.forEach(function (card, i) {
    if (indLinks[i]) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function () {
        window.location.href = indLinks[i];
      });
    }
  });

})();
