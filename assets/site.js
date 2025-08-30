
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const cfg = await (await fetch('site_config.json?v=' + Date.now())).json();
    const T = (sel, txt) => { const el = document.querySelector(sel); if (el && txt !== undefined) el.textContent = txt; };
    const A = (sel, attr, val) => { const el = document.querySelector(sel); if (el && val !== undefined) el.setAttribute(attr, val); };

    T('[data-h1]', cfg.h1);
    T('[data-sub]', cfg.subtitle);
    T('[data-stamp]', cfg.stamp);

    // Contact
    T('[data-email]', cfg.contact_email);
    A('[data-email-link]', 'href', 'mailto:' + cfg.contact_email);
    T('[data-ig]', '@' + cfg.instagram);
    A('[data-ig-link]', 'href', 'https://instagram.com/' + cfg.instagram);

    // Home showcase
    (cfg.index_showcase || []).forEach((src, i)=>{
      const el = document.querySelector('.index-collage .i' + (i+1));
      if (el) el.setAttribute('src', src);
    });

    // Portfolio collage
    (cfg.collage || []).forEach((src, i)=>{
      const el = document.querySelector('.collage .i' + (i+1));
      if (el) el.setAttribute('src', src);
    });

    // Bio photo
    if (cfg.bio_photo) {
      const el = document.querySelector('[data-bio-photo]');
      if (el) el.setAttribute('src', cfg.bio_photo);
    }

    // Shop
    const noteTarot = document.getElementById('note-tarot');
    if (noteTarot && cfg.shop_note_tarot) noteTarot.textContent = cfg.shop_note_tarot;

    const tienda = document.getElementById('tienda-grid');
    if (tienda && Array.isArray(cfg.shop)) {
      tienda.innerHTML = '';
      cfg.shop.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img class="placeholder" src="${item.image}" alt="${item.title}">
          <div class="wrap" style="padding:12px 12px 16px">
            <div style="font-weight:800">${item.title}</div>
            <div class="small">${item.collection || ''}</div>
            <div class="price">${item.price}</div>
          </div>`;
        tienda.appendChild(card);
      });
    }
  } catch(e) { console.warn('No config', e); }
});
