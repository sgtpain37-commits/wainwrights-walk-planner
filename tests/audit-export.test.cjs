const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {execFileSync}=require('node:child_process');
const {buildAudit,serialize,parseCSV}=require('../scripts/export-route-audit.cjs');
const {loadRouting}=require('./load-routing.cjs');
const audit=buildAudit();
const summit=n=>audit.summits.find(s=>s.name===n);
const plain=x=>JSON.parse(JSON.stringify(x));
test('export covers the pinned 214-summit catalogue exactly, including numeric coordinates',()=>{
 const rows=parseCSV(fs.readFileSync('data/audit/wainwrights.csv','utf8'));
 assert.equal(rows.length,214);
 assert.deepEqual(audit.summits.map(s=>s.name),rows.map(r=>r.name));
 assert.equal(new Set(audit.summits.map(s=>s.id)).size,214);
 for(const [i,s] of audit.summits.entries()){
  assert.equal(s.catalogue.latitude,Number(rows[i].latitude));
  assert.equal(s.catalogue.longitude,Number(rows[i].longitude));
 }
 assert.equal(audit.schemaVersion,'1.0.0');
});
test('CSV parser retains quoted commas, escaped quotes and embedded newlines',()=>{
 assert.deepEqual(parseCSV('a,b\r\n"x,y","a""b\nc"\r\n'),[{a:'x,y',b:'a"b\nc'}]);
 assert.throws(()=>parseCSV('a\n"broken'),/Unterminated/);
});
test('all associations and published statistics agree with planner data and explicit mappings',()=>{
 const {run}=loadRouting();const mappings=require('../data/audit/associations.json');
 for(const s of audit.summits){
  const current=plain(run(`routeVariantsFor({name:${JSON.stringify(s.name)}})`));
  assert.equal(s.association.plannerResolves,!!current.length);
  const expected=current.length?current:mappings[s.name]?plain(run(`routeVariantsFor({name:${JSON.stringify(mappings[s.name].routeKey)}})`)):[];
  assert.deepEqual(s.ascents.map(a=>{const {statisticsSource,...r}=a.published;return r;}),expected);
  assert.equal(s.association.status,current.length?'associated':mappings[s.name]?'naming_mismatch':'missing_route_record');
 }
 assert.deepEqual(audit.summary,{summits:214,associated:165,namingMismatches:34,missingRouteRecords:15,publishedAscents:243,unresolvedCollisionPairs:10});
 assert.deepEqual(audit.unassociatedRouteKeys,[]);
});
test('naming mismatches and absent repository records remain distinct',()=>{
 assert.equal(summit('Haystacks (Buttermere)').association.status,'naming_mismatch');
 assert.equal(summit('Haystacks (Buttermere)').association.routeKey,'Haystacks');
 assert.equal(summit('Fleetwith Pike').association.status,'missing_route_record');
 assert.deepEqual(summit('Fleetwith Pike').ascents,[]);
});
test('qualified mountains cannot inherit the other mountain route',()=>{
 for(const [has,missing,key] of [
  ['Harter Fell (Eskdale)','Harter Fell (Mardale)','Harter Fell'],
  ['High Pike (Scandale)','High Pike (Caldbeck)','High Pike'],
  ['Tarn Crag (Easedale)','Tarn Crag (Sleddale)','Tarn Crag']
 ]){
  assert.notEqual(summit(has).id,summit(missing).id);
  assert.equal(summit(has).association.routeKey,key);
  assert.equal(summit(missing).association.routeKey,null);
  assert.deepEqual(summit(missing).ascents,[]);
 }
 for(const n of ['Red Pike (Buttermere)','Red Pike (Wasdale)','High Raise (High Street)','High Raise (High Raise (High White Stones))'])assert.deepEqual(summit(n).ascents,[]);
});
test('ten unresolved pairs match live audit output and link to the correct ascents',()=>{
 const expected=JSON.parse(execFileSync(process.execPath,['scripts/audit-route-locations.cjs'],{encoding:'utf8'}));
 assert.deepEqual(audit.routingInputCollisions.map(({id,status,...g})=>g),expected);
 assert.equal(expected.length,10);
 assert.equal(expected.filter(g=>g.resolution==='embedded coordinates').length,5);
 for(const g of audit.routingInputCollisions){
  const s=audit.summits.find(s=>s.association.routeKey===g.fell);
  assert.ok(s.collisionIds.includes(g.id));
  for(const r of g.routes)assert.ok(s.ascents.find(a=>a.published.route===r).collisionIds.includes(g.id));
 }
});
test('coordinates, ordered guides and source evidence are exported verbatim without promoting walking lines',()=>{
 const {run}=loadRouting();const fixtures=[...require('./coniston-guide-sources.json'),...require('./other-guide-sources.json')];
 for(const s of audit.summits)for(const a of s.ascents){
  const route=JSON.stringify(a.published.route);
  const start=plain(run(`embeddedStartFor(${route})`));
  assert.deepEqual(a.start.coordinates,start?{lat:start.lat,lon:start.lon}:null);
  const guides=plain(run(`routeViaPoints(${route})`));
  assert.deepEqual(a.guideWaypoints.map(({lat,lon})=>({lat,lon})),guides.map(({lat,lon})=>({lat,lon})));
  if(!start){assert.equal(a.start.verification,'unresolved');assert.ok(a.missingEvidence.includes('resolved_start_coordinates'));}
  for(const p of a.guideWaypoints){
   if(p.verification==='source_backed_coordinates'){
    const f=fixtures.find(f=>f.route===a.published.route&&f.source===p.source);
    assert.ok(f);assert.deepEqual({lat:p.lat,lon:p.lon,index:p.sampleIndex},f.guides[p.order-1]);
   }else {assert.equal(p.source,null);assert.ok(a.missingEvidence.includes('guide_coordinate_provenance'));}
  }
  assert.equal(a.generatedWalkingLine.verification,'unverified');assert.equal(a.generatedWalkingLine.geometry,null);
  assert.ok(a.missingEvidence.includes('independent_full_walking_line_verification'));
 }
});
test('export is byte-stable, current, and runnable outside repository working directory',()=>{
 const committed=fs.readFileSync('docs/wainwrights-audit.v1.json','utf8');
 assert.equal(serialize(),committed);assert.equal(serialize(),committed);
 const script=require('node:path').resolve('scripts/export-route-audit.cjs');
 assert.equal(execFileSync(process.execPath,[script],{cwd:require('node:os').tmpdir(),encoding:'utf8',maxBuffer:5e6}),committed);
});
