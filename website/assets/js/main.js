(() => {
  const root = document.documentElement;

  const nav = document.getElementById('nav');
  const menu = document.getElementById('menu');

  if (nav && menu) {
    nav.classList.add('menu-ready');

    menu.addEventListener('click', () => {
      const expanded = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(expanded));
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        nav.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.1 });

    root.classList.add('reveal-ready');
    document.querySelectorAll('.rv').forEach((item) => observer.observe(item));
  }

  const cursor = document.getElementById('cur');
  const icon = document.getElementById('curi');
  const label = document.getElementById('curl');

  if (!matchMedia('(pointer: fine)').matches || !cursor || !icon || !label) return;

  const icons = [
    ['Target', '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/>'],
    ['Announce', '<path d="M3 10.5v3a1 1 0 0 0 1 1h2.5L12 19V5L6.5 9.5H4a1 1 0 0 0-1 1z"/><path d="M15.5 9a4 4 0 0 1 0 6M18.5 6a8 8 0 0 1 0 12"/>'],
    ['Like', '<path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>'],
    ['Hashtag', '<path d="M5 9h14M5 15h14M10.5 4 8.5 20M15.5 4l-2 16"/>'],
    ['Growth', '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'],
    ['Mention', '<circle cx="12" cy="12" r="4"/><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7.1"/>'],
    ['Play', '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9v6l5-3z" fill="currentColor"/>'],
    ['SEO', '<circle cx="11" cy="11" r="7"/><path d="M20.5 20.5 16 16"/>'],
    ['Launch', '<path d="M12 2.5c3.8 2 5.8 5.8 5.8 9.8L15 15H9l-2.8-2.7c0-4 2-7.8 5.8-9.8z"/><circle cx="12" cy="9" r="1.8"/><path d="M9 15l-2.5 4.5L10 18M15 15l2.5 4.5L14 18"/>'],
    ['Thumbs up', '<path d="M7 10v10H4V10h3zM7 10l4-7c1.3 0 2.3 1.2 2 2.5L12.3 9H19a2 2 0 0 1 2 2.3l-1.4 7A2 2 0 0 1 17.6 20H7"/>'],
    ['Email', '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/>'],
    ['AI', '<path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9z"/><path d="M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>'],
    ['Share', '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>'],
    ['Web', '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>'],
    ['Code', '<path d="M8.5 6 2.5 12l6 6M15.5 6l6 6-6 6"/>'],
    ['Design', '<path d="M12 20l8-8-3.5-3.5-8 8L7 20z"/><path d="M14 6.5 17.5 10M3 21l4-1"/>'],
  ];

  const hint = document.getElementById('hint');
  const hintIcon = document.getElementById('hinti');
  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let iconIndex = 0;

  try {
    const savedIndex = Number(localStorage.getItem('advx-cur'));
    if (Number.isInteger(savedIndex) && savedIndex >= 0) iconIndex = savedIndex % icons.length;
  } catch {
    // The cursor also works when browser storage is unavailable.
  }

  try {
    if (sessionStorage.getItem('advx-cursor-used')) hint?.remove();
  } catch {
    // The hint can still be dismissed on the current page.
  }

  const iconSvg = (index) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[index][1]}</svg>`;

  root.classList.add('has-cur');
  icon.innerHTML = iconSvg(iconIndex);
  if (hintIcon?.isConnected) hintIcon.innerHTML = iconSvg(iconIndex);

  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let pointerX = x;
  let pointerY = y;
  let labelTimeout;

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    cursor.classList.toggle('hot', Boolean(
      event.target.closest('a, button, input, select, textarea, label, .tile, .glass, figure')
    ));
  }, { passive: true });

  document.addEventListener('pointerleave', () => { cursor.style.opacity = '0'; });
  document.addEventListener('pointerenter', () => { cursor.style.opacity = '1'; });

  function moveCursor() {
    x += (pointerX - x) * 0.32;
    y += (pointerY - y) * 0.32;
    cursor.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(moveCursor);
  }
  moveCursor();

  window.addEventListener('pointerdown', (event) => {
    if (!root.classList.contains('has-cur')) return;

    cursor.classList.add('down');
    iconIndex = (iconIndex + 1) % icons.length;
    icon.innerHTML = iconSvg(iconIndex);

    try {
      localStorage.setItem('advx-cur', iconIndex);
      sessionStorage.setItem('advx-cursor-used', 'true');
    } catch {
      // Storage is optional for the cursor interaction.
    }

    label.textContent = icons[iconIndex][0];
    label.classList.add('show');
    clearTimeout(labelTimeout);
    labelTimeout = setTimeout(() => label.classList.remove('show'), 900);

    if (hint?.isConnected) {
      hint.style.opacity = '0';
      setTimeout(() => hint.remove(), 600);
    }

    if (prefersReducedMotion) return;

    for (let i = 0; i < 7; i++) {
      const spark = document.createElement('span');
      spark.className = 'spark';
      spark.innerHTML = iconSvg((iconIndex + i) % icons.length);
      spark.style.left = `${event.clientX - 9}px`;
      spark.style.top = `${event.clientY - 9}px`;
      document.body.appendChild(spark);

      const angle = i / 7 * Math.PI * 2 + Math.random() * 0.5;
      const distance = 50 + Math.random() * 40;
      const rotation = (Math.random() - 0.5) * 90;
      spark.animate([
        { transform: 'translate(0, 0) scale(0.4)', opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1) rotate(${rotation}deg)`,
          opacity: 0,
        },
      ], { duration: 700, easing: 'cubic-bezier(.2, .7, .2, 1)' }).onfinish = () => spark.remove();
    }
  });

  window.addEventListener('pointerup', () => cursor.classList.remove('down'));
})();
