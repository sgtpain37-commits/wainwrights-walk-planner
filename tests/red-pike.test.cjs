const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');
const {loadRouting}=require('./load-routing.cjs');const fixtures=require('./red-pike-sources.json');const audit=require('../docs/wainwrights-audit.v1.json');
const {checkSnapshot}=require('../scripts/check-collision-guide-sources.cjs');const plain=x=>JSON.parse(JSON.stringify(x));
test('each qualified Red Pike resolves its own exact published figures and source-backed inputs',()=>{
 const {run}=loadRouting();
 for(const f of fixtures){const r=JSON.stringify(f.route),n=JSON.stringify(f.fell);const expected={route:f.route,miles:f.miles,ascentFt:f.ascentFt,time:f.time};
 assert.deepEqual(plain(run(`routeVariantsFor({name:${n}})`)),[expected]);assert.deepEqual(plain(run(`routeStatsFor({name:${n}})`)),expected);
 assert.deepEqual(plain(run(`scopedRouteInput(${r},${n}).start`)),f.start);
 assert.deepEqual(plain(run(`routeViaPoints(${r},${n})`)).map(p=>[p.lat,p.lon]),f.guides.map(p=>[p.lat,p.lon]));
 const other=fixtures.find(x=>x!==f);assert.equal(run(`scopedRouteInput(${r},${JSON.stringify(other.fell)})`),null);
 const s=audit.summits.find(s=>s.name===f.fell),a=s.ascents[0];assert.equal(a.published.statisticsSource.url,f.statisticsSource);assert.equal(a.start.verification,'source_backed_coordinates');assert.equal(a.generatedWalkingLine.verification,'unverified');assert.equal(a.generatedWalkingLine.geometry,null);
 assert.match(run(`routeMappingNotice(${r},${n})`),/Live guidance is restricted/);
 assert.ok(run(`routeStatsHTML({name:${n}})`).includes(String(f.miles)+' miles'));
 }
 const ss=fixtures.map(f=>audit.summits.find(s=>s.name===f.fell));assert.notEqual(ss[0].id,ss[1].id);assert.notEqual(ss[0].catalogue.latitude,ss[1].catalogue.latitude);assert.notEqual(ss[0].catalogue.longitude,ss[1].catalogue.longitude);
 for(const n of ['Red Pike','Red Pike (Other)','Red Pike (Wasdale) (Buttermere)'])assert.deepEqual(plain(run(`routeVariantsFor({name:${JSON.stringify(n)}})`)),[]);
});
test('only the two Red Pike catalogue lookups change against the pre-addition data',()=>{
 let html=fs.readFileSync('index.html','utf8');const {run}=loadRouting();const stats=plain(run('ROUTE_STATS')),inputs=plain(run('ROUTE_SCOPED_INPUTS'));
 for(const f of fixtures){delete stats[f.fell];delete inputs[f.fell];}
 html=html.replace(/const ROUTE_STATS=\{[^\n]+/, 'const ROUTE_STATS='+JSON.stringify(stats)+';').replace(/const ROUTE_SCOPED_INPUTS=\{[^\n]+/,'const ROUTE_SCOPED_INPUTS='+JSON.stringify(inputs)+';');const old=loadRouting({},html);
 const changed=audit.summits.filter(s=>{const e=`routeVariantsFor({name:${JSON.stringify(s.name)}})`;return JSON.stringify(run(e))!==JSON.stringify(old.run(e));}).map(s=>s.name);
 assert.deepEqual(changed.sort(),fixtures.map(f=>f.fell).sort());
 for(const key of ['ROUTE_VARIANTS','ROUTE_STARTS','ROUTE_WAYPOINTS','ROUTE_GUIDE_SOURCES'])assert.deepEqual(plain(run(key)),plain(old.run(key)));
});
