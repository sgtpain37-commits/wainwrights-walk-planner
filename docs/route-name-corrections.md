# Catalogue route-name corrections

The first batch applied six exact aliases from the existing audit proposals. These catalogue names previously returned no route choices in the walking planner, although their corresponding route records were already present. Both `routeStatsFor` and `routeVariantsFor` use the same alias table.

| Exact catalogue name | Existing repository route key | Existing ascent choices | Supporting route publisher page |
| --- | --- | ---: | --- |
| Catstye Cam | Catstycam | 2 | [Glenridding / north-west ridge](https://www.wainwrightroutes.co.uk/catstycam_r1.htm) |
| Haystacks (Buttermere) | Haystacks | 1 | [Gatesgarth / Warnscale](https://www.wainwrightroutes.co.uk/haystacks_r1.htm) |
| Pike of Blisco | Pike o' Blisco | 1 | [ODG Hotel / Redacre Gill](https://www.wainwrightroutes.co.uk/pikeoblisco_r1.htm) |
| Pike of Stickle | Pike o' Stickle | 1 | [ODG Hotel / Troughton Beck](https://www.wainwrightroutes.co.uk/pikeostickle_r1.htm) |
| St Sunday Crag | St. Sunday Crag | 1 | [Bridgend / east ridge](https://www.wainwrightroutes.co.uk/saintsundaycrag_r1.htm) |
| The Old Man of Coniston (Coniston Old Man) | Coniston Old Man | 5 | [Fell gate / south ridge](https://www.wainwrightroutes.co.uk/conistonoldman_r1.htm), [Low Water](https://www.wainwrightroutes.co.uk/conistonoldman_r2.htm), [Diamond path](https://www.wainwrightroutes.co.uk/conistonoldman_r4.htm) |

The exact catalogue spellings, summit identities and coordinates come from the pinned `data/audit/wainwrights.csv` and its `catalogue-source.json` provenance. Each proposed target already appears in `data/audit/associations.json`. Publisher pages were consulted on 12 November 2026 to corroborate the destination names and described approaches. These references support the name association; they do not independently verify all route statistics, start coordinates, guide points, connecting geometry or current path conditions.

All eleven existing ascent records remain verbatim. For example, the stored Haystacks route still says “Gatescarth”; the publisher uses “Gatesgarth”. That start-name spelling needs its own reviewed correction because changing route text also changes ascent identity and may affect routing lookups. It is not silently changed here.

The aliases are explicit full strings. No location qualifiers are removed, no fuzzy matching is added, and no similarly named summits are merged. After the first batch, 28 naming mismatches remained audit proposals, including qualified identities needing individual review. Fifteen catalogue summits still lack identified repository route records. All ten unresolved collision pairs remain unresolved.

## Audit continuity

The first batch regenerated the version-1 export and changed these six associations from `naming_mismatch` to `associated`: coverage moved from 165 to 171. It cleared their audit-only proposed corrections. The export still contains 214 summit identities and 243 ascent choices. Summit/ascent IDs, published records, guide evidence, coordinates and collision IDs are unchanged, so dashboard review annotations can remain attached to the same IDs. Existing review decisions are not automatically marked merged.

## Validation

The first batch passed 45 tests with `node --test tests/*.test.cjs`, including four new route-name regression checks. Tests verify the complete ascent choices and statistics, exactly six changed catalogue lookups, unchanged underlying route constants, negative qualified-name cases and route-card rendering. Existing navigation safety and export tests remain in the full run. `node scripts/export-route-audit.cjs --check` confirms the export is current; the routing collision report remains byte-identical.

No navigation rules, route coordinates, planner deployment files, service worker or dashboard code are changed. Refresh the online planner after an approved merge and deployment to load the new aliases.

## Second batch: three location-qualified identities

| Exact catalogue identity | Existing route record | Published approach and location evidence | Same-name identity excluded |
| --- | --- | --- | --- |
| Harter Fell (Eskdale) | Harter Fell | [Publisher route one](https://www.wainwrightroutes.co.uk/harterfell_r1.htm) starts at Birks Bridge, SD 235 995, in the Duddon Valley, and describes the pass towards Eskdale followed by the south-west flank of Harter Fell. | Harter Fell (Mardale) |
| High Pike (Scandale) | High Pike | [Publisher route one](https://www.wainwrightroutes.co.uk/high_pike_r1.htm) uses Sweden Bridge Lane from Ambleside, High Sweden Bridge and the ridge above Scandale to High Pike. | High Pike (Caldbeck) |
| Tarn Crag (Easedale) | Tarn Crag | [Publisher route one](https://www.wainwrightroutes.co.uk/tarncrag_r1.htm) starts in Grasmere and follows Far Easedale towards the east ridge above Easedale Tarn. | Tarn Crag (Sleddale) |

The publisher descriptions were consulted on 12 November 2026 and agree with the identity-specific rationale already stored in `data/audit/associations.json`. These are three exact aliases, not generic mappings for every mountain sharing a short name. Original qualified names, catalogue coordinates, summit IDs and ascent IDs remain unchanged. The three excluded identities still have no repository route records; none receives an invented ascent.

This second batch moves working associations from 171 to 174 and remaining naming mismatches from 28 to 25. The full export still has 214 summits, 243 ascent choices, 15 missing route records and 10 unresolved collision pairs. Existing ascent records, starting coordinates (including unresolved starts), guide points, source-evidence labels and all generated-line warnings remain unchanged. Evidence supports identity and approach association only; no complete track or present-day condition is independently verified.

Validation: 48 tests pass, including three new tests covering the specific routes/statistics, exactly three changed catalogue lookups, independent summit identities, unchanged route constants, rendering and negative same-name/qualifier cases. Export freshness and byte-identical collision checks pass. A base-versus-regenerated-export comparison confirms that every summit ID, catalogue record, complete ascent record and collision record is unchanged. The first batch's test comparing six lookup changes now removes only those six aliases from the current table, so future independently reviewed aliases do not invalidate that regression check.
