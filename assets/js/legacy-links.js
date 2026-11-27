(() => {
  const routes = new Map([
    ['#services', 'pages/services.html'],
    ['#work', 'pages/work.html'],
    ['#production', 'pages/production.html'],
    ['#about', 'pages/about.html'],
    ['#contact', 'pages/contact.html'],
    ['#case-starglass', 'pages/projects/starglass.html'],
    ['#case-exotica', 'pages/projects/exotica.html'],
    ['#case-fair', 'pages/projects/fair.html'],
    ['#case-seaways', 'pages/projects/seaways.html'],
    ['#case-creatov', 'pages/projects/creatov.html'],
  ]);

  function redirectLegacyLink() {
    const destination = routes.get(location.hash);
    if (destination) location.replace(destination);
  }

  window.addEventListener('hashchange', redirectLegacyLink);
  redirectLegacyLink();
})();
