/* Browser-local demonstration. No real payment, authentication or message delivery. */
(() => {
  'use strict';
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const write = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };
  const SEED = globalThis.KRUZH_DATA;
  const KEY = 'kruzhki-demo-v1';
  let state = read(KEY, { activities: structuredClone(SEED.activities), bookings: [], profile: {}, applications: [] });
  let compare = read('kruzhki-compare', []);
  let comparisonGroups = read('kruzhki-compare-groups', {}), languageForms = null;
  let lang = read('kruzhki-lang', 'kk');
  let path = '', params = new URLSearchParams(), mobileMenu = false, accountTab = 'upcoming', organizerTab = 'groups';
  let draft = read('kruzhki-draft', {}), errors = {}, checkoutStep = 1, checkoutGroup = '';
  let toastTimer;
  const t = key => globalThis.KRUZH_I18N[lang][key] ?? key;
  const tr = obj => obj?.[lang] ?? '';
  const money = n => new Intl.NumberFormat({kk:'kk-KZ',ru:'ru-KZ',en:'en-KZ'}[lang], {maximumFractionDigits:0}).format(Number(n)) + ' ₸';
  const dates = d => new Intl.DateTimeFormat({kk:'kk-KZ',ru:'ru-KZ',en:'en-KZ'}[lang], {day:'numeric',month:'long',timeZone:'Asia/Almaty'}).format(new Date(d+'T12:00:00+05:00'));
  const url = (p = '', obj = null) => '#/' + lang + '/' + p + (obj && String(new URLSearchParams(obj)) ? '?' + new URLSearchParams(obj) : '');
  const activity = id => state.activities.find(a => a.id === id);
  const category = id => SEED.categories.find(a => a.id === id);
  const groupOf = id => state.activities.flatMap(a => a.groups.map(g => ({a,g}))).find(x => x.g.id === id);
  const save = () => write(KEY, state);
  const schedule = g => g.days.map(d => t('day'+d)).join(', ') + ' · ' + g.time;
  const ages = g => `${g.ageMin}–${g.ageMax} ${t('years')}`;
  const ageLabel = n => `${n} ${lang==='ru'? (n%100>=11&&n%100<=14?'лет':n%10===1?'год':n%10>=2&&n%10<=4?'года':'лет') : t('years')}`;
  const priceText = g => money(g.price) + ` <small>/ ${t(g.unit)}</small>`;
  const datePassed = g => new Date(g.nextDate+'T'+g.time+':00+05:00').getTime() < Date.now();
  function icon(name, cls = '') {
    const paths = {
      search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',pin:'<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
      user:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',check:'<path d="m5 12 4 4L19 6"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',chevron:'<path d="m8 10 4 4 4-4"/>',
      activity:'<circle cx="12" cy="12" r="9"/><path d="m7 6 4 3 5-1 2 4-3 5-6 1-3-5 1-7m4 3-2 5 6 3m-6-3-3-1m10-5-1 5 3-1"/>',
      palette:'<path d="M21 11a9 9 0 1 0-9 10h2a2 2 0 0 0 0-4 2 2 0 0 1 0-4h4a3 3 0 0 0 3-2Z"/><circle cx="7.5" cy="10" r=".7"/><circle cx="10" cy="6.5" r=".7"/><circle cx="14.5" cy="6.5" r=".7"/>',
      'music-2':'<path d="m10 4 9-2v14M10 4v14m0-10 9-2"/><ellipse cx="7" cy="18" rx="3" ry="2"/><ellipse cx="16" cy="16" rx="3" ry="2"/>',music:'<path d="M10 18V4l9-2v14"/><ellipse cx="7" cy="18" rx="3" ry="2"/><ellipse cx="16" cy="16" rx="3" ry="2"/>',
      bot:'<rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 3v4M1 12v4m22-4v4M9 16h6"/><circle cx="8" cy="12" r=".5"/><circle cx="16" cy="12" r=".5"/>',brain:'<path d="M12 5c-3-5-8-2-7 2-4 1-4 7-1 8-1 4 4 7 8 3m0-13c3-5 8-2 7 2 4 1 4 7 1 8 1 4-4 7-8 3V5M5 7l3 2m11-2-3 2M4 15l4-2m12 2-4-2"/>',
      compare:'<path d="M8 4v16M16 4v16M4 8h8m0 8h8"/><circle cx="8" cy="8" r="2" fill="white"/><circle cx="16" cy="16" r="2" fill="white"/>',heart:'<path d="M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-4 4 2 10 8 15C18 15 24 9 20 5Z"/>',
      shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',spark:'<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z"/>',filter:'<path d="M4 6h16M7 12h10m-7 6h4"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.2"/>',
      menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',plus:'<path d="M12 4v16M4 12h16"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',book:'<path d="M12 5C8 3 5 3 2 5v15c3-2 6-2 10 0 4-2 7-2 10 0V5c-3-2-6-2-10 0Zm0 0v15"/>'
    };
    return `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.spark}</svg>`;
  }
  function toast(message) { const el=$('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),4500); }
  function navigate(p='', obj=null) { const next=url(p,obj); if(location.hash===next) render(); else location.hash=next; }
  function parseRoute() {
    const raw=location.hash.replace(/^#\/?/,'').split('?'); const parts=raw[0].split('/');
    if(['kk','ru','en'].includes(parts[0])) { lang=parts.shift(); write('kruzhki-lang',lang); }
    path=parts.filter(Boolean).join('/'); params=new URLSearchParams(raw[1]||'');
    document.documentElement.lang=lang; document.title='Кружки.kz · '+(path.startsWith('catalog')?t('catalog'):path.startsWith('account')?t('account'):t('heroCaption'));
  }
  function header() {
    return `<header class="header"><div class="container header-inner"><a class="brand" href="${url()}" aria-label="Кружки.kz"><span class="brand-mark" aria-hidden="true"></span><span>Кружки<b>.kz</b></span></a><button class="city-btn" data-action="city">${icon('pin')}${t('almaty')}${icon('chevron')}</button><nav class="nav" aria-label="${t('catalog')}"><a class="${path==='catalog'?'active':''}" href="${url('catalog')}">${t('catalog')}</a><a class="how-link" href="${url('how')}">${t('how')}</a><a class="${path==='partners'?'active':''}" href="${url('partners')}">${t('partners')}</a></nav><div class="langs" aria-label="${t('language')}">${['kk','ru','en'].map((l,i)=>`<button data-lang="${l}" class="${l===lang?'active':''}" aria-pressed="${l===lang}" lang="${l}">${['ҚАЗ','РУС','ENG'][i]}</button>`).join('')}</div><a class="account-btn" href="${url('account')}">${icon('user')}<span>${t('account')}</span></a><button class="menu-btn" data-action="menu" aria-label="${t('catalog')}" aria-expanded="${mobileMenu}">${icon(mobileMenu?'close':'menu')}</button></div></header>${mobileMenu?`<nav class="mobile-nav"><a href="${url('catalog')}">${t('catalog')}</a><a href="${url('how')}">${t('how')}</a><a href="${url('partners')}">${t('partners')}</a><a href="${url('account')}">${t('account')}</a><button class="subtle-link" data-action="city">${t('almaty')}</button></nav>`:''}`;
  }
  function footer() { return `<footer class="footer"><div class="container"><div class="footer-top"><div><a class="brand" href="${url()}"><span class="brand-mark" aria-hidden="true"></span><span>Кружки<b>.kz</b></span></a><p>${t('footerLine')}</p></div><div class="footer-links"><a href="${url('catalog')}">${t('catalog')}</a><a href="${url('partners')}">${t('partners')}</a><button data-action="contact">${t('contact')}</button></div></div><div class="footer-bottom"><span>© 2026 Кружки.kz · ${t('footerDemo')}</span><span>${t('demo')} · ${t('testPayment')}</span></div></div></footer>`; }
  const demoNote = text => `<div class="demo-note">${icon('info')}<span>${text || t('demoDesc')}</span></div>`;
  const crumb = label => `<div class="breadcrumbs"><a href="${url()}">${t('home')}</a><span>${label}</span></div>`;
  const districtOptions = selected => `<option value="">${t('allDistricts')}</option>${['bostandyk','medeu','almaly','auezov'].map(d=>`<option value="${d}" ${selected===d?'selected':''}>${t(d)}</option>`).join('')}`;
  const ageOptions = selected => `<option value="">${t('anyAge')}</option>${Array.from({length:63},(_,i)=>i+3).map(n=>`<option value="${n}" ${Number(selected)===n?'selected':''}>${ageLabel(n)}</option>`).join('')}`;
  function card(a, groups=a.groups) {
    const g=[...groups].filter(g=>g.available>0).sort((a,b)=>a.price-b.price)[0] || [...groups].sort((a,b)=>a.price-b.price)[0];
    const minAge=Math.min(...groups.map(g=>g.ageMin)),maxAge=Math.max(...groups.map(g=>g.ageMax));
    const inCompare=compare.includes(a.id); const target=url('activity/'+a.id,{g:g.id});
    return `<article class="activity-card"><a class="card-image-wrap" style="display:block" href="${target}" tabindex="-1"><img class="card-image" src="${a.image}" alt="${esc(tr(a.title))}" loading="lazy" width="800" height="500"><span class="pill card-badge">${tr(category(a.category).name)}</span>${a.promoted?`<span class="pill card-badge sponsored">${t('promoted')}</span>`:''}</a><div class="card-body"><p class="card-org">${esc(tr(a.org))}</p><h3 class="card-title"><a href="${target}">${esc(tr(a.title))}</a></h3><div class="card-meta">${icon('pin')}${t(a.district)} · ${t('almaty')}</div><div class="card-meta">${icon('user')}${minAge}–${maxAge} ${t('years')}</div><div class="card-meta">${icon('calendar')}${schedule(g)}</div><div class="card-bottom"><div><div class="price">${priceText(g)}</div><div class="availability ${g.available===0?'sold':''}">${g.available>0?`${t('spots')}: ${g.available}`:t('full')}</div></div></div><div class="card-actions"><a class="btn primary small" href="${target}">${t('chooseGroup')}</a><button class="compare-btn ${inCompare?'selected':''}" data-action="compare" data-id="${a.id}" data-group="${g.id}" aria-label="${t(inCompare?'compared':'compare')}: ${esc(tr(a.title))}" title="${t(inCompare?'compared':'compare')}" aria-pressed="${inCompare}">${icon('compare')}</button></div></div></article>`;
  }
  function howBlock() { return `<section id="how" class="how-section"><div class="how-grid"><div><p class="eyebrow">${t('how')}</p><h2>${t('howTitle')}</h2></div><div class="steps">${['search','calendar','shield'].map((ic,i)=>`<div><div class="step-icon">${icon(ic)}</div><h3>${t('step'+(i+1)+'Title')}</h3><p>${t('step'+(i+1)+'Desc')}</p></div>`).join('')}</div></div></section>`; }
  function home() {
    const featured=['painting','swimming','robotics'].map(id=>activity(id)).filter(Boolean);
    return `<main id="main"><div class="container"><section class="hero"><div class="hero-grid"><div class="hero-text"><p class="eyebrow">${t('heroEyebrow')}</p><h1>${t('heroTitle')}</h1><p class="hero-desc">${t('heroDesc')}</p></div><div class="hero-media"><img class="hero-photo" src="assets/hero.jpg" alt="${esc(t('heroCaption'))}" fetchpriority="high" width="1400" height="934"><div class="orbit-tag">${icon('spark')}${t('exploreEyebrow')}</div><div class="hero-image-label">${icon('palette')}<span>${t('heroCaption')}</span></div></div></div><form id="hero-search" class="hero-search"><div class="search-field"><label for="hero-q">${icon('search')}${t('direction')}</label><input id="hero-q" name="q" placeholder="${t('searchPlaceholder')}"></div><div class="search-field"><label for="hero-district">${icon('pin')}${t('district')}</label><select id="hero-district" name="district">${districtOptions('')}</select></div><div class="search-field"><label for="hero-age">${icon('user')}${t('age')}</label><select id="hero-age" name="age">${ageOptions('')}</select></div><button class="btn primary" type="submit">${icon('search')}${t('find')}</button></form><div class="benefits">${['benefit1','benefit2','benefit3'].map(k=>`<span>${icon('check')}${t(k)}</span>`).join('')}</div></section><section class="section"><div class="section-head"><div><p class="eyebrow">${t('exploreEyebrow')}</p><h2>${t('categoriesTitle')}</h2><p>${t('categoriesDesc')}</p></div></div><div class="categories">${SEED.categories.map(c=>`<a class="category" href="${url('catalog',{category:c.id})}"><span class="category-icon">${icon(c.icon)}</span><span>${tr(c.name)}</span></a>`).join('')}</div></section><section class="section"><div class="section-head"><div><p class="eyebrow">${t('popularEyebrow')}</p><h2>${t('popularTitle')}</h2><p>${t('popularDesc')}</p></div><a class="text-link" href="${url('catalog')}">${t('viewAll')}</a></div><div class="card-grid home-grid">${featured.map(a=>card(a)).join('')}</div><div style="margin-top:24px">${demoNote()}</div></section>${howBlock()}<section class="partner-banner"><div><p class="eyebrow">${t('partners')}</p><h2>${t('partnerTitle')}</h2><p>${t('partnerDesc')}</p></div><a class="btn" href="${url('partners')}">${t('connect')}</a></section><section class="faq-section"><div><p class="eyebrow">FAQ</p><h2>${t('faqTitle')}</h2></div><div class="faq-list">${[1,2,3,4].map(n=>`<details><summary>${t('faq'+n)}</summary><p>${t('faq'+n+'Answer')}</p></details>`).join('')}</div></section></div></main>`;
  }
  function groupMatches(g,f) {
    const hour=Number(g.time.split(':')[0]);
    return (!f.age || (Number(f.age)>=g.ageMin&&Number(f.age)<=g.ageMax)) && (!f.maxPrice || g.price<=Number(f.maxPrice)) && (!f.day || g.days.includes(Number(f.day))) && (!f.time || (f.time==='morning'?hour<12:f.time==='afternoon'?hour>=12&&hour<17:hour>=17)) && (!f.available || g.available>0);
  }
  function getResults(f) {
    let results=state.activities.filter(a=>(!f.category||a.category===f.category)&&(!f.district||a.district===f.district)&&(!f.q||[...Object.values(a.title),...Object.values(a.org),...Object.values(category(a.category).name)].join(' ').toLocaleLowerCase().includes(f.q.toLocaleLowerCase()))).map(a=>({a,groups:a.groups.filter(g=>groupMatches(g,f))})).filter(x=>x.groups.length);
    if(f.sort==='price') results.sort((a,b)=>Math.min(...a.groups.map(g=>g.price))-Math.min(...b.groups.map(g=>g.price)));
    if(f.sort==='soon') results.sort((a,b)=>a.groups.map(g=>g.nextDate).sort()[0].localeCompare(b.groups.map(g=>g.nextDate).sort()[0]));
    return results;
  }
  function filters(f) { return `<aside class="filter-panel" id="filter-panel"><h3>${t('filters')}<button class="filters-head-close" data-action="filters-close" aria-label="${t('close')}">${icon('close')}</button></h3><form id="filters-form"><label>${t('city')}<select name="city"><option value="almaty">${t('almaty')}</option></select></label><label>${t('direction')}<select name="category"><option value="">${t('allDirections')}</option>${SEED.categories.map(c=>`<option value="${c.id}" ${f.category===c.id?'selected':''}>${tr(c.name)}</option>`).join('')}</select></label><label>${t('district')}<select name="district">${districtOptions(f.district)}</select></label><label>${t('age')}<select name="age">${ageOptions(f.age)}</select></label><label>${t('maxPrice')}<input type="number" name="maxPrice" min="0" max="500000" step="500" value="${esc(f.maxPrice||'')}" placeholder="50 000"></label><label>${t('days')}</label><div class="day-options">${[1,2,3,4,5,6,7].map(d=>`<button type="button" data-day="${d}" class="day-option ${Number(f.day)===d?'active':''}" aria-pressed="${Number(f.day)===d}">${t('day'+d)}</button>`).join('')}</div><input type="hidden" name="day" value="${esc(f.day||'')}"><label>${t('time')}<select name="time"><option value="">${t('anyTime')}</option>${['morning','afternoon','evening'].map(k=>`<option value="${k}" ${f.time===k?'selected':''}>${t(k)}</option>`).join('')}</select></label><label class="check-label"><input type="checkbox" name="available" ${f.available?'checked':''}>${t('onlyAvailable')}</label><button type="submit" class="btn primary wide" style="margin-top:18px">${t('apply')}</button><button type="button" class="btn ghost wide" data-action="reset-filters">${t('reset')}</button></form></aside>`; }
  function catalog() {
    const f=Object.fromEntries(params); const results=getResults(f);
    const chips=Object.entries(f).filter(([k,v])=>v&&k!=='sort'&&k!=='city').map(([k,v])=>{let label=k==='category'?tr(category(v)?.name):k==='district'?t(v):k==='age'?`${v} ${t('years')}`:k==='maxPrice'?`${t('maxPrice')} ${money(v)}`:k==='available'?t('onlyAvailable'):k==='time'?t(v):k==='day'?t('day'+v):v;return `<button data-remove-filter="${esc(k)}">${esc(label)} ×</button>`;}).join('');
    return `<main id="main" class="container page page-top">${crumb(t('catalog'))}<h1 class="page-title">${t('catalog')}</h1><p class="page-sub">${t('heroDesc')}</p><form id="catalog-search" class="catalog-search"><input name="q" aria-label="${t('search')}" value="${esc(f.q||'')}" placeholder="${t('searchPlaceholder')}"><button class="btn primary">${icon('search')}${t('search')}</button></form><div class="filter-chips">${chips}</div><div class="catalog-layout">${filters(f)}<section><div class="catalog-toolbar"><p>${t('found')}: <strong>${results.length}</strong></p><button class="btn secondary small mobile-filter" data-action="filters-open">${icon('filter')}${t('filters')}</button><select id="sort" aria-label="${t('sort')}">${['Recommended','Price','Soon'].map(s=>`<option value="${s.toLowerCase()}" ${f.sort===s.toLowerCase()?'selected':''}>${t('sort'+s)}</option>`).join('')}</select></div>${results.length?`<div class="card-grid catalog-grid">${results.map(x=>card(x.a,x.groups)).join('')}</div>`:empty(t('emptyTitle'),t('emptyDesc'),`<button class="btn primary" data-action="reset-filters">${t('reset')}</button>`)}<div class="spacer"></div>${demoNote()}</section></div></main>`;
  }
  function empty(title,desc,action='') { return `<div class="empty">${icon('search')}<h2>${title}</h2><p>${desc}</p>${action}</div>`; }
  function detail() {
    const a=activity(path.split('/')[1]); if(!a) return missing();
    const g=a.groups.find(g=>g.id===params.get('g')) || a.groups.find(g=>g.available>0) || a.groups[0];
    return `<main id="main" class="container page page-top detail-page"><div class="breadcrumbs"><a href="${url()}">${t('home')}</a><a href="${url('catalog')}">${t('catalog')}</a><span>${esc(tr(a.title))}</span></div><div class="detail-head"><span class="pill">${tr(category(a.category).name)}</span><span class="pill">${t('demoShort')}</span>${a.promoted?`<span class="pill">${t('promoted')}</span>`:''}</div><h1 class="page-title">${esc(tr(a.title))}</h1><p class="page-sub">${esc(tr(a.org))} · ${t(a.district)}</p><div class="detail-grid"><div class="detail-copy"><img class="detail-photo" src="${a.image}" alt="${esc(tr(a.title))}" width="800" height="500"><div class="facts"><div class="fact">${icon('user')}<div><strong>${t('age')}</strong><span>${ages(g)}</span></div></div><div class="fact">${icon('clock')}<div><strong>${t('duration')}</strong><span>${g.duration} ${t('minutes')}</span></div></div><div class="fact">${icon('spark')}<div><strong>${t('level')}</strong><span>${esc(tr(a.level))}</span></div></div></div><section><h2>${t('program')}</h2><p>${esc(tr(a.description))}</p></section><section><h2>${t('teacher')}</h2><p>${esc(tr(a.teacher))}</p></section><section><h2>${t('address')}</h2><p>${esc(tr(a.address))}</p></section><section><h2>${t('cancellation')}</h2><p>${t('cancellationText')}</p></section><div style="margin-top:24px">${demoNote()}</div></div><aside class="booking-panel" id="booking-panel"><h2>${t('groups')}</h2>${a.groups.map(x=>`<button class="group-option ${x.id===g.id?'selected':''} ${!x.available?'sold':''}" data-select-group="${x.id}" ${!x.available?'disabled':''} aria-pressed="${x.id===g.id}"><strong>${ages(x)}</strong><span>${schedule(x)}</span><small style="display:block;margin-top:6px">${dates(x.nextDate)} · ${x.duration} ${t('minutes')}</small><div class="group-row"><span class="price" style="font-size:1rem">${priceText(x)}</span><span class="availability ${!x.available?'sold':''}">${x.available?`${t('spots')}: ${x.available}`:t('full')}</span></div></button>`).join('')}<div class="total-line"><span>${t('total')}</span><strong class="price">${money(g.price)}</strong></div><a class="btn primary wide ${!g.available?'hidden':''}" href="${url('checkout',{g:g.id})}">${t('book')}</a>${!g.available?`<button class="btn primary wide" disabled>${t('full')}</button>`:''}<p class="fine">${t('benefit3')}</p></aside></div><div class="mobile-book"><div class="price">${money(g.price)}</div><button class="btn primary" data-action="scroll-groups">${t('chooseGroup')}</button></div></main>`;
  }
  function comparePage() {
    const list=compare.map(id=>activity(id)).filter(Boolean);
    return `<main id="main" class="container page page-top">${crumb(t('compare'))}<h1 class="page-title">${t('compareTitle')}</h1><p class="page-sub">${t('compareDesc')}</p>${list.length?`<div class="compare-table" style="--cols:${list.length}">${list.map(a=>{const g=a.groups.find(g=>g.id===comparisonGroups[a.id])||a.groups.find(g=>g.available>0)||a.groups[0];return `<article class="compare-col"><img src="${a.image}" alt="${esc(tr(a.title))}"><div class="compare-col-body"><button class="subtle-link" data-action="compare" data-id="${a.id}">${t('remove')} ×</button><h2 style="margin-top:15px">${esc(tr(a.title))}</h2><div class="compare-property"><span>${t('organizer')}</span>${esc(tr(a.org))}</div><div class="compare-property"><span>${t('price')}</span>${priceText(g)}</div><div class="compare-property"><span>${t('age')}</span>${ages(g)}</div><div class="compare-property"><span>${t('address')}</span>${esc(tr(a.address))}</div><div class="compare-property"><span>${t('schedule')}</span>${schedule(g)}</div><div class="compare-property"><span>${t('spots')}</span>${g.available}</div><a class="btn primary wide" href="${url('activity/'+a.id,{g:g.id})}">${t('chooseGroup')}</a></div></article>`;}).join('')}</div><button data-action="clear-compare" class="btn ghost">${t('clearComparison')}</button>`:empty(t('compareEmpty'),t('compareDesc'),`<a class="btn primary" href="${url('catalog')}">${t('viewAll')}</a>`)}</main>`;
  }
  function summary(a,g) { return `<aside class="panel checkout-summary"><img src="${a.image}" alt="${esc(tr(a.title))}"><h2>${esc(tr(a.title))}</h2><p class="card-org">${esc(tr(a.org))}</p><div class="summary-row"><span>${t('age')}</span><strong>${ages(g)}</strong></div><div class="summary-row"><span>${t('schedule')}</span><strong>${schedule(g)}</strong></div><div class="summary-row"><span>${t('nextDate')}</span><strong>${dates(g.nextDate)}</strong></div><div class="summary-row"><span>${t('address')}</span><strong>${esc(tr(a.address))}</strong></div><div class="summary-row total-line"><span>${t('total')}</span><strong class="price">${money(g.price)}</strong></div><p class="fine">${t(g.unit==='month'?'monthContents':'lessonContents')}</p></aside>`; }
  function checkout() {
    const pair=groupOf(params.get('g')); if(!pair)return missing(); const {a,g}=pair;
    if(checkoutGroup!==g.id){checkoutGroup=g.id;checkoutStep=1;errors={};}
    if(g.available<=0) return `<main id="main" class="container page page-top">${empty(t('full'),t('noSpots'),`<a class="btn primary" href="${url('activity/'+a.id)}">${t('groups')}</a>`)}</main>`;
    const field=(key,type='text',full=false)=>`<label class="${full?'full-width':''}">${t(key)}<input class="${errors[key]?'input-error':''}" name="${key}" type="${type}" value="${esc(draft[key]||'')}" ${type==='number'?`min="${g.ageMin}" max="${g.ageMax}"`:''} ${key==='phone'?'autocomplete="tel"':key==='email'?'autocomplete="email"':''} ${errors[key]?'aria-invalid="true"':''}><span class="error-msg">${errors[key]?t(errors[key]):''}</span></label>`;
    let content;
    if(checkoutStep===1)content=`<form id="participant-form" novalidate><h2>${t('participant')}</h2><div class="form-grid">${field('participantName')}${field('participantAge','number')}</div><h3>${t('parent')}</h3><div class="form-grid">${field('parentName','text',true)}${field('phone','tel')}${field('email','email')}</div><h3>${t('cancellation')}</h3><p class="form-note">${t('cancellationText')}</p><label class="check-label"><input type="checkbox" name="agree" ${draft.agree?'checked':''}>${t('agree')}</label>${errors.agree?`<p class="error-msg" style="color:#a2392b;font-size:.8125rem;margin-top:9px">${t(errors.agree)}</p>`:''}<div class="button-row"><a class="btn secondary" href="${url('activity/'+a.id,{g:g.id})}">${t('back')}</a><button class="btn primary">${t('next')}</button></div></form>`;
    else content=`<h2>${t('review')}</h2><dl class="review-data">${['participantName','participantAge','parentName','phone','email'].map(k=>`<div><dt>${t(k)}</dt><dd>${esc(draft[k])}</dd></div>`).join('')}</dl>${demoNote(t('testPaymentDesc'))}<h3>${t('paymentContents')}</h3><p class="form-note">${t(g.unit==='month'?'monthContents':'lessonContents')}</p><p class="form-note">${t('cancellationText')}</p><div class="button-row"><button class="btn secondary" data-action="checkout-back">${t('back')}</button><button class="btn primary" data-action="begin-payment" data-group="${g.id}">${t('testPayment')}</button></div>`;
    return `<main id="main" class="container page page-top">${crumb(t('book'))}<h1 class="page-title">${t('checkoutTitle')}</h1><div class="checkout-progress"><span class="${checkoutStep===1?'active':''}">${t('participant')}</span><span class="${checkoutStep===2?'active':''}">${t('review')}</span><span>${t('payment')}</span></div><div class="checkout-layout"><div class="panel">${content}<p class="fine">${t('savedLocally')} · ${t('demo')}</p></div>${summary(a,g)}</div></main>`;
  }
  function resultPage() {
    const b=state.bookings.find(x=>x.id===params.get('b')); if(!b)return missing(); const {a,g}=groupOf(b.groupId);
    if(b.status==='pending')return `<main id="main" class="container page page-top">${crumb(t('payment'))}<h1 class="page-title">${t('testPayment')}</h1><p class="page-sub">${t('testPaymentDesc')}</p><div class="checkout-layout"><div class="panel"><h2>${t('bookingNumber')}: ${esc(b.id)}</h2><span class="status">${t('pending')}</span><div class="spacer"></div>${demoNote(t('testPaymentDesc'))}<div class="button-row"><button class="btn primary" data-action="pay-success" data-id="${b.id}">${t('simulateSuccess')}</button><button class="btn secondary" data-action="pay-fail" data-id="${b.id}">${t('simulateFailure')}</button></div></div>${summary(a,g)}</div></main>`;
    const ok=b.status==='confirmed'; const failed=b.status==='failed';
    return `<main id="main" class="container page page-top"><div class="success-wrap"><div class="result-icon ${failed?'failed':''}">${icon(ok?'check':failed?'close':'calendar')}</div><h1>${t(ok?'successTitle':failed?'failureTitle':'cancelled')}</h1><p>${t(ok?'successDesc':failed?'failureDesc':'bookingCancelled')}</p><div class="panel"><div style="display:flex;justify-content:space-between;gap:15px"><span class="card-org">${t('bookingNumber')}: ${esc(b.id)}</span><span class="status ${b.status}">${t(b.status)}</span></div><h2 style="margin-top:20px;margin-bottom:15px">${esc(tr(a.title))}</h2><p>${schedule(g)} · ${dates(g.nextDate)}</p><p>${esc(tr(a.address))}</p><div class="summary-row total-line"><span>${t('total')}</span><strong>${money(b.amount)}</strong></div><p class="fine">${t('testPaymentDesc')}</p></div><div class="button-row">${failed&&g.available>0?`<button class="btn secondary" data-action="retry-payment" data-id="${b.id}">${t('tryAgain')}</button>`:''}<a class="btn primary" href="${url('account')}">${t('goAccount')}</a></div></div></main>`;
  }
  function bookingCard(b) {
    const pair=groupOf(b.groupId); if(!pair)return '';const {a,g}=pair;
    const canCancel=b.status==='confirmed'&&!datePassed(g);
    return `<article class="booking-card"><img src="${a.image}" alt="${esc(tr(a.title))}"><div class="booking-card-body"><span class="status ${b.status}">${t(b.status)}</span><h3><a href="${url('activity/'+a.id,{g:g.id})}">${esc(tr(a.title))}</a></h3><p>${schedule(g)} · ${dates(g.nextDate)}</p><p>${esc(b.participant.participantName)} · ${t('bookingNumber')} ${esc(b.id)}</p></div><div class="booking-card-actions"><strong>${money(b.amount)}</strong>${canCancel?`<button class="btn secondary small" data-action="cancel-booking" data-id="${b.id}">${t('cancelBooking')}</button>`:b.status==='pending'||b.status==='failed'?`<a class="btn secondary small" href="${url('payment',{b:b.id})}">${t('details')}</a>`:`<a class="subtle-link" href="${url('payment',{b:b.id})}">${t('details')}</a>`}</div></article>`;
  }
  function account() {
    const list=state.bookings.filter(b=>{const p=groupOf(b.groupId);return p&&(accountTab==='upcoming'?b.status==='confirmed'&&!datePassed(p.g):b.status!=='confirmed'||datePassed(p.g));}).reverse();
    const profile=state.profile;
    return `<main id="main" class="container page page-top">${crumb(t('account'))}<div class="section-head"><h1 class="page-title">${t('account')}</h1><a class="subtle-link" href="${url('organizer')}">${t('organizerCabinet')}</a></div>${demoNote(t('demoCabinetDesc'))}<div class="account-tabs" style="margin-top:25px">${['upcoming','past','profile'].map(tab=>`<button data-account-tab="${tab}" class="${accountTab===tab?'active':''}">${t(tab)}</button>`).join('')}</div>${accountTab==='profile'?`<form id="profile-form" class="panel" style="max-width:650px"><h2>${t('profile')}</h2><div class="form-grid"><label class="full-width">${t('parentName')}<input name="name" value="${esc(profile.name||'')}"></label><label>${t('email')}<input name="email" type="email" value="${esc(profile.email||'')}"></label><label>${t('phone')}<input name="phone" type="tel" value="${esc(profile.phone||'')}"></label></div><div class="spacer"></div><label>${t('language')}<select id="profile-language">${['kk','ru','en'].map((l,i)=>`<option value="${l}" ${l===lang?'selected':''}>${['Қазақша','Русский','English'][i]}</option>`).join('')}</select></label><button class="btn primary" style="margin-top:25px">${t('save')}</button></form>`:list.length?list.map(bookingCard).join(''):empty(t('noBookings'),t('noBookingsDesc'),`<a class="btn primary" href="${url('catalog')}">${t('find')}</a>`)}</main>`;
  }
  function organizer() {
    const groups=state.activities.flatMap(a=>a.groups.map(g=>({a,g})));
    const confirmed=state.bookings.filter(b=>b.status==='confirmed'),capacity=groups.reduce((n,x)=>n+x.g.capacity,0),avail=groups.reduce((n,x)=>n+x.g.available,0);
    return `<main id="main" class="container page page-top">${crumb(t('organizerCabinet'))}<h1 class="page-title">${t('organizerCabinet')}</h1><p class="page-sub">${t('demoCabinet')} · ${t('almaty')}</p>${demoNote(t('demoCabinetDesc'))}<div class="stats"><div class="stat"><span>${t('myGroups')}</span><strong>${groups.length}</strong></div><div class="stat"><span>${t('bookings')}</span><strong>${confirmed.length}</strong></div><div class="stat"><span>${t('occupancy')}</span><strong>${Math.round((capacity-avail)/capacity*100)}%</strong></div><div class="stat"><span>${t('revenue')}</span><strong>${money(confirmed.reduce((n,b)=>n+b.amount,0))}</strong></div></div><div class="account-tabs">${['groups','bookings'].map(tab=>`<button data-organizer-tab="${tab}" class="${organizerTab===tab?'active':''}">${t(tab)}</button>`).join('')}</div>${organizerTab==='groups'?`<div class="section-head"><h2 style="font-size:1.5rem">${t('myGroups')}</h2><button class="btn primary small" data-action="add-group">${icon('plus')}${t('addGroup')}</button></div><div class="table-wrap"><table class="data-table"><thead><tr><th>${t('activity')}</th><th>${t('age')}</th><th>${t('schedule')}</th><th>${t('price')}</th><th>${t('available')}</th><th>${t('edit')}</th></tr></thead><tbody>${groups.map(({a,g})=>`<tr><td><strong>${esc(tr(a.title))}</strong><small>${esc(tr(a.org))}</small></td><td>${ages(g)}</td><td>${schedule(g)}</td><td>${money(g.price)}<small>/ ${t(g.unit)}</small></td><td>${g.available} / ${g.capacity}</td><td><button data-edit-group="${g.id}">${t('edit')}</button></td></tr>`).join('')}</tbody></table></div>`:state.bookings.length?`<div class="table-wrap"><table class="data-table"><thead><tr><th>${t('bookingNumber')}</th><th>${t('activity')}</th><th>${t('participant')}</th><th>${t('payment')}</th><th>${t('total')}</th></tr></thead><tbody>${[...state.bookings].reverse().map(b=>{const p=groupOf(b.groupId);return `<tr><td>${esc(b.id)}</td><td><strong>${esc(tr(p.a.title))}</strong><small>${schedule(p.g)}</small></td><td>${esc(b.participant.participantName)}<small>${b.participant.participantAge} ${t('years')}</small></td><td><span class="status ${b.status}">${t(b.status)}</span></td><td>${money(b.amount)}</td></tr>`;}).join('')}</tbody></table></div>`:empty(t('noOrganizerBookings'),t('demoCabinetDesc'))}</main>`;
  }
  function partners() {
    return `<main id="main" class="container page page-top">${crumb(t('partners'))}<section class="partner-page-hero"><div><p class="eyebrow">${t('partnerEyebrow')}</p><h1>${t('partnerPageTitle')}</h1><p>${t('partnerPageDesc')}</p><div class="button-row"><button class="btn primary" data-action="scroll-join">${t('connect')}</button><a class="btn secondary" href="${url('organizer')}">${t('openCabinet')}</a></div></div><img src="assets/art.jpg" alt="${t('partnerEyebrow')}" width="800" height="500"></section>${howBlock()}<section class="section"><p class="eyebrow">${t('pilot')}</p><h2>${t('freeSearch')} — ${t('free').toLocaleLowerCase()}</h2><div class="pricing-grid">${[['commission','10%','commissionDesc'],['promotion',money(7900),'promotionDesc'],['analytics',money(14900),'analyticsDesc']].map(([k,p,d],i)=>`<article class="pricing-card"><h3>${t(k)}</h3><div class="price">${p}</div>${i?`<span class="fine">${t('perMonth')}</span>`:''}<p>${t(d)}</p></article>`).join('')}</div><div class="checkout-layout" id="join"><div><h2>${t('joinTitle')}</h2><p class="page-sub" style="margin-top:20px">${t('partnerDesc')}</p>${demoNote(t('demoCabinetDesc'))}</div><form class="panel" id="join-form"><div class="form-grid"><label class="full-width">${t('organizationName')}<input name="organizationName" required></label><label class="full-width">${t('contactName')}<input name="contactName" required></label><label>${t('phone')}<input name="phone" type="tel" required></label><label>${t('email')}<input name="email" type="email" required></label></div><p class="form-note">${t('applicationSaved')}</p><button class="btn primary wide" style="margin-top:15px">${t('submitApplication')}</button></form></div></section></main>`;
  }
  function missing() { return `<main id="main" class="container page page-top">${empty(t('emptyTitle'),t('emptyDesc'),`<a class="btn primary" href="${url('catalog')}">${t('viewAll')}</a>`)}</main>`; }
  function render(keepScroll=false) {
    const y=scrollY;parseRoute();
    let content=path===''||path==='how'?home():path==='catalog'?catalog():path.startsWith('activity/')?detail():path==='compare'?comparePage():path==='checkout'?checkout():path==='payment'?resultPage():path==='account'?account():path==='organizer'?organizer():path==='partners'?partners():missing();
    $('#app').innerHTML=header()+content+footer()+(compare.length&&path!=='compare'&&!['checkout','payment'].includes(path)?`<div class="compare-tray"><span>${t('compare')}: ${compare.length}/3</span><a href="${url('compare')}" class="btn primary small">${t('compare')}</a><button class="icon-btn" data-action="clear-compare" aria-label="${t('clearComparison')}">${icon('close')}</button></div>`:'');
    $('.skip').textContent=t('skipContent');
    $('#main').tabIndex=-1;
    if(languageForms){for(const form of languageForms){const node=document.getElementById(form.id);if(!node)continue;for(const field of form.fields){const el=[...node.elements].find(el=>el.name===field.name&& (el.type!=='checkbox'||el.value===field.value));if(el){if(field.type==='checkbox')el.checked=field.checked;else el.value=field.value;}}}languageForms=null;}
    if(keepScroll)scrollTo(0,y);else if(path==='how')setTimeout(()=>$('#how')?.scrollIntoView({behavior:'smooth'}),20);else scrollTo(0,0);
  }
  function updateFilters(extra={}) {
    const form=$('#filters-form');const f=Object.fromEntries(new FormData(form)); if(!form.elements.available.checked)delete f.available; else f.available='1';
    if(params.get('q')) f.q=params.get('q');f.sort=$('#sort')?.value||'recommended';Object.assign(f,extra);Object.keys(f).forEach(k=>{if(!f[k]||k==='city')delete f[k];});
    navigate('catalog',f);
  }
  function changeLanguage(l) {
    if(!['kk','ru','en'].includes(l))return; languageForms=[...document.forms].map(form=>({id:form.id,fields:[...form.elements].filter(el=>el.name).map(el=>({name:el.name,value:el.value,checked:el.checked,type:el.type}))})); lang=l;write('kruzhki-lang',l);location.hash=url(path,Object.fromEntries(params));
  }
  function modal(title,body) {
    $('#modal-root').innerHTML=`<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-head"><h2>${esc(title)}</h2><button class="icon-btn" data-action="close-modal" aria-label="${t('close')}">${icon('close')}</button></div>${body}</section></div>`;
    document.body.style.overflow='hidden';setTimeout(()=>$('.modal input,.modal button')?.focus(),10);
  }
  function closeModal(){ $('#modal-root').innerHTML='';document.body.style.overflow=''; }
  function editGroup(id) {
    const pair=id?groupOf(id):null;const g=pair?.g||{ageMin:6,ageMax:12,time:'17:00',duration:60,price:18000,unit:'month',capacity:12,available:12,days:[1,3],nextDate:'2026-11-23'};
    modal(t(id?'edit':'addGroup'),`<form id="group-form" data-id="${id||''}" novalidate><label>${t('activity')}<select name="activity">${state.activities.map(a=>`<option value="${a.id}" ${pair?.a.id===a.id?'selected':''}>${esc(tr(a.title))}</option>`).join('')}</select></label><div class="spacer"></div><div class="form-grid">${[['ageMin','number'],['ageMax','number'],['price','number'],['capacity','number'],['available','number'],['time','time'],['duration','number']].map(([k,type])=>`<label>${t(k)}<input name="${k}" type="${type}" value="${g[k]}" min="${k==='capacity'||k==='duration'?1:0}" required></label>`).join('')}<label>${t('price')}<select name="unit"><option value="month" ${g.unit==='month'?'selected':''}>${t('month')}</option><option value="lesson" ${g.unit==='lesson'?'selected':''}>${t('lesson')}</option></select></label></div><label class="group-days">${t('days')}</label><div class="day-options">${[1,2,3,4,5,6,7].map(d=>`<label class="check-label"><input type="checkbox" name="days" value="${d}" ${g.days.includes(d)?'checked':''}>${t('day'+d)}</label>`).join('')}</div><div id="group-error" class="form-note" style="color:#a2392b"></div><div class="button-row"><button type="button" class="btn secondary" data-action="close-modal">${t('cancel')}</button><button class="btn primary">${t('save')}</button></div></form>`);
    if(pair)$('#group-form select[name=activity]').disabled=true;
  }
  function beginPayment(id) {
    state=read(KEY,state); const p=groupOf(id); if(!p||!p.g.available){toast(t('noSpots'));render();return;}
    const existing=state.bookings.find(b=>b.groupId===id&&b.status==='pending'&&JSON.stringify(b.participant)===JSON.stringify(draft));
    const b=existing||{id:'KZ-'+crypto.randomUUID().slice(0,8).toUpperCase(),groupId:id,status:'pending',amount:p.g.price,participant:{...draft},createdAt:new Date().toISOString()};
    if(!existing)state.bookings.push(b); save();navigate('payment',{b:b.id});
  }
  function pay(id,success) {
    state=read(KEY,state);const b=state.bookings.find(x=>x.id===id);if(!b||b.status!=='pending')return;
    const {g}=groupOf(b.groupId);if(success&&g.available<=0){b.status='failed';save();toast(t('noSpots'));render();return;}
    b.status=success?'confirmed':'failed';if(success)g.available-=1;save();render();
  }
  document.addEventListener('click',e=>{
    if(e.target.closest('.skip')){e.preventDefault();$('#main').focus();return;}
    const l=e.target.closest('[data-lang]');if(l){changeLanguage(l.dataset.lang);return;}
    const select=e.target.closest('[data-select-group]');if(select){navigate(path,{g:select.dataset.selectGroup});return;}
    const tab=e.target.closest('[data-account-tab]');if(tab){accountTab=tab.dataset.accountTab;render(true);return;}
    const ot=e.target.closest('[data-organizer-tab]');if(ot){organizerTab=ot.dataset.organizerTab;render(true);return;}
    const eg=e.target.closest('[data-edit-group]');if(eg){editGroup(eg.dataset.editGroup);return;}
    const chip=e.target.closest('[data-remove-filter]');if(chip){params.delete(chip.dataset.removeFilter);navigate('catalog',Object.fromEntries(params));return;}
    const day=e.target.closest('[data-day]');if(day){const el=$('#filters-form [name=day]');el.value=el.value===day.dataset.day?'':day.dataset.day;$$('[data-day]').forEach(b=>{b.classList.toggle('active',b.dataset.day===el.value);b.setAttribute('aria-pressed',String(b.dataset.day===el.value));});return;}
    const b=e.target.closest('[data-action]');if(!b)return;
    switch(b.dataset.action){
      case 'menu':mobileMenu=!mobileMenu;render(true);break;
      case 'city':modal(t('city'),`<p>${t('almaty')}</p><p class="form-note">${t('allCities')}</p>`);break;
      case 'contact':modal(t('contactTitle'),`<p>${t('contactDesc')}</p><div class="spacer"></div>${demoNote()}`);break;
      case 'close-modal':closeModal();break;
      case 'filters-open':$('#filter-panel').classList.add('open');$('#filter-panel select')?.focus();break;
      case 'filters-close':$('#filter-panel').classList.remove('open');break;
      case 'reset-filters':navigate('catalog');break;
      case 'compare':{const id=b.dataset.id;if(compare.includes(id))compare=compare.filter(x=>x!==id);else if(compare.length===3){toast(t('compareLimit'));return;}else {compare.push(id);comparisonGroups[id]=b.dataset.group;}write('kruzhki-compare',compare);write('kruzhki-compare-groups',comparisonGroups);render(true);break;}
      case 'clear-compare':compare=[];write('kruzhki-compare',compare);render(true);break;
      case 'scroll-groups':$('#booking-panel').scrollIntoView({behavior:'smooth',block:'start'});break;
      case 'scroll-join':$('#join').scrollIntoView({behavior:'smooth'});break;
      case 'checkout-back':checkoutStep=1;render();break;
      case 'begin-payment':beginPayment(b.dataset.group);break;
      case 'pay-success':pay(b.dataset.id,true);break;
      case 'pay-fail':pay(b.dataset.id,false);break;
      case 'retry-payment':{const booking=state.bookings.find(x=>x.id===b.dataset.id);if(booking?.status==='failed'&&groupOf(booking.groupId).g.available>0){booking.status='pending';save();render();}break;}
      case 'cancel-booking':{state=read(KEY,state);const booking=state.bookings.find(x=>x.id===b.dataset.id);const pair=booking&&groupOf(booking.groupId);if(booking?.status==='confirmed'&&!datePassed(pair.g)){booking.status='cancelled';pair.g.available=Math.min(pair.g.capacity,pair.g.available+1);save();render(true);toast(t('bookingCancelled'));}break;}
      case 'add-group':editGroup();break;
    }
  });
  document.addEventListener('input',e=>{if(e.target.closest('#participant-form')){draft={...Object.fromEntries(new FormData($('#participant-form'))),agree:$('#participant-form').elements.agree.checked};write('kruzhki-draft',draft);}});
  document.addEventListener('change',e=>{if(e.target.id==='sort'){params.set('sort',e.target.value);navigate('catalog',Object.fromEntries(params));}if(e.target.id==='profile-language')changeLanguage(e.target.value);});
  document.addEventListener('submit',e=>{
    const f=e.target; e.preventDefault();
    if(f.id==='hero-search'){const vals=Object.fromEntries(new FormData(f));Object.keys(vals).forEach(k=>{if(!vals[k])delete vals[k];});navigate('catalog',vals);}
    if(f.id==='catalog-search'){const q=new FormData(f).get('q');if(q)params.set('q',q);else params.delete('q');navigate('catalog',Object.fromEntries(params));}
    if(f.id==='filters-form')updateFilters();
    if(f.id==='participant-form'){
      draft={...Object.fromEntries(new FormData(f)),agree:f.elements.agree.checked};write('kruzhki-draft',draft);errors={};
      ['participantName','participantAge','parentName','phone','email'].forEach(k=>{if(!String(draft[k]||'').trim())errors[k]='required';});
      if(draft.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email))errors.email='invalidEmail';
      if(draft.phone&&draft.phone.replace(/\D/g,'').length<10)errors.phone='invalidPhone';
      const g=groupOf(params.get('g')).g; if(draft.participantAge&&(Number(draft.participantAge)<g.ageMin||Number(draft.participantAge)>g.ageMax))errors.participantAge='invalidAge';
      if(!draft.agree)errors.agree='agreeError';if(!Object.keys(errors).length)checkoutStep=2;render(true);if(Object.keys(errors).length)$('[aria-invalid=true]')?.focus();
    }
    if(f.id==='profile-form'){state.profile=Object.fromEntries(new FormData(f));save();toast(t('profileSaved'));}
    if(f.id==='join-form'){state.applications.push({...Object.fromEntries(new FormData(f)),date:new Date().toISOString()});save();f.reset();toast(t('applicationSaved'));}
    if(f.id==='group-form'){
      const vals=Object.fromEntries(new FormData(f));const days=new FormData(f).getAll('days').map(Number);const id=f.dataset.id;
      const n={};['ageMin','ageMax','price','capacity','available','duration'].forEach(k=>n[k]=Number(vals[k]));
      const bookingsForGroup=state.bookings.filter(b=>b.groupId===id&&b.status==='confirmed').length;
      if(!f.checkValidity()||!days.length||n.ageMin<3||n.ageMax<n.ageMin||n.ageMax>100||n.price<=0||n.capacity<1||n.capacity<bookingsForGroup||n.available<0||n.available>n.capacity-bookingsForGroup||!/^\d\d:\d\d$/.test(vals.time)){$('#group-error').textContent=t('invalidGroup');return;}
      const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Almaty',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
      let next=new Date(today+'T12:00:00Z');next.setUTCDate(next.getUTCDate()+1);for(let i=0;i<7&&!days.includes(next.getUTCDay()||7);i++)next.setUTCDate(next.getUTCDate()+1);const nextDate=next.toISOString().slice(0,10);
      if(id){const pair=groupOf(id);Object.assign(pair.g,n,{days,time:vals.time,unit:vals.unit,nextDate});}
      else{activity(vals.activity).groups.push({...n,id:'group-'+crypto.randomUUID().slice(0,8),days,time:vals.time,unit:vals.unit,nextDate});}
      save();closeModal();render(true);toast(t('groupSaved'));
    }
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){closeModal();$('#filter-panel')?.classList.remove('open');}
    if(e.key==='Tab'&&$('.modal')){const focusable=$$('button,input,select,a[href]', $('.modal')).filter(el=>!el.disabled);const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
  });
  window.addEventListener('hashchange',()=>{mobileMenu=false;closeModal();render();});
  window.addEventListener('storage',e=>{if(e.key===KEY){state=read(KEY,state);render(true);}});
  if(!location.hash)history.replaceState(null,'',url());
  render();
})();
