// hero.js — Cockpit dashboard data binding and interaction orchestration

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('hero-section');
  if (!hero || !window.siteContentPromise) return;

  window.siteContentPromise.then((data) => {
    if (!data) return;

    const isReduced = Boolean(window.utils && window.utils.isReducedMotion());
    const isTouch = Boolean(window.utils && window.utils.isTouchDevice());
    const home = data.home || {};
    const skills = Array.isArray(data.skills) ? data.skills : [];
    const trailSkills = Array.isArray(data.mousetrailSkills) && data.mousetrailSkills.length > 0 ? data.mousetrailSkills : skills;
    const arcFills = {
      left: data.heroArcs?.left?.fill ?? 0,
      right: data.heroArcs?.right?.fill ?? 0
    };

    bindHomeContent(data, home);
    buildCta(home.cta);
    bindArcLabels(data.heroArcs);
    bindArcInteractions();
    renderTouchTags(skills, isTouch, isReduced);
    initMousetrail(trailSkills, isTouch, isReduced);
    initClock();
    initAnimations(arcFills, home.reconLines || [], isReduced);
  });

  function bindHomeContent(data, home) {
    setText('hero-name', data.identity?.heroDisplay);
    const heroName = document.getElementById('hero-name');
    if (heroName && data.identity?.heroDisplay) heroName.dataset.text = data.identity.heroDisplay;
    setText('hero-title', data.identity?.heroTitle);
    setText('hero-status', home.status);
    setText('scroll-prompt', home.scrollPrompt);
    setText('telemetry-focus', home.telemetryFocus);
    setText('recon-prompt', home.reconPrompt);
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element && value) element.textContent = value;
  }

  function bindArcLabels(arcs) {
    for (const side of ['left', 'right']) {
      const arc = arcs?.[side];
      if (!arc) continue;
      const container = document.getElementById(`label-${side}-container`);
      if (!container) continue;
      container.querySelector('.arc-label').textContent = arc.label;
      container.querySelector('.arc-reveal').textContent = arc.reveal;
      container.setAttribute('aria-label', `${arc.label}: ${arc.reveal}`);
    }
  }

  function bindArcInteractions() {
    document.querySelectorAll('.arc-label-container').forEach((container) => {
      const toggle = () => {
        const isRevealed = container.classList.toggle('is-revealed');
        container.setAttribute('aria-pressed', String(isRevealed));
      };
      container.setAttribute('role', 'button');
      container.setAttribute('tabindex', '0');
      container.setAttribute('aria-pressed', 'false');
      container.addEventListener('click', toggle);
      container.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggle();
        }
      });
    });
  }

  function renderTouchTags(skills, isTouch, isReduced) {
    const container = document.getElementById('touch-tags');
    if (!container || !isTouch || isReduced) return;
    skills.slice(0, 6).forEach((skill) => {
      const tag = document.createElement('span');
      tag.className = 'touch-tag';
      tag.textContent = skill;
      container.appendChild(tag);
    });
  }

  function initMousetrail(skills, isTouch, isReduced) {
    const container = document.getElementById('mousetrail-container');
    if (!container || isTouch || isReduced || skills.length === 0) return;

    const pool = Array.from({ length: 8 }, () => {
      const tag = document.createElement('span');
      tag.className = 'mousetrail-tag';
      container.appendChild(tag);
      return tag;
    });
    let poolIndex = 0;
    let lastSpawn = 0;

    hero.addEventListener('mousemove', (event) => {
      if (window.scrollY >= hero.offsetHeight) return;
      const now = Date.now();
      if (now - lastSpawn < 200) return;
      lastSpawn = now;

      const tag = pool[poolIndex];
      poolIndex = (poolIndex + 1) % pool.length;
      tag.textContent = skills[Math.floor(Math.random() * skills.length)];
      tag.style.left = `${event.clientX}px`;
      tag.style.top = `${event.clientY}px`;
      tag.getAnimations().forEach((animation) => animation.cancel());
      tag.animate([
        { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' },
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1.05)', offset: 0.2 },
        { opacity: 0, transform: 'translate(-50%, calc(-50% - 20px)) scale(1)' }
      ], { duration: 2500, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
    });
  }

  function initClock() {
    const clock = document.getElementById('local-time');
    if (!clock) return;
    const updateClock = () => {
      clock.textContent = new Intl.DateTimeFormat([], {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      }).format(new Date());
    };
    updateClock();
    window.setInterval(updateClock, 1000);
  }

  function initRecon(lines, isReduced) {
    const output = document.getElementById('recon-output');
    if (!output || lines.length === 0) return;
    const appendLine = (line) => {
      const row = document.createElement('div');
      row.className = 'recon-line';
      row.textContent = `> ${line}`;
      output.appendChild(row);
      if (output.childElementCount > 6) output.removeChild(output.firstChild);
    };

    if (isReduced) {
      lines.slice(0, 5).forEach(appendLine);
      return;
    }

    let index = 0;
    appendLine(lines[index++]);
    window.setInterval(() => appendLine(lines[index++ % lines.length]), 1300);
  }

  function initAnimations(arcFills, reconLines, isReduced) {
    if (typeof gsap === 'undefined') return;
    const setupScroll = () => {
      if (typeof ScrollTrigger === 'undefined') return;
      gsap.registerPlugin(ScrollTrigger);

      if (!isReduced) {
        gsap.to('.arc-fill-rect', {
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
          attr: { y: 400 }, ease: 'none', immediateRender: false
        });
        gsap.to('.hero-center', {
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
          opacity: 0, y: -30, ease: 'none', immediateRender: false
        });
        gsap.to('.telemetry-corner, .recon-panel', {
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
          opacity: 0, ease: 'none', immediateRender: false
        });
      }

      ScrollTrigger.create({
        trigger: '.stats-strip-section',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          window.startStatsCounter?.();
          if (!isReduced) {
            gsap.fromTo('.stat-block',
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }
            );
          }
        }
      });

      if (!isReduced) {
        ScrollTrigger.create({
          trigger: '.cta-zone',
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.fromTo(['#cta-eyebrow', '#cta-heading', '#cta-description'],
              { autoAlpha: 0, y: 30, filter: 'blur(8px)' },
              { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.1, ease: 'expo.out' }
            );
            gsap.fromTo('.cta-card-wrapper',
              { autoAlpha: 0, y: 40, filter: 'blur(8px)', rotationX: -5 },
              { autoAlpha: 1, y: 0, filter: 'blur(0px)', rotationX: 0, duration: 1.4, stagger: 0.15, ease: 'expo.out', delay: 0.2, transformPerspective: 1000 }
            );
          }
        });
      }
    };

    if (isReduced) {
      gsap.set(['.telemetry-corner', '.hero-sidebar', '.glitch-wrapper', '.title-scroller', '.status-line', '.scroll-indicator'], { opacity: 1 });
      gsap.set('.arc-fill-rect', { attr: { y: 0 } });
      initRecon(reconLines, true);
      return;
    }

    gsap.set('.arc-fill-rect', { attr: { y: 400 } });
    gsap.set(['.glitch-wrapper', '.title-scroller', '.status-line', '.scroll-indicator', '.hero-sidebar', '.telemetry-corner', '.recon-panel'], { opacity: 0 });

    const name = document.getElementById('hero-name');
    const finalName = name?.textContent || '';


    const timeline = gsap.timeline();
    timeline
      .to('.hero-sidebar', { opacity: 1, duration: 0.4 }, 0)
      .to('#arc-left .arc-fill-rect', { attr: { y: 400 * (1 - arcFills.left) }, duration: 1.6, ease: 'expo.out' }, 0)
      .to('#arc-right .arc-fill-rect', { attr: { y: 400 * (1 - arcFills.right) }, duration: 1.6, ease: 'expo.out' }, 0)
      .to('.telemetry-corner', { opacity: 0.6, duration: 1.4 }, 0)
      .fromTo('.glitch-wrapper', { filter: 'blur(10px)', scale: 1.05 }, { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.2, ease: 'expo.out' }, 0.4)
      .to('.title-scroller, .status-line', { opacity: 1, duration: 0.8, stagger: 0.1 }, 1.2)
      .to('.recon-panel', { opacity: 1, duration: 0.6 }, 1.6)
      .call(() => initRecon(reconLines, false), [], 1.6)
      .to('.scroll-indicator', { opacity: 1, duration: 0.8 }, 2.0)
      .call(() => {
        document.querySelectorAll('.arc-fill').forEach(el => el.classList.add('is-pulsing'));
      }, [], 2.4);
    setupScroll();
  }

  function buildCta(cta) {
    if (!cta) return;
    setText('cta-eyebrow', cta.eyebrow);
    setText('cta-heading', cta.heading);
    setText('cta-description', cta.description);
    const cards = document.getElementById('cta-cards');
    if (!cards || !Array.isArray(cta.cards)) return;
    cards.replaceChildren();
    cta.cards.forEach((card, index) => {
      const numStr = String(index + 1).padStart(2, '0');
      let statusText = "ONLINE";
      if (index === 0) statusText = "ACTIVE";
      if (index === 1) statusText = "VERIFIED";
      if (index === 2) statusText = "EXPERIMENTAL";

      const wrapper = document.createElement('div');
      wrapper.className = index === 0 ? 'cta-card-wrapper hero-cta-card' : 'cta-card-wrapper';
      wrapper.setAttribute('data-tilt', '');
      wrapper.setAttribute('data-tilt-max', index === 0 ? '5' : '8');
      wrapper.setAttribute('data-tilt-speed', '400');
      wrapper.setAttribute('data-tilt-glare', '');
      wrapper.setAttribute('data-tilt-max-glare', '0.2');

      wrapper.innerHTML = `
        <a href="${card.href}" class="cta-card" aria-label="${card.label}">
          <div class="cta-card-inner">
            <div class="cta-card-number" aria-hidden="true">${numStr}</div>
            <div class="cta-card-content">
              <div class="cta-card-status">
                <span class="status-dot"></span>
                ${statusText}
              </div>
              <h3 class="cta-card-title mono"></h3>
              <p class="cta-card-desc"></p>
            </div>
            <div class="cta-card-arrow" aria-hidden="true">→</div>
          </div>
        </a>
      `;
      wrapper.querySelector('.cta-card-title').textContent = card.label;
      wrapper.querySelector('.cta-card-desc').textContent = card.description;
      cards.appendChild(wrapper);

      // Initialize tilt for the new wrapper
      if (window.VanillaTilt) {
        // VanillaTilt.init(wrapper);
      }
    });

    // Initialize Magnetic Physics for dynamically rendered cards
    if (typeof window.initMagneticPhysics === 'function') {
      window.initMagneticPhysics();
    }
  }
});
