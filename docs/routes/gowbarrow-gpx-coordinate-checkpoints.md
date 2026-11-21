# Gowbarrow GPX coordinate checkpoint audit — 21 November 2026

Source: original conversation uploads `lakes21.gpx` and `Gowbarrow Fell.gpx`, parsed as GPX XML. **Research-only; no live navigation.**

## Key sampled coordinates (latitude, longitude)

`lakes21.gpx` has 98 `trkpt` records. Point indices below are **one-based**.

| Point | Latitude | Longitude | Purpose |
| --- | --- | --- | --- |
| 1 | 54.5717521 | -2.928582289 | Start |
| 9 | 54.574152523 | -2.929062241 | Early route |
| 17 | 54.575991039 | -2.929568155 | Early route |
| 25 | 54.579659539 | -2.928761881 | Northbound section |
| 33 | 54.586008331 | -2.930028084 | North/west of summit |
| 41 | 54.587774694 | -2.913431784 | East of summit |
| 49 | 54.583943383 | -2.909013352 | Eastern side |
| 57 | 54.579848186 | -2.909811984 | Southbound eastern side |
| 65 | 54.578266552 | -2.907997487 | Southern/eastern side |
| 73 | 54.576725062 | -2.918754708 | Start of longest point-to-point chord |
| 74 | 54.576118382 | -2.921719318 | End of longest chord |
| 75 | 54.575886089 | -2.922719717 | Return west |
| 76 | 54.575542644 | -2.923562881 | Return west |
| 81 | 54.576375304 | -2.929267461 | Western return section |
| 89 | 54.574748442 | -2.927528693 | Return near falls |
| 97 | 54.572202276 | -2.928476487 | Near finish |

`Gowbarrow Fell.gpx` has 38 `rtept` records, **not a recorded `trkpt` trace**:

| Point | Latitude | Longitude |
| --- | --- | --- |
| 1 | 54.5725233909 | -2.9290031807 |
| 9 | 54.5825388179 | -2.9296955347 |
| 17 | 54.5874693367 | -2.9076791888 |
| 25 | 54.5777140710 | -2.9082356205 |
| 33 | 54.5752907158 | -2.9255854490 |

## Verified from GPX versus NOT verified

**Verified from the uploaded files:** the coordinates and point counts above; `lakes21.gpx` point 73→74 spans about 202.6 m as a direct chord; both routes broadly circle the fell.

**Not verified:** exact mapped footpath agreement, current legal access, bridge crossings, summit spur topology, Memorial Seat/stile, turn-by-turn instructions, or whether these two GPX uploads correspond to the National Trust's distinct 4.5-mile route.

## Explicit next checks

1. Overlay `lakes21.gpx` on authoritative walking-path geometry and inspect points 73–74 at high zoom. A long straight chord alone is **not** proof of an error; it may be a simplification of a curved path.
2. Check the route's western/northern approach and eastern descent against the matching Walking Englishman published map, **not** against the National Trust route.
3. For any proposed National Trust route, independently establish High Cascades crossing and the summit spur out-and-back. Do not infer those from proximity.
4. Record supporting map source, date and exact coordinate indices for each junction before marking it verified.
5. Keep all proposed lines preview-only, preserving the existing Park Brow ascent.

No coordinates were invented, moved, interpolated or snapped in this audit.
