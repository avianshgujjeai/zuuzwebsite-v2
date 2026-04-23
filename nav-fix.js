(function () {
  'use strict';

  /* ── CSS ── */
  var s = document.createElement('style');
  s.textContent = [
    '#nav-burger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;z-index:200}',
    '#nav-burger span{display:block;width:24px;height:2px;background:#fff;border-radius:2px;transition:all .3s}',
    '#mob-nav{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(8,8,16,.97);z-index:999;padding:80px 24px 40px;overflow-y:auto}',
    '#mob-nav.open{display:block}',
    '.mob-x{position:absolute;top:20px;right:20px;background:none;border:none;color:#fff;font-size:32px;cursor:pointer;line-height:1;z-index:1000}',
    '.mob-links a{display:block;font-size:17px;font-weight:700;color:#fff;padding:13px 0;border-bottom:1px solid #1a1a2e;text-decoration:none}',
    '.mob-links a:hover{color:#a3f3ff}',
    '.mob-sec{font-size:10px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:#555570;padding:16px 0 6px}',
    '.mob-ctas{display:flex;flex-direction:column;gap:12px;margin-top:28px}',
    '.mob-ctas a{display:block;text-align:center;padding:14px;border-radius:8px;font-weight:700;font-size:15px;text-decoration:none}',
    '.mob-p{background:#0018FF;color:#fff}',
    '.mob-g{border:1px solid #333;color:#fff}',
    '.nav-item.open .dropdown{display:block!important;z-index:200}',
    '.dropdown a{display:block!important;padding:9px 14px;border-radius:6px;font-size:13px;font-weight:500;color:#888899;text-decoration:none!important;transition:background .15s;cursor:pointer}',
    '.dropdown a:hover{background:rgba(255,255,255,.06);color:#fff}',
    '@media(max-width:900px){.nav-links,.nav-ctas{display:none!important}#nav-burger{display:flex!important}}',
    '@media(max-width:768px){.container{padding:0 20px}.grid-2,.grid-3,.grid-4,.impact-grid{grid-template-columns:1fr!important}.dept-wrap{grid-template-columns:1fr!important}.footer-grid{grid-template-columns:1fr 1fr!important}.hero{padding:100px 0 60px}.section{padding:60px 0}nav{padding:0 20px}body{overflow-x:hidden}}'
  ].join('');
  document.head.appendChild(s);

  /* ── Nav dropdown map ── */
  var navMap = {
    'Platform': [
      ['Platform Overview','zuuz-platform-overview-v2.html'],
      ['AI Agents','zuuz-agent-library.html'],
      ['Workflow Automation','zuuz-workflow-automation.html'],
      ['Unified Search','zuuz-unified-search.html'],
      ['Decision Intelligence','zuuz-decision-intelligence.html'],
      ['Agent-to-Agent (A2A)','zuuz-a2a.html'],
      ['Universal Connectivity','zuuz-integrations.html'],
      ['Security & Governance','zuuz-security.html'],
      ['Pricing','pricing/index.html']
    ],
    'Solutions': [
      ['By Industry','zuuz-solutions-industry.html'],
      ['By Role','zuuz-solutions-role.html'],
      ['By Use Case','zuuz-solutions-usecase.html'],
      ['ROI Calculator','zuuz-roi-calculator.html']
    ],
    'WhyZUUZ': [
      ['How ZUUZ Works','zuuz-how-zuuz-works.html'],
      ['Case Studies','zuuz-case-studies.html'],
      ['Comparison','zuuz-comparison.html']
    ],
    'Resources': [
      ['Blog','zuuz-blogs.html'],
      ['Documentation','zuuz-documentation.html'],
      ['API Reference','zuuz-api-reference.html'],
      ['Contact','zuuz-contact.html']
    ]
  };

  document.querySelectorAll('.nav-item').forEach(function (item) {
    var trigger = item.querySelector('.nav-link');
    if (!trigger) return;

    /* get label stripping arrows and spaces */
    var raw = trigger.textContent.replace(/\s+/g,'');
    /* match key flexibly */
    var key = Object.keys(navMap).find(function(k){
      return raw.toLowerCase().indexOf(k.replace(/\s/g,'').toLowerCase()) !== -1;
    });
    var entries = key ? navMap[key] : null;

    /* rebuild dropdown html with real hrefs */
    if (entries) {
      var dd = item.querySelector('.dropdown');
      if (dd) {
        dd.innerHTML = entries.map(function(e){
          return '<a href="'+e[1]+'">'+e[0]+'</a>';
        }).join('');
      }
    }

    /* toggle open on trigger click only */
    trigger.addEventListener('click', function (e) {
      /* if click came from a child anchor, let it navigate */
      if (e.target.tagName === 'A' && e.target !== trigger) return;
      e.stopPropagation();
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.nav-item.open').forEach(function(o){o.classList.remove('open');});
      if (!isOpen) item.classList.add('open');
    });
  });

  /* close on outside click */
  document.addEventListener('click', function(){
    document.querySelectorAll('.nav-item.open').forEach(function(o){o.classList.remove('open');});
  });

  /* ── Hamburger ── */
  var navEl = document.getElementById('nav');
  if (navEl) {
    var burger = document.createElement('button');
    burger.id = 'nav-burger';
    burger.setAttribute('aria-label','Open menu');
    burger.innerHTML = '<span></span><span></span><span></span>';
    navEl.appendChild(burger);
  }

  /* ── Mobile nav ── */
  var mob = document.createElement('div');
  mob.id = 'mob-nav';
  mob.innerHTML = '<button class="mob-x" id="mob-x">&times;</button>'+
    '<div class="mob-links">'+
    '<div class="mob-sec">Platform</div>'+
    '<a href="zuuz-platform-overview-v2.html">Platform Overview</a>'+
    '<a href="zuuz-agent-library.html">AI Agents</a>'+
    '<a href="zuuz-integrations.html">Integrations</a>'+
    '<a href="zuuz-security.html">Security</a>'+
    '<div class="mob-sec">Solutions</div>'+
    '<a href="zuuz-solutions-industry.html">By Industry</a>'+
    '<a href="zuuz-solutions-role.html">By Role</a>'+
    '<a href="zuuz-solutions-usecase.html">By Use Case</a>'+
    '<div class="mob-sec">Why ZUUZ</div>'+
    '<a href="zuuz-how-zuuz-works.html">How ZUUZ Works</a>'+
    '<a href="zuuz-case-studies.html">Case Studies</a>'+
    '<a href="zuuz-roi-calculator.html">ROI Calculator</a>'+
    '<div class="mob-sec">Resources</div>'+
    '<a href="zuuz-blogs.html">Blog</a>'+
    '<a href="zuuz-documentation.html">Docs</a>'+
    '<a href="zuuz-contact.html">Contact</a>'+
    '<a href="zuuz-company.html">About</a>'+
    '<a href="pricing/index.html">Pricing</a>'+
    '</div>'+
    '<div class="mob-ctas">'+
    '<a href="zuuz-signin.html" class="mob-g">Sign in</a>'+
    '<a href="zuuz-book-demo.html" class="mob-p">Book a demo &rarr;</a>'+
    '</div>';
  document.body.appendChild(mob);

  var bEl = document.getElementById('nav-burger');
  if (bEl) bEl.addEventListener('click', function(e){ e.stopPropagation(); mob.classList.add('open'); });
  document.getElementById('mob-x').addEventListener('click', function(){ mob.classList.remove('open'); });

  /* ── Industry cards ── */
  document.querySelectorAll('.ind-card').forEach(function(c){
    c.style.cursor='pointer';
    c.addEventListener('click', function(){ window.location.href='zuuz-solutions-industry.html'; });
  });

  /* ── Scroll ── */
  window.addEventListener('scroll', function(){
    var n=document.getElementById('nav');
    if(n) n.classList.toggle('scrolled',window.scrollY>30);
  },{passive:true});

})();
