// nav.js — Active-link state

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    // Basic matching: check if the link's href is in the current path.
    // Default to index.html if the path is exactly '/'
    const href = link.getAttribute('href');
    
    if (href) {
      const isHome = (href === 'index.html' || href === '/') && (currentPath.endsWith('/') || currentPath.endsWith('index.html'));
      const isMatch = currentPath.includes(href) && href !== '/';

      if (isHome || isMatch) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
});

