#!/usr/bin/env node
// Offline, non-navigation QA of the publisher track recovered by the manual diagnostic.
// Usage: node scripts/validate-low-water-publisher-track.cjs path/to/low-water-publisher-track.json
const fs=require('node:fs');
const assert=require('node:assert/strict');
const file=process.argv[2];
if(!file){console.error('Usage: node scripts/validate-low-water-publisher-track.cjs <publisher-track.json>');process.exit(2)}
const points=JSON.parse(fs.readFileSync(file,'utf8'));
const rad=Math.PI/180,R=6371000;
function metres(a,b){const dLat=(b[0]-a[0])*rad,dLon=(b[1]-a[1])*rad;const q=Math.sin(dLat/2)**2+Math.cos(a[0]*rad)*Math.cos(b[0]*rad)*Math.sin(dLon/2)**2;return 2*R*Math.asin(Math.min(1,Math.sqrt(q)))}
assert(Array.isArray(points)&&points.length>=60,'Publisher track should have at least 60 points');
for(const p of points)assert(Array.isArray(p)&&p.length>=2&&p.slice(0,2).every(Number.isFinite),'Malformed coordinate');
const length=points.slice(1).reduce((sum,p,i)=>sum+metres(points[i],p),0);
const tarn=[54.37444,-3.11750]; // approximate independent geotag, not a path waypoint
const tarnDistance=Math.min(...points.map(p=>metres(p,tarn)));
const startDistance=metres(points[0],[54.3636831,-3.0961275]);
const summitDistance=metres(points.at(-1),[54.3707086,-3.1214905]);
const plannerOldStartDistance=metres(points[0],[54.370700,-3.075700]);
const summary={pointCount:points.length,lengthMetres:Math.round(length),lengthMiles:Number((length/1609.344).toFixed(3)),tarnNearestVertexMetres:Math.round(tarnDistance),startDistanceMetres:Math.round(startDistance),summitDistanceMetres:Math.round(summitDistance),oldPlannerStartDisplacementMetres:Math.round(plannerOldStartDistance),referenceOnly:true};
console.log(JSON.stringify(summary,null,2));
assert(length>2900&&length<3400,'Length outside expected published 2-mile ascent');
assert(tarnDistance<150,'Track does not approach independently documented Low Water tarn location');
assert(startDistance<50&&summitDistance<50,'Source start or summit endpoint changed');
assert(plannerOldStartDistance>1000,'Previously recorded planner start discrepancy unexpectedly absent');
console.log('PASS: publisher track geometry checks; NOT verified for live navigation.');
