
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const cfg = await (await fetch('site_config.json?v=' + Date.now())).json();
    const T = (sel, txt) => { const el = document.querySelector(sel); if (el && txt !== undefined) el.textContent = txt; };
    const A = (sel, attr, val) => { const el = document.querySelector(sel); if (el && val !== undefined) el.setAttribute(attr, val); };

    T('[data-email]', cfg.contact_email);
    A('[data-email-link]', 'href', 'mailto:' + cfg.contact_email);
    T('[data-ig]', '@' + cfg.instagram);
    A('[data-ig-link]', 'href', 'https://instagram.com/' + cfg.instagram);

    const hero = document.querySelector('[data-hero]');
    if (hero && cfg.hero_image) hero.setAttribute('src', cfg.hero_image);
  } catch(e){}
});
