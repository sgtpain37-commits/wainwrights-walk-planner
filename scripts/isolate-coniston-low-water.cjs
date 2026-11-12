#!/usr/bin/env node
'use strict';
// Research-only experiment: isolate which guide waypoint may induce detours.
// No changes to route catalogues, safety gates, or navigation eligibility.
const {loadRouting}=require('../tests/load-routing.cjs');
const {run}=loadRouting();
const route='From Coniston (fell gate) via Low Water';
const summit={lat:54.37066,lon:-3.12145};
const guides=run('routeViaPoints('+JSON.stringify(route)+')');
const variants=[
 {id:'all-guides',omit:null},
 {id:'no-guides',omit:'all'},
 ...Array.from({length:guides.length},(_,i)=>({id:'omit-guide-'+(i+1),omit:i}))
];
async function capture(variant){
 const via=variant.omit==='all'?[]:variant.omit===null?guides:guides.filter((_,i)=>i!==variant.omit);
 const payload=run('buildWalkingRequest(embeddedStartFor('+JSON.stringify(route)+'),'+JSON.stringify(via)+','+JSON.stringify(summit)+')');
 const response=await fetch('https://valhalla1.openstreetmap.de/route',{
  method:'POST',headers:{'Content-Type':'application/json'},
  body:JSON.stringify(payload),signal:AbortSignal.timeout(20000)
 });
 if(!response.ok)throw Error('HTTP '+response.status);
 const data=await response.json();
 if(!data.trip?.legs?.length)throw Error('No route legs');
 return {variant:variant.id,guideCount:via.length,summary:data.trip.summary,shapes:data.trip.legs.map(l=>l.shape),verification:'unverified_generated_route'};
}
(async()=>{
 for(const variant of variants){
  try{console.log(JSON.stringify(await capture(variant)));}
  catch(error){console.error(variant.id+': '+error.message);process.exitCode=1;}
 }
})();
