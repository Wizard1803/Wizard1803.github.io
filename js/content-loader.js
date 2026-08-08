// content-loader.js — Fetches /data/content.json once

window.siteContent = null;

// Expose a promise that resolves with the content data
window.siteContentPromise = fetch('data/content.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    window.siteContent = data;
    return data;
  })
  .catch(error => {
    console.error('Error fetching content.json:', error);
    // You could handle a global error state here if needed
  });

