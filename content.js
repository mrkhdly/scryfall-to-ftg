function injectButton() {
  // Guard against duplicate injection (Scryfall SPA navigation)
  if (document.querySelector('#ftg-link')) return;

  const cardNameEl = document.querySelector('.card-text-card-name');
  if (!cardNameEl) return;

  // Get the card name text, stripping double-faced card suffix (e.g. "Wear // Tear")
  const cardName = cardNameEl.textContent.trim().replace(/\s*\/\/.*$/, '');

  // Create the search link
  const link = document.createElement('a');
  link.id = 'ftg-link';
  link.href = `https://www.firstturngames.com/products/search?q=${encodeURIComponent(cardName)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'FTG 🫎';
  Object.assign(link.style, {
    marginLeft: 'auto',
    backgroundColor: 'black',
    color: 'white',
    padding: '2px 6px',
    textDecoration: 'none',
    borderRadius: '3px',
  });

  // Find the h1 element and add flexbox styling
  const h1El = cardNameEl.closest('h1');
  if (h1El) {
    h1El.style.display = 'flex';
    h1El.style.alignItems = 'center';
    h1El.appendChild(link);
  }
}

// Wait for .card-text-card-name to appear in the DOM
const observer = new MutationObserver(() => {
  if (document.querySelector('.card-text-card-name')) {
    observer.disconnect();
    injectButton();
  }
});

observer.observe(document.body, { childList: true, subtree: true });