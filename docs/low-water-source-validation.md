# Low Water publisher-track validation (reference only)

The diagnostic added in PR #21 exports `low-water-publisher-track.json` from the first embedded segment in [the publisher's map](https://www.wainwrightroutes.co.uk/conistonoldman-2_map.html).

After downloading the GitHub Actions artifact, run:

```sh
node scripts/validate-low-water-publisher-track.cjs low-water-publisher-track.json
```

The script checks the publisher track's geometry, 2-mile length, approximate proximity to the Low Water tarn geotag (54.37444, -3.11750), source start and summit, and the discrepancy with the previous planner start (54.370700, -3.075700). Tarn proximity is a coarse QA signal, not proof of a traversable footpath.

**Evidence from the recovered 2026-11-13 artifact:** 71 track vertices; ~3.15 km / 1.96 mi; first coordinate 54.3636831,-3.0961275; last 54.3707086,-3.1214905; closest sampled vertex to the independent tarn geotag ~68 m. These findings support the *publisher's* line, not Valhalla's 9.91-mi generated line.

**Safety and rights:** The script does not modify app routing, publish the publisher's complete coordinates, or enable live guidance. Before embedding the full track in the app, check the publisher's reuse permission/terms and independent route safety, continuity, footpath access, terrain, and field/device behaviour. Keep the Low Water guidance restriction until verified. Related: #20.
