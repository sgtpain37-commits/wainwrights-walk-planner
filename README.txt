WAINWRIGHTS WALK PLANNER - PWA v14

This folder is ready to deploy to any static HTTPS host (GitHub Pages, Netlify, Cloudflare Pages, Vercel static hosting, etc.).

Files:
- index.html: the app
- manifest.webmanifest: install metadata
- sw.js: service worker for the app shell
- icons/: install icons

IMPORTANT
1. Live GPS/geolocation requires a secure context (HTTPS). Opening index.html from Android Downloads using content:// is not sufficient.
2. Once deployed, open the HTTPS address on your phone, allow location access, then use the browser's Install app / Add to Home screen command.
3. The app shell is cached for offline reopening after the first successful load. Current map tiles, new routes, recalculation and turn-by-turn routing still require internet access.
4. Do not rely on phone routing as the sole navigation method in mountain terrain. Carry an appropriate offline map/navigation backup.

QUICK TEST
- Deploy this folder.
- Visit the HTTPS URL in Chrome/Samsung Internet.
- Open a fell and draw a route.
- Tap Start live guidance.
- Android should show a location permission prompt instead of the content:// geolocation error.

V14 CHANGES
- Starting live guidance now switches to a compact outdoor navigation panel over the map.
- The large summit popup closes while navigating so more of the map stays visible.
- The navigation panel shows the next instruction, distance to the next manoeuvre, estimated route distance remaining and route status.
- Voice and Stop controls remain available in the compact panel.
- The summit effort legend, source box and online badge are hidden during live navigation to reduce screen clutter.
- Published route distance-to-summit now uses miles only; ascent continues to show feet and metres.
- Short navigation distances remain in feet, switching to miles from 0.1 mile upward.

