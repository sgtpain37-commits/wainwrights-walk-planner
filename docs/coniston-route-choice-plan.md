# Coniston Old Man route-choice expansion: evidence-first plan

Reviewed 12 November 2026. This is a **planning and audit document**, not a new navigable route, verified track, difficulty certification, or change to live guidance.

## Current published ascent choices in the planner

The planner already lists these three distinct ascents from Coniston (fell gate), with source-backed sampled starting coordinates and four guide points each (see `tests/coniston-guide-sources.json`):

| Existing choice | Published one-way ascent | Recorded Valhalla response | Assessment |
| --- | ---: | ---: | --- |
| Via the south ridge | 2.4 mi | 6.6 mi | Severe discrepancy; preview only |
| Via Low Water | 2.0 mi | 9.9 mi | Severe discrepancy; preview only |
| Via the Diamond path | 1.6 mi | 3.5 mi | Severe discrepancy; preview only |

Recorded responses are historical diagnostics, not a fresh routing-service measurement. See `docs/route-mapping.md` and `coniston-live-check.json`. The >50% live-guidance restriction must remain in force. Different guide points are **not** evidence that the generated line faithfully follows a published route.

## Additional route families to investigate

These are **candidate approaches**, not accepted ascent records. Some may overlap with existing routes or be better represented as multi-summit circuits.

| Candidate | Possible start/approach | Work needed before acceptance |
| --- | --- | --- |
| Via Goat's Water and Goat's Hawse | Walna Scar Road / Torver approaches | Identify exact published start and full ascent track; distinguish one-way ascent from circular walk |
| Via Brown Pike and Dow Crag | Torver / Walna Scar approaches | Establish whether published itinerary is a Coniston Old Man ascent or multi-summit circuit; measure complete itinerary |
| Via Lever's Water, Swirl How and Brim Fell | Coniston / Coppermines approaches | Confirm published start, ridge traversal, summit order and route statistics |
| Coniston Round | Multiple potential starts | Treat as a separate circular itinerary, not a short one-way summit ascent |

Do not add these to `ROUTE_STATS` or `ROUTE_VARIANTS` merely because an approach exists. Preserve original summit identities and all current records.

## Difficulty labels: proposed model, not yet assigned

A route-choice UI could offer **moderate**, **hard**, and **ungraded** filters, but avoid certifying an 'easy' mountain route based on distance alone. Difficulty should be reviewed against:

- total walking distance (clearly mark one-way vs return vs circuit), total ascent, estimated time and steepness;
- path clarity, exposure, scrambling, rocky terrain, navigation complexity and escape options;
- seasonal/weather limitations and whether the itinerary crosses other summits;
- provenance of each claim and a reviewer/date.

Use `ungraded` by default until route-specific evidence is reviewed. Do not infer difficulty from Valhalla distance or the presence of sampled guide points.

## Work order and acceptance criteria

1. **Coniston diagnosis:** compare each complete published line to generated geometry, not just four sampled points. Record start/end mismatch, detour locations, unsupported footpath sections, geometry length, and whether the router's network can represent the ascent. Keep original diagnostics reproducible.
2. **Candidate source audit:** for each additional approach, retain publisher, URL, scope, exact start, GPX/track provenance, statistics and hazards. Mark missing evidence explicitly. Never average incompatible sources.
3. **Data model:** introduce additive route-level metadata (difficulty, confidence, route type, provenance) without changing existing route IDs or current navigation permissions. Unknown values stay null/ungraded.
4. **UI:** add difficulty and start-point filtering only for evidence-backed entries. Label unverified lines and separate ascent-only from circular statistics.
5. **Safety and tests:** preserve all preview-only restrictions, navigation eligibility gates, source fixtures, 214 summit identities, distinct Harter Fells, and deterministic audit exports. Test filters and invalid/missing metadata; no live guidance without route verification.

### Review gate

Do not merge a new route, enable live guidance, or publish a definitive difficulty label until evidence and regression tests have been reviewed. This document itself changes no runtime behavior.
