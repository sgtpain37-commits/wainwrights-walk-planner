const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {loadRouting}=require('./load-routing.cjs');
const audit=require('../docs/wainwrights-audit.v1.json');
const {run}=loadRouting();
const plain=x=>JSON.parse(JSON.stringify(x));
const routes=name=>plain(run(`routeVariantsFor({name:${JSON.stringify(name)}})`));
const cases=[
 ['Harter Fell (Eskdale)','Harter Fell (Mardale)','Harter Fell','From Birks Bridge via the south west face',3,1700,'2h 05m'],
 ['High Pike (Scandale)','High Pike (Caldbeck)','High Pike','From Ambleside via High Sweden Bridge',3.3,2080,'2h 15m'],
 ['Tarn Crag (Easedale)','Tarn Crag (Sleddale)','Tarn Crag','From Grasmere via the east ridge',3.2,1720,'2h 05m']
];
test('three qualified summit identities resolve only their supported existing approach',()=>{
 for(const [name,other,key,route,miles,ascentFt,time] of cases){
  assert.deepEqual(routes(name),[{route,miles,ascentFt,time}]);assert.deepEqual(routes(name),routes(key));assert.deepEqual(routes(other),[]);
  assert.deepEqual(plain(run(`routeStatsFor({name:${JSON.stringify(name)}})`)),{route,miles,ascentFt,time});
  assert.equal(run(`routeStatsFor({name:${JSON.stringify(other)}})`),null);
  const target=audit.summits.find(s=>s.name===name),excluded=audit.summits.find(s=>s.name===other);
  assert.equal(target.association.status,'associated');assert.equal(target.association.proposedCorrection,null);
  assert.equal(excluded.association.status,'missing_route_record');assert.deepEqual(excluded.ascents,[]);
  assert.notEqual(target.id,excluded.id);assert.notDeepEqual(target.catalogue,excluded.catalogue);
 }
});
test('only these three catalogue lookups change; no route records or navigation helpers change',()=>{
 const aliases=plain(run('ROUTE_ALIASES'));for(const [name] of cases)delete aliases[name];
 const html=fs.readFileSync('index.html','utf8');const old=loadRouting({},html.replace(/const ROUTE_ALIASES=\{[\s\S]*?\};/,'const ROUTE_ALIASES='+JSON.stringify(aliases)+';'));
 const changed=audit.summits.filter(s=>JSON.stringify(routes(s.name))!==JSON.stringify(plain(old.run(`routeVariantsFor({name:${JSON.stringify(s.name)}})`)))).map(s=>s.name);
 assert.deepEqual(changed.sort(),cases.map(c=>c[0]).sort());
 for(const constant of ['ROUTE_STATS','ROUTE_VARIANTS','ROUTE_STARTS','ROUTE_WAYPOINTS','ROUTE_GUIDE_SOURCES'])assert.deepEqual(plain(run(constant)),plain(old.run(constant)));
 for(const [name,other,,route] of cases){assert.ok(run(`routeStatsHTML({name:${JSON.stringify(name)}})`).includes(route));assert.match(run(`routeStatsHTML({name:${JSON.stringify(other)}})`),/statistics not loaded/);}
});
test('location qualifiers cannot be dropped or reassigned to unseen same-name mountains',()=>{
 for(const name of ['Harter Fell (Other)','High Pike (Other)','Tarn Crag (Other)','Harter Fell (Mardale) (Eskdale)','High Pike (Caldbeck) (Scandale)','Tarn Crag (Sleddale) (Easedale)'])assert.deepEqual(routes(name),[]);
});
