#!/usr/bin/env node
'use strict';
// Research-only GPX geometry audit. This does NOT verify rights of way or footpath alignment.
// Usage: node scripts/check-gowbarrow-gpx.cjs path/to/track.gpx
const fs=require('node:fs');
const path=process.argv[2];
if(!path){console.error('Usage: node scripts/check-gowbarrow-gpx.cjs <track.gpx>');process.exit(2);}
const xml=fs.readFileSync(path,'utf8');
const points=[...xml.matchAll(/<(?:[A-Za-z_][\w.-]*:)?trkpt\b([^>]*?)(?:\/>|>)/g)].map(match=>{
 const attrs=match[1];
 const lat=/\blat=["']([^"']+)["']/.exec(attrs);
 const lon=/\blon=["']([^"']+)["']/.exec(attrs);
 return lat&&lon?{lat:Number(lat[1]),lon:Number(lon[1])}:null;
}).filter(Boolean);
if(points.length<2||points.some(p=>!Number.isFinite(p.lat)||!Number.isFinite(p.lon))){console.error('No usable GPX track points found');process.exit(2);}
const rad=x=>x*Math.PI/180;
const metres=(a,b)=>{
 const dLat=rad(b.lat-a.lat),dLon=rad(b.lon-a.lon);
 const q=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLon/2)**2;
 return 6371000*2*Math.atan2(Math.sqrt(q),Math.sqrt(1-q));
};
const summit={lat:54.58811,lon:-2.918201};
const legs=points.slice(1).map((p,i)=>({from:i+1,to:i+2,metres:metres(points[i],p)}));
const total=legs.reduce((sum,l)=>sum+l.metres,0);
const nearest=points.map((p,i)=>({point:i+1,metres:metres(p,summit)})).sort((a,b)=>a.metres-b.metres)[0];
const longest=[...legs].sort((a,b)=>b.metres-a.metres).slice(0,8);
const result={source:path,trackPoints:points.length,polylineKm:+(total/1000).toFixed(3),polylineMiles:+(total/1609.344).toFixed(3),closureMetres:+metres(points[0],points.at(-1)).toFixed(1),nearestSummitPoint:nearest.point,nearestSummitMetres:+nearest.metres.toFixed(1),segmentsOver150m:legs.filter(l=>l.metres>150).length,segmentsOver250m:legs.filter(l=>l.metres>250).length,longestSegments:longest.map(l=>({...l,metres:+l.metres.toFixed(1)})),verifiedFootpathAlignment:false,liveGuidanceSafe:false};
console.log(JSON.stringify(result,null,2));
