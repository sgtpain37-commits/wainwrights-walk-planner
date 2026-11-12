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


## Third batch: remaining 25 catalogue names

The remaining 25 audit proposals are applied as explicit full-name aliases. Every mapping is listed below, with the route publisher page and the identity-specific observation used to check it. Additional alternate-name references are retained in `data/audit/remaining-name-evidence.json`. Sources were consulted on 12 November 2026. The pinned catalogue remains authoritative for this application's summit IDs, coordinates and qualified names; contemporary height differences are not silently imported.

| Qualified catalogue name | Existing route key | Identity check / source |
| --- | --- | --- |
| Angletarn Pikes (Angletarn Pikes North Top) | Angletarn Pikes | [Route visits the north top after the south top; this supports the catalogue north-top identity.](https://www.wainwrightroutes.co.uk/angletarnpikes_r1.htm) |
| Baystones (Wansfell) | Wansfell | [Route continues beyond Wansfell Pike to the summit explicitly identified as Baystones.](https://www.wainwrightroutes.co.uk/wansfell_r1.htm) |
| Beda Fell (Beda Head) | Beda Fell | [Route explicitly identifies Beda Head as the summit of Beda Fell.](https://www.wainwrightroutes.co.uk/bedafell_r1.htm) |
| Blencathra-Hallsfell Top | Blencathra | [Scales approach via Hall's Fell reaches Blencathra summit; Hallsfell Top identity corroborated by the publisher's Bowscale Fell overview.](https://www.wainwrightroutes.co.uk/blencathra_r1.htm) |
| Crag Hill (Eel Crag) | Eel Crag | [Publisher explicitly explains Eel Crag as the fell named Crag Hill by Ordnance Survey.](https://www.wainwrightroutes.co.uk/eelcrag_r1.htm) |
| Crinkle Crags-Long Top (Second Crinkle) | Crinkle Crags | [Route explicitly reaches Long Top, after the first crinkle and the approach to the second.](https://www.wainwrightroutes.co.uk/crinklecrags_r1.htm) |
| Dodd (Skiddaw) | Dodd | [Millbeck and Long Doors approach describes Dodd beside Skiddaw and Dodd Wood.](https://www.wainwrightroutes.co.uk/dodd_r1.htm) |
| Fellbarrow-Mosser Fell | Fellbarrow | [Waterend/Mosser Fell Road approach reaches Fellbarrow; the Mosser Fell alternative name and NY132242 are corroborated separately.](https://www.wainwrightroutes.co.uk/fellbarrow_r1.htm) |
| Grange Fell (Brund Fell) | Grange Fell | [Route via King's How continues to Brund Fell, rather than ending at the subsidiary top.](https://www.wainwrightroutes.co.uk/grangefell_r1.htm) |
| Great Crag (Stonethwaite) | Great Crag | [Stonethwaite/Lingy End approach reaches Great Crag above Dock Tarn.](https://www.wainwrightroutes.co.uk/greatcrag_r1.htm) |
| Hartsop Above How (Gill Crag-Hartsop Above How) | Hartsop above How | [Bridgend ridge approach reaches Hartsop above How; Gill Crag identity and grid corroborated separately.](https://www.wainwrightroutes.co.uk/hartsopabovehow_r1.htm) |
| Heron Pike (Rydal) | Heron Pike | [Grasmere/Alcock Tarn approach identifies the Heron Pike on the Rydal/Great Rigg ridge.](https://www.wainwrightroutes.co.uk/heronpike_r1.htm) |
| High Crag (Buttermere) | High Crag | [Buttermere/Sheepbone Rake approach identifies the High Crag at the head of Buttermere.](https://www.wainwrightroutes.co.uk/highcrag_r1.htm) |
| High Rigg (Naddle Fell) | High Rigg | [Smaithwaite Bridge approach identifies High Rigg in St John's in the Vale; Naddle Fell alternative and grid corroborated separately.](https://www.wainwrightroutes.co.uk/highrigg_r1.htm) |
| Lingmoor Fell (Lingmoor Fell-Brown How) | Lingmoor Fell | [Elterwater route reaches Lingmoor Fell summit; Brown How identity corroborated separately.](https://www.wainwrightroutes.co.uk/lingmoorfell_r1.htm) |
| Little Hart Crag (Little Hart Crag-West Top) | Little Hart Crag | [Caiston Glen route reaches Little Hart Crag summit, then describes its lower eastern top separately.](https://www.wainwrightroutes.co.uk/littlehartcrag_r1.htm) |
| Mellbreak (Mellbreak South Top) | Mellbreak | [North-ridge route continues to the higher south top; the overview also identifies NY148186.](https://www.wainwrightroutes.co.uk/mellbreak_r1.htm) |
| Rosthwaite Fell-Bessyboot | Rosthwaite Fell | [Big Stanger Gill approach explicitly reaches Bessyboot, not Rosthwaite Cam.](https://www.wainwrightroutes.co.uk/rosthwaitefell_r1.htm) |
| Steel Fell (Dead Pike-Steel Fell) | Steel Fell | [Mill Bridge/south-east ridge route explicitly identifies the actual top as Dead Pike.](https://www.wainwrightroutes.co.uk/steelfell_r1.htm) |
| Steel Knotts (Pikeawassa-Steel Knotts) | Steel Knotts | [Martindale Hause/Birkie Knott route explicitly identifies Pikeawassa as the summit of Steel Knotts.](https://www.wainwrightroutes.co.uk/steelknotts_r1.htm) |
| Stony Cove Pike (Caudale Moor) | Caudale Moor | [Kirkstone Pass/St Raven's Edge route reaches Caudale Moor; Stony Cove Pike identity corroborated separately.](https://www.wainwrightroutes.co.uk/caudalemoor_r1.htm) |
| The Knott (High Street) | The Knott | [Hartsop/Hayeswater approach identifies The Knott in the High Street group; keep it separate from Knott.](https://www.wainwrightroutes.co.uk/theknott_r1.htm) |
| Whin Rigg (Wasdale) | Whin Rigg | [Irton Park/Irton Fell approach and Wastwater views identify the Wasdale fell.](https://www.wainwrightroutes.co.uk/whinrigg_r1.htm) |
| Whinlatter (Brown How-Whinlatter) | Whinlatter | [Route visits Whinlatter Top and continues along the ridge to Brown How.](https://www.wainwrightroutes.co.uk/whinlatter_r1.htm) |
| Whiteside (Whiteside West Top) | Whiteside | [Lanthwaite Green/Whin Ben route visits the west top before discussing the higher east top separately.](https://www.wainwrightroutes.co.uk/whiteside_r1.htm) |

This includes an explicit alias for the displayed `Blencathra — Hallsfell Top`: the existing `cleanName` function changes the raw catalogue hyphen before route lookup, so mapping only the raw spelling would still leave the planner broken. Both raw and displayed names are tested. No generic qualifier removal or fuzzy matching is added.

Working associations rise from 174 to 199. The original 34 naming mismatches are now all resolved at the name-association level. Fifteen summits still have no identified repository route records, and all ten routing-input collision pairs remain unresolved. The export still contains all 214 identities and 243 ascent choices. All summit/ascent IDs, catalogue coordinates, complete ascent records, guide evidence and collision records remain unchanged, preserving existing audit annotations.

The publisher's Wansfell walk continues beyond Wansfell Pike to Baystones; Whinlatter continues beyond Whinlatter Top to Brown How; Angletarn Pikes visits the north top; Mellbreak continues to the south top; Little Hart Crag distinguishes the lower eastern top; Whiteside distinguishes the higher east top. These are identity checks only. They do not establish current conditions or independently verified tracks, nor do they verify that a newly generated line follows those published descriptions.

Separate statistics review is still needed. For example, the Dodd detail page gives 1h 35m while the stored route has 1h 25m (the publisher's uploaded-route list also gives 1h 25m), and the Hartsop above How detail page gives 1h 35m while the stored route and list give 1h 30m. This batch preserves all stored figures and records these discrepancies for source reconciliation rather than silently choosing a value.

Validation: all 52 tests pass. Four new tests cover the 25 mappings and 27 ascent choices, the Blencathra display transformation, exactly 25 changed catalogue lookups, unchanged route constants, all 15 missing records, negative same-top/name cases and catalogue totals. Export freshness, unchanged collision snapshot and `git diff --check` pass. A base-export comparison confirms unchanged IDs, catalogue records, full ascent records and collision records.

Browser preview QA also opened all 25 corrected catalogue entries and confirmed all 27 expected ascent choices. The audit preview showed 199 associated summits and zero naming mismatches. An existing search limitation was observed: entering the entire displayed `Blencathra — Hallsfell Top` label does not match the raw catalogue name used by the search filter. Searching `Blencathra` works, and opening its displayed result now resolves the ascent correctly. Search normalization is recorded for a separate change.
