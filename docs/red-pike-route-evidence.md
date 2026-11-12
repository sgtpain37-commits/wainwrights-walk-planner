# Red Pike ascent additions

Checked 12 November 2026. These two catalogue summits retain their existing IDs and summit coordinates from the pinned catalogue. No bare `Red Pike` association is introduced.

| Summit | Published ascent | Miles to summit | Ascent (ft) | Time | Published start |
| --- | --- | ---: | ---: | --- | --- |
| Red Pike (Buttermere) | Buttermere via Lingcomb Edge | 3.4 | 2,255 | 2h 25m | NY 174 169, Fish Hotel |
| Red Pike (Wasdale) | Overbeck Bridge via Dore Head | 3.25 | 2,590 | 2h 35m | NY 167 068, National Trust car park |

Statistics and narrative sources:

- https://www.wainwrightroutes.co.uk/redpike_r1.htm
- https://www.wainwrightroutes.co.uk/red_pike_r1.htm

Buttermere follows the Scale Bridge and Scale Force approach, then Blea Crag and Lingcomb Edge. Wasdale follows Over Beck and Brimfull Beck towards Gosforth Crag Moss, Dore Head and the south-east ridge; the summit approach follows the escarpment because the main path bypasses the summit.

Each narrative embeds its corresponding map:

- https://www.wainwrightroutes.co.uk/redpike-b_map.html
- https://www.wainwrightroutes.co.uk/redpike-w_map.html

`tests/red-pike-sources.json` records the fetched map byte hashes, first segment point counts (142 and 118), exact first vertices for starts, and four ordered interior vertices per route. Samples use floor((pointCount - 1) * fraction) at fractions 0.2, 0.4, 0.6 and 0.8. Sample names describe their provenance, not independently identified landmarks. No interpolated or invented coordinates are used. Starts are publisher map vertices, not independently surveyed parking locations. The source pages' grid references are retained separately.

The existing `checkSnapshot` helper in `scripts/check-collision-guide-sources.cjs` can reproduce hash, start, point count and sample checks against fresh map bytes. Publisher changes require review before refreshing fixtures.

The map coordinates guide route generation only. Neither map sampling nor matching distance verifies a generated walking track. Both ascents have a summit-scoped preview restriction checked by the existing guidance eligibility function and navigation entry point. No safeguard implementation changes are made.

Audit statistics now use the specific route page for these two records; all generated geometries remain null and unverified. Expected totals: 214 summits, 201 associated, zero naming mismatches, 13 missing records, 245 ascents, zero unresolved routing-input collision pairs. The distance display preserves the published 3.25-mile figure.

Validation: `node --test tests/*.test.cjs` (66 passing); `node scripts/export-route-audit.cjs --check`; routing collision report remains `[]`; `git diff --check`.
