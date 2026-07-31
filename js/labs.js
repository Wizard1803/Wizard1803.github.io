// labs.js — Labs page: renders stats, platform cards, and entrance animations
// All data from window.siteContent (loaded by content-loader.js)

(function () {
  'use strict';

  function init(data) {
    renderStats(data);
    renderPlatforms(data);
    animateEntrance();
  }

  // ---- STAT LINE ----
  function renderStats(data) {
    const container = document.getElementById('labs-stat-line');
    if (!container || !data.home || !data.home.stats) return;

    container.innerHTML = data.home.stats.map(stat => `
      <div class="labs-stat-item">
        <div class="labs-stat-value">${stat.prefix}${stat.value}${stat.suffix}</div>
        <div class="labs-stat-label">${stat.label}</div>
      </div>
    `).join('');
  }

  // ---- PLATFORM CARDS ----
  function renderPlatforms(data) {
    const container = document.getElementById('labs-platforms');
    if (!container || !data.labs) return;

    let html = '';

    // TryHackMe
    if (data.labs.thm) {
      const thm = data.labs.thm;
      html += `
        <div class="platform-card-wrapper" data-tilt data-tilt-glare data-tilt-max-glare="0.15" data-tilt-max="5" data-tilt-speed="400" data-tilt-perspective="1500">
          <div class="platform-card">
            <div class="platform-name">TryHackMe</div>
            <div class="platform-handle">${thm.rank} • ${thm.streak} • ${thm.roomsCompleted} Rooms</div>
            <div class="platform-note">${thm.badges} badges earned across offensive security learning paths.</div>
            <div style="margin-top: auto;">
              <a href="${thm.profile}" class="platform-link" target="_blank" rel="noopener noreferrer">
                View Profile <span class="platform-link-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      `;
    }

    // HackTheBox
    if (data.labs.htb) {
      const htb = data.labs.htb;

      const toolPills = htb.toolstack.map(t =>
        `<span class="tag-pill">${t}</span>`
      ).join('');

      const langPills = htb.languages.map(l =>
        `<span class="tag-pill">${l}</span>`
      ).join('');

      html += `
        <div class="platform-card-wrapper" data-tilt data-tilt-glare data-tilt-max-glare="0.15" data-tilt-max="5" data-tilt-speed="400" data-tilt-perspective="1500">
          <div class="platform-card">
            <div class="platform-name">HackTheBox</div>
            <div class="platform-handle">${htb.handle}</div>
            <div class="platform-note">${htb.note}</div>
            <div class="platform-tools">${toolPills}${langPills}</div>
            <div style="margin-top: auto;">
              <a href="${htb.profile}" class="platform-link" target="_blank" rel="noopener noreferrer">
                View Profile <span class="platform-link-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = html;

    // Initialize VanillaTilt if present
    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(document.querySelectorAll('.platform-card-wrapper'));
    }

    // Initialize Magnetic Physics for dynamically rendered cards
    if (typeof window.initMagneticPhysics === 'function') {
      window.initMagneticPhysics();
    }
  }

  // ---- GSAP: Entrance animations ----
  function animateEntrance() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(
      {
        normal: '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { reduced } = context.conditions;
        if (reduced) return;

        // Header
        gsap.from('.labs-header', {
          autoAlpha: 0,
          y: 30,
          duration: 0.7,
          ease: 'power3.out'
        });

        // Stat items stagger
        gsap.fromTo('.labs-stat-item',
          { autoAlpha: 0, y: 40, filter: 'blur(8px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.12,
            duration: 1.2,
            ease: 'expo.out'
          }
        );

        // Platform cards stagger with 3D lift
        gsap.fromTo('.platform-card-wrapper',
          { autoAlpha: 0, y: 50, filter: 'blur(10px)', rotationX: -5 },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            rotationX: 0,
            stagger: 0.15,
            duration: 1.4,
            ease: 'expo.out',
            transformPerspective: 1000,
            scrollTrigger: {
              trigger: '.labs-platforms',
              start: 'top 85%',
              once: true
            }
          }
        );

        // Writeups section
        gsap.fromTo('.labs-writeups-section',
          { autoAlpha: 0, y: 40, filter: 'blur(8px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: '.labs-writeups-section',
              start: 'top 85%',
              once: true
            }
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
