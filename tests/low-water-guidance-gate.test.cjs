const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadRouting}=require('./load-routing.cjs');
test('Low Water is explicitly preview-only until geometry is independently verified',()=>{
 const {run}=loadRouting();
 const source=run("routeGuideSource('From Coniston (fell gate) via Low Water','Coniston Old Man')");
 assert.match(source.previewOnlyReason,/Live guidance restricted/);
 assert.match(source.previewOnlyReason,/9\.91 miles/);
});
test('Coniston other ascent source metadata is not accidentally restricted by Low Water rule',()=>{
 const {run}=loadRouting();
 const source=run("routeGuideSource('From Coniston (fell gate) via the south ridge','Coniston Old Man')");
 assert.equal(source.previewOnlyReason,undefined);
});
