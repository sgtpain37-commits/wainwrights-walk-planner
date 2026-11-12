#!/usr/bin/env node
'use strict';
// Offline comparison of a Valhalla encoded route and an attributed publisher track.
// Input JSON: {routes:[{name,published:[[lat,lon],...],generated:[[lat,lon],...]}]}
// No external dependencies; coordinates must be [latitude, longitude] in degrees.
const fs=require('node:fs');
const R=6371008.8;
function valid(p){return Array.isArray(p)&&p.length>=2&&p.slice(0,2).every(Number.isFinite)&&Math.abs(p[0])<=90&&Math.abs(p[1])<=180;}
function rad(x){return x*Math.PI/180;}
function distance(a,b){
 const dlat=rad(b[0]-a[0]),dlon=rad(b[1]-a[1]);
 const h=Math.sin(dlat/2)**2+Math.cos(rad(a[0]))*Math.cos(rad(b[0]))*Math.sin(dlon/2)**2;
 return 2*R*Math.asin(Math.min(1,Math.sqrt(h)));
}
function length(line){return line.slice(1).reduce((sum,p,i)=>sum+distance(line[i],p),0);}
function nearestPointOnSegment(p,a,b){
 // Equirectangular local projection, adequate for short mountain-track segments.
 const phi=rad(p[0]); const x=q=>R*rad(q[1]-p[1])*Math.cos(phi);
 const y=q=>R*rad(q[0]-p[0]);
 const ax=x(a),ay=y(a),bx=x(b),by=y(b),dx=bx-ax,dy=by-ay;
 const t=Math.max(0,Math.min(1,-(ax*dx+ay*dy)/(dx*dx+dy*dy||1)));
 return Math.hypot(ax+t*dx,ay+t*dy);
}
function separation(p,line){let best=Infinity;for(let i=1;i<line.length;i++)best=Math.min(best,nearestPointOnSegment(p,line[i-1],line[i]));return best;}
function compare(item){
 const {name,published,generated}=item;
 if(typeof name!=='string'||!name.trim())throw Error('Missing route name');
 for(const [label,line] of [['published',published],['generated',generated]]){
  if(!Array.isArray(line)||line.length<2||!line.every(valid))throw Error(name+': invalid '+label+' track');
 }
 const deviations=generated.map((p,index)=>({index,metres:Math.round(separation(p,published))}));
 const worst=deviations.reduce((a,b)=>a.metres>=b.metres?a:b);
 const thresholdMetres=100;
 const excursionRuns=[];let open=null;
 for(const d of deviations){if(d.metres>thresholdMetres){if(!open)open={startIndex:d.index,endIndex:d.index,maximumMetres:d.metres};else{open.endIndex=d.index;open.maximumMetres=Math.max(open.maximumMetres,d.metres);}}else if(open){excursionRuns.push(open);open=null;}}
 if(open)excursionRuns.push(open);
 return {name,publishedMetres:Math.round(length(published)),generatedMetres:Math.round(length(generated)),
  startOffsetMetres:Math.round(distance(published[0],generated[0])),
  endOffsetMetres:Math.round(distance(published.at(-1),generated.at(-1))),
  maxGeneratedVertexSeparationMetres:worst.metres,maxSeparationVertexIndex:worst.index,
  excursionThresholdMetres:thresholdMetres,excursionRuns,deviations,interpretation:'Diagnostic only: vertex-to-segment separation is not route verification'};
}
function run(file){const input=JSON.parse(fs.readFileSync(file,'utf8'));if(!Array.isArray(input.routes))throw Error('Expected routes array');return input.routes.map(compare);}
if(require.main===module){try{if(process.argv.length!==3)throw Error('Usage: node scripts/compare-coniston-tracks.cjs path/to/tracks.json');console.log(JSON.stringify({results:run(process.argv[2])},null,2));}catch(e){console.error(e.message);process.exitCode=1;}}
module.exports={compare,distance,length,separation};
