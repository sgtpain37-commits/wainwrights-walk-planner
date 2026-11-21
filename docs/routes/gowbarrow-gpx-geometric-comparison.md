# Gowbarrow two-GPX geometric comparison — 21 November 2026

**Status: quantitative cross-comparison only. Neither route is certified against actual footpath geometry. Do not use for live navigation.**

## Inputs and method
Compared the supplied `gowbarrow_route_comparison.geojson` geometries:
- 98-point `lakes21.gpx` candidate (4.29 mi)
- 38-point `Gowbarrow Fell.gpx` alternative (3.82 mi)

For each vertex of one line, calculated its shortest distance to any straight segment of the other line, using local equirectangular metre scaling at latitude 54.58°N. Distances are approximate; they are **not** a footpath verification, matched junctions, or proof of a walked recording.

| Measurement | 98-point line relative to 38-point line | 38-point line relative to 98-point line |
| --- | ---: | ---: |
| Mean vertex-to-other-line distance | 29.2 m | 29.5 m |
| Maximum vertex-to-other-line distance | 173.5 m | 205.8 m |
| Vertices more than 50 m from other line | 18 / 98 | 7 / 38 |
| Vertices more than 100 m from other line | 4 / 98 | 3 / 38 |

## Most significant differences
- **Eastern side near summit:** 98-point candidate points 40, 41 and 42 are approximately 150.3 m, 173.5 m and 147.1 m from the 38-point alternative line. The alternative's point 15 is approximately 205.8 m from the 98-point line. This is a **higher-priority route-identity check** than simply examining the longest chord.
- **Southern gap, 98-point candidate points 73→74:** point 73 is approximately 20.7 m from the alternative line and point 74 approximately 13.7 m. The alternatives broadly agree on this part of the route, but that agreement does **not** establish the 202.6 m chord follows the actual winding footpath.
- **Northern/summit approach:** candidate point 35 is approximately 47.8 m from the alternative; point 36 approximately 33.0 m; point 39 approximately 32.4 m.
- **Southern eastern section:** candidate points 69 and 70 are approximately 14.7 m and 22.0 m from the alternative.

## Evidence limits and next gate
These values derive from the uploaded GeoJSON, which reproduces the two GPX point sequences. The screenshots of an AllTrails route are useful *visual* corroboration but contain no downloadable, georeferenced vector line in this session. Do not claim the screenshots prove either GPX is aligned.

Next: acquire an independently licensed/accessible georeferenced footpath geometry source and overlay both GPX files, prioritising (1) the divergent eastern/summit section, (2) the summit trig spur, (3) the 73–74 southern chord, (4) waterfall bridges and return junctions. Record actual footpath geometry and junction evidence before creating a navigable route. Keep Park Brow intact and both candidates preview-only.
