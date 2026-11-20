const {test}=require('node:test');
const assert=require('node:assert/strict');
const {spawnSync}=require('node:child_process');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');

test('GPX checker measures geometry but never certifies navigation',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'gowbarrow-gpx-'));
 try {
  const file=path.join(dir,'sample.gpx');
  fs.writeFileSync(file,'<?xml version="1.0"?><gpx><trk><trkseg><trkpt lat="54.5725" lon="-2.9290"/><trkpt lat="54.58811" lon="-2.918201"/><trkpt lat="54.5725" lon="-2.9290"/></trkseg></trk></gpx>');
  const run=spawnSync(process.execPath,[path.resolve(__dirname,'../scripts/check-gowbarrow-gpx.cjs'),file],{encoding:'utf8'});
  assert.equal(run.status,0,run.stderr);
  const result=JSON.parse(run.stdout);
  assert.equal(result.trackPoints,3);
  assert.equal(result.closureMetres,0);
  assert.equal(result.nearestSummitMetres,0);
  assert.equal(result.verifiedFootpathAlignment,false);
  assert.equal(result.liveGuidanceSafe,false);
  assert.ok(result.polylineMiles>0);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('GPX checker rejects missing input rather than inventing a route',()=>{
 const run=spawnSync(process.execPath,[path.resolve(__dirname,'../scripts/check-gowbarrow-gpx.cjs')],{encoding:'utf8'});
 assert.notEqual(run.status,0);
 assert.match(run.stderr,/Usage:/);
});
