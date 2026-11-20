# Gowbarrow Fell — Aira Force clockwise circular (research only)

Status: **source-backed itinerary; walking-line geometry not independently verified. Do not enable live navigation from this document.**

## Requested itinerary
- Start/end: National Trust Aira Force main car park, NY400200 (grid reference from National Trust).
- Direction: car park → waterfall → High Cascades → open fell → Gowbarrow Fell summit → shooting lodge → Memorial Seat → car park.
- Distance: National Trust published 4.5 miles (7.2 km), moderate; not a measured planner GPX.
- Preserve the existing Park Brow ascent as a distinct option.

## National Trust route checkpoints (stages 1–8)
1. Car park Welcome Building, picnic field, stone-wall gap, Glade.
2. Bear left at Glade, Aira Beck to right, upper waterfall bridge; optional lower falls detour.
3. Continue upstream past High Force to High Cascades; **cross the wooden bridge**, then turn left at junction towards open fell.
4. At wall/pine plantation junction turn right uphill, keeping dry-stone wall to left.
5. Take summit trig-point spur, then **retrace to the main path**.
6. Descend via old shooting lodge; keep right at Pooley Bridge junction around eastern flank.
7. Visit Memorial Seat via fence stile; return across stile and turn left towards woods.
8. Near Lyulph's Tower, take left fork before woodland, through gate and bear left back to Glade/car park.

## Differences from user-provided six-stage printout
- Printout says not to cross the upper stone bridge; National Trust distinguishes upper waterfall bridge from the **High Cascades wooden bridge**, which it says to cross. Verify bridge identity on the map and ground.
- Printout suggests continuing from summit; National Trust requires returning from trig-point spur to the main trail.
- Printout says broad gentle terrace descent; National Trust describes an **undulating** section and a fence stile, so do not promise uniformly gentle terrain.
- The user's 0.5/0.6/0.8/0.7/1.2/0.7 mile segments sum to 4.5 miles but are not independently measured per segment.

## Evidence
- Official National Trust trail: https://www.nationaltrust.org.uk/visit/lake-district/aira-force-and-gowbarrow-park/aira-force-and-gowbarrow-trail
- Official printable trail/map: https://static.nationaltrust.org.uk/trails/visit/lake-district/aira-force-and-gowbarrow-park/aira-force-and-gowbarrow-trail-walking.pdf
- Access note: waterfall paths have rough stone steps, steep sections and loose gravel: https://www.nationaltrust.org.uk/visit/lake-district/aira-force-and-gowbarrow-park/access-at-aira-force-and-gowbarrow

## Required before planner navigation implementation
- Trace and independently verify connected walking-line geometry on a suitable walking map or trustworthy GPX; do not connect waypoint coordinates with straight lines.
- Establish surveyed/georeferenced coordinates for junctions, bridges, summit spur, lodge, stile and return.
- Confirm exact clockwise orientation from mapped line rather than relying on route description.
- Measure final geometry and check all turn instructions and grade; preserve offline map/GPX and no live guidance until verification.
- Add separate route entry, tests and audit export in a subsequent PR.

## Stage 2: independent GPX candidates (20 November 2026)

These are **candidate sources only**. The underlying GPX track points have **not** yet been downloaded, compared or independently verified. None may be used for live guidance at this stage.

| Candidate | Reported distance | Evidence | Verification still needed |
| --- | --- | --- | --- |
| National Trust official trail | 4.5 mi / 7.2 km | Official eight-stage itinerary, no independently examined GPX | Trace route on walking map; identify all crossings and spur |
| UK Lake District, Aira Force & Gowbarrow | 4.25 mi / 6.8 km | Website advertises free GPX and interactive OS map | Obtain GPX, check summit and all junctions, orientation, start and end |
| Walking Country, Aira Force to Gowbarrow | 4.7 mi / 7.64 km | Website says GPS-recorded, GPX download | Obtain GPX, compare actual track to NT path and route orientation |
| Andrew's Walks, Gowbarrow Fell | Not checked | Author explicitly recommends clockwise route, OS Maps route with GPX for subscribers | Confirm geometry and whether it includes required waterfalls and summit |

Candidate URLs:
- https://www.uklakedistrict.com/walks/aira-force-and-gowbarrow/
- https://www.walkingcountry.co.uk/uk-regions/north-west-england/cumbria/gowbarrow-aira-force.htm
- https://www.andrewswalks.co.uk/gowbarrow-fell-3.html

**Current blocker:** Candidate pages were found, but GPX bytes could not be retrieved for comparison in this session. Therefore no geometry has been added and no safety or route-completeness claim is made. Next: retrieve one or more candidate GPX files, inspect coordinate arrays and path topology, compare with the official National Trust map, then write automated route assertions before proposing any live navigation.

## Stage 3: user-supplied Memory-Map GPX inspection (20 November 2026)

Source file supplied in conversation: `Gowbarrow Fell.gpx`. Parsed the XML `gpx/rte/rtept` nodes directly; creator `Memory-Map 5.4.2.1089`, route name `Route321`, 38 route points. No `trk/trkseg/trkpt` recorded walking track is present.

Measured from route points using spherical haversine segments (not snapped to paths):
- First point: **54.5725233909, -2.9290031807**.
- Last point: **54.5728609473, -2.9289335233**.
- First–last gap: **37.8 metres**.
- Straight segments between 38 points total **3.815 miles**. This is a lower-bound-style polyline estimate, **not** the walked path distance; published official route says 4.5 miles.
- Nearest route point to the catalogue summit coordinate (54.58811, -2.918201): point **14**, 54.5881944837, -2.9187599009, approximately **37.2 metres** away. It does **not** prove that the route visits the summit trig point.
- Route point 14 is not explicitly labelled as a summit, and waypoint names are generic (`WP32101` etc.).
- The route travels generally north from the start, east past the summit area and then south and west back to the start, consistent with the intended clockwise loop; specific junction geometry remains unverified.

**Do not publish as live turn-by-turn guidance.** Still need to: verify the start point against the National Trust main car park entrance; check route against mapped rights of way, the High Cascades bridge crossing and wall/gate junctions; verify whether summit spur is missing; verify Memorial Seat and return junction; and obtain sufficient geometry for turns, distances and off-route alerts. Keep the existing Park Brow route intact. No changes to production `index.html`.

## Stage 4: four-mile published variant comparison

The user supplied a screenshot of a walking-page description headed **Gowbarrow Fell — 4 miles (6.5 km)**. The screenshot describes: Aira Force main car park, path through ancient woodland and the 65-ft waterfall, north towards Dockray, climb to Gowbarrow summit, east towards old shooting-lodge remains, descent to Collier Hagg and Memorial Seat, then west via Bernard Pike and Lyulph's Tower to the car park.

**Comparison with uploaded Memory-Map GPX:** 38-point straight-segment distance 3.815 mi vs page's rounded 4.0 mi, a difference of 0.185 mi (~298 m, ~4.6% of 4 mi). The GPX's general north-east-south-west circuit and near-summit point are consistent with this description, but matching distance and broad direction do **not** prove that the exact route is the same or that every footpath is correct. The separate National Trust trail is published as 4.5 mi, so it must not be conflated with the four-mile variant without line-by-line map comparison.

**Decision:** Retain the 4-mile variant as the leading candidate for the user's supplied GPX. Do not alter the 4.5-mile source-backed itinerary or claim a final match until mapped path alignment, start, bridge, summit spur, and return are checked. This PR remains research-only and does not enable live guidance.

## Stage 5: geometry-quality check of original 38-point GPX

Re-opened the user-supplied `Gowbarrow Fell.gpx` and independently parsed its 38 `rtept` coordinates. The signed planar area of the closed sequence (longitude projected at 54.58° N) is negative, consistent with **clockwise traversal**. This confirms the point ordering, not the actual paths taken between points.

Consecutive route-point spacing was checked in a local equirectangular projection:
- **6 of the 37 segments exceed 250 metres**; none exceeds 400 metres.
- Longest gaps are approximately **377 m (WP32109→WP32110)**, **367 m (WP32115→WP32116)**, **308 m (WP32110→WP32111)** and **305 m (WP32114→WP32115)**.
- These are straight chord lengths, **not** walked trail lengths. The 3.815-mi chord sum can understate the path length and omits a 37.8-m start–finish closure.
- The route's nearest recorded point to the catalogue summit is still approximately **37 m away**, so the trig-point spur needs explicit examination.

**Navigation consequence:** A 38-point GPX `rte` cannot be substituted for independently verified, sufficiently dense trail geometry. In particular, do not generate spoken junction directions or off-route thresholds from the long chords, and do not assume they follow rights of way. Confirm the start and end on the car-park access path, the High Cascades crossing, summit spur, old shooting lodge, Memorial Seat and return junction with authoritative mapped paths or a reliable densely recorded track before creating a production route.

**Next dependency:** a licensed detailed footpath map or recorded dense GPX track to check each segment. Until then PR #26 remains draft and research-only; do not enable live guidance.

## Stage 6: user's route-overlay screenshot — critical display warning

The user supplied a screenshot showing the red GPX line as a polygonal series of long straight chords over an OpenStreetMap-style background, with many visible dotted walking paths diverging from the red line. The summit label appears south of the northern red segment. **This is evidence of a coarse route rendering, not evidence that a path-snapping algorithm has run.** No screenshot alone can confirm precise GPS alignment or the existence of any path-snap operation.

**Display and safety requirements for a future implementation:**
1. Treat the 38-point Memory-Map `rte` as a coarse planning outline only. Never style it or label it as a verified walking track.
2. Do not silently interpolate straight chords or use them for spoken turn instructions, off-route alarms, distance-to-next-turn, or summit completion.
3. Obtain a detailed line from an independently checked source, compare with footpaths and the National Trust itinerary, and include the trig-point spur before considering navigation.
4. Where no verified line is available, show a clear **Unverified route outline — not for navigation** warning and keep Start live guidance disabled for this ascent.
5. Preserve the existing Park Brow ascent; the Aira Force clockwise route must be a distinct route option.

**Status:** No verified full-line GPX obtained yet. The source GPX is available as a conversation upload but has not been committed to this branch; no production route geometry has been changed.

## Stage 7: Walking Englishman GPX comparison (20 November 2026)

User supplied `lakes21.gpx`, shown on a Walking Englishman map with an elevation profile. The file was parsed directly from the uploaded XML. It is GPX 1.1, creator `GPS Visualizer`, with one `trkseg` containing **98 `trkpt` points**; track name **High Force, Gowbarrow Fell and Aira Force**. This is a track-formatted GPX, but the creator field does not establish that someone recorded it while walking.

- First point: **54.5717521, -2.928582289**; final point **54.571684708, -2.928580759**; closure gap **7.5 m**.
- Straight segment sum (haversine): **6.906 km / 4.291 mi**. This is longer than the earlier 38-point Memory-Map route (3.815 mi), and nearer the official National Trust 4.5-mi figure. It does not establish identity with the NT trail.
- Nearest recorded point to catalogue summit (54.58811, -2.918201): **16.4 m**.
- Longest adjacent track-point chord: approximately **203 m**, compared with **377 m** in the earlier 38-point file; **zero** new segments exceed 250 m.
- Signed planar loop area is consistent with clockwise point ordering, as for the original.
- Comparing old 38 points to nearest new track *points* (not segment projections): median approximately **28 m**, maximum approximately **206 m**; the two route files are similar in broad layout but **not identical**.

**Important:** The uploaded screenshot still depicts some long, straight blue lines across the fell. More GPX points and a closed loop are not proof of footpath conformity. Verify actual path alignment, High Cascades bridge, summit trig-point spur, eastern descent, Memorial Seat, car-park access and whether this file follows the desired circuit before use for navigation. Do not merge or enable live guidance based on these metrics alone.

The original GPX remains a comparison source. Neither raw GPX has been added to the GitHub branch in this update; this is a documented inspection, not an implemented route.

## Stage 8: targeted geometry inspection of 98-point track (20 November 2026)

Reopened the actual user-supplied `lakes21.gpx` and computed spherical great-circle chord lengths between consecutive `trkpt` coordinates. **1-based track-point indices** below refer to the source XML sequence:

| Track segment | Chord | From (lat, lon) | To (lat, lon) | Priority |
| --- | ---: | --- | --- | --- |
| 73→74 | 203 m | 54.576725062, -2.918754708 | 54.576118382, -2.921719318 | Southern return; longest chord |
| 35→36 | 176 m | 54.586779858, -2.926099404 | 54.587293844, -2.923518883 | Summit approach |
| 39→40 | 171 m | 54.588167330, -2.917967275 | 54.587962577, -2.915331777 | Immediately after summit proximity |
| 69→70 | 159 m | 54.577545486, -2.911269258 | 54.577774254, -2.913711199 | Southern return |
| 34→35 | 155 m | 54.586335580, -2.928371940 | 54.586779858, -2.926099404 | Summit approach |
| 71→72 | 150 m | 54.577675061, -2.914946740 | 54.577231579, -2.917141549 | Southern return |

Nearest recorded point to summit catalogue coordinate (54.58811, -2.918201) is **point 39** at (54.588167330, -2.917967275), **16.35 m** away. The route then continues eastwards; verify whether the true summit trig point requires a spur or this is within ordinary mapping uncertainty. Do not infer actual path deviations solely from straight chords.

**Result:** Identified precise segments to examine, but no authoritative footpath geometry was available to perform the required point-to-path comparison. The geometry remains **unverified**, and this work does not authorize live navigation. A future test should assert full track is within a justified corridor of verified paths, with separately checked bridge, gate, summit and car-park connections. This PR is research-only.

## Stage 9: local GPX checker smoke test (20 November 2026)

Executed the same parsing and distance calculation logic as `scripts/check-gowbarrow-gpx.cjs` against the user-uploaded `lakes21.gpx` in a local Node.js runtime. Observed **98 points, 6.906 km / 4.291 mi, 7.5 m closure, point 39 16.4 m from summit, five segments >150 m, zero >250 m**. Longest 73→74 at 202.6 m; 35→36 at 175.8 m; 39→40 at 171.3 m. This reproduces the previous GPX measurements.

**Scope:** Local smoke test of equivalent script logic, not a GitHub Actions CI run and not footpath verification. No source GPX or navigable route has been committed. Live guidance must remain unavailable for this proposed ascent until independently verified walking-line geometry is obtained and tested.

## Stage 10: source-route order mismatch discovered (20 November 2026)

**Important: these are different circuits, despite sharing much of the fell.**

- User's desired direction: **Aira Force waterfall first**, then High Cascades, Gowbarrow summit, shooting lodge, Memorial Seat, Lyulph's Tower and return to main car park. National Trust's eight-stage trail explicitly follows this sequence, reporting **4.5 mi / 7.2 km**. Official: https://www.nationaltrust.org.uk/visit/lake-district/aira-force-and-gowbarrow-park/aira-force-and-gowbarrow-trail
- Walking Englishman's **'High Force, Gowbarrow Fell and Aira Force'** explicitly **saves Aira Force for the finale**, visiting High Force first, then summit, eastern/southern fell and Aira Force before the car park. It reports **4.2 mi / 6.7 km** and 366 m ascent: https://www.walkingenglishman.com/lakes21.html . Its 98-point `lakes21.gpx` is therefore **not automatically a route for the user's requested Aira-Force-first sequence**. Reversing the track would also reverse the fell traverse and should not be silently substituted.
- Official NT stage 3 instructs **cross the wooden bridge at High Cascades** and turn left at the junction. Stage 5 instructs **retrace the summit trig-point spur**. Stage 7 instructs **cross the stile to Memorial Seat, then return over the stile**. Stage 8 returns via the gate before Lyulph's Tower to the Glade and main car park. These must be represented as distinct path decisions; do not treat the Walking Englishman line as validated for these maneuvers.

**Decision:** Treat NT as the primary source for the requested route order. Keep Walking Englishman GPX as a separate alternative/research comparator, not the verified source of the NT route. This resolves the source conflation but **does not yet provide digitised, authoritative, footpath-aligned NT coordinates**. Do not commit the 98-point track as the requested navigable ascent or enable guidance until geometry and junction checks are completed.
