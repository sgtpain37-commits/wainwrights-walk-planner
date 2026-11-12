# Catalogue route-name corrections — first batch

This change applies six exact aliases from the existing audit proposals. These catalogue names previously returned no route choices in the walking planner, although their corresponding route records were already present. Both `routeStatsFor` and `routeVariantsFor` use the same alias table.

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

The aliases are explicit full strings. No location qualifiers are removed, no fuzzy matching is added, and no similarly named summits are merged. The other 28 naming mismatches remain audit proposals, including qualified identities that need individual review. Fifteen catalogue summits still lack identified repository route records. All ten unresolved collision pairs remain unresolved.

## Audit continuity

Regenerating the version-1 export changes these six associations from `naming_mismatch` to `associated`: coverage moves from 165 to 171. It clears their audit-only proposed corrections. The export still contains 214 summit identities and 243 ascent choices. Summit/ascent IDs, published records, guide evidence, coordinates and collision IDs are unchanged, so dashboard review annotations can remain attached to the same IDs. Existing review decisions are not automatically marked merged.

## Validation

`node --test tests/*.test.cjs` passes 45 tests, including four new route-name regression checks. Tests verify the complete ascent choices and statistics, exactly six changed catalogue lookups, unchanged underlying route constants, negative qualified-name cases and route-card rendering. Existing navigation safety and export tests remain in the full run. `node scripts/export-route-audit.cjs --check` confirms the export is current; the routing collision report remains byte-identical.

No navigation rules, route coordinates, planner deployment files, service worker or dashboard code are changed. Refresh the online planner after an approved merge and deployment to load the new aliases.
