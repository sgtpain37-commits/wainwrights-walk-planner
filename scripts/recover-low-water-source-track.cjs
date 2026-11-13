#!/usr/bin/env node
// Diagnostic only: preserve publisher coordinates; never unlock navigation.
const fs = require('node:fs');
const url = 'https://www.wainwrightroutes.co.uk/conistonoldman-2_map.html';
function matching(s, start) {
  let depth=0, quote='', escaped=false;
  for(let i=start;i<s.length;i++){
    const c=s[i];
    if(quote){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c===quote)quote='';continue;}
    if(c==='"'||c==="'"||c==='`'){quote=c;continue;}
    if(c==='[')depth++;if(c===']'&&!--depth)return i;
  }
  throw new Error('Unclosed points array');
}
(async()=>{
  const response=await fetch(url,{headers:{'User-Agent':'WainwrightsWalkPlanner/1.0 source-track diagnostic'}});
  if(!response.ok)throw new Error('Source HTTP '+response.status);
  const html=await response.text();
  fs.mkdirSync('artifacts',{recursive:true});
  fs.writeFileSync('artifacts/low-water-source.html',html);
  const pattern=/segments\.push\(\s*\{\s*points\s*:\s*\[/g;
  const candidates=[];let match;
  while((match=pattern.exec(html))){
    const begin=html.indexOf('[',match.index);
    const end=matching(html,begin);
    const raw=html.slice(begin,end+1);
    try {
      const points=JSON.parse(raw);
      if(Array.isArray(points)&&points.length>1&&points.every(p=>Array.isArray(p)&&p.length>=2&&Number.isFinite(p[0])&&Number.isFinite(p[1]))){
        candidates.push({offset:match.index,points});
      }
    } catch(e) { console.error('Candidate parse failed at offset',match.index,e.message); }
  }
  const manifest={url,retrievedAt:new Date().toISOString(),htmlBytes:Buffer.byteLength(html),candidateCount:candidates.length,candidates:candidates.map((x,i)=>({index:i,offset:x.offset,count:x.points.length,first:x.points[0],last:x.points.at(-1)}))};
  fs.writeFileSync('artifacts/manifest.json',JSON.stringify(manifest,null,2));
  if(!candidates.length)throw new Error('No valid embedded track arrays; inspect saved source HTML');
  // Documented provenance: first trk[t].segments.push({ points: [...] }) array.
  const points=candidates[0].points;
  const geojson={type:'FeatureCollection',features:[{type:'Feature',properties:{name:'Published Low Water source track — unverified reference only',source:url,retrievedAt:manifest.retrievedAt,sourceArrayIndex:0,pointCount:points.length,NOT_FOR_NAVIGATION:true},geometry:{type:'LineString',coordinates:points.map(p=>[p[1],p[0],...(Number.isFinite(p[2])?[p[2]]:[])])}}]};
  fs.writeFileSync('artifacts/low-water-publisher-track.geojson',JSON.stringify(geojson,null,2));
  fs.writeFileSync('artifacts/low-water-publisher-track.json',JSON.stringify(points));
  console.log(JSON.stringify(manifest,null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
