#!/usr/bin/env node
'use strict';
// Diagnostic only: test all guide waypoint subsets; never approve generated geometry.
const {loadRouting}=require('../tests/load-routing.cjs');
const {run}=loadRouting();
const route='From Coniston (fell gate) via Low Water';
const summit={lat:54.37066,lon:-3.12145};
const guides=run('routeViaPoints('+JSON.stringify(route)+')');
if(guides.length!==4)throw Error('Expected four Low Water guides; review fixture');
(async()=>{
 for(let mask=0;mask<16;mask++){
  const selected=guides.filter((_,i)=>mask&(1<<i));
  const payload=run('buildWalkingRequest(embeddedStartFor('+JSON.stringify(route)+'),'+JSON.stringify(selected)+','+JSON.stringify(summit)+')');
  try{
   const response=await fetch('https://valhalla1.openstreetmap.de/route',{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify(payload),signal:AbortSignal.timeout(20000)
   });
   if(!response.ok)throw Error('HTTP '+response.status);
   const data=await response.json();
   if(!data.trip?.legs?.length)throw Error('Missing legs');
   console.log(JSON.stringify({mask,selectedGuides:guides.map((_,i)=>i+1).filter((_,i)=>mask&(1<<i)),summary:data.trip.summary,shapes:data.trip.legs.map(l=>l.shape),verification:'unverified_generated_route'}));
  }catch(error){console.error('mask '+mask+': '+error.message);process.exitCode=1;}
 }
})();
