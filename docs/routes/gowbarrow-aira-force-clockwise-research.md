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
