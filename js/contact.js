// contact.js — Contact page: renders badge, statement, channel rows, and clipboard copy
// All data from window.siteContent (loaded by content-loader.js)

(function () {
  'use strict';

  function init(data) {
    renderBadge(data);
    renderStatement(data);
    renderChannels(data);
    animateEntrance();
  }

  // ---- AVAILABILITY BADGE ----
  function renderBadge(data) {
    const badgeText = document.getElementById('contact-badge-text');
    if (badgeText && data.contact && data.contact.badge) {
      badgeText.textContent = data.contact.badge;
    }
  }

  // ---- STATEMENT ----
  function renderStatement(data) {
    const el = document.getElementById('contact-statement');
    if (el && data.contact && data.contact.statement) {
      el.textContent = data.contact.statement;
    }
  }

  // ---- CHANNEL ROWS ----
  function renderChannels(data) {
    const container = document.getElementById('contact-channels');
    if (!container || !data.contact || !data.contact.links) return;

    const links = data.contact.links;
    let html = '';

    // GitHub
    if (links.github) {
      html += createChannelCard('GitHub', links.github, 'link', links.github.replace('https://', ''), false);
    }

    // LinkedIn
    if (links.linkedin) {
      html += createChannelCard('LinkedIn', links.linkedin, 'link', links.linkedin.replace('https://', ''), false);
    }

    // Email — clipboard copy instead of mailto (Large Card)
    if (links.email) {
      html += createChannelCard('Email', links.email, 'copy', links.email, true);
    }

    // Resume (Large Card)
    if (data.assets && data.assets.resume) {
      html += createChannelCard('Resume', data.assets.resume, 'link', 'Download PDF', true);
    }

    container.innerHTML = html;
    bindChannelActions(links);

    // Initialize VanillaTilt if present
    if (typeof VanillaTilt !== 'undefined') {
      // VanillaTilt.init(document.querySelectorAll('.contact-card-wrapper'));
    }

    // Initialize Magnetic Physics for dynamically rendered cards
    if (typeof window.initMagneticPhysics === 'function') {
      window.initMagneticPhysics();
    }
  }

  function createChannelCard(label, href, type, displayValue, isLarge = false) {
    const spanClass = isLarge ? 'col-span-2' : '';
    return `
      <div class="contact-card-wrapper ${spanClass}" data-action="${type}" data-href="${href}" data-tilt data-tilt-glare data-tilt-max-glare="0.15" data-tilt-max="5" data-tilt-speed="400" data-tilt-perspective="1500" tabindex="0" role="button" aria-label="${label}: ${displayValue}">
        <div class="contact-card">
          <div class="channel-icon">
            <span class="channel-arrow">↗</span>
          </div>
          <div>
            <div class="channel-label">${label}</div>
            <div class="channel-value">${displayValue}</div>
          </div>
        </div>
      </div>
    `;
  }

  // ---- BIND CLICK / TAP ACTIONS ----
  function bindChannelActions(links) {
    const wrappers = document.querySelectorAll('.contact-card-wrapper');

    wrappers.forEach(wrapper => {
      const action = wrapper.dataset.action;
      const href = wrapper.dataset.href;

      const handler = (e) => {
        e.preventDefault();
        if (action === 'copy') {
          copyToClipboard(href);
        } else if (action === 'link') {
          window.open(href, '_blank', 'noopener,noreferrer');
        }
      };

      wrapper.addEventListener('click', handler);
      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handler(e);
        }
      });
    });
  }

  // ---- CLIPBOARD COPY + TOAST ----
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('EMAIL COPIED');
    }).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast('EMAIL COPIED');
      } catch (err) {
        showToast('COPY FAILED');
      }
      document.body.removeChild(textarea);
    });
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 3000);
  }

  // ---- GSAP: Entrance animations ----
  function animateEntrance() {
    if (typeof gsap === 'undefined') return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        normal: '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)'
      },
      (context) => {
        const { reduced } = context.conditions;
        if (reduced) return;

        // Badge
        gsap.fromTo('.contact-badge',
          { autoAlpha: 0, y: 30, filter: 'blur(8px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'expo.out'
          }
        );

        // Statement
        gsap.fromTo('.contact-statement',
          { autoAlpha: 0, y: 40, filter: 'blur(10px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'expo.out',
            delay: 0.1
          }
        );

        // Contact cards stagger with 3D lift
        gsap.fromTo('.contact-card-wrapper',
          { autoAlpha: 0, y: 50, filter: 'blur(8px)', rotationX: -5 },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            rotationX: 0,
            stagger: 0.15,
            duration: 1.4,
            ease: 'expo.out',
            delay: 0.2,
            transformPerspective: 1000,
            clearProps: 'filter'
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
