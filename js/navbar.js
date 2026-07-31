// navbar.js - Handles decode text effect and magnetic physics for the global nav

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
});

function initNavbar() {
  const navCapsule = document.querySelector('.nav-capsule');
  
  if (navCapsule) {
    // Dynamic Spotlight Effect tracking
    navCapsule.addEventListener('mousemove', (e) => {
      const rect = navCapsule.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      navCapsule.style.setProperty('--mouse-x', `${x}px`);
      navCapsule.style.setProperty('--mouse-y', `${y}px`);
    });
  }

  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!navLinksContainer || navLinks.length === 0) return;

  // Characters for the decode effect
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  // Handle Hover Events for Decode Effect & Magnetic Physics
  navLinks.forEach(link => {
    const textSpan = link.querySelector('.nav-text');
    if (!textSpan) return;

    // The original text to decode back into
    const originalText = link.getAttribute('data-text') || textSpan.textContent;

    let decodeInterval = null;

    // 1. Decode Hover Effect Logic
    link.addEventListener('mouseenter', () => {
      let iteration = 0;
      clearInterval(decodeInterval);

      decodeInterval = setInterval(() => {
        textSpan.innerText = originalText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= originalText.length) {
          clearInterval(decodeInterval);
        }

        iteration += 1 / 3; // Controls decode speed
      }, 30);
    });

    // 2. Magnetic Physics Logic (High-end haptic depth)
    const magneticPull = 8; // Max pixels to pull the text

    link.addEventListener('mousemove', (e) => {
      // Don't apply magnetic physics on touch devices or small screens
      if (window.innerWidth <= 1024) return;
      if (window.utils && window.utils.isTouchDevice && window.utils.isTouchDevice()) return;

      const rect = link.getBoundingClientRect();
      // Calculate cursor position relative to the center of the link (-1 to 1)
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      gsap.to(link, {
        x: x * magneticPull,
        y: y * magneticPull,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });

    link.addEventListener('mouseleave', () => {
      // Restore text if mouse leaves before decode finishes
      clearInterval(decodeInterval);
      textSpan.innerText = originalText;

      // Snap text back to center
      gsap.to(link, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto'
      });
    });
  });

  // 3. Magnetic Physics for Command Palette Button
  const cmdTrigger = document.querySelector('.nav-cmd-trigger');
  if (cmdTrigger) {
    const cmdPull = 6; // slightly less pull for the button
    
    cmdTrigger.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 1024) return;
      if (window.utils && window.utils.isTouchDevice && window.utils.isTouchDevice()) return;
      
      const rect = cmdTrigger.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      gsap.to(cmdTrigger, {
        x: x * cmdPull,
        y: y * cmdPull,
        duration: 0.4,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });

    cmdTrigger.addEventListener('mouseleave', () => {
      gsap.to(cmdTrigger, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
        overwrite: 'auto'
      });
    });
  }
}
