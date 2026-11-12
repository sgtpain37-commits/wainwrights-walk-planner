# Low Water Valhalla waypoint snap investigation — 12 November 2026

Source: user-provided `low-water-waypoint-isolation.zip`, produced by the manually triggered diagnostic workflow. The source ZIP remains outside the repository. This report contains measured summary observations only.

## Captured distances

| Experiment | Valhalla km | Approx. miles |
| --- | ---: | ---: |
| All guides | 15.947 | 9.91 |
| No guides | 2.716 | 1.69 |
| Omit guide 1 | 14.035 | 8.72 |
| Omit guide 2 | 9.772 | 6.07 |
| Omit guide 3 | 15.947 | 9.91 |
| Omit guide 4 | 15.947 | 9.91 |

## Nearest decoded route vertex to each requested guide (all-guides run)

| Guide | Requested coordinates (lat, lon) | Approx. nearest route vertex |
| --- | --- | ---: |
| 1 | 54.3733835, -3.1029081 | 6 m |
| 2 | 54.3728835, -3.1100750 | 316 m |
| 3 | 54.3742584, -3.1163406 | 392 m |
| 4 | 54.3724836, -3.1184006 | 181 m |

Distances use a local planar approximation and nearest *decoded vertices*, not Valhalla's internal snapped locations or exact segment projections. Nevertheless, the hundreds-of-metres separations for guides 2–4 warrant investigation. In particular, **the routed geometry does not closely approach those requested coordinates**, despite their inclusion in the request. This may be caused by Valhalla snapping to distant mapped ways, routing graph connectivity, or request settings; it is not proof of which one.

## Next controlled experiment

- Request all combinations of the four guide waypoints (16 subsets), keeping start, summit and pedestrian settings unchanged.
- Record the original requested waypoint coordinates, returned route length, geometry, and per-waypoint nearest route-line separation.
- Inspect whether a specific guide causes a large length jump when introduced to another subset.
- Independently verify the actual published ascent path and access rights before proposing replacement guide points.
- Keep live navigation blocked on severe discrepancies. No generated line is verified for walking.
