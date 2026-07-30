// utils.js — Shared helpers

window.utils = {
  /**
   * Checks if the user prefers reduced motion
   * @returns {boolean}
   */
  isReducedMotion: () => {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Checks if the user is on a touch device
   * @returns {boolean}
   */
  isTouchDevice: () => {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  },

  /**
   * Throttles a function to only execute once every `wait` milliseconds
   * @param {Function} fn 
   * @param {number} wait 
   * @returns {Function}
   */
  throttle: (fn, wait) => {
    let lastTime = 0;
    return function(...args) {
      const now = new Date().getTime();
      if (now - lastTime >= wait) {
        fn.apply(this, args);
        lastTime = now;
      }
    };
  }
};

