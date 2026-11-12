# Companion audit dashboard

The proposed buildless dashboard lives at `audit/index.html`. Serve the repository over HTTP (for example `python3 -m http.server 8000`, then open `http://localhost:8000/audit/`). It reads `../docs/wainwrights-audit.v1.json` with no build dependencies. It has no deployment workflow, planner changes, GPS, routing calls or service-worker registration. When an approved main-branch merge is later published by the existing Pages configuration, the companion path can be served alongside the planner. To host on a separate origin, copy `audit/` and `docs/wainwrights-audit.v1.json` preserving those paths; that also avoids inheriting the planner's existing root service worker. No service worker is changed or unregistered here.

## Use

- Browse all summit identities, search names/aliases/starts, and filter association, evidence state or summit review status. Evidence filters mean “has at least one matching ascent”, not “all ascents verified”. Source-backed sampled guides and unverified full walking lines are distinct.
- Select up to two published ascents for comparison. Ordered coordinate tables show starts, fallbacks, guide evidence, source references and evidence gaps. Distances are existing published one-way-to-summit figures, not generated or return-route estimates.
- Open Routing collisions to inspect all original collision inputs and linked ascent details. Five pairs share coordinates and five share fallback queries; unresolved queries are not asserted to be identical real-world points.
- Save review status, proposed corrections, evidence and a PR URL for a summit, ascent or collision. Reviews are browser-local under `wainwrights-audit-reviews-v1`; they are not GitHub commits and are not shared automatically across devices. Storage failures are shown. Export JSON backups regularly.
- PR URLs are clickable. Saved URLs in this repository offer an explicit public GitHub API status check. A rate limit, offline browser or unavailable API shows an error and preserves the link. Merge status is checked at request time and never automatically marks a local review merged. After saving a new PR URL, reopen the record or reload to see its status-check control.
- Export JSON contains only reviews plus audit provenance, never modified summit data. The Markdown checklist is a readable view of those review records; it is not a substitute for the full JSON backup.
- Import reviews to merge nonconflicting records. If an ID already has different content, the entire import is rejected without overwriting any existing record. Reconcile conflicts deliberately in a backup; export the existing backup first. No fuzzy matching, timestamp guessing or silent overwrite occurs.
- Load audit JSON to replace the in-memory catalogue. Compatible 1.x exports are accepted; unsupported major versions and structurally invalid files are rejected. Existing review records remain. Removed or renamed IDs are shown in Review records as needing reconciliation, including in checklist exports. The bundled data file itself is never overwritten. A page reload returns to the repository's bundled export.

## Validation

Run `node --test tests/*.test.cjs`, `node scripts/export-route-audit.cjs --check`, and compare `node scripts/audit-route-locations.cjs` output with `docs/route-location-collisions.json`. Dashboard tests run automatically in the existing Route mapping tests workflow, which already runs all `tests/*.test.cjs` files. No deployment or workflow files are added.

Browser QA covers catalogue load/counts, qualified Harter Fell identity separation, a saved annotation surviving reload, ascent comparison and collision rendering. The stylesheet switches to stacked filters and single-column comparisons on small screens; tables scroll within their cards. The dashboard uses text nodes for imported strings and permits only HTTP(S) source links.
