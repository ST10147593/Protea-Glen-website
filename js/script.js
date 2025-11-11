// Mobile nav toggle & active link highlight + contact form demo
document.addEventListener('DOMContentLoaded', function () {
  // nav toggle
  const toggle = document.querySelectorAll('.nav-toggle');
  const nav = document.querySelectorAll('.nav');
  toggle.forEach(btn => {
    btn.addEventListener('click', () => {
      nav.forEach(n => {
        const list = n.querySelector('.nav-list');
        if (list) {
          const visible = list.style.display === 'flex';
          list.style.display = visible ? 'none' : 'flex';
          btn.setAttribute('aria-expanded', String(!visible));
        }
      });
    });
  });

  // Highlight active menu link based on URL
  const links = document.querySelectorAll('.nav-list a');
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href && location.pathname.endsWith(href)) {
      a.classList.add('active');
    }
  });

  // Simple contact form handling (client-side demo)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formMsg = document.getElementById('formMsg');
      formMsg.textContent = 'Sending...';
      // demo: simulate network post
      setTimeout(() => {
        formMsg.textContent = 'Thanks! Your message has been received. We will respond soon.';
        contactForm.reset();
      }, 800);
    });
  }

  // Close nav on outside click (mobile)
  document.addEventListener('click', (e) => {
    const isNav = e.target.closest('.nav');
    const isToggle = e.target.closest('.nav-toggle');
    if (!isNav && !isToggle) {
      document.querySelectorAll('.nav-list').forEach(list => {
        if (window.getComputedStyle(list).display === 'flex' && window.innerWidth < 980) {
          list.style.display = 'none';
        }
      });
    }
  });

  function calculateFees() {
  const num = parseInt(document.getElementById('numChildren').value);
  if (num === 1) {
    document.getElementById('feeResult').innerText = `Monthly Fee: R400`;
  } else if (num >= 2) {
    document.getElementById('feeResult').innerText = `Monthly Fee: R${num * 350}`;
  } else {
    document.getElementById('feeResult').innerText = '';
  }
}
});

 const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("show");
  });