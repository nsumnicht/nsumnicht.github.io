/* ============================================================
   script.js — Global JavaScript for Nick Sumnicht Portfolio
   ============================================================ */

/* --- Mobile nav toggle ---
   When the hamburger button is clicked, we toggle the
   "open" class on both the button and the mobile menu.
   CSS handles the actual show/hide and animation.
   ----------------------------------------------------------- */
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.nav__mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  /* Close mobile menu when a link is clicked */
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

/* --- Footer year --- auto-updates so you never have to touch it */
const yearEl = document.getElementById('footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* --- Active nav link on scroll ---
   As the user scrolls, we find which section is currently
   in view and highlight the matching nav link.

   IntersectionObserver watches each section. When a section
   is at least 40% visible, it's considered "active."
   ----------------------------------------------------------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a, .nav__mobile-menu a');

const observerOptions = {
  rootMargin: '-20% 0px -60% 0px', /* trigger when section is in top 40% of viewport */
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

/* --- Fade-in on scroll ---
   Elements with class "fade-in" start invisible and slide up
   into view as they enter the viewport.
   Add class="fade-in" to any element you want this effect on.
   ----------------------------------------------------------- */
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); /* only animate once */
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));
