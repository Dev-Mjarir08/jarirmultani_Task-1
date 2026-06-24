
/* ── Navbar: scroll glass effect + active link ── */
const navbar     = document.getElementById('navbar');
const navLinks   = document.querySelectorAll('.nav-link');
const sections   = document.querySelectorAll('section[id], footer[id]');

function updateNav() {
  // Glassmorphism on scroll
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Active link highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav(); // run once on page load

/* ── Mobile menu toggle ──────────────────────── */
const navToggle    = document.getElementById('navToggle');
const navLinksMenu = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinksMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu on link click
navLinksMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksMenu.classList.remove('open');
    navToggle.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Back to top button ──────────────────────── */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});



/* ── Counter Animation ───────────────────────── */
const statNumbers  = document.querySelectorAll('.stat-number');
let countersStarted = false;

function startCounters() {
  statNumbers.forEach(el => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800; // ms
    const stepTime  = Math.max(Math.floor(duration / target), 10);
    let current    = 0;

    const timer = setInterval(() => {
    
      const remaining = target - current;
      const increment = Math.max(Math.ceil(remaining / 12), 1);
      current = Math.min(current + increment, target);
      el.textContent = current.toLocaleString();
      if (current >= target) clearInterval(timer);
    }, stepTime);
  });
}

// Trigger counters once stats section is in view
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      startCounters();
      statsObserver.disconnect();
    }
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);
}

/* ── Contact Form ────────────────────────────── */
const sendBtn     = document.getElementById('sendBtn');
const formSuccess = document.getElementById('formSuccess');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name    = document.getElementById('fullName').value.trim();
    const email   = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      // Simple shake feedback
      sendBtn.style.animation = 'shake 0.4s ease';
      setTimeout(() => sendBtn.style.animation = '', 450);
      sendBtn.textContent = '⚠ Please fill all fields';
      setTimeout(() => {
        sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      }, 2000);
      return;
    }

    // Simulate send
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

    setTimeout(() => {
      sendBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
      formSuccess.classList.add('show');

      // Reset after 4s
      setTimeout(() => {
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        formSuccess.classList.remove('show');
        ['fullName', 'email', 'subject', 'message'].forEach(id => {
          document.getElementById(id).value = '';
        });
      }, 4000);
    }, 1500);
  });
}

// Shake keyframe via JS (avoids extra CSS)
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-6px); }
    40%       { transform: translateX(6px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
`;
document.head.appendChild(shakeStyle);

/* ── Smooth scroll for all anchor links ─────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 0;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Reduced Motion: skip animations ─────────── */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealEls.forEach(el => el.classList.add('visible'));
  document.documentElement.style.setProperty('--transition', '0s');
}
