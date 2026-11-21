# Glen / Black Crag OS Maps GPX compared with two earlier candidates (21 November 2026)

**Status: actual GPX-coordinate comparison completed; independent mapped-footpath verification NOT completed. No live guidance.**

## Source files
- User-uploaded `HTWS01E02GowbarrowFell.gpx` — 391 `trkpt` coordinates, OS Maps - Web; linked by Glen / Black Crag from https://explore.osmaps.com/route/13098016/htw-s01e02-gowbarrow-fell
- User-uploaded `lakes21.gpx` — 98 coordinates, linked to Walking Englishman source itinerary
- User-uploaded `Gowbarrow Fell.gpx` — 38 `rtept` coordinates, Memory-Map planned route

## Reproducible method
Parsed GPX XML coordinate arrays; transformed longitude/latitude to EPSG:27700 (British National Grid) using pyproj, calculated polyline lengths and shortest vertex-to-opposing-polyline distances using Shapely. All comparisons are between the **supplied GPX polylines**, not an independent surveyed path network. Calculated BNG polyline lengths may differ slightly from earlier haversine lengths.

| Candidate | Points | BNG polyline distance | Start/end gap | Closest polyline approach to summit reference (54.588094,-2.918183) |
| --- | ---: | ---: | ---: | ---: |
| Glen OS Maps | 391 | 7,502 m / 4.66 mi | 1.3 m | 24.2 m |
| lakes21 | 98 | 6,920 m / 4.30 mi | 7.5 m | 5.6 m |
| Memory-Map | 38 | 6,151 m / 3.82 mi | 37.8 m | 30.9 m |

## Directional vertex-to-other-polyline comparison
For each vertex in the **row** GPX, calculate its distance to the nearest segment of the **column** GPX. This is directional, and not the same as corresponding-point distance.

| From vertices of | To polyline | Mean distance | Maximum distance | Vertices >50 m | Vertices >100 m |
| --- | --- | ---: | ---: | ---: | ---: |
| Glen OS Maps | lakes21 | 109.5 m | 530.2 m | 176 / 391 | 135 / 391 |
| Glen OS Maps | Memory-Map | 94.8 m | 531.5 m | 123 / 391 | 100 / 391 |
| lakes21 | Glen OS Maps | 102.4 m | 837.9 m | 24 / 98 | 19 / 98 |
| Memory-Map | Glen OS Maps | 92.5 m | 803.6 m | 8 / 38 | 7 / 38 |
| lakes21 | Memory-Map | 29.3 m | 173.5 m | 18 / 98 | 4 / 98 |
| Memory-Map | lakes21 | 29.5 m | 205.7 m | 7 / 38 | 3 / 38 |

## Specific areas to inspect
- **Glen's interior-crossing variation is not equivalent to the perimeter candidate**. Glen points 291–295 lie approximately 517–530 m away from the `lakes21` line; conversely `lakes21` points 29–33 diverge up to 838 m from Glen's line. These are significant route choices, not an issue to fix by reversing the track.
- Glen's longest adjacent-point chord is **190.8 m between points 75–76**, then **120.6 m between 87–88**. These need map inspection before interpreting turns; the 391-point count does not mean every segment is accurate.
- `lakes21` still has its 203.2 m longest chord at points 73–74 (BNG metric; earlier spherical result 202.6 m). Agreement with another candidate is not evidence of actual path geometry.
- All three approach the approximate summit reference, but **none has been established to touch the summit trig point or follow the exact required spur**. Glen's nearest *line* is ~24 m away.

## Decision and safety gate
Retain Glen's OS Maps route as a **separate third route variant**; do not merge its coordinates with the `lakes21` line or overwrite the National Trust or Park Brow route. Do not silently reverse route direction without recalculating and validating junction instructions and climbs. A GPX `trkpt` array exported by OS Maps does not prove the source was physically recorded on foot.

**Next:** overlay each route on authoritative footpath geometry, check Glen's interior path rights/access and summit spur, investigate Glen points 75–76 and 87–88, verify the waterfall crossings, then consider preview-only import and separate tests. No navigable route approved.
