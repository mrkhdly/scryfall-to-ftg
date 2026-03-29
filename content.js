function injectButton() {
  // Guard against duplicate injection (Scryfall SPA navigation)
  if (document.querySelector('#ftg-link')) return;

  const cardNameEls = document.querySelectorAll('.card-text-card-name');
  if (!cardNameEls.length) return;

  // Join multiple faces with " // " (e.g. "Wear // Tear", "Day // Night")
  const cardName = Array.from(cardNameEls)
    .map(el => el.textContent.trim())
    .join(' // ');

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

  // Inject into the first h1 only
  const h1El = cardNameEls[0].closest('h1');
  if (h1El) {
    h1El.style.display = 'flex';
    h1El.style.alignItems = 'center';
    h1El.appendChild(link);
  }
}

// If the element is already in the DOM, inject immediately.
// Otherwise observe for it to appear (Scryfall renders dynamically).
if (document.querySelector('.card-text-card-name')) {
  injectButton();
} else {
  const observer = new MutationObserver(() => {
    if (document.querySelector('.card-text-card-name')) {
      observer.disconnect();
      injectButton();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}