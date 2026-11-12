const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {loadRouting}=require('./load-routing.cjs');
const audit=require('../docs/wainwrights-audit.v1.json');
const evidence=require('../data/audit/remaining-name-evidence.json');
const {run}=loadRouting();const plain=x=>JSON.parse(JSON.stringify(x));
const routes=name=>plain(run(`routeVariantsFor({name:${JSON.stringify(name)}})`));
test('25 individually reviewed catalogue identities resolve all 27 existing ascent choices',()=>{
 assert.equal(evidence.records.length,25);let count=0;
 for(const r of evidence.records){
  const s=audit.summits.find(s=>s.name===r.name);assert.ok(s,r.name);assert.equal(s.catalogue.gridReference,r.catalogueGrid);
  assert.equal(s.association.status,'associated');assert.equal(s.association.routeKey,r.routeKey);assert.equal(s.association.proposedCorrection,null);
  const actual=routes(r.name);assert.equal(actual.length,r.ascentCount,r.name);count+=actual.length;assert.deepEqual(actual,routes(r.routeKey));
  assert.deepEqual(plain(run(`routeStatsFor({name:${JSON.stringify(r.name)}})`)),plain(run(`routeStatsFor({name:${JSON.stringify(r.routeKey)}})`)));
  const rendered=run(`routeStatsHTML({name:${JSON.stringify(r.name)}})`);assert.ok(rendered.includes(actual[0].route));assert.doesNotMatch(rendered,/statistics not loaded/);
  assert.ok(r.sources.every(url=>url.startsWith('https://')));assert.ok(r.identityEvidence.length>30);
 }assert.equal(count,27);
});
test('raw Blencathra catalogue name and its displayed name both select the Hallsfell approach',()=>{
 const raw='Blencathra-Hallsfell Top';const display=run(`cleanName(${JSON.stringify(raw)})`);assert.equal(display,'Blencathra — Hallsfell Top');
 assert.equal(routes(raw)[0].route,"From Scales via Hall's Fell");assert.deepEqual(routes(display),routes(raw));
 assert.equal(run(`routeKey('Baystones (Wansfell)')`),'Baystones (Wansfell)');
});
test('only the 25 reviewed catalogue lookups change; existing route constants are preserved',()=>{
 const aliases=plain(run('ROUTE_ALIASES'));for(const r of evidence.records)delete aliases[run(`routeKey(${JSON.stringify(r.name)})`)];
 const html=fs.readFileSync('index.html','utf8');const old=loadRouting({},html.replace(/const ROUTE_ALIASES=\{[\s\S]*?\};/,'const ROUTE_ALIASES='+JSON.stringify(aliases)+';'));
 const changed=audit.summits.filter(s=>JSON.stringify(routes(s.name))!==JSON.stringify(plain(old.run(`routeVariantsFor({name:${JSON.stringify(s.name)}})`)))).map(s=>s.name);
 assert.deepEqual(changed.sort(),evidence.records.map(r=>r.name).sort());
 for(const constant of ['ROUTE_STATS','ROUTE_VARIANTS','ROUTE_STARTS','ROUTE_WAYPOINTS','ROUTE_GUIDE_SOURCES'])assert.deepEqual(plain(run(constant)),plain(old.run(constant)));
});
test('remaining missing records and neighbouring or alternative tops never inherit an invented route',()=>{
 const missing=audit.summits.filter(s=>s.association.status==='missing_route_record');assert.equal(missing.length,15);
 for(const s of missing)assert.deepEqual(routes(s.name),[],s.name);
 for(const name of ['Brown How','Angletarn Pikes (South Top)','Whiteside (East Top)','Whinlatter (Other)','Wansfell Pike','High Crag (Other)','The Knott (Other)'])assert.deepEqual(routes(name),[],name);
 assert.notDeepEqual(routes('The Knott (High Street)'),routes('Knott'));
 assert.equal(new Set(audit.summits.map(s=>s.id)).size,214);
 assert.deepEqual(audit.summary,{summits:214,associated:199,namingMismatches:0,missingRouteRecords:15,publishedAscents:243,unresolvedCollisionPairs:0});
});
