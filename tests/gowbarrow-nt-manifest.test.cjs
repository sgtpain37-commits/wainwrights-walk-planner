const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const manifest=JSON.parse(fs.readFileSync(path.resolve(__dirname,'../docs/routes/gowbarrow-nt-stage-checklist.json'),'utf8'));

test('Gowbarrow NT circuit retains all eight ordered stages',()=>{
 assert.equal(manifest.routeId,'gowbarrow-aira-force-nt-clockwise');
 assert.equal(manifest.source.publisher,'National Trust');
 assert.equal(manifest.source.stages,8);
 assert.deepEqual(manifest.stages.map(s=>s.number),[1,2,3,4,5,6,7,8]);
 assert.match(manifest.stages[1].via,/Aira Force/);
 assert.match(manifest.stages[4].via,/summit/i);
 assert.match(manifest.stages[6].via,/Memorial Seat/);
 assert.match(manifest.stages[7].via,/Lyulph/);
});
test('Gowbarrow route cannot be certified by a research manifest',()=>{
 assert.equal(manifest.status,'research-unverified');
 assert.equal(manifest.verification.approvedForLiveNavigation,false);
 for(const [key,value] of Object.entries(manifest.verification)){
  assert.equal(value,false,`Unexpected verification claim: ${key}`);
 }
 assert.equal(manifest.stages.every(s=>typeof s.check==='string'&&s.check.length>0),true);
});
