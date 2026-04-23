(function () {
  'use strict';

  /* ─ CSS ─ */
  var s = document.createElement('style');
  s.textContent =
    '#nav-burger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px;z-index:200}' +
    '#nav-burger span{display:block;width:24px;height:2px;background:#fff;border-radius:2px;transition:all .3s}' +
    '#mob-nav{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(8,8,16,.97);z-index:9999;padding:80px 24px 40px;overflow-y:auto}' +
    '#mob-nav.open{display:block}' +
    '.mob-x{position:fixed;top:20px;right:20px;background:none;border:none;color:#fff;font-size:32px;cursor:pointer;line-height:1;z-index:10000}' +
    '.mob-links a{display:block;font-size:17px;font-weight:700;color:#fff;padding:13px 0;border-bottom:1px solid #1a1a2e;text-decoration:none;cursor:pointer}' +
    '.mob-links a:hover{color:#a3f3ff}' +
    '.mob-sec{font-size:10px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:#555570;padding:16px 0 6px}' +
    '.mob-ctas{display:flex;flex-direction:column;gap:12px;margin-top:28px}' +
    '.mob-ctas a{display:block;text-align:center;padding:14px;border-radius:8px;font-weight:700;font-size:15px;text-decoration:none;cursor:pointer}' +
    '.mob-p{background:#0018FF;color:#fff}' +
    '.mob-g{border:1px solid #333;color:#fff}' +
    '.nav-item.ddopen .dropdown{display:block!important;pointer-events:all!important}' +
    '.dropdown{pointer-events:none}' +
    '.dropdown button.dd-btn{display:block;width:100%;text-align:left;padding:9px 14px;border-radius:6px;font-size:13px;font-weight:500;color:#888899;background:none;border:none;cursor:pointer;font-family:Montserrat,sans-serif;transition:background .15s}' +
    '.dropdown button.dd-btn:hover{background:rgba(255,255,255,.06);color:#fff}' +
    '@media(max-width:900px){.nav-links,.nav-ctas{display:none!important}#nav-burger{display:flex!important}}' +
    '@media(max-width:768px){.container{padding:0 20px!important}.grid-2,.grid-3,.grid-4,.impact-grid{grid-template-columns:1fr!important}.dept-wrap{grid-template-columns:1fr!important}.footer-grid{grid-template-columns:1fr 1fr!important}.hero{padding:100px 0 60px!important}.section{padding:60px 0!important}nav{padding:0 20px!important}body{overflow-x:hidden!important}}';
  document.head.appendChild(s);

  /* ─ Nav map ─ */
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

  /* ─ Wire dropdowns ─ */
  document.querySelectorAll('.nav-item').forEach(function(item){
    var trigger = item.querySelector('.nav-link');
    if (!trigger) return;
    var raw = trigger.textContent.replace(/\s+/g,'').toLowerCase();
    var key = Object.keys(navMap).find(function(k){
      return raw.indexOf(k.replace(/\s/g,'').toLowerCase()) !== -1;
    });
    var entries = key ? navMap[key] : null;
    var dd = item.querySelector('.dropdown');

    /* replace dropdown contents with <button> elements that use window.location */
    if (entries && dd) {
      dd.innerHTML = entries.map(function(e){
        return '<button class="dd-btn" data-href="'+e[1]+'">'+e[0]+'</button>';
      }).join('');
      dd.querySelectorAll('.dd-btn').forEach(function(btn){
        btn.addEventListener('click', function(ev){
          ev.stopPropagation();
          window.location.href = btn.getAttribute('data-href');
        });
      });
    }

    /* toggle open */
    trigger.addEventListener('click', function(ev){
      ev.stopPropagation();
      var isOpen = item.classList.contains('ddopen');
      document.querySelectorAll('.nav-item.ddopen').forEach(function(o){o.classList.remove('ddopen');});
      if (!isOpen) item.classList.add('ddopen');
    });
  });

  document.addEventListener('click', function(){
    document.querySelectorAll('.nav-item.ddopen').forEach(function(o){o.classList.remove('ddopen');});
  });

  /* ─ Hamburger ─ */
  var navEl = document.getElementById('nav');
  if (navEl) {
    var burger = document.createElement('button');
    burger.id = 'nav-burger';
    burger.setAttribute('aria-label','Open menu');
    burger.innerHTML = '<span></span><span></span><span></span>';
    navEl.appendChild(burger);
  }

  /* ─ Mobile nav ─ */
  var mob = document.createElement('div');
  mob.id = 'mob-nav';
  var mobLinks = [
    ['zuuz-platform-overview-v2.html','Platform Overview'],
    ['zuuz-agent-library.html','AI Agents'],
    ['zuuz-integrations.html','Integrations'],
    ['zuuz-security.html','Security'],
    ['SECT','Solutions'],
    ['zuuz-solutions-industry.html','By Industry'],
    ['zuuz-solutions-role.html','By Role'],
    ['zuuz-solutions-usecase.html','By Use Case'],
    ['SECT','Why ZUUZ'],
    ['zuuz-how-zuuz-works.html','How ZUUZ Works'],
    ['zuuz-case-studies.html','Case Studies'],
    ['zuuz-roi-calculator.html','ROI Calculator'],
    ['SECT','Resources'],
    ['zuuz-blogs.html','Blog'],
    ['zuuz-documentation.html','Docs'],
    ['zuuz-contact.html','Contact'],
    ['zuuz-company.html','About'],
    ['pricing/index.html','Pricing']
  ];
  var mobHTML = '<button class="mob-x" id="mob-x">&times;</button><div class="mob-links">';
  mobHTML += '<div class="mob-sec">Platform</div>';
  mobLinks.forEach(function(l){
    if (l[0]==='SECT') { mobHTML += '<div class="mob-sec">'+l[1]+'</div>'; }
    else { mobHTML += '<a onclick="window.location.href=\''+l[0]+'\'">'+l[1]+'</a>'; }
  });
  mobHTML += '</div><div class="mob-ctas">';
  mobHTML += '<a class="mob-g" onclick="window.location.href=\'zuuz-signin.html\'">Sign in</a>';
  mobHTML += '<a class="mob-p" onclick="window.location.href=\'zuuz-book-demo.html\'">Book a demo &rarr;</a>';
  mobHTML += '</div>';
  mob.innerHTML = mobHTML;
  document.body.appendChild(mob);

  var bEl = document.getElementById('nav-burger');
  if (bEl) bEl.addEventListener('click', function(e){ e.stopPropagation(); mob.classList.add('open'); });
  document.getElementById('mob-x').addEventListener('click', function(){ mob.classList.remove('open'); });

  /* ─ Industry cards ─ */
  document.querySelectorAll('.ind-card').forEach(function(c){
    c.style.cursor='pointer';
    c.addEventListener('click', function(){ window.location.href='zuuz-solutions-industry.html'; });
  });

  /* ─ Scroll ─ */
  window.addEventListener('scroll', function(){
    var n=document.getElementById('nav');
    if(n) n.classList.toggle('scrolled',window.scrollY>30);
  },{passive:true});

})();
