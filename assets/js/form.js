// form.js - client-side validation and simulated submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '';
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Basic validation
    const errors = [];
    if (!name) errors.push('Please enter your name.');
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('Please enter a valid email.');
    if (!message) errors.push('Please enter a message.');

    if (errors.length) {
      status.textContent = errors.join(' ');
      status.style.color = 'crimson';
      return;
    }

    // Simulated submission (replace with actual API or Formspree)
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    try {
      await fakeSubmit({name, email, message, subject: form.subject.value});
      status.textContent = 'Message sent — thank you! I will get back to you soon.';
      status.style.color = 'green';
      form.reset();
    } catch (err) {
      status.textContent = 'Submission failed. Please try again later.';
      status.style.color = 'crimson';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
    }
  });

  function fakeSubmit(payload) {
    return new Promise((resolve) => setTimeout(resolve, 900));
  }
});
