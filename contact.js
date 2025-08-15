// js/contact.js
(() => {
  const form = document.querySelector('form[name="contact-quick"]');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  const encode = (data) =>
    Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    payload['form-name'] = form.getAttribute('name');

    try {
      await fetch('/', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: encode(payload)
      });
      form.reset();
      status.textContent = '✅ Thanks! We’ll call you shortly.';
      setTimeout(() => status.textContent = '', 5000);
    } catch (err) {
      console.error(err);
      status.textContent = '⚠️ Could not send right now. Please try WhatsApp.';
    }
  });
})();