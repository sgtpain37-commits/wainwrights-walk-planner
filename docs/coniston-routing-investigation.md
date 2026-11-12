# Coniston Old Man routing investigation — initial code and evidence review

Reviewed 12 November 2026. This is a **read-only diagnosis** of committed inputs and the diagnostic script, not a fresh Valhalla run or an independently verified walking route.

## Reproduced from repository source

- `scripts/check-live-routing.cjs` loops over `tests/coniston-guide-sources.json`, calls `buildWalkingRequest(embeddedStartFor(route),routeViaPoints(route),{lat:54.37066,lon:-3.12145})`, and POSTs the payload to `https://valhalla1.openstreetmap.de/route`.
- The three records have distinct first-vertex starts and four ordered sampled guide vertices each. Their exact values and source URLs are preserved in `tests/coniston-guide-sources.json`.
- `docs/route-mapping.md` reports historical Valhalla responses of 10.667 km (south ridge), 15.947 km (Low Water), and 5.652 km (Diamond), against published 2.4, 2.0, and 1.6 miles. A historical alternate `via` diagnostic still gave 5.960, 15.194, and 4.170 km respectively.
- The app's >50% full-ascent discrepancy rule restricts live guidance; it is not a proof that shorter results are correct.

## What this establishes and what it does not

The distinct inputs rule out the **original identical-input bug** as a complete explanation for these recorded results. The diagnostic still asks a pedestrian router to find a connected path through sparse guide vertices. A missing/disconnected mapped path, incompatible access attributes, waypoint snapping, an enforced detour, or another routing-service behavior **could** explain excess length. The committed evidence does not identify which explanation applies to any specific segment.

The `via` experiment failing to eliminate the excess is useful negative evidence: changing waypoint behavior alone did not resolve the historical mismatch. Do not interpret this as a definitive network-data diagnosis.

## Next reproducible checks

1. Run `node scripts/check-live-routing.cjs` from a trusted network-enabled environment; save timestamp, service endpoint, payload, summary and all returned encoded leg shapes. Never overwrite historical results.
2. Decode each leg shape, measure its geometry length and compare with the summary. Plot the returned path against the **complete original publisher track**, not merely the four saved guide points.
3. Calculate start/end offsets, maximum separation from publisher track, distance and location of major excursions, and repeated/reversed sections. Identify the first divergence for each ascent.
4. Check whether the apparent missing segment is represented as a routable pedestrian way in the map data and whether any current access/path restrictions apply. Document the actual evidence before proposing changes.
5. Test alternatives only as diagnostics. A direct source-backed track could be shown as a clearly attributed, unverified **reference overlay**, never as generated turn-by-turn directions or proof of current access.
6. Retain the preview-only gate and regression tests until a separate safety review; no fabricated connectors, guessed guide coordinates, or relaxed pedestrian restrictions.

## Working conclusion

**Confirmed:** distinct Coniston input samples coexist with severe historical generated-distance discrepancies. **Unresolved:** the precise cause and location of the detours. **Safe next change:** add an offline geometry-comparison diagnostic with saved fixtures, then review the results before changing route rendering or live guidance.
