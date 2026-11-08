// Optional diagnostic; successful/different responses do not verify the published mountain path.
const {loadRouting}=require('../tests/load-routing.cjs');
const {run}=loadRouting();
(async()=>{
 for(const fixture of require('../tests/coniston-guide-sources.json')){
  const route=JSON.stringify(fixture.route);
  const payload=run(`buildWalkingRequest(embeddedStartFor(${route}),routeViaPoints(${route}),{lat:54.37066,lon:-3.12145})`);
  try{
   const response=await fetch('https://valhalla1.openstreetmap.de/route',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});
   if(!response.ok)throw Error('HTTP '+response.status);
   const data=await response.json();
   console.log(JSON.stringify({route:fixture.route,summary:data.trip?.summary,shapes:data.trip?.legs?.map(l=>l.shape),verification:'Unverified generated line'}));
  }catch(error){console.error(fixture.route+': '+error.message);process.exitCode=1;}
 }
})();
