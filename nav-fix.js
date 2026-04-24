(function(){
'use strict';

/* ── Full nav map ── */
var NAV = [
  { label:'Platform', items:[
    ['Platform Overview','zuuz-platform-overview-v2.html'],
    ['AI Agents','zuuz-agent-library.html'],
    ['Workflow Automation','zuuz-workflow-automation.html'],
    ['Unified Search','zuuz-unified-search.html'],
    ['Decision Intelligence','zuuz-decision-intelligence.html'],
    ['Agent-to-Agent (A2A)','zuuz-a2a.html'],
    ['Universal Connectivity','zuuz-integrations.html'],
    ['Security & Governance','zuuz-security-governance.html']
  ]},
  { label:'Solutions', items:[
    ['By Industry','zuuz-solutions-industry.html'],
    ['By Role','zuuz-solutions-role.html'],
    ['By Use Case','zuuz-solutions-usecase.html'],
    ['ROI Calculator','zuuz-roi-calculator.html']
  ]},
  { label:'Why ZUUZ', items:[
    ['How ZUUZ Works','zuuz-how-zuuz-works.html'],
    ['Case Studies','zuuz-case-studies.html'],
    ['vs Copilot & ChatGPT','zuuz-vs-chatbots-copilots.html'],
    ['vs Legacy Tools','zuuz-vs-legacy-workflow-tools.html'],
    ['vs ERP/CRM','zuuz-vs-erp-crm.html']
  ]},
  { label:'Resources', items:[
    ['Blog','zuuz-blogs.html'],
    ['Documentation','zuuz-documentation.html'],
    ['API Reference','zuuz-api-reference.html'],
    ['Webinars & Events','zuuz-webinars-events.html'],
    ['Contact','zuuz-contact.html']
  ]}
];

/* ── CSS ── */
var css = [
  'nav{position:fixed;top:0;left:0;right:0;z-index:1000;height:64px;padding:0 40px;display:flex;align-items:center;justify-content:space-between;transition:background .3s}',
  'nav.scrolled{background:rgba(8,8,16,.95);backdrop-filter:blur(16px);border-bottom:1px solid #1a1a2e}',
  '.zn-logo{font-size:22px;font-weight:900;color:#fff;text-decoration:none;letter-spacing:-.04em;font-style:italic;cursor:pointer}',
  '.zn-links{display:flex;align-items:center;gap:4px}',
  '.zn-item{position:relative}',
  '.zn-trigger{background:none;border:none;cursor:pointer;font-family:Montserrat,sans-serif;font-size:13px;font-weight:500;color:#888899;padding:8px 14px;border-radius:4px;display:flex;align-items:center;gap:4px;transition:color .15s}',
  '.zn-trigger:hover,.zn-item.open .zn-trigger{color:#fff}',
  '.zn-arrow{font-size:10px;transition:transform .2s;display:inline-block}',
  '.zn-item.open .zn-arrow{transform:rotate(180deg)}',
  '.zn-dd{display:none;position:absolute;top:calc(100% + 8px);left:0;background:#0d0d18;border:1px solid #1a1a2e;border-radius:10px;padding:8px;min-width:220px;box-shadow:0 24px 48px rgba(0,0,0,.6);z-index:1001}',
  '.zn-item.open .zn-dd{display:block}',
  '.zn-dd-btn{display:block;width:100%;text-align:left;background:none;border:none;cursor:pointer;font-family:Montserrat,sans-serif;font-size:13px;font-weight:500;color:#888899;padding:9px 14px;border-radius:6px;transition:background .15s}',
  '.zn-dd-btn:hover{background:rgba(255,255,255,.07);color:#fff}',
  '.zn-about{background:none;border:none;cursor:pointer;font-family:Montserrat,sans-serif;font-size:13px;font-weight:500;color:#888899;padding:8px 14px;border-radius:4px;transition:color .15s}',
  '.zn-about:hover{color:#fff}',
  '.zn-ctas{display:flex;align-items:center;gap:8px}',
  '.zn-signin{background:none;border:none;cursor:pointer;font-family:Montserrat,sans-serif;font-size:13px;font-weight:600;color:#fff;padding:8px 16px;border-radius:6px;transition:background .15s}',
  '.zn-signin:hover{background:rgba(255,255,255,.07)}',
  '.zn-demo{background:#0018FF;border:none;cursor:pointer;font-family:Montserrat,sans-serif;font-size:13px;font-weight:700;color:#fff;padding:10px 20px;border-radius:6px;transition:filter .15s}',
  '.zn-demo:hover{filter:brightness(1.15)}',
  '.zn-burger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px}',
  '.zn-burger span{display:block;width:22px;height:2px;background:#fff;border-radius:2px}',
  '#zn-mob{display:none;position:fixed;inset:0;background:rgba(8,8,16,.98);z-index:9999;padding:72px 24px 40px;overflow-y:auto}',
  '#zn-mob.open{display:block}',
  '.zn-mob-x{position:fixed;top:18px;right:20px;background:none;border:none;color:#fff;font-size:30px;cursor:pointer;line-height:1;z-index:10000}',
  '.zn-mob-sec{font-size:10px;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:#555570;padding:16px 0 6px}',
  '.zn-mob-link{display:block;font-size:16px;font-weight:700;color:#fff;padding:11px 0;border-bottom:1px solid #1a1a2e;background:none;border-top:none;border-left:none;border-right:none;cursor:pointer;font-family:Montserrat,sans-serif;text-align:left;width:100%}',
  '.zn-mob-link:hover{color:#a3f3ff}',
  '.zn-mob-ctas{display:flex;flex-direction:column;gap:12px;margin-top:28px}',
  '.zn-mob-ctas button{display:block;width:100%;padding:14px;border-radius:8px;font-family:Montserrat,sans-serif;font-weight:700;font-size:15px;cursor:pointer;border:none}',
  '.zn-mob-p{background:#0018FF;color:#fff}',
  '.zn-mob-g{background:transparent;border:1px solid #333!important;color:#fff}',
  '@media(max-width:900px){.zn-links,.zn-ctas{display:none!important}.zn-burger{display:flex!important}}',
  '@media(max-width:768px){body{overflow-x:hidden}.container{padding:0 20px!important}.grid-2,.grid-3,.grid-4,.impact-grid{grid-template-columns:1fr!important}.dept-wrap{grid-template-columns:1fr!important}.footer-grid{grid-template-columns:1fr 1fr!important}.hero{padding:100px 0 60px!important}.section{padding:60px 0!important}}'
].join('');
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

/* ── Replace entire nav ── */
var oldNav=document.getElementById('nav')||document.querySelector('nav');
if(!oldNav) return;

var nav=document.createElement('nav');
nav.id='nav';

/* Logo */
var logo=document.createElement('button');
logo.className='zn-logo';
logo.textContent='ZUUZ';
logo.onclick=function(){window.location.href='/';};
nav.appendChild(logo);

/* Links */
var links=document.createElement('div');
links.className='zn-links';

NAV.forEach(function(section){
  var item=document.createElement('div');
  item.className='zn-item';

  var trig=document.createElement('button');
  trig.className='zn-trigger';
  trig.innerHTML=section.label+' <span class="zn-arrow">&#9660;</span>';
  trig.onclick=function(e){
    e.stopPropagation();
    var isOpen=item.classList.contains('open');
    document.querySelectorAll('.zn-item.open').forEach(function(o){o.classList.remove('open');});
    if(!isOpen) item.classList.add('open');
  };
  item.appendChild(trig);

  var dd=document.createElement('div');
  dd.className='zn-dd';
  section.items.forEach(function(e){
    var btn=document.createElement('button');
    btn.className='zn-dd-btn';
    btn.textContent=e[0];
    btn.onclick=function(ev){ev.stopPropagation();window.location.href=e[1];};
    dd.appendChild(btn);
  });
  item.appendChild(dd);
  links.appendChild(item);
});

/* About */
var about=document.createElement('button');
about.className='zn-about';
about.textContent='About';
about.onclick=function(){window.location.href='zuuz-company.html';};
links.appendChild(about);

nav.appendChild(links);

/* CTAs */
var ctas=document.createElement('div');
ctas.className='zn-ctas';
var signin=document.createElement('button');
signin.className='zn-signin';
signin.textContent='Sign in';
signin.onclick=function(){window.location.href='zuuz-signin.html';};
var demo=document.createElement('button');
demo.className='zn-demo';
demo.textContent='Book a demo →';
demo.onclick=function(){window.location.href='zuuz-book-demo.html';};
ctas.appendChild(signin);
ctas.appendChild(demo);
nav.appendChild(ctas);

/* Burger */
var burger=document.createElement('button');
burger.className='zn-burger';
burger.setAttribute('aria-label','Menu');
burger.innerHTML='<span></span><span></span><span></span>';
burger.onclick=function(e){e.stopPropagation();document.getElementById('zn-mob').classList.add('open');};
nav.appendChild(burger);

oldNav.parentNode.replaceChild(nav,oldNav);

/* Close dropdowns on outside click */
document.addEventListener('click',function(){
  document.querySelectorAll('.zn-item.open').forEach(function(o){o.classList.remove('open');});
});

/* Scroll */
window.addEventListener('scroll',function(){
  nav.classList.toggle('scrolled',window.scrollY>30);
},{passive:true});

/* ── Mobile nav ── */
var mob=document.createElement('div');
mob.id='zn-mob';
var mobHTML='<button class="zn-mob-x" onclick="document.getElementById(\'zn-mob\').classList.remove(\'open\')">&#10005;</button>';
NAV.forEach(function(section){
  mobHTML+='<div class="zn-mob-sec">'+section.label+'</div>';
  section.items.forEach(function(e){
    mobHTML+='<button class="zn-mob-link" onclick="window.location.href=\''+e[1]+'\'">'+e[0]+'</button>';
  });
});
mobHTML+='<button class="zn-mob-link" onclick="window.location.href=\'zuuz-company.html\'">About</button>';
mobHTML+='<button class="zn-mob-link" onclick="window.location.href=\'pricing/index.html\'">Pricing</button>';
mobHTML+='<div class="zn-mob-ctas">';
mobHTML+='<button class="zn-mob-g" onclick="window.location.href=\'zuuz-signin.html\'">Sign in</button>';
mobHTML+='<button class="zn-mob-p" onclick="window.location.href=\'zuuz-book-demo.html\'">Book a demo →</button>';
mobHTML+='</div>';
mob.innerHTML=mobHTML;
document.body.appendChild(mob);

/* Industry cards */
document.querySelectorAll('.ind-card').forEach(function(c){
  c.style.cursor='pointer';
  c.addEventListener('click',function(){window.location.href='zuuz-solutions-industry.html';});
});

})();
