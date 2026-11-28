(() => {
  const filters = document.getElementById('filters');
  if (!filters) return;

  const buttons = filters.querySelectorAll('button[data-f]');
  const projects = document.querySelectorAll('.case[data-cat]');

  filters.addEventListener('click', (event) => {
    const activeButton = event.target.closest('button[data-f]');
    if (!activeButton) return;

    const category = activeButton.dataset.f;
    buttons.forEach((button) => {
      const isActive = button === activeButton;
      button.classList.toggle('on', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    projects.forEach((project) => {
      const categories = project.dataset.cat.split(/\s+/);
      project.hidden = category !== 'all' && !categories.includes(category);
    });
  });

  filters.hidden = false;
})();
