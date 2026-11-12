const {test}=require('node:test');const assert=require('node:assert/strict');const {loadRouting}=require('./load-routing.cjs');
const fixtures=require('./collision-guide-sources.json');const report=require('../docs/collision-review.v1.json');const audit=require('../docs/wainwrights-audit.v1.json');
const {extractFirstTrack,checkSnapshot}=require('../scripts/check-collision-guide-sources.cjs');const plain=x=>JSON.parse(JSON.stringify(x));
test('20 source-backed ascent inputs use exact ordered fixture coordinates and first-vertex starts',()=>{
 assert.equal(fixtures.length,20);const {run}=loadRouting();
 for(const f of fixtures){const r=JSON.stringify(f.route);const start=plain(run(`embeddedStartFor(${r},${JSON.stringify(f.fell)})`));assert.deepEqual([start.lat,start.lon],f.start);
  const guides=plain(run(`routeViaPoints(${r},${JSON.stringify(f.fell)})`));assert.deepEqual(guides.map(p=>[p.lat,p.lon]),f.guides.map(p=>[p.lat,p.lon]));
  assert.deepEqual(f.guides.map(p=>p.index),f.guides.map(p=>p.index).sort((a,b)=>a-b));assert.ok(f.guides.some(p=>p.index===f.branchSampleIndex));
  assert.ok(f.guides.every(p=>p.index>0&&p.index<f.trackPointCount-1));assert.match(f.sourceSha256,/^[a-f0-9]{64}$/);
  assert.equal(run(`routeGuideSource(${r},${JSON.stringify(f.fell)}).source`),f.source);assert.match(run(`routeMappingNotice(${r},${JSON.stringify(f.fell)})`),/Unverified.*Live guidance is restricted/);
  assert.equal(decodeURIComponent(run(`startDirectionsUrl(${r},${JSON.stringify(f.fell)})`)).split('query=')[1],f.start.join(','));
  const s=audit.summits.find(s=>s.association.routeKey===f.fell),a=s.ascents.find(a=>a.published.route===f.route);assert.equal(a.start.verification,'source_backed_coordinates');
  assert.ok(a.guideWaypoints.every(p=>p.verification==='source_backed_coordinates'));assert.equal(a.sourceReferences[0].fixture,'tests/collision-guide-sources.json');
  assert.equal(a.generatedWalkingLine.verification,'unverified');assert.equal(a.generatedWalkingLine.geometry,null);assert.match(a.generatedWalkingLine.reason,/Live guidance is restricted/);
 }
});
test('all ten pairs have different guides even with identical start and summit',()=>{
 const {run}=loadRouting();const fixed=report.records.filter(r=>r.status==='routing_inputs_distinct_preview_only');assert.equal(fixed.length,10);
 for(const pair of fixed){const requests=pair.routes.map(route=>JSON.stringify(plain(run(`buildWalkingRequest({lat:54.5,lon:-3.1},routeViaPoints(${JSON.stringify(route)},${JSON.stringify(pair.fell)}),{lat:54.6,lon:-3.2})`)).locations));assert.notEqual(requests[0],requests[1],pair.fell);}
 assert.deepEqual(audit.routingInputCollisions,[]);
 for(const c of audit.routingInputCollisions)for(const route of c.routes)assert.deepEqual(plain(run(`routeViaPoints(${JSON.stringify(route)},${JSON.stringify(pair.fell)})`)),[]);
});
test('publisher source checker validates hash, point count, order and exact source vertices without executing scripts',()=>{
 const crypto=require('node:crypto');const bytes=Buffer.from('trk[t].segments.push({ points:[[54,-3,10],[54.1,-3.1,20],[54.2,-3.2,30]] });');
 const f={source:'https://example.test/map',sourceSha256:crypto.createHash('sha256').update(bytes).digest('hex'),trackPointCount:3,start:[54,-3],guides:[{index:1,lat:54.1,lon:-3.1}]};
 assert.equal(checkSnapshot(f,bytes).guides,1);assert.throws(()=>checkSnapshot({...f,start:[0,0]},bytes),/Start differs/);assert.throws(()=>checkSnapshot({...f,guides:[{index:2,lat:54.1,lon:-3.1}]},bytes),/Guide differs/);assert.throws(()=>checkSnapshot({...f,sourceSha256:'bad'},bytes),/bytes changed/);assert.throws(()=>extractFirstTrack('trk[t].segments.push({ points:[[NaN,0,0]] });'));
});

test('same route text on different summits cannot share starts, guides, source attribution or restrictions',()=>{
 const {run}=loadRouting();
 for(const route of ['From Mungrisdale via the east ridge','From Mungrisdale via Bannerdale']){
  const a=fixtures.find(f=>f.fell==='Bannerdale Crags'&&f.route===route),b=fixtures.find(f=>f.fell==='Bowscale Fell'&&f.route===route);
  assert.notDeepEqual(a.guides,b.guides);assert.notEqual(a.source,b.source);
  for(const f of [a,b])assert.equal(run(`routeGuideSource(${JSON.stringify(route)},${JSON.stringify(f.fell)}).source`),f.source);
  assert.deepEqual(plain(run(`routeViaPoints(${JSON.stringify(route)})`)),[]);
 }
 const shared='From Mill Bridge via Grisedale Hause';
 assert.equal(run(`routeGuideSource(${JSON.stringify(shared)},'Fairfield')`),null);
 assert.deepEqual(plain(run(`routeViaPoints(${JSON.stringify(shared)},'Fairfield')`)),[]);
 assert.match(run(`routeMappingNotice(${JSON.stringify(shared)},'Seat Sandal')`),/Live guidance is restricted/);
 assert.doesNotMatch(run(`routeMappingNotice(${JSON.stringify(shared)},'Fairfield')`),/awaiting generated-line review/);
});
test('map previews send the selected summit-specific inputs to the router without requiring geocoding',async()=>{
 for(const f of fixtures){let posted;const {context,run}=loadRouting({fetch:async(url,options)=>{assert.equal(url,'https://valhalla1.openstreetmap.de/route');posted=JSON.parse(options.body);return {ok:false,status:503}},console:{warn(){}}});
  const summit=audit.summits.find(s=>s.association.routeKey===f.fell),route=plain(run(`routeVariantsFor({name:${JSON.stringify(f.fell)}}).find(r=>r.route===${JSON.stringify(f.route)})`));const status={};
  const card={dataset:{fell:f.fell,lat:String(summit.catalogue.latitude),lon:String(summit.catalogue.longitude),routes:JSON.stringify([route])},querySelector:s=>s==='.route-map-status'?status:null};
  const button={closest:()=>card,disabled:false};await context.window.drawRouteFromPopup(button);
  assert.deepEqual(posted.locations.map(p=>[p.lat,p.lon]),[f.start,...f.guides.map(p=>[p.lat,p.lon]),[summit.catalogue.latitude,summit.catalogue.longitude]]);assert.equal(button.disabled,false);assert.match(status.textContent,/HTTP 503/);
 }
});
