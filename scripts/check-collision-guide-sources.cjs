// Optional read-only network reproduction; CI uses the committed coordinate snapshots.
const crypto=require('node:crypto');
const fs=require('node:fs');
const path=require('node:path');
function extractFirstTrack(html){
 const match=html.match(/trk\[t\]\.segments\.push\(\{\s*points\s*:\s*(\[.*?\])\s*\}\)/s);
 if(!match)throw Error('Published first track segment not found.');
 const points=JSON.parse(match[1]);
 if(!Array.isArray(points)||points.some(p=>!Array.isArray(p)||p.length<2||!Number.isFinite(p[0])||!Number.isFinite(p[1])||Math.abs(p[0])>90||Math.abs(p[1])>180))throw Error('Invalid publisher coordinates.');
 return points;
}
function checkSnapshot(fixture,bytes){
 const sha=crypto.createHash('sha256').update(bytes).digest('hex');
 if(sha!==fixture.sourceSha256)throw Error('Publisher bytes changed; review before refreshing the snapshot.');
 const points=extractFirstTrack(bytes.toString('utf8'));
 if(points.length!==fixture.trackPointCount)throw Error('Track point count changed.');
 if(JSON.stringify(points[0].slice(0,2))!==JSON.stringify(fixture.start))throw Error('Start differs from publisher vertex zero.');
 for(const p of fixture.guides)if(JSON.stringify(points[p.index]?.slice(0,2))!==JSON.stringify([p.lat,p.lon]))throw Error('Guide differs from publisher vertex '+p.index);
 return {source:fixture.source,pointCount:points.length,guides:fixture.guides.length,verified:'snapshot coordinates only; generated line remains unverified'};
}
async function main(){
 const fixtures=JSON.parse(fs.readFileSync(path.join(__dirname,'../tests/collision-guide-sources.json'),'utf8'));
 let index=0,failed=false;
 await Promise.all(Array.from({length:4},async()=>{while(index<fixtures.length){const f=fixtures[index++];try{const r=await fetch(f.source,{signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error('HTTP '+r.status);console.log(JSON.stringify(checkSnapshot(f,Buffer.from(await r.arrayBuffer()))));}catch(e){failed=true;console.error(f.source+': '+e.message);}}}));
 if(failed)process.exitCode=1;
}
if(require.main===module)main();
module.exports={extractFirstTrack,checkSnapshot};
