// hover-cards.js — Projects page: renders project cards and handles hover/tap preview
// All data from window.siteContent (loaded by content-loader.js)

(function () {
  'use strict';

  const HOVER_DELAY = 300; // ms before preview shows on desktop hover

  function init(data) {
    populateIntro(data);
    renderProjectCards(data);
    bindHoverCards();
    animateEntrance();
  }

  // ---- POPULATE INTRO ----
  function populateIntro(data) {
    const introEl = document.querySelector('[data-content="projectsIntro"]');
    if (introEl && data.projectsIntro) {
      introEl.textContent = data.projectsIntro;
    }
  }

  // ---- RENDER PROJECT CARDS ----
  function renderProjectCards(data) {
    const grid = document.getElementById('project-grid');
    if (!grid || !data.projects) return;

    grid.innerHTML = data.projects.map((project, i) => {
      const num = String(i + 1).padStart(2, '0');
      const statusLabel = project.status === 'in-progress' ? 'IN PROGRESS' : project.status.toUpperCase();
      const githubLink = project.github
        ? `<a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
            View on GitHub <span class="project-link-arrow">↗</span>
           </a>`
        : `<span class="project-link" style="color: var(--muted); pointer-events: none;">
            REPO COMING SOON
           </span>`;

      const stackPills = project.stack.map(tech =>
        `<span class="tag-pill">${tech}</span>`
      ).join('');

      // Asymmetrical layout: every 1st and 4th card spans 2 columns on desktop
      const isLarge = (i % 3 === 0);
      const spanClass = isLarge ? 'col-span-2' : '';

      return `
        <div class="project-card-wrapper ${spanClass}" data-tilt data-tilt-glare data-tilt-max-glare="0.15" data-tilt-max="5" data-tilt-speed="400" data-tilt-perspective="1500" data-index="${i}">
          <div class="project-card">
            <span class="project-card-number">${num}</span>
            <div class="project-status">
              <span class="project-status-dot"></span>
              ${statusLabel}
            </div>
            <div class="project-name">${project.name}</div>
            <div class="project-desc">${project.description}</div>
            <div class="project-stack">${stackPills}</div>
            <div style="margin-top: auto;">
              ${githubLink}
            </div>
            <div class="hover-card-preview glass-panel">
              <div class="hover-preview-text">
                ${project.stack.length} TOOLS • ${statusLabel} • ${project.github ? 'OPEN SOURCE' : 'PRIVATE REPO'}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Initialize VanillaTilt if present
    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(document.querySelectorAll('.project-card-wrapper'));
    }

    // Initialize Magnetic Physics for dynamically rendered cards
    if (typeof window.initMagneticPhysics === 'function') {
      window.initMagneticPhysics();
    }
  }

  // ---- HOVER / TAP LOGIC ----
  function bindHoverCards() {
    const wrappers = document.querySelectorAll('.project-card-wrapper');
    const isTouch = window.matchMedia('(hover: none)').matches;

    wrappers.forEach(wrapper => {
      const card = wrapper.querySelector('.project-card');
      const preview = card.querySelector('.hover-card-preview');
      if (!preview) return;

      let hoverTimeout = null;

      if (isTouch) {
        // Touch: tap to toggle
        wrapper.addEventListener('click', (e) => {
          // Don't toggle if tapping a link
          if (e.target.closest('.project-link')) return;
          preview.classList.toggle('active');
        });
      } else {
        // Desktop: hover with delay
        wrapper.addEventListener('mouseenter', () => {
          hoverTimeout = setTimeout(() => {
            preview.classList.add('active');
          }, HOVER_DELAY);
        });

        wrapper.addEventListener('mouseleave', () => {
          clearTimeout(hoverTimeout);
          preview.classList.remove('active');
        });
      }
    });
  }

  // ---- GSAP: Card entrance animations ----
  function animateEntrance() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(
      {
        normal: '(prefers-reduced-motion: no-preference) and (min-width: 769px)',
        mobile: '(prefers-reduced-motion: no-preference) and (max-width: 768px)',
        reduced: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { reduced, normal, mobile } = context.conditions;
        if (reduced) return;

        // Header and intro entrance
        gsap.fromTo('.projects-header, .projects-intro',
          { autoAlpha: 0, y: mobile ? 20 : 40, filter: mobile ? 'none' : 'blur(8px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: mobile ? 'none' : 'blur(0px)',
            duration: mobile ? 0.8 : 1.2,
            ease: 'expo.out',
            stagger: 0.1
          }
        );

        // Cards staggered entrance
        gsap.fromTo('.project-card-wrapper',
          { autoAlpha: 0, y: mobile ? 30 : 60, filter: mobile ? 'none' : 'blur(10px)', rotationX: mobile ? 0 : -5 },
          {
            scrollTrigger: {
              trigger: '.project-grid',
              start: 'top 85%',
            },
            autoAlpha: 1,
            y: 0,
            filter: mobile ? 'none' : 'blur(0px)',
            rotationX: 0,
            duration: mobile ? 0.8 : 1.2,
            ease: 'expo.out',
            stagger: mobile ? 0.05 : 0.1, // Throttled stagger on mobile
            clearProps: 'filter,transform'
          }
        );
      }
    );
  }

  // Wait for content
  if (window.siteContentPromise) {
    window.siteContentPromise.then(data => {
      if (data) init(data);
    });
  }
})();
