/**
 * Remotion-style spring physics — semi-implicit Euler integration.
 * Algorithm: a = (-k*x - c*v) / m, v += a*dt, x += v*dt
 */
class Spring {
  constructor(config = {}) {
    this.x = 0;
    this.v = 0;
    this.to = 1;
    this.stiffness = config.stiffness ?? 100;
    this.damping = config.damping ?? 10;
    this.mass = config.mass ?? 1;
    this.dt = 1 / 60;
    this.done = false;
  }

  step() {
    const k = this.stiffness;
    const c = this.damping;
    const m = this.mass;
    const dx = this.x - this.to;
    const a = (-k * dx - c * this.v) / m;
    this.v += a * this.dt;
    this.x += this.v * this.dt;

    if (Math.abs(dx) < 0.001 && Math.abs(this.v) < 0.001) {
      this.x = this.to;
      this.done = true;
    }
    return this.x;
  }

  reset() {
    this.x = 0;
    this.v = 0;
    this.done = false;
  }
}

/**
 * Staggered spring entrance for a group of elements.
 * Each element gets delayed by `stagger * index`.
 */
function springEntrance(elements, { stiffness = 100, damping = 16, stagger = 0.06 } = {}) {
  const springs = elements.map((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    return {
      el,
      spring: new Spring({ stiffness, damping }),
      delay: i * stagger, // seconds
      elapsed: 0,
      started: false,
    };
  });

  let startTime = null;

  function tick(now) {
    if (!startTime) startTime = now;
    const elapsed = (now - startTime) / 1000;

    let allDone = true;
    for (const item of springs) {
      if (item.spring.done) continue;
      allDone = false;

      if (!item.started) {
        if (elapsed >= item.delay) {
          item.started = true;
          item.elapsed = elapsed - item.delay;
        } else {
          continue;
        }
      } else {
        item.elapsed += 1 / 60;
        // Run multiple steps to catch up
        const steps = Math.max(1, Math.floor((now - startTime) / 1000 * 60 - item.elapsed * 60));
        for (let s = 0; s < Math.min(steps, 5); s++) {
          item.spring.step();
        }
        item.elapsed += steps / 60;
      }

      const val = item.spring.x;
      item.el.style.opacity = String(val);
      item.el.style.transform = `translateY(${20 * (1 - val)}px)`;
    }

    if (!allDone) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

/**
 * Scroll-triggered reveal using IntersectionObserver.
 * CSS class-based: elements with `.reveal` get `.visible` when in view.
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );

  for (const el of elements) observer.observe(el);
}

/**
 * Smart nav: hide on scroll down, show on scroll up.
 */
function initSmartNav() {
  const nav = document.querySelector('.site-header');
  if (!nav) return;

  let lastY = 0;
  let ticking = false;

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY < 60) {
            nav.classList.remove('nav-hidden');
          } else if (currentY > lastY) {
            nav.classList.add('nav-hidden');
          } else {
            nav.classList.remove('nav-hidden');
          }
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );
}

/**
 * Ambient light that follows mouse in hero section.
 */
function initAmbientLight() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  // Create ambient light element
  const ambient = document.createElement('div');
  ambient.className = 'hero-ambient';
  ambient.style.cssText =
    'position:absolute;inset:0;pointer-events:none;z-index:0;transition:background 0.15s ease-out';
  hero.style.position = 'relative';
  hero.appendChild(ambient);

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ambient.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(0,113,227,0.06) 0%, transparent 60%)`;
  });
}

/**
 * Spring hover effect on cards.
 */
function initCardHover() {
  const cards = document.querySelectorAll('.store-card');
  for (const card of cards) {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
      card.style.transform = 'translateY(-4px)';
      card.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
      card.style.borderColor = 'rgba(0,113,227,0.3)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition =
        'transform 0.5s cubic-bezier(0.32, 0.72, 0, 1), box-shadow 0.5s cubic-bezier(0.32, 0.72, 0, 1), border-color 0.5s ease';
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'none';
      card.style.borderColor = '';
    });
  }
}

/* ── Boot ── */
let firstLoad = true;

function boot() {
  initSmartNav();
  initCardHover();
  initScrollReveal();

  // Hero entrance: only on first load or when navigating to home
  if (!firstLoad && location.pathname !== '/') return;
  firstLoad = false;

  // Re-create ambient light each time (Turbo replaces body)
  const oldAmbient = document.querySelector('.hero-ambient');
  if (oldAmbient) oldAmbient.remove();
  initAmbientLight();

  const heroName = document.querySelector('.hero-name');
  if (!heroName) return;

  const text = heroName.textContent.trim();
  heroName.textContent = '';

  const letters = text.split('').map((char) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    heroName.appendChild(span);
    return span;
  });

  const badge = document.querySelector('.hero-badge');
  if (badge) {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(10px)';
    const badgeSpring = new Spring({ stiffness: 120, damping: 14 });
    let badgeStart = null;
    (function badgeAnim(now) {
      if (!badgeStart) badgeStart = now;
      if ((now - badgeStart) / 1000 > 0.4) {
        badge.style.opacity = '1';
        badge.style.transform = 'translateY(0)';
        springEntrance(letters, { stiffness: 100, damping: 20, stagger: 0.06 });
        return;
      }
      const val = badgeSpring.step();
      badge.style.opacity = String(val);
      badge.style.transform = `translateY(${10 * (1 - val)}px)`;
      requestAnimationFrame(badgeAnim);
    })(performance.now());
  } else {
    springEntrance(letters, { stiffness: 100, damping: 20, stagger: 0.06 });
  }

  const subtitle = document.querySelector('.hero-subtitle');
  if (subtitle) {
    setTimeout(() => {
      subtitle.style.opacity = '0';
      subtitle.style.transform = 'translateY(20px)';
      const subSpring = new Spring({ stiffness: 80, damping: 18 });
      (function subAnim(now) {
        if (subSpring.done) return;
        const val = subSpring.step();
        subtitle.style.opacity = String(val);
        subtitle.style.transform = `translateY(${20 * (1 - val)}px)`;
        requestAnimationFrame(subAnim);
      })(performance.now());
    }, text.length * 60 + 500);
  }

  const actions = document.querySelector('.hero-actions');
  if (actions) {
    setTimeout(() => {
      actions.style.opacity = '0';
      actions.style.transform = 'translateY(15px)';
      const actSpring = new Spring({ stiffness: 90, damping: 16 });
      (function actAnim(now) {
        if (actSpring.done) return;
        const val = actSpring.step();
        actions.style.opacity = String(val);
        actions.style.transform = `translateY(${15 * (1 - val)}px)`;
        requestAnimationFrame(actAnim);
      })(performance.now());
    }, text.length * 60 + 700);
  }
}

// Support both standard page load and Turbo Drive
document.addEventListener('DOMContentLoaded', boot);
document.addEventListener('turbo:load', boot);
