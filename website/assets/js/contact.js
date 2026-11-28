(() => {
  const form = document.getElementById('form');
  const status = document.getElementById('ok');
  const submit = form?.querySelector('button[type="submit"]');
  if (!form || !status || !submit) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const isValid = Boolean(name) && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

    status.classList.add('visible');
    status.classList.toggle('error', !isValid);
    if (!isValid) {
      status.textContent = 'Please add your name and a valid email.';
      return;
    }

    status.textContent = `Thanks, ${name}! We've got your enquiry. (Demo form — connect it to your email or CRM before launch.)`;
    form.reset();
  });

  submit.disabled = false;
})();
