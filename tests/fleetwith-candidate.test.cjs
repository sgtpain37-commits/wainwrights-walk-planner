const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {buildAudit}=require('../scripts/export-route-audit.cjs');
const {loadRouting}=require('./load-routing.cjs');
const candidate=require('../data/audit/route-candidates.json')['Fleetwith Pike'];
test('Fleetwith evidence retains differing measurements and scopes without selecting a winner',()=>{
 const [upfell,peakify,walklakes]=candidate.sourceComparisons;
 assert.deepEqual([upfell.distanceKm,upfell.ascentMetres,upfell.timeUpMinutes],[1.8,553,75]);
 assert.deepEqual([peakify.distanceKm,peakify.ascentMetres,peakify.timeUpMinutes],[2.1,531,80]);
 assert.match(walklakes.scope,/not one-way/);
 assert.equal(candidate.acceptedStart.coordinates,null);
 assert.deepEqual(candidate.sourceComparisons.map(s=>s.startGridReference),[null,'NY194151','NY194149','NY194150']);
 assert.equal(candidate.navigation.liveGuidanceAllowed,false);
 assert.equal(candidate.navigation.geometry,null);
 assert.equal(candidate.navigation.verification,'unverified');
});
test('candidate evidence cannot become a selectable ascent or change any summit identity',()=>{
 const audit=buildAudit(),s=audit.summits.find(s=>s.name==='Fleetwith Pike');
 assert.deepEqual(s.routeInvestigation,candidate);
 assert.equal(s.association.status,'missing_route_record');assert.deepEqual(s.ascents,[]);
 assert.deepEqual(JSON.parse(JSON.stringify(loadRouting().run("routeVariantsFor({name:'Fleetwith Pike'})"))),[]);
 const {parseCSV}=require('../scripts/export-route-audit.cjs');
 const crypto=require('node:crypto');
 for(const row of parseCSV(fs.readFileSync('data/audit/wainwrights.csv','utf8'))){
  const actual=audit.summits.find(s=>s.name===row.name);
  assert.equal(actual.id,'summit-'+crypto.createHash('sha256').update(row.name).digest('hex').slice(0,16));
  assert.equal(actual.catalogue.latitude,Number(row.latitude));assert.equal(actual.catalogue.longitude,Number(row.longitude));
 }
 assert.equal(audit.summary.associated,201);assert.equal(audit.summary.missingRouteRecords,13);
 assert.equal(audit.summary.unresolvedCollisionPairs,0);
 assert.equal(audit.summits.filter(s=>s.routeInvestigation).length,1);
});
