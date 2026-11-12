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

At the 8 November baseline there were originally 14 collision groups: one group of three Coniston choices and thirteen other pairs. Four groups had been differentiated; ten pairs remained at that point. Five remaining pairs share embedded coordinates; five share the same fallback lookup query. These are explicitly warned as unverified in the UI. Their named terrain has not been assigned guessed guide coordinates in this change.

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

The table above is the historical ten-pair baseline. `docs/route-location-collisions.json` is the machine-readable current snapshot. The audit covers loaded published route records, not missing summit-name associations or new routes absent from the repository. Existing guide points outside these nine sourced ascents have not been independently checked.

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

A discrepancy greater than 50% of the published ascent distance in either direction now produces a leading warning containing both distances and saying the preview may not follow the selected ascent. This threshold is an explicit diagnostic heuristic, not a safety or verification test. At that time the line remained an unverified preview and navigation tools remained available; the live-guidance restriction below supersedes that behavior. A route within the threshold is still labelled unverified. Additional path matching, current map/ground checks or a reliable full track would be needed before claiming faithful mapping. This change fixes identical routing inputs and misleading presentation; it does not establish accurate end-to-end generated ascents.


## Live-guidance restrictions (10 November 2026)

The distance discrepancy is now a live-guidance gate, not only a warning. A generated full ascent differing by **more than 50% in either direction** is preview-only. Exactly 50% does not trigger this diagnostic. All three recorded Coniston responses are restricted. Passing this check does **not** independently verify a walking route or establish agreement with the published ascent.

`assessRouteGuidance()` also restricts missing/non-finite/non-positive distance, invalid time, unavailable published distance, router failure status, unexpected units, malformed or empty geometry, disconnected legs, unusable or invalid turn indices/instructions, and geometry with no length. Additional diagnostic heuristics restrict endpoints more than 200 metres from the requested start/summit, leg joins separated by more than 10 metres, and geometry versus summary lengths differing by more than the larger of 200 metres or 20% of the summary. These tolerances catch gross disagreement; they are not field verification or a guarantee that paths, access or terrain are suitable. Status and units are checked when supplied; the request still explicitly uses kilometres and pedestrian costing.

The Start button and `startNavigation()` use the same eligibility state, bound to the selected ascent, its owning card and the current request generation. Re-enabling the DOM button alone cannot bypass the handler. Starting a new preview immediately stops guidance, cancels speech and invalidates the previous state, even if the replacement request fails. Selection changes and clearing reset route context; stale route responses and GPS callbacks cannot restore guidance.

Recalculation retains the walking-router request and map inspection functionality but stops live guidance before requesting a new line. **Remaining-distance reroutes are preview-only**, including reroutes from a previously eligible ascent: a remaining distance cannot be compared fairly with the full published ascent, and the current reroute request does not preserve all published guides. Recalculation never clears an existing restriction or automatically resumes spoken guidance. Its response must still belong to the current selection and request generation. To reassess eligibility, generate a fresh full ascent preview. No override or replacement walking track is provided.

Drawable restricted lines and their unverified turn lists remain available for inspection alongside published ascent statistics, route-start information, detailed route/GPX links and independent walking-route resources. Malformed geometry that cannot be decoded is not drawn or repaired with invented coordinates; the error and existing resource links remain available. The app-shell cache advances to v16.

Reproduce all regression checks offline:

```sh
node --test tests/*.test.cjs
node scripts/audit-route-locations.cjs > /tmp/route-collisions.json
diff -u docs/route-location-collisions.json /tmp/route-collisions.json
```

The new navigation tests execute the application's actual handlers with mocked DOM, GPS, speech and routing services. They cover recorded Coniston distances, both threshold boundaries, invalid response data, inspectable restricted previews, direct Start calls, wrong cards/selections, clearing, failed and pending preview requests, recalculation, stale responses/callbacks, and retained near-route/off-route behavior. Synthetic geometry in these tests is only a control-flow fixture and is never application routing data. Existing catalogue, published coordinates, statistics, alias and collision tests remain in place. No real-device GPS walk or independent route verification is claimed.


## Summit-specific collision correction — 12 November 2026

The ten pairs above now have distinct routing inputs, using first-vertex starts and ordered sampled coordinates from their individual published maps. This resolves identical input requests, not walking-line verification. The current collision snapshot is empty. All 20 affected ascents are explicitly preview-only: source provenance is not enough to enable live guidance. Both diagnostic eligibility and the navigation entry point enforce this restriction, including after recalculation. Existing unrelated route behavior and navigation checks are preserved.

`ROUTE_SCOPED_INPUTS` keys each record by the exact canonical summit route key and exact published ascent string. Route-card rendering, source links, start directions, geocoding, generated requests, safety checks, offline collision auditing and JSON export all pass summit identity through the lookup. This is necessary because Bannerdale Crags and Bowscale Fell share two identical route strings, and Seat Sandal/Fairfield share the string “From Mill Bridge via Grisedale Hause”. Fairfield's unrelated Grisedale Hause record does not receive Seat Sandal guides or restrictions. Missing summit context never selects one of these scoped records.

No new route records or published statistics are introduced. All 214 summit identities/coordinates and 243 ascent IDs/published records remain unchanged. Exactly 20 ascent starts/guide sets are updated. The 15 missing repository route records remain missing.

### Exact publisher samples

The description page's iframe supplies each map URL below. The first `trk[t].segments.push({ points:[...] })` segment is parsed as JSON numeric data, never executed as JavaScript. Each saved start is vertex zero. Guides are original vertices near 20%, 40%, 60% and 80% of segment index, plus the vertex most separated from the paired map's vertices; duplicates are removed and the remaining indices are sorted. No interpolation, hand-picked terrain coordinates or inferred feature labels are used. Endpoints were checked against the intended catalogue summit to catch mismatched maps. This check is not independent path verification.

| Summit | Published ascent | Description | Map / zero-based sample indices |
| --- | --- | --- | --- |
| Fairfield | From Bridgend via Deepdale Hause | [description](https://www.wainwrightroutes.co.uk/fairfield_r2.htm) | [map](https://www.wainwrightroutes.co.uk/fairfield-2_map.html) · 20, 40, 60, 80, 85 |
| Fairfield | From Bridgend via Greenhow End | [description](https://www.wainwrightroutes.co.uk/fairfield_r3.htm) | [map](https://www.wainwrightroutes.co.uk/fairfield-3_map.html) · 21, 41, 62, 82, 91 |
| Seat Sandal | From Mill Bridge via Grisedale Hause | [description](https://www.wainwrightroutes.co.uk/seatsandal_r2.htm) | [map](https://www.wainwrightroutes.co.uk/seatsandal-2_map.html) · 20, 40, 54, 59, 79 |
| Seat Sandal | From Mill Bridge via the south ridge | [description](https://www.wainwrightroutes.co.uk/seatsandal_r3.htm) | [map](https://www.wainwrightroutes.co.uk/seatsandal-3_map.html) · 15, 30, 44, 45, 60 |
| Dow Crag | From Torver via the Walna Scar Pass | [description](https://www.wainwrightroutes.co.uk/dowcrag_r1.htm) | [map](https://www.wainwrightroutes.co.uk/dowcrag-1_map.html) · 21, 41, 62, 82, 84 |
| Dow Crag | From Torver via the south rake | [description](https://www.wainwrightroutes.co.uk/dowcrag_r2.htm) | [map](https://www.wainwrightroutes.co.uk/dowcrag-2_map.html) · 17, 35, 52, 70 |
| Scafell | From Wasdale via the West Wall Traverse | [description](https://www.wainwrightroutes.co.uk/scafell_r1.htm) | [map](https://www.wainwrightroutes.co.uk/scafell-1_map.html) · 13, 26, 38, 51, 52 |
| Scafell | From Wasdale via Lord's Rake | [description](https://www.wainwrightroutes.co.uk/scafell_r2.htm) | [map](https://www.wainwrightroutes.co.uk/scafell-2_map.html) · 20, 40, 60, 80, 86 |
| Bannerdale Crags | From Mungrisdale via the east ridge | [description](https://www.wainwrightroutes.co.uk/bannerdalecrags_r1.htm) | [map](https://www.wainwrightroutes.co.uk/bannerdalecrags_map.html) · 7, 14, 21, 24, 28 |
| Bannerdale Crags | From Mungrisdale via Bannerdale | [description](https://www.wainwrightroutes.co.uk/bannerdalecrags_r2.htm) | [map](https://www.wainwrightroutes.co.uk/bannerdalecrags-2_map.html) · 21, 41, 62, 66, 82 |
| Bowscale Fell | From Mungrisdale via Bannerdale | [description](https://www.wainwrightroutes.co.uk/bowscalefell_r2.htm) | [map](https://www.wainwrightroutes.co.uk/bowscalefell-2_map.html) · 17, 34, 44, 51, 68 |
| Bowscale Fell | From Mungrisdale via the east ridge | [description](https://www.wainwrightroutes.co.uk/bowscalefell_r3.htm) | [map](https://www.wainwrightroutes.co.uk/bowscalefell-3_map.html) · 21, 41, 62, 68, 82 |
| Knott | From Mosedale via Coomb Height | [description](https://www.wainwrightroutes.co.uk/knott_r1.htm) | [map](https://www.wainwrightroutes.co.uk/knott_map.html) · 18, 36, 53, 58, 71 |
| Knott | From Mosedale via Grainsgill Beck | [description](https://www.wainwrightroutes.co.uk/knott_r2.htm) | [map](https://www.wainwrightroutes.co.uk/knott-2_map.html) · 38, 76, 113, 115, 153 |
| Barf | From Powter How via Beckstones Gill | [description](https://www.wainwrightroutes.co.uk/barf_r1.htm) | [map](https://www.wainwrightroutes.co.uk/barf_map.html) · 7, 15, 22, 25, 30 |
| Barf | Direct from Powter How | [description](https://www.wainwrightroutes.co.uk/barf_r2.htm) | [map](https://www.wainwrightroutes.co.uk/barf2_map.html) · 5, 10, 14, 16, 21 |
| Sale Fell | From St. Margaret's Church via the west ridge | [description](https://www.wainwrightroutes.co.uk/salefell_r1.htm) | [map](https://www.wainwrightroutes.co.uk/salefell-1_map.html) · 7, 15, 16, 22, 30 |
| Sale Fell | From St. Margaret's Church | [description](https://www.wainwrightroutes.co.uk/salefell_r3.htm) | [map](https://www.wainwrightroutes.co.uk/salefell-3_map.html) · 13, 25, 33, 38, 50 |
| Blake Fell | From Felldyke via High Pen | [description](https://www.wainwrightroutes.co.uk/blakefell_r1.htm) | [map](https://www.wainwrightroutes.co.uk/blakefell_map.html) · 11, 22, 33, 34, 45 |
| Blake Fell | From Felldyke via Sharp Knott | [description](https://www.wainwrightroutes.co.uk/blakefell_r2.htm) | [map](https://www.wainwrightroutes.co.uk/blakefell2_map.html) · 12, 24, 36, 40, 48 |

The committed `tests/collision-guide-sources.json` snapshots retain summit identity, source/description URLs, retrieval date, original point count, SHA-256 of the downloaded map bytes, start coordinate and sampled vertex indices/coordinates. All 20 snapshots were checked against the downloaded publisher files. The existing older source fixtures are retained separately. Guide evidence in the generated export references the correct fixture file and summit, so a same-text route cannot acquire another mountain's provenance.

Optional read-only network reproduction: `node scripts/check-collision-guide-sources.cjs`. It checks exact publisher bytes, point counts, start vertex and guide vertices with bounded requests. A changed publisher file causes a failure and requires deliberate review; it does not rewrite code or fixtures. Offline CI checks the committed snapshots and routing behavior.

### Review history and limits

`docs/collision-review.v1.json` preserves all ten original collision IDs and routes with status `routing_inputs_distinct_preview_only`. The generated audit export lists only current collisions, so old collision review annotations may appear as absent from the current export. They are retained by the dashboard; use the history report to reconcile them and export a review backup before changing annotations. Do not automatically mark them independently verified or delete their evidence.

These historical publisher descriptions and map tracks do not establish present-day path conditions. The generated line may still snap to the wrong paths, reverse or take excessive detours. Five guides and different input arrays do not prove the returned routes follow the published ascent. The preview-only restriction for these 20 ascents remains until a separately reviewed change establishes an appropriate basis for live guidance. No restriction override or substitute walking track is supplied here.

Validation: 58 offline tests pass, including six new tests for exact source snapshots, all ten distinct input pairs, summit isolation, source parsing, actual posted routing payloads, and the preview-only navigation gate. Export freshness and collision snapshot checks pass. All publisher byte/coordinate comparisons pass for the 20 snapshots.
