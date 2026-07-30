// cursor.js — Dot + scan-bracket cursor system

document.addEventListener('DOMContentLoaded', () => {
  // Disable on touch devices entirely
  if (window.utils && window.utils.isTouchDevice()) {
    return;
  }

  // Create cursor elements
  const dot = document.createElement('div');
  dot.classList.add('cursor-dot');
  
  const brackets = document.createElement('div');
  brackets.classList.add('cursor-brackets');
  
  document.body.appendChild(dot);
  document.body.appendChild(brackets);

  // Enable custom cursor styles
  document.body.classList.add('custom-cursor');

  let mouseX = 0;
  let mouseY = 0;
  let isHovering = false;

  const updateCursor = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Check if the cursor is hidden by another script (like hero.js)
    if (document.body.classList.contains('hide-custom-cursor')) {
      dot.style.opacity = '0';
      brackets.style.opacity = '0';
      return;
    }

    dot.style.opacity = '1';
    dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;

    if (!isHovering) {
      // Default brackets follow dot but are invisible/small
      brackets.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
      brackets.style.width = '0px';
      brackets.style.height = '0px';
      brackets.classList.remove('active');
    }
  };

  document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => updateCursor(e));
  });

  // Handle clickable elements
  const clickables = document.querySelectorAll('a, button, input, .clickable, .hover-card, .cmd-item');
  
  clickables.forEach(el => {
    el.addEventListener('mouseenter', (e) => {
      isHovering = true;
      const rect = el.getBoundingClientRect();
      const padding = 12; // padding around the element
      
      brackets.classList.add('active');
      brackets.style.width = `${rect.width + padding}px`;
      brackets.style.height = `${rect.height + padding}px`;
      brackets.style.transform = `translate(calc(${rect.left - padding/2}px), calc(${rect.top - padding/2}px))`;
    });

    el.addEventListener('mouseleave', () => {
      isHovering = false;
      brackets.classList.remove('active');
    });
  });
});

