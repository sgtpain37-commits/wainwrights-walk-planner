const {test}=require('node:test');
const assert=require('node:assert/strict');
const audit=require('../data/audit/coniston-low-water-gpx-review.json');
test('uploaded Low Water GPX remains research only',()=>{
 assert.equal(audit.status,'research_only_not_summit_verified');
 assert.equal(audit.track.segments,1);
 assert.equal(audit.track.points,319);
 assert.ok(audit.track.distanceMetres>7800&&audit.track.distanceMetres<8000);
 assert.equal(audit.track.hasElevation,false);
});
test('complete GPX line does not reach planner summit reference',()=>{
 assert.ok(audit.comparison.nearestSummitTrackSegmentMetres>300);
 assert.ok(audit.comparison.nearestSummitTrackSegmentMetres<350);
 assert.ok(audit.comparison.plannerSummit[1]<audit.track.boundingBox.west);
 assert.equal(audit.comparison.nearestSummitTrackSegmentEndIndex,155);
});
