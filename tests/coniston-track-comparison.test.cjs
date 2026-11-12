const {test}=require('node:test');
const assert=require('node:assert/strict');
const {compare,distance}=require('../scripts/compare-coniston-tracks.cjs');
test('identical line has zero deviation and equal length',()=>{
 const p=[[54.36,-3.10],[54.37,-3.11]];
 const result=compare({name:'same',published:p,generated:p});
 assert.equal(result.maxGeneratedVertexSeparationMetres,0);
 assert.equal(result.publishedMetres,result.generatedMetres);
 assert.equal(result.startOffsetMetres,0);
 assert.equal(result.endOffsetMetres,0);
});
test('off-route excursion is detected while endpoints still match',()=>{
 const a=[54.36,-3.10],b=[54.37,-3.11],far=[54.37,-3.13];
 const r=compare({name:'detour',published:[a,b],generated:[a,far,b]});
 assert.ok(r.maxGeneratedVertexSeparationMetres>100);
 assert.equal(r.startOffsetMetres,0);assert.equal(r.endOffsetMetres,0);
 assert.ok(r.generatedMetres>r.publishedMetres);
});
test('rejects invalid geometry',()=>assert.throws(()=>compare({name:'bad',published:[[99,0],[54,0]],generated:[[54,0],[54,1]]}),/invalid published/));

test('reports contiguous off-track excursions',()=>{
 const a=[54.36,-3.10],b=[54.37,-3.11],far=[54.37,-3.13];
 const r=compare({name:'excursion',published:[a,b],generated:[a,far,b]});
 assert.equal(r.excursionThresholdMetres,100);
 assert.deepEqual(r.excursionRuns,[{startIndex:1,endIndex:1,maximumMetres:r.deviations[1].metres}]);
});
test('reports no excursions on identical geometry',()=>{
 const line=[[54.36,-3.10],[54.37,-3.11]];
 assert.deepEqual(compare({name:'clean',published:line,generated:line}).excursionRuns,[]);
});
