// main.js — interactive behaviour (smooth scroll, small animations, form handling)

document.addEventListener('DOMContentLoaded', function () {
  // Set dynamic year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // collapse navbar on small screens
        const navCollapse = document.querySelector('.navbar-collapse');
        if (navCollapse && navCollapse.classList.contains('show')) {
          new bootstrap.Collapse(navCollapse).hide();
        }
      }
    });
  });

  // Simple reveal-on-scroll
  const revealEls = document.querySelectorAll('main .card, main h2, .timeline-item');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => {
    el.classList.add('reveal');
    obs.observe(el);
  });

  // Contact form submission (client-side only)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Minimal validation
      if (!name || !email || !message) {
        alert('Please fill all fields before sending.');
        return;
      }

      // Here you can hook up an email API or backend. For now show a nice message:
      contactForm.querySelector('button[type="submit"]').disabled = true;
      contactForm.querySelector('button[type="submit"]').textContent = 'Sending...';

      // Simulate send (replace with real POST to backend if available)
      setTimeout(() => {
        alert('Thank you — your message has been received. I will respond via email soon.');
        contactForm.reset();
        contactForm.querySelector('button[type="submit"]').disabled = false;
        contactForm.querySelector('button[type="submit"]').textContent = 'Send Message';
      }, 900);
    });
  }

  // Activate Bootstrap scrollspy
  try {
    var scrollSpy = new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 80
    });
  } catch (e) {
    // ignore if bootstrap not loaded yet
  }
});
