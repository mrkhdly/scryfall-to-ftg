function getCardName() {
  // Scryfall page titles are always in English, even for alternate-script variants
  // (e.g. Phyrexian text cards). Format: "Card Name · Scryfall Magic: The Gathering Search"
  // This also correctly preserves split card names like "Wear // Tear".
  const titleName = document.title.split('·')[0].trim();
  if (titleName) return titleName;

  // Fallback: read from DOM (works for normal cards, but breaks on Phyrexian script)
  const cardNameEls = document.querySelectorAll('.card-text-card-name');
  return Array.from(cardNameEls)
    .map(el => el.textContent.trim())
    .join(' // ');
}

const FTG_SEARCH = 'https://www.firstturngames.com/products/search?q=';

function injectButton() {
  // Guard against duplicate injection
  if (document.querySelector('#ftg-link')) return;

  const cardNameEls = document.querySelectorAll('.card-text-card-name');
  if (!cardNameEls.length) return;

  const cardName = getCardName();

  const link = document.createElement('a');
  link.id = 'ftg-link';
  link.href = `${FTG_SEARCH}${encodeURIComponent(cardName)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.title = 'Search on First Turn Games';
  link.ariaLabel = 'Search on First Turn Games';
  link.append('FTG ', Object.assign(document.createElement('span'), { textContent: '🫎', ariaHidden: 'true' }));
  Object.assign(link.style, {
    marginLeft: 'auto',
    backgroundColor: 'black',
    color: 'white',
    padding: '2px 6px',
    textDecoration: 'none',
    borderRadius: '3px',
    fontFamily: 'monospace',
  });

  const h1El = cardNameEls[0].closest('h1');
  if (h1El) {
    h1El.style.display = 'flex';
    h1El.style.alignItems = 'center';
    h1El.appendChild(link);
  } else {
    // Fallback: inject link after the card name if no h1 wrapper is found
    cardNameEls[0].parentNode.appendChild(link);
  }
}

// Keep the observer running to handle Scryfall SPA navigation between cards.
// On URL change, remove the stale button so injectButton() can re-run cleanly.
let lastUrl = location.href;

const observer = new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    const stale = document.querySelector('#ftg-link');
    if (stale) stale.remove();
  }

  if (document.querySelector('.card-text-card-name')) {
    injectButton();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

// Also attempt immediate injection in case content is already rendered
injectButton();