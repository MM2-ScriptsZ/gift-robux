# Gift Robux Static Page

A simple Roblox-style static landing page with a live username lookup feature.

## Files

- `index.html` — main page markup
- `styles.css` — page styling
- `script.js` — username lookup and profile rendering logic
- `vercel.json` — Vercel deployment configuration

## Usage

1. Open `index.html` in a browser.
2. Enter a Roblox username in the lookup form.
3. The page will use Roblox public search to display the headshot, display name, and profile link.

## Deploy to Vercel

1. Create a new Vercel project.
2. Point the project root to this repository.
3. Make sure `vercel.json` is present in the root of the project.
4. Deploy as a static site.

## Notes

- The page depends on Roblox public API search endpoints.
- This is a static client-side site; no server code is required.
