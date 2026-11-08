# Published ascents and generated walking lines

Reviewed 8 November 2026 against main `71e9f517dfd407b0ff2a286463320a75d8918c0a`.

## Changes

The three fell-gate ascents of Coniston Old Man previously used the same village-area coordinate and no guides. They now use the starting coordinate and four ordered guide coordinates sampled verbatim from each ascent's published map. The south ridge follows its longer southern approach, Low Water uses the northern quarry/tarn approach, and Diamond uses the separate south-east ascent. Exact-route directions links now use the saved coordinate rather than a village search.

Six further choices on Catstycam, Allen Crags and Great End have four sourced guide points each. Guide markers deliberately use generic numbered labels: their coordinate provenance does not justify inventing feature names.

Every ascent now distinguishes its published figures from the unverified generated line, before and after routing. Routes without guides explicitly say different named paths may produce the same line. The generated directions heading retains the unverified label. Existing mountain warnings, live navigation, rerouting, parking data, GPX links and climbed-summit storage remain in place. A selection/clear change invalidates outstanding preview requests so an old response cannot redraw the previous ascent. The app-shell cache version advances to v15.

## Coordinate provenance and reproduction

The route pages link their maps in an iframe. Coordinates are sampled from the first `trk[t].segments.push({ points: [...] })` array in the linked HTML, using zero-based indices below. The map coordinates are latitude, longitude, elevation; only latitude and longitude are used. No interpolation or guessed geographic coordinates are introduced. The Coniston start is the first coordinate of the corresponding array. Existing starts for the other fells are retained.

The small fixture files record source URLs, retrieval date, indices and the extracted coordinates. These are snapshots for reproducible offline tests, not independent surveys. Published map tracks and descriptions may be historical; quarry workings, bridges and paths can change.

| Published ascent | Coordinate source | Sample indices |
| --- | --- | --- |
| From Coniston (fell gate) via the south ridge | [map](https://www.wainwrightroutes.co.uk/conistonoldman-1_map.html) | 28, 37, 48, 59 |
| From Coniston (fell gate) via Low Water | [map](https://www.wainwrightroutes.co.uk/conistonoldman-2_map.html) | 23, 38, 49, 55 |
| From Coniston (fell gate) via the Diamond path | [map](https://www.wainwrightroutes.co.uk/conistonoldman-4_map.html) | 15, 27, 38, 50 |
| From Glenridding via the north west ridge | [map](https://www.wainwrightroutes.co.uk/catstycam_map.html) | 36, 72, 99, 108 |
| From Glenridding via the east shoulder | [map](https://www.wainwrightroutes.co.uk/catstycam2_map.html) | 27, 63, 81, 99 |
| From Seathwaite via Allen Gill | [map](https://www.wainwrightroutes.co.uk/allencrags_map.html) | 15, 24, 30, 36 |
| From Seathwaite via Ruddy Gill | [map](https://www.wainwrightroutes.co.uk/allencrags2_map.html) | 21, 30, 36, 42 |
| From Seathwaite via The Band | [map](https://www.wainwrightroutes.co.uk/greatend-1_map.html) | 40, 64, 80, 88 |
| From Seathwaite via Esk Hause | [map](https://www.wainwrightroutes.co.uk/greatend-2_map.html) | 40, 64, 80, 88 |

Written route context: [Coniston south ridge](https://www.wainwrightroutes.co.uk/conistonoldman_r1.htm), [Low Water](https://www.wainwrightroutes.co.uk/conistonoldman_r2.htm), [Diamond](https://www.wainwrightroutes.co.uk/conistonoldman_r4.htm), [Catstycam northwest](https://www.wainwrightroutes.co.uk/catstycam_r1.htm), [east shoulder](https://www.wainwrightroutes.co.uk/catstycam_r2.htm), [Allen Gill](https://www.wainwrightroutes.co.uk/allencrags_r1.htm), [Ruddy Gill](https://www.wainwrightroutes.co.uk/allencrags_r2.htm), [Great End via The Band](https://www.wainwrightroutes.co.uk/greatend_r1.htm), [Esk Hause](https://www.wainwrightroutes.co.uk/greatend_r2.htm).

The Diamond description specifically documents quarry-related diversions and a faint path; the south ridge and Allen Gill descriptions include pathless ground. A walking router may not represent those sections. The guides constrain the request, not the actual ground or the route returned by the service. A successful route must never be promoted to independently verified on that basis.

## Full published-choice audit

The offline audit examines all keys in ROUTE_STATS and ROUTE_VARIANTS, uses the same alias/selection helpers as the app, and compares ordered guide coordinates and starting resolution within each fell. The summit is identical within a fell. Exact coordinates are compared without rounding. Fallback queries are compared separately: identical query text implies identical intended inputs, but no successful geocoding result is assumed.

Originally there were 14 collision groups: one group of three Coniston choices and thirteen other pairs. Four groups are now differentiated; ten pairs remain. Five remaining pairs share embedded coordinates; five share the same fallback lookup query. These are explicitly warned as unverified in the UI. Their named terrain has not been assigned guessed guide coordinates in this change.

| Fell | Remaining published choices | Start resolution |
| --- | --- | --- |
| Fairfield | Deepdale Hause / Greenhow End | same fallback geocode query |
| Seat Sandal | Grisedale Hause / the south ridge | same fallback geocode query |
| Dow Crag | the Walna Scar Pass / the south rake | embedded coordinates |
| Scafell | the West Wall Traverse / Lord's Rake | embedded coordinates |
| Bannerdale Crags | the east ridge / Bannerdale | embedded coordinates |
| Bowscale Fell | Bannerdale / the east ridge | embedded coordinates |
| Knott | Coomb Height / Grainsgill Beck | embedded coordinates |
| Barf | Beckstones Gill / Direct from Powter How | same fallback geocode query |
| Sale Fell | the west ridge / From St. Margaret's Church | same fallback geocode query |
| Blake Fell | High Pen / Sharp Knott | same fallback geocode query |

`docs/route-location-collisions.json` is the machine-readable current snapshot. The audit covers loaded published route records, not missing summit-name associations or new routes absent from the repository. Existing guide points outside these nine sourced ascents have not been independently checked.

## Validation

Run from the repository root with Node 22 or later; there are no npm dependencies:

```sh
node --test tests/*.test.cjs
node scripts/audit-route-locations.cjs
```

Tests cover all inline-script parsing, route aliases and selection, preserving published Coniston statistics, exact source guide snapshots and ordering, different routing requests, posted Valhalla payloads, uncertainty labels, failed requests, stale responses after selection changes, corrected start links and the collision snapshot. GitHub Actions repeats the tests and checks audit output on pull requests and main pushes.

Optional network diagnostic:

```sh
node scripts/check-live-routing.cjs
```

This prints Coniston router summaries and encoded shapes for comparison. Success or differing shapes establish only service behavior, not agreement with the complete published ascent. Automated tests use mocked responses so they are reproducible without live services. No field navigation or independent geographical verification has been performed. Browser/GPS device testing is not covered by these Node tests.

## Observed live limitation (8 November 2026)

The committed diagnostic was run against the public router. All three requests returned HTTP 200 and distinct encoded shapes. However, the generated ascents were **10.667 km (6.6 miles)** for the south ridge, **15.947 km (9.9 miles)** for Low Water and **5.652 km (3.5 miles)** for Diamond, versus the published 2.4, 2.0 and 1.6 miles. These are substantial discrepancies, not evidence of a successful path match. The saved summaries and shape hashes are in `coniston-live-check.json`; live data can change.

Additional diagnostic requests allowing reversals at guide points (`via`) still returned excessive distances (5.960, 15.194 and 4.170 km). No routing restriction has been relaxed just to produce a more plausible length. The application retains its existing pedestrian costing and `through` waypoint behavior.

A discrepancy greater than 50% of the published ascent distance in either direction now produces a leading warning containing both distances and saying the preview may not follow the selected ascent. This threshold is an explicit diagnostic heuristic, not a safety or verification test. The line remains an unverified preview and the existing navigation tools remain available. A route within the threshold is still labelled unverified. Additional path matching, current map/ground checks or a reliable full track would be needed before claiming faithful mapping. This change fixes identical routing inputs and misleading presentation; it does not establish accurate end-to-end generated ascents.
