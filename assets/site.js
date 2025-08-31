
document.addEventListener('DOMContentLoaded', async () => {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (btn && nav) {
    const toggle = () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    btn.addEventListener('click', toggle);
    nav.addEventListener('click', e => { if(e.target.tagName==='A'){ nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }});
    document.addEventListener('keyup', e => { if(e.key==='Escape'){ nav.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }});
  }

  const cfg = await (await fetch('site_config.json?v=' + Date.now())).json().catch(()=>null);
  if (!cfg) return;

  const T = (sel, txt) => { const el=document.querySelector(sel); if(el&&txt!==undefined) el.textContent=txt; };
  const A = (sel, attr, val) => { const el=document.querySelector(sel); if(el&&val!==undefined) el.setAttribute(attr,val); };

  T('[data-email]', cfg.contact_email);
  A('[data-email-link]', 'href', 'mailto:' + cfg.contact_email);
  T('[data-ig]', '@' + cfg.instagram);
  A('[data-ig-link]', 'href', 'https://instagram.com/' + cfg.instagram);

  const gridTarot = document.getElementById('grid-tarot');
  const gridPrints = document.getElementById('grid-prints');
  if ((gridTarot || gridPrints) && Array.isArray(cfg.shop)) {
    const tarot = cfg.shop.filter(i => (i.collection||'').toLowerCase().includes('tarot'));
    const others = cfg.shop.filter(i => !(i.collection||'').toLowerCase().includes('tarot'));
    const cardHTML = (item) => {
      const aOpen = item.payhip ? `<a href="${item.payhip}" target="_blank" rel="noopener">` : '<div>';
      const aClose = item.payhip ? '</a>' : '</div>';
      return `
        <div class="card">
          ${aOpen}
            <img class="hero-img" style="aspect-ratio:4/5" src="${item.image}" alt="${item.title}">
            <div class="wrap" style="padding:12px 12px 16px">
              <div style="font-weight:800">${item.title}</div>
              <div class="small">${item.collection || ''}</div>
              <div class="price">${item.price || ''}</div>
            </div>
          ${aClose}
        </div>`;
    };
    const render = (grid, arr) => {
      if (!grid) return;
      grid.innerHTML = arr.map(cardHTML).join('');
    };
    render(gridTarot, tarot);
    render(gridPrints, others);
  }
});
