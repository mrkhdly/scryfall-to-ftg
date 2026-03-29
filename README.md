# Scryfall → FTG

A Chrome extension that adds a quick search link on Scryfall card pages to find that card on [First Turn Games](https://www.firstturngames.com).

## How it works

When viewing any card on Scryfall (e.g. `scryfall.com/card/...`), a **FTG 🫎** button appears in the card name header. Clicking it opens a First Turn Games product search for that card in a new tab.

Double-faced cards (e.g. `Wear // Tear`) are handled automatically — only the front face name is used in the search.

## Installation

### From a release (recommended)

1. Download `scryfall-to-ftg.zip` from the [latest release](https://github.com/mrkhdly/scryfall-to-ftg/releases/latest)
2. Unzip it
3. Go to `chrome://extensions/`
4. Enable **Developer mode** (top right)
5. Click **Load unpacked** and select the unzipped folder

### From source

1. Clone or download this repo
2. Go to `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select the repo folder

## Privacy

This extension requests no user data and has no tracking of any kind. It only runs on `scryfall.com/card/*` pages, reads the card name from the page, and constructs a search URL for First Turn Games. No `scripting` permission is required or requested.

## License

Apache 2.0 — see [LICENSE](LICENSE)

Icon derived from [Noto Emoji](https://github.com/googlefonts/noto-emoji) by Google, licensed under Apache 2.0.