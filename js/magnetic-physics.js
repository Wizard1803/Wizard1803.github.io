// magnetic-physics.js — Universal Framer-style magnetic kinetic physics
// Applies to all Double-Bezel cards site-wide (.cta-card-wrapper, .project-card-wrapper, .cert-card-wrapper, .lab-card-wrapper)

window.initMagneticPhysics = function() {
  // Disable magnetic physics on touch devices
  if (window.utils && window.utils.isTouchDevice()) {
    return;
  }

  // Ensure GSAP is loaded
  if (typeof gsap === 'undefined') return;

  // The elements that should receive magnetic tracking
  const wrapperSelector = '.cta-card-wrapper, .project-card-wrapper, .cert-card-wrapper, .lab-card-wrapper, .platform-card-wrapper, .contact-card-wrapper';
  const wrappers = document.querySelectorAll(wrapperSelector);

  wrappers.forEach(wrapper => {
    // Prevent double-binding if called multiple times
    if (wrapper.dataset.magneticBound === "true") return;
    wrapper.dataset.magneticBound = "true";

    // Determine the inner card based on context
    let innerCard = wrapper.querySelector('.cta-card-inner') || 
                    wrapper.querySelector('.project-card') || 
                    wrapper.querySelector('.cert-card') ||
                    wrapper.querySelector('.lab-card') ||
                    wrapper.querySelector('.platform-card') ||
                    wrapper.querySelector('.contact-card');
                    
    if (!innerCard) return;

    const isCTA = wrapper.classList.contains('cta-card-wrapper');

    // Configurational internal elements for contrary parallax or extreme depth
    const arrow = wrapper.querySelector('.cta-card-arrow, .project-link-arrow, .lab-link-arrow');
    const icon = wrapper.querySelector('.cta-card-icon');
    const watermark = wrapper.querySelector('.project-card-number');

    // Magnetic bounds
    const magneticPull = 12; // Max pixel shift for the whole card content
    const arrowPull = 24;    // Stronger pixel shift for the arrow
    const watermarkPull = -15; // Contrary movement for background watermark

    wrapper.addEventListener('mousemove', (e) => {
      // Calculate stable bounds by subtracting current top/left shift
      const currentLeft = parseFloat(gsap.getProperty(wrapper, "left")) || 0;
      const currentTop = parseFloat(gsap.getProperty(wrapper, "top")) || 0;
      
      const rect = wrapper.getBoundingClientRect();
      const stableLeft = rect.left - currentLeft;
      const stableTop = rect.top - currentTop;

      const x = (e.clientX - stableLeft - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - stableTop - rect.height / 2) / (rect.height / 2);

      if (isCTA) {
        // High-End Agency Style: Animate inner core via transform, leaving outer shell as a padded boundary
        gsap.to(innerCard, {
          x: x * magneticPull,
          y: y * magneticPull,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      } else {
        // Magnetic pull for the ENTIRE wrapper (using top/left to avoid transform conflicts with Vanilla-Tilt)
        gsap.to(wrapper, {
          left: x * magneticPull,
          top: y * magneticPull,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }

      // Parallax for secondary elements
      if (arrow) {
        gsap.to(arrow, {
          x: (x * arrowPull) + (isCTA ? 4 : 0), // CTA arrow had a base 4px offset in hover
          y: (y * arrowPull) - (isCTA ? 4 : 0),
          scale: 1.15,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
      
      // Slight contrary movement for icons/watermarks
      if (icon) {
        gsap.to(icon, {
          x: -x * 5,
          y: -y * 5,
          scale: 1.08,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }

      if (watermark) {
        gsap.to(watermark, {
          x: x * watermarkPull,
          y: y * watermarkPull,
          duration: 0.8,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });

    wrapper.addEventListener('mouseleave', () => {
      if (isCTA) {
        // Kinetic Spring snap-back for inner core
        gsap.to(innerCard, {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.3)', 
          overwrite: 'auto'
        });
      } else {
        // Kinetic Spring snap-back to center for the wrapper
        gsap.to(wrapper, {
          left: 0,
          top: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.3)', 
          overwrite: 'auto'
        });
      }

      // Reset parallax elements
      if (arrow) {
        gsap.to(arrow, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto'
        });
      }
      
      if (icon) {
        gsap.to(icon, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto'
        });
      }

      if (watermark) {
        gsap.to(watermark, {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto'
        });
      }
    });
    
    // Haptic active state (down-press)
    wrapper.addEventListener('mousedown', () => {
      gsap.to(innerCard, {
        scale: 0.96,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
    
    // Release
    wrapper.addEventListener('mouseup', () => {
      gsap.to(innerCard, {
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto'
      });
    });
  });
};

// Auto-init on load for static elements (like Contact page cards)
document.addEventListener('DOMContentLoaded', window.initMagneticPhysics);
