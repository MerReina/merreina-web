
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const cfg = await (await fetch('site_config.json?v=' + Date.now())).json();
    const T = (sel, txt) => { const el = document.querySelector(sel); if (el && txt !== undefined) el.textContent = txt; };
    const A = (sel, attr, val) => { const el = document.querySelector(sel); if (el && val !== undefined) el.setAttribute(attr, val); };

    // Hero + Bio
    T('[data-h1]', cfg.h1);
    T('[data-sub]', cfg.subtitle);
    const hero = document.querySelector('[data-hero]');
    if (hero && cfg.hero_image) hero.setAttribute('src', cfg.hero_image);
    T('[data-bio]', cfg.bio_text);

    // Contact / IG
    T('[data-email]', cfg.contact_email);
    A('[data-email-link]', 'href', 'mailto:' + cfg.contact_email);
    T('[data-ig]', '@' + cfg.instagram);
    A('[data-ig-link]', 'href', 'https://instagram.com/' + cfg.instagram);

    // Tienda split
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
            <img class="hero-img" style="aspect-ratio:4/5" src="${item.image}" alt="${item.title}">
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
