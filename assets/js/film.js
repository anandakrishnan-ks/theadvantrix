(() => {
  const dialog = document.getElementById('film');
  const video = document.getElementById('filmv');
  const closeButton = document.getElementById('filmx');
  const rootClasses = document.documentElement.classList;
  let restoreCustomCursor = false;

  if (!dialog?.showModal || !video || !closeButton) return;

  document.querySelectorAll('[data-film]').forEach((button) => {
    button.addEventListener('click', () => {
      if (dialog.open) return;

      dialog.showModal();
      // The custom cursor sits behind the modal's browser top layer.
      restoreCustomCursor = rootClasses.contains('has-cur');
      rootClasses.remove('has-cur');
      video.currentTime = 0;
      video.play().catch(() => {});
    });
  });

  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    video.pause();
    if (restoreCustomCursor) rootClasses.add('has-cur');
  });
})();
