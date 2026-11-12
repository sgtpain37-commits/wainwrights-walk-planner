#!/usr/bin/env node
'use strict';
// Extract GPX track points for offline diagnostics; not navigation verification.
const fs=require('node:fs');
function parseGpx(xml){
 if(typeof xml!=='string'||!/<(?:[\w-]+:)?gpx\b/i.test(xml))throw Error('Not a GPX document');
 const segments=[];
 const segmentPattern=/<(?:[\w-]+:)?trkseg\b[^>]*>([\s\S]*?)<\/(?:[\w-]+:)?trkseg\s*>/gi;
 for(const segment of xml.matchAll(segmentPattern)){
  const points=[];
  const pointPattern=/<(?:[\w-]+:)?trkpt\b([^>]*?)(?:\/>|>(?:[\s\S]*?)<\/(?:[\w-]+:)?trkpt\s*>)/gi;
  for(const point of segment[1].matchAll(pointPattern)){
   const attrs=point[1];
   const lat=/\blat\s*=\s*["']([^"']+)["']/i.exec(attrs);
   const lon=/\blon\s*=\s*["']([^"']+)["']/i.exec(attrs);
   if(!lat||!lon)throw Error('GPX track point missing coordinates');
   const a=Number(lat[1]),b=Number(lon[1]);
   if(!Number.isFinite(a)||!Number.isFinite(b)||Math.abs(a)>90||Math.abs(b)>180)throw Error('Invalid GPX coordinate');
   points.push([a,b]);
  }
  if(points.length<2)throw Error('GPX track segment has fewer than two points');
  segments.push(points);
 }
 if(!segments.length)throw Error('No complete GPX track segments found');
 if(segments.length!==1)throw Error('Multiple GPX track segments: inspect gaps before comparison');
 return segments[0];
}
if(require.main===module){
 try{
  if(process.argv.length!==4)throw Error('Usage: node scripts/import-coniston-gpx.cjs file.gpx "Route name"');
  const published=parseGpx(fs.readFileSync(process.argv[2],'utf8'));
  console.log(JSON.stringify({routes:[{name:process.argv[3],published,generated:null}]},null,2));
 }catch(e){console.error(e.message);process.exitCode=1;}
}
module.exports={parseGpx};
