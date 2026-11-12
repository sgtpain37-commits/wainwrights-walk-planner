// No network lookup: identical fallback queries are reported separately from known coordinates.
const fs=require('node:fs');
const {loadRouting}=require('../tests/load-routing.cjs');
const html=process.argv[2]?fs.readFileSync(process.argv[2],'utf8'):undefined;
const {run}=loadRouting({},html);
const groups=run(`Object.keys({...ROUTE_STATS,...ROUTE_VARIANTS}).flatMap(fell=>{
 const groups=new Map();
 for(const r of routeVariantsFor({name:fell})){
  const start=embeddedStartFor(r.route,fell);
  const key=JSON.stringify([start?[start.lat,start.lon]:normPlace(routeStartText(r.route)),routeViaPoints(r.route,fell).map(p=>[p.lat,p.lon])]);
  if(!groups.has(key))groups.set(key,{fell,start:start?[start.lat,start.lon]:routeStartText(r.route),resolution:start?'embedded coordinates':'same fallback geocode query',guides:routeViaPoints(r.route,fell).length,routes:[]});
  groups.get(key).routes.push(r.route);
 }
 return [...groups.values()].filter(g=>g.routes.length>1);
})`);
process.stdout.write(JSON.stringify(groups,null,2)+'\n');
