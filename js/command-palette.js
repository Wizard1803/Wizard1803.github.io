// command-palette.js — Global command palette (Cmd+K / Ctrl+K)

document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.querySelector('.nav-cmd-trigger');
  
  // Create palette DOM
  const overlay = document.createElement('div');
  overlay.className = 'command-palette-overlay';
  overlay.innerHTML = `
    <div class="command-palette glass-panel">
      <div class="cmd-input-wrapper">
        <input type="text" class="cmd-input" placeholder="Search commands..." autocomplete="off" spellcheck="false" />
      </div>
      <div class="cmd-results">
        <div class="cmd-group" data-group="navigate">
          <div class="cmd-group-label">Navigate</div>
          <a href="index.html" class="cmd-item" tabindex="-1">Home</a>
          <a href="about.html" class="cmd-item" tabindex="-1">About</a>
          <a href="projects.html" class="cmd-item" tabindex="-1">Projects</a>
          <a href="labs.html" class="cmd-item" tabindex="-1">Labs</a>
          <a href="contact.html" class="cmd-item" tabindex="-1">Contact</a>
        </div>
        <div class="cmd-group" data-group="projects" style="display: none;">
          <div class="cmd-group-label">Projects</div>
          <!-- Populated dynamically -->
        </div>
        <div class="cmd-group" data-group="actions">
          <div class="cmd-group-label">Actions</div>
          <a href="#" class="cmd-item action-github" tabindex="-1">Open GitHub</a>
          <a href="#" class="cmd-item action-resume" tabindex="-1">Download Résumé</a>
          <a href="#" class="cmd-item action-email" tabindex="-1">Copy Email</a>
        </div>
        <div class="cmd-empty" style="display: none; padding: 1.5rem; text-align: center; color: var(--muted); font-family: var(--font-mono);">
          No results found
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const input = overlay.querySelector('.cmd-input');
  const items = Array.from(overlay.querySelectorAll('.cmd-item'));
  let selectedIndex = 0;

  // Wait for content to load to populate projects and actions
  if (window.siteContentPromise) {
    window.siteContentPromise.then(data => {
      if (data && data.projects) {
        const projectsGroup = overlay.querySelector('[data-group="projects"]');
        data.projects.forEach(p => {
          const a = document.createElement('a');
          a.href = 'projects.html'; // Or specific hash/URL if implemented
          a.className = 'cmd-item';
          a.tabIndex = -1;
          a.textContent = p.name;
          projectsGroup.appendChild(a);
          items.push(a); // Add to searchable items
        });
        projectsGroup.style.display = 'block';
      }
      if (data && data.contact && data.contact.links) {
        overlay.querySelector('.action-github').href = data.contact.links.github;
      }
      if (data && data.assets) {
        overlay.querySelector('.action-resume').href = data.assets.resume;
      }
    });
  }

  const togglePalette = (show) => {
    const isShowing = show !== undefined ? show : !overlay.classList.contains('active');
    if (isShowing) {
      overlay.classList.add('active');
      input.value = '';
      filterResults('');
      input.focus();
    } else {
      overlay.classList.remove('active');
      input.blur();
    }
  };

  const updateSelection = () => {
    const visibleItems = items.filter(i => i.style.display !== 'none');
    visibleItems.forEach((item, index) => {
      if (index === selectedIndex) {
        item.classList.add('selected');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('selected');
      }
    });
  };

  const filterResults = (query) => {
    const q = query.toLowerCase();
    let hasResults = false;
    
    items.forEach(item => {
      if (item.textContent.toLowerCase().includes(q)) {
        item.style.display = 'flex';
        hasResults = true;
      } else {
        item.style.display = 'none';
      }
    });

    const groups = overlay.querySelectorAll('.cmd-group');
    groups.forEach(group => {
      const groupItems = Array.from(group.querySelectorAll('.cmd-item'));
      const hasVisibleItem = groupItems.some(i => i.style.display !== 'none');
      group.style.display = hasVisibleItem ? 'block' : 'none';
    });

    overlay.querySelector('.cmd-empty').style.display = hasResults ? 'none' : 'block';
    
    selectedIndex = 0;
    updateSelection();
  };

  // Event Listeners
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      togglePalette();
    }
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      togglePalette(false);
    }
  });

  if (trigger) {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      togglePalette(true);
    });
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      togglePalette(false);
    }
  });

  input.addEventListener('input', (e) => {
    filterResults(e.target.value);
  });

  input.addEventListener('keydown', (e) => {
    const visibleItems = items.filter(i => i.style.display !== 'none');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % visibleItems.length;
      updateSelection();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + visibleItems.length) % visibleItems.length;
      updateSelection();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (visibleItems[selectedIndex]) {
        visibleItems[selectedIndex].click();
      }
    }
  });

  // Handle email copy action specifically
  overlay.querySelector('.action-email').addEventListener('click', (e) => {
    e.preventDefault();
    if (window.siteContent && window.siteContent.contact) {
      navigator.clipboard.writeText(window.siteContent.contact.links.email).then(() => {
        const originalText = e.target.textContent;
        e.target.textContent = 'Email Copied!';
        setTimeout(() => e.target.textContent = originalText, 2000);
      });
    }
  });
});

