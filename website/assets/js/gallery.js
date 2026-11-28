(() => {
  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function scrollGallery(gallery, direction) {
    gallery.scrollBy({
      left: direction * gallery.clientWidth * 0.8,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }

  document.querySelectorAll('.gal').forEach((gallery) => {
    gallery.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

      event.preventDefault();
      scrollGallery(gallery, event.key === 'ArrowRight' ? 1 : -1);
    });

    const controls = gallery.nextElementSibling;
    if (!controls?.classList.contains('galnav')) return;

    controls.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-g]');
      if (button) scrollGallery(gallery, Number(button.dataset.g));
    });
    controls.hidden = false;
  });
})();
