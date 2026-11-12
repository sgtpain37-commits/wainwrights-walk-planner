# Summit audit export v1

`docs/wainwrights-audit.v1.json` is a deterministic, offline import for the companion audit Site. It adds no runtime planner code and makes no changes to navigation, service-worker caching, deployment or the existing route workflow.

## Reproduce

From the repository root, with Node 22 or later and no dependencies or network requests:

```sh
node scripts/export-route-audit.cjs --write
node scripts/export-route-audit.cjs --check
node --test tests/*.test.cjs
```

Without flags, the generator writes JSON to stdout. Its paths are independent of the working directory. The pinned CSV is copied verbatim from upstream commit `1d1161cfe4194cac67b1b5794ab75235cef1009d`; its URL, retrieval date and expected count are in `data/audit/catalogue-source.json`. Refresh that CSV and metadata deliberately in a reviewed PR, then regenerate and review the coverage changes. This export does not silently fetch a changing upstream catalogue.

`inputs` records SHA-256 hashes of the actual catalogue, planner, mappings, generator, helper, coordinate fixtures and route documentation. There is no changing generation timestamp. Unchanged inputs produce identical bytes. Keep the export committed with input changes; CI rejects stale output. Schema version `1.0.0` describes this contract. Breaking field or status changes require a new major filename/version; additive compatible changes may increment the minor version.

## Import contract

Read the JSON as data, check `schemaVersion`, then use `summits` as the complete catalogue. Render imported names/text as text, not trusted HTML. Coordinates use latitude and longitude, in degrees; no GeoJSON line is supplied. Importing this report does not change the planner's route lookup.

| Field | Meaning |
| --- | --- |
| `summits[].id` | Stable SHA-256 prefix of the full qualified catalogue name; identity changes if that name changes. Never collapse parenthesised names. |
| `name`, `alternativeNames`, `catalogue` | Original summit name, known associated repository names/aliases, and original catalogue attributes with numeric heights and coordinates. Alternative names are not an exhaustive gazetteer. |
| `association.status` | `associated`: current planner resolves; `naming_mismatch`: explicit audit-only mapping finds records; `missing_route_record`: no repository record identified. The last status says nothing about existence of real-world ascents. |
| `association.routeKey`, `basis`, `proposedCorrection` | Exact repository key, recorded matching basis and proposed name correction. These proposals have not changed planner behavior. |
| `ascents[].id`, `published` | Summit-qualified ascent identity and the existing selected route variants/statistics, verbatim. Distances are miles to summit, ascent feet, time is the stored text; these are not return/circular or generated-route figures. General statistics attribution is not route-specific verification. |
| `start` | Existing coordinates/resolution, or null coordinates and the unresolved fallback query. No geocoding is performed. An embedded coordinate without source evidence remains labelled accordingly. |
| `guideWaypoints` | Existing ordered guides, names, coordinates, source status, URL and zero-based sampled track index where evidenced. |
| `sourceReferences`, `declaredGuideSource` | Coordinate fixture evidence versus an existing source declaration. A source-backed label requires the full ordered coordinates to agree with the fixture. Shared route strings use the planner's existing shared guide lookup; this is not evidence of a separate full track for each summit. |
| `generatedWalkingLine` | Always `unverified`, geometry null: the export does not call Valhalla, invent tracks or promote guide provenance to end-to-end verification. |
| `missingEvidence` | Actionable absent records, start/guide provenance, unresolved coordinates and full-line verification. No coordinates are inferred to fill gaps. |
| `collisionIds`, `routingInputCollisions` | Stable links to the current offline routing-input audit, with original routes, start/resolution and unresolved status. Identical fallback queries are distinct from known identical coordinates. |
| `repositorySourceReferences` | Literal source URLs retained from existing route documentation, with scope; no new source retrieval is implied. |
| `unassociatedRouteKeys` | Repository route keys left outside catalogue associations, so future records cannot disappear silently. |

IDs depend on the qualified name and, for ascents, the route text; they do not change when statistics, coordinates or ordering change. Consumers should preserve local review annotations separately, detect removed IDs and reconcile renamed records deliberately. The export never writes Site review decisions back to GitHub. Continue proposing evidence/fixes through branches and pull requests.

## Current findings

All 214 catalogue summits are present: 171 currently resolve, 28 have explicit naming mismatches, and 15 have no identified route record. There are 243 associated published ascent choices. All 10 unresolved collision pairs are retained (five embedded-coordinate pairs and five fallback-query pairs).

`data/audit/associations.json` uses exact complete catalogue names, never fuzzy matching or stripping qualifiers. Birks Bridge/Duddon identifies the existing Harter Fell record as Eskdale; Mardale remains missing. Similarly the Ambleside/High Sweden Bridge High Pike is associated only with Scandale, and the Grasmere Tarn Crag only with Easedale. Caldbeck and Sleddale remain missing. Existing Red Pike aliases point to absent records, so neither Red Pike is assigned an invented ascent. Haystacks now resolves through an explicit catalogue-name alias; Fleetwith Pike has no repository route record. Six catalogue-name corrections are documented in `docs/route-name-corrections.md`.

Source snapshots establish provenance for sampled guide coordinates only, not current path conditions or the complete generated line. The existing navigation restrictions and distance discrepancy handling remain unchanged. This report is an audit input, not a verified navigation dataset.

## Validation

Tests verify exact catalogue coverage, original summit coordinates, unique IDs, every association and ascent against current planner lookup or explicit mappings, distinct mountains, source fixture equality and order, missing evidence labels, all ten collisions and their ascent links, deterministic bytes and execution outside the repository directory. Existing route/navigation tests run unchanged. `Summit audit export` adds a read-only CI job to reject inconsistent exports; it has no deployment step.
