# Gowbarrow Fell: source and geometry decision (21 November 2026)

**Status: source attributed; NOT independently verified for live navigation.**

## Distinct walks, not interchangeable

1. **Walking Englishman — High Force, Gowbarrow Fell and Aira Force**: https://www.walkingenglishman.com/lakes21.html ; published 4.2 miles, 366 m climbing, starts Aira Force car park. Described order: woodland to **High Force first**, direct ascent to Gowbarrow trig, east towards shooting lodge, south via Collier Hagg/Memorial Seat, descend Bernard Pike/Hind Crag, **Aira Force at end**. This is the named source matching the user-supplied `lakes21.gpx` track name. Attribution by matching title and itinerary does not independently establish that the uploaded GPX is byte-identical to the website download.
2. **National Trust — Aira Force and Gowbarrow trail**: https://www.nationaltrust.org.uk/visit/lake-district/aira-force-and-gowbarrow-park/aira-force-and-gowbarrow-trail ; published 4.5 miles, eight stages, visits Aira Force waterfall early, crosses **High Cascades wooden bridge**, summit spur **out and back**, Shooting Lodge, Memorial Seat, Lyulph's Tower. **Do not reuse Walking Englishman GPX as National Trust geometry.**
3. **Memory-Map `Gowbarrow Fell.gpx`**: 38 route points (not a recorded track), 3.815 miles of straight-line point-to-point chords. A separate four-mile route candidate, not a proven replacement for either source.

## Uploaded GPX diagnostic (not footpath certification)

- `lakes21.gpx`: 98 track points, calculated 4.291 miles; start-to-end gap 7.5 m; closest point/segment near summit ~5.6 m. The longest consecutive-point chord is **point 73 to 74 (~202.6 m)**, from (54.576725062, -2.918754708) to (54.576118382, -2.921719318). Chords may cut corners: this is **not** a verified walking line between those coordinates.
- `Gowbarrow Fell.gpx`: 38 route points, calculated 3.815 miles, start-to-end gap 37.8 m, longest chord ~377 m. Too sparse to infer reliable turns from the GPX alone.
- Neither numerical proximity to summit nor plausible total distance proves the full track follows mapped footpaths.

## Explicit implementation gate

- Keep both original uploads unmodified, and keep the existing Park Brow ascent.
- Compare every uploaded line with the *matching* published source map and current authoritative footpath mapping, prioritising the 73–74 chord, summit approach, High Force/Aira Force crossing, and southern junctions. Record map evidence and exact point/junction IDs.
- Do not invent intermediate coordinates, snap to Valhalla, infer turn instructions from sparse chords, or label either route verified.
- Only after line topology and access are checked: add a distinct source-attributed ascent/loop entry with source metadata, tests, GPX download and *separately reviewed* live-guidance eligibility.
- If independently verified alignment cannot be obtained, retain a preview-only research candidate.

This note is a research outcome, not approval to walk or navigate using the geometry.
