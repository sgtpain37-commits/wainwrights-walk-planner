const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {loadRouting}=require('./load-routing.cjs');
const audit=require('../docs/wainwrights-audit.v1.json');
const {run}=loadRouting();
const plain=x=>JSON.parse(JSON.stringify(x));
const routes=name=>plain(run(`routeVariantsFor({name:${JSON.stringify(name)}})`));
const fixes=[
 ['Catstye Cam','Catstycam',2,'From Glenridding via the north west ridge'],
 ['Haystacks (Buttermere)','Haystacks',1,'From Gatescarth via Warnscale'],
 ['Pike of Blisco',"Pike o' Blisco",1,'From the ODG Hotel via Redacre Gill'],
 ['Pike of Stickle',"Pike o' Stickle",1,'From the ODG Hotel via Troughton Beck'],
 ['St Sunday Crag','St. Sunday Crag',1,'From Bridgend via the east ridge'],
 ['The Old Man of Coniston (Coniston Old Man)','Coniston Old Man',5,'From Coniston (fell gate) via the south ridge']
];
test('six catalogue names expose the complete existing ascent choices and single-route statistics',()=>{
 for(const [name,key,count,first] of fixes){
  const actual=routes(name);assert.equal(actual.length,count,name);assert.equal(actual[0].route,first,name);
  assert.deepEqual(actual,routes(key),name);
  assert.deepEqual(plain(run(`routeStatsFor({name:${JSON.stringify(name)}})`)),plain(run(`routeStatsFor({name:${JSON.stringify(key)}})`)));
  const summit=audit.summits.find(s=>s.name===name);assert.equal(summit.association.status,'associated');assert.equal(summit.association.proposedCorrection,null);
 }
});
test('alias-only correction changes lookup for exactly six catalogue identities, with route data unchanged',()=>{
 const html=fs.readFileSync('index.html','utf8');
 const aliases=plain(run('ROUTE_ALIASES'));
 for(const [name] of fixes)delete aliases[name];
 const baseline=html.replace(/const ROUTE_ALIASES=\{[\s\S]*?\};/, 'const ROUTE_ALIASES='+JSON.stringify(aliases)+';');
 const old=loadRouting({},baseline);
 const changed=audit.summits.filter(s=>JSON.stringify(routes(s.name))!==JSON.stringify(plain(old.run(`routeVariantsFor({name:${JSON.stringify(s.name)}})`)))).map(s=>s.name);
 assert.deepEqual(changed.sort(),fixes.map(f=>f[0]).sort());
 for(const constant of ['ROUTE_STATS','ROUTE_VARIANTS','ROUTE_STARTS','ROUTE_WAYPOINTS','ROUTE_GUIDE_SOURCES']) assert.deepEqual(plain(run(constant)),plain(old.run(constant)),constant);
 for(const name of ['Coniston Old Man','Old Man of Coniston','The Old Man of Coniston'])assert.deepEqual(routes(name),routes(fixes[5][0]));
});
test('qualified mountains and unreviewed spellings never inherit an ascent by fuzzy matching',()=>{
 for(const name of ['Harter Fell (Mardale)','High Pike (Caldbeck)','Tarn Crag (Sleddale)','Haystacks (Other)','Catstye Cam (Other)','Pike of Blisco (Other)']) assert.deepEqual(routes(name),[],name);
 const identities=audit.summits.filter(s=>/^(Harter Fell|High Pike|Tarn Crag|Red Pike) \(/.test(s.name));
 assert.equal(new Set(identities.map(s=>s.id)).size,identities.length);
});
test('corrected names render ascent pickers/details instead of the missing-route message',()=>{
 for(const [name,,count,first] of fixes){const html=run(`routeStatsHTML({name:${JSON.stringify(name)}})`);assert.doesNotMatch(html,/statistics not loaded/);assert.ok(html.includes(first));if(count>1)assert.match(html,new RegExp(count+' published options'));}
});
