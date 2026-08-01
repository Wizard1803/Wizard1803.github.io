// skill-bars.js — About page: populates bio, skill bars, tags, certs, education
// All data from window.siteContent (loaded by content-loader.js)

(function () {
  'use strict';

  // Skill bar definitions — label + percentage
  // These map conceptual proficiency to a visual bar width
  const SKILL_BAR_DATA = [
    { label: 'Python', percent: 85 },
    { label: 'JavaScript', percent: 78 },
    { label: 'Network Recon', percent: 72 },
    { label: 'Web App Security', percent: 68 },
    { label: 'Linux / Bash', percent: 80 },
    { label: 'Java', percent: 70 }
  ];

  function init(data) {
    renderBio(data);
    renderSkillBars();
    renderTags(data);
    renderCerts(data);
    renderEducation(data);
    renderSignature(data);
    animateSkillBars();
    animateEntrance();
  }

  // ---- BIO ----
  function renderBio(data) {
    const bioEl = document.getElementById('about-bio');
    if (bioEl && data.bio) {
      bioEl.textContent = data.bio;
    }
  }

  // ---- SKILL BARS ----
  function renderSkillBars() {
    const container = document.getElementById('skill-bars-container');
    if (!container) return;

    container.innerHTML = SKILL_BAR_DATA.map(skill => `
      <div class="skill-bar-item">
        <span class="skill-bar-label">${skill.label}</span>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" data-percent="${skill.percent}"></div>
        </div>
        <span class="skill-bar-value">${skill.percent}%</span>
      </div>
    `).join('');
  }

  // ---- TAGS ----
  function renderTags(data) {
    const wrap = document.getElementById('about-tags-wrap');
    if (!wrap || !data.skills) return;

    wrap.innerHTML = data.skills.map(skill =>
      `<span class="tag-pill">${skill}</span>`
    ).join('');
  }

  // ---- CERTIFICATIONS ----
  function renderCerts(data) {
    const grid = document.getElementById('cert-grid');
    if (!grid || !data.certifications) return;

    let html = '';

    // Completed certs
    if (data.certifications.completed) {
      data.certifications.completed.forEach(cert => {
        html += `
          <div class="cert-card-wrapper">
            <div class="cert-card">
              <div class="cert-card-name">${cert.name}</div>
              <div class="cert-card-issuer">${cert.issuer}</div>
              <div class="cert-card-date">${cert.date}</div>
            </div>
          </div>`;
      });
    }

    // In-progress certs
    if (data.certifications.inProgress) {
      data.certifications.inProgress.forEach(cert => {
        html += `
          <div class="cert-card-wrapper in-progress">
            <div class="cert-card">
              <div class="cert-card-name">${cert.name}</div>
              <div class="cert-card-issuer">${cert.status}</div>
              <div class="cert-card-date">${cert.target}</div>
            </div>
          </div>`;
      });
    }

    grid.innerHTML = html;
  }

  // ---- EDUCATION ----
  function renderEducation(data) {
    const block = document.getElementById('education-block');
    if (!block || !data.education) return;

    block.innerHTML = `
      <div class="education-degree">${data.education.degree}</div>
      <div class="education-university">${data.education.university}</div>
      <div class="education-years">${data.education.years}</div>
    `;
  }

  // ---- SIGNATURE ----
  function renderSignature(data) {
    const sigEl = document.getElementById('about-signature');
    if (sigEl && data.identity && data.identity.heroSubtitle) {
      sigEl.textContent = data.identity.heroSubtitle;
    }
  }

  // ---- GSAP: Skill bar fill animation on scroll ----
  function animateSkillBars() {
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

        document.querySelectorAll('.skill-bar-fill').forEach(fill => {
          const percent = parseInt(fill.dataset.percent, 10) / 100;

          if (reduced) {
            // No animation — snap to final state
            gsap.set(fill, { scaleX: percent });
            return;
          }

          gsap.to(fill, {
            scaleX: percent,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: fill.closest('.skill-bar-item'),
              start: 'top 85%',
              once: true
            }
          });
        });
      }
    );
  }

  // ---- GSAP: Section entrance animations ----
  function animateEntrance() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        normal: '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { reduced } = context.conditions;
        if (reduced) return; // Skip all entrance animations

        // High-End Motion: Heavy fade-up with blur
        const sections = document.querySelectorAll(
          '.about-bio-section, .about-skills-section, .about-tags-section, .about-certs-section, .about-education-section'
        );

        sections.forEach((section, i) => {
          gsap.fromTo(section, 
            { autoAlpha: 0, y: 60, filter: 'blur(12px)' },
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1.2,
              ease: 'expo.out',
              delay: i * 0.1, // Sequence the sections if they appear together
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                once: true
              }
            }
          );
        });

        // Dedicated trigger for the signature since it sits at the absolute bottom
        gsap.fromTo('.dossier-sign-off',
          { autoAlpha: 0, filter: 'blur(8px)' },
          {
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: '.dossier-sign-off',
              start: 'top bottom', // Trigger as soon as the top of it enters the viewport
              once: true
            }
          }
        );

        // Tag pills stagger
        gsap.fromTo('.tags-wrap .tag-pill', 
          { autoAlpha: 0, y: 20, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            stagger: 0.04,
            duration: 0.8,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: '.about-tags-section',
              start: 'top 80%',
              once: true
            }
          }
        );

        // Cert cards stagger (Double Bezel lift)
        gsap.fromTo('.cert-grid .cert-card-wrapper', 
          { autoAlpha: 0, y: 40, filter: 'blur(8px)', rotationX: -10 },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            rotationX: 0,
            stagger: 0.15,
            duration: 1.2,
            ease: 'expo.out',
            transformPerspective: 1000,
            scrollTrigger: {
              trigger: '.about-certs-section',
              start: 'top 85%',
              once: true
            }
          }
        );
      }
    );
  }

  // Wait for content to load, then init
  if (window.siteContentPromise) {
    window.siteContentPromise.then(data => {
      if (data) init(data);
    });
  }
})();
