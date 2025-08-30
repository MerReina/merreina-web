
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const cfg = await (await fetch('site_config.json?v=' + Date.now())).json();
    const T = (sel, txt) => { const el = document.querySelector(sel); if (el && txt !== undefined) el.textContent = txt; };
    const A = (sel, attr, val) => { const el = document.querySelector(sel); if (el && val !== undefined) el.setAttribute(attr, val); };

    // hero
    T('[data-h1]', cfg.h1);
    T('[data-sub]', cfg.subtitle);
    const hero = document.querySelector('[data-hero]');
    if (hero && cfg.hero_image) hero.setAttribute('src', cfg.hero_image);

    // contact
    T('[data-email]', cfg.contact_email);
    A('[data-email-link]', 'href', 'mailto:' + cfg.contact_email);
    T('[data-ig]', '@' + cfg.instagram);
    A('[data-ig-link]', 'href', 'https://instagram.com/' + cfg.instagram);

    // portfolio
    const port = document.getElementById('portfolio-sections');
    if (port && Array.isArray(cfg.portfolio_sections)) {
      port.innerHTML = '';
      cfg.portfolio_sections.forEach(sec => {
        const section = document.createElement('section');
        section.className = 'section';
        section.innerHTML = `<h2>${sec.title}</h2>`;
        const grid = document.createElement('div');
        grid.className = 'grid cols-3';
        (sec.items || []).forEach(it => {
          const fig = document.createElement('figure');
          fig.className = 'card';
          fig.innerHTML = `
            <img class="placeholder" src="${it.image || ''}" alt="${it.title || ''}">
            <figcaption style="padding:12px">
              <strong>${it.title || ''}</strong><br>${it.caption || ''}
            </figcaption>`;
          grid.appendChild(fig);
        });
        section.appendChild(grid);
        port.appendChild(section);
      });
    }

    // shop split: tarot vs others
    const note = document.getElementById('note-tarot');
    if (note && cfg.shop_note_tarot) note.textContent = cfg.shop_note_tarot;

    const gridTarot = document.getElementById('grid-tarot');
    const gridPrints = document.getElementById('grid-prints');
    if ((gridTarot || gridPrints) && Array.isArray(cfg.shop)) {
      const tarot = cfg.shop.filter(i => (i.collection||'').toLowerCase().includes('tarot'));
      const others = cfg.shop.filter(i => !(i.collection||'').toLowerCase().includes('tarot'));
      const render = (grid, arr) => {
        if (!grid) return;
        grid.innerHTML = '';
        arr.forEach(item => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <img class="placeholder" src="${item.image}" alt="${item.title}">
            <div class="wrap" style="padding:12px 12px 16px">
              <div style="font-weight:800">${item.title}</div>
              <div class="small">${item.collection || ''}</div>
              <div class="price">${item.price}</div>
            </div>`;
          grid.appendChild(card);
        });
      };
      render(gridTarot, tarot);
      render(gridPrints, others);
    }
  } catch(e) { console.warn('No config', e); }
});
