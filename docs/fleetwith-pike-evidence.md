# Fleetwith Pike: Gatesgarth via Fleetwith Edge

Investigated 12 November 2026 against main commit 814c4eb (after PR #10). The current baseline is 201 associated summits, 13 missing records and zero naming mismatches or routing-input collisions. Fleetwith Pike remains a gap.

## Evidence comparison

| Publisher | Scope | Distance | Climb | Time up | Start |
| --- | --- | --- | --- | --- | --- |
| [Upfell](https://www.upfell.app/wainwrights/fleetwith-pike) | OSM-derived ascent; explicitly not a guided line | 1.8 km one way | 553 m | 75 min estimated, Naismith/Langmuir | Gatesgarth Farm |
| [Peakify](https://peakify.ai/mountain/fleetwith-pike/routes/gatesgarth-via-fleetwith-edge) | Ascent estimate; explicitly no plotted track/GPX | 2.1 km one way | 531 m | 80 min estimated, Naismith | NY194151; published 54.52489, -3.24554 |
| [WalkLakes, Elizabeth Oldham](https://www.walklakes.co.uk/walk_266.html) | Circular walk via Honister Crag, Dubs Hut and Warnscale | 7.4 km circular | 589 m circular | 147 min minimum for complete circuit | NY194149 |
| [My Pennines, 8 August 2014](https://www.mypennines.co.uk/lake-district/walks/080814.html) | Walked account continuing over Haystacks | Not used for ascent statistics | Not used | Not used | NY194150 |

WalkLakes describes the approach from Gatesgarth Farm along the Honister road, turning onto the signed path beyond the last house. The ascent passes left of Low Raven Crag, climbs zigzags behind it and continues along the rocky ridge to the summit. Minor scrambling is involved. This is a paraphrased route overview, not new turn-by-turn directions.

The starting **place** and ridge are supported; the exact routing start is unresolved. The three grid references differ by 100–200 metres northing. Peakify's coordinates are retained only as a source claim, not installed as routing inputs. The existing generic Gatesgarth parking point is not treated as verification.

The one-way claims differ by 0.3 km, 22 m climbing and five minutes estimated walking time. Sources do not establish identical endpoints or measured geometry. Neither averaging nor choosing the larger number resolves that discrepancy. Upfell cites WalkLakes, so their agreement on narrative is not independent corroboration of Upfell's statistics. WalkLakes' circuit totals cannot establish ascent-only totals. No new one-way distance, climb or time is certified by this investigation.

## Proposed change and remaining work

Add structured candidate evidence under `data/audit/route-candidates.json`, exported as the optional `routeInvestigation` field on Fleetwith Pike's existing audit entry. This is additive audit metadata, not a selectable ascent or route association. Existing schema version and all existing fields retain their meanings; consumers may ignore the optional field.

Retain `missing_route_record`, empty ascents, null geometry and explicit no-live-guidance status. Do not alter planner code, summit identities, coordinates or navigation safeguards. Totals remain 214 / 201 associated / 13 missing / 245 ascents / zero collisions.

Before installing an ascent record, reconcile the exact car-park departure and ascent line with attributable one-way statistics (or reproducible measurements clearly labelled as derived). Any subsequently generated line still requires its own review and a preview restriction until verified. No coordinates, guide points or tracks are invented here.

Regression tests preserve each source's scope and figures, prevent candidate evidence becoming a selectable ascent, check all summit IDs/coordinates, and check unchanged association/collision totals. Run the full existing suite to cover navigation safeguards and export reproducibility.
