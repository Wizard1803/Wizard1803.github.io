// stats-counter.js — Home stats binding and scroll-triggered count-up

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('stats-container');
  if (!container || !window.siteContentPromise) return;

  window.siteContentPromise.then((data) => {
    const stats = data?.home?.stats;
    if (!Array.isArray(stats)) return;
    container.replaceChildren();
    stats.forEach((stat) => {
      const block = document.createElement('div');
      block.className = 'stat-block';

      const label = document.createElement('div');
      label.className = 'stat-label';
      label.textContent = stat.label;

      const value = document.createElement('div');
      value.className = 'stat-value';
      value.dataset.target = String(stat.value);
      value.dataset.prefix = stat.prefix || '';
      value.dataset.suffix = stat.suffix || '';
      value.textContent = window.utils?.isReducedMotion()
        ? `${value.dataset.prefix}${stat.value}${value.dataset.suffix}`
        : `${value.dataset.prefix}0${value.dataset.suffix}`;

      block.append(label, value);
      container.appendChild(block);
    });
  });
});

window.startStatsCounter = () => {
  document.querySelectorAll('.stat-value').forEach((element) => {
    const target = Number(element.dataset.target);
    const prefix = element.dataset.prefix || '';
    const suffix = element.dataset.suffix || '';
    if (!Number.isFinite(target)) return;

    if (window.utils?.isReducedMotion() || typeof gsap === 'undefined') {
      element.textContent = `${prefix}${target}${suffix}`;
      return;
    }

    const value = { current: 0 };
    gsap.to(value, {
      current: target,
      duration: 1.4,
      ease: 'power2.out',
      snap: { current: 1 },
      onUpdate: () => {
        element.textContent = `${prefix}${value.current}${suffix}`;
      }
    });
  });
};
