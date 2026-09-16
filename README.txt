WAINWRIGHTS WALK PLANNER - PWA v13

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

V13 CHANGES
- Mobile walk information is split into collapsible sections.
- Live navigation controls stay visible while planning sections can be collapsed.
- Turn-by-turn directions open automatically when a route is drawn or live guidance starts.
- Navigation distances under 0.1 mile are shown in feet; longer distances are shown in miles.
- Larger touch targets improve one-handed outdoor use.
