const {test}=require('node:test');
const assert=require('node:assert/strict');
const candidates=require('../data/audit/coniston-roam-with-ross-candidates.json');
test('Ross research candidates remain isolated from navigable route catalogue',()=>{
 assert.equal(candidates.schemaVersion,1);
 assert.equal(candidates.status,'source_review_only');
 assert.match(candidates.source.url,/^https:\/\/www\.roamwithross\.com\//);
 assert.equal(candidates.routes.length,5);
 assert.equal(new Set(candidates.routes.map(r=>r.id)).size,5);
 for(const r of candidates.routes){
  assert.ok(r.id.startsWith('ross-coniston-'));
  assert.ok(r.publishedDistanceKm>0);
  assert.equal(r.difficulty,'ungraded');
  assert.equal(r.geometryStatus,'not_retrieved');
  assert.ok(r.startDescription);
  assert.ok(r.gpxUrl===null||/^https:\/\//.test(r.gpxUrl));
 }
});
test('published itinerary distances are kept as research data, not one-way ascent stats',()=>{
 assert.deepEqual(candidates.routes.map(r=>r.publishedDistanceKm),[8,15,13,9,21]);
 assert.equal(candidates.routes.find(r=>r.id==='ross-coniston-low-water').walkType,'unconfirmed');
 assert.equal(candidates.routes.find(r=>r.id==='ross-coniston-round').walkType,'circular_multi_summit_itinerary');
});
