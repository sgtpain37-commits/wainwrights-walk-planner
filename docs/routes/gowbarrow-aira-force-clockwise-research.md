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
