#!/usr/bin/env node
'use strict';
// Convert saved Valhalla JSON responses to comparison-ready geometry.
// Usage: node scripts/prepare-coniston-valhalla.cjs response.json > generated.json
// Accepts {routes:[{name,published,trip:{legs:[{shape}]}}]} or
// {routes:[{name,published,shapes:[...]}]}. Published points must be
// complete, independently attributed [latitude,longitude] arrays.
const fs=require('node:fs');
function decodePolyline6(encoded){
 if(typeof encoded!=='string'||!encoded)throw Error('Missing encoded Valhalla shape');
 const points=[];let lat=0,lon=0,i=0;
 function value(){
  let shift=0,result=0;
  while(true){
   if(i>=encoded.length)throw Error('Truncated polyline');
   const v=encoded.charCodeAt(i++)-63;
   if(v<0||v>63||shift>30)throw Error('Invalid polyline');
   result+=(v&31)*2**shift;
   if(!(v&32))break;
   shift+=5;
  }
  return result%2 ? -(result+1)/2 : result/2;
 }
 while(i<encoded.length){
  lat+=value();lon+=value();
  const p=[lat/1e6,lon/1e6];
  if(Math.abs(p[0])>90||Math.abs(p[1])>180)throw Error('Decoded coordinate out of bounds');
  points.push(p);
 }
 if(points.length<2)throw Error('Decoded line too short');
 return points;
}
function prepare(item){
 const shapes=item.shapes??item.trip?.legs?.map(l=>l.shape);
 if(!Array.isArray(shapes)||!shapes.length)throw Error('No Valhalla legs for '+item.name);
 const generated=[];
 for(const shape of shapes){
  const points=decodePolyline6(shape);
  if(generated.length&&Math.abs(generated.at(-1)[0]-points[0][0])<1e-6&&Math.abs(generated.at(-1)[1]-points[0][1])<1e-6)points.shift();
  generated.push(...points);
 }
 return {name:item.name,published:item.published,generated};
}
function run(input){
 if(!Array.isArray(input.routes))throw Error('Expected routes array');
 return {routes:input.routes.map(prepare)};
}
if(require.main===module){
 try{if(process.argv.length!==3)throw Error('Usage: node scripts/prepare-coniston-valhalla.cjs response.json');
  console.log(JSON.stringify(run(JSON.parse(fs.readFileSync(process.argv[2],'utf8'))),null,2));
 }catch(e){console.error(e.message);process.exitCode=1;}
}
module.exports={decodePolyline6,prepare,run};
