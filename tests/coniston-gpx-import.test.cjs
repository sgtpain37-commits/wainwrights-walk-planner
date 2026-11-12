const {test}=require('node:test');
const assert=require('node:assert/strict');
const {parseGpx}=require('../scripts/import-coniston-gpx.cjs');
const wrap=x=>`<?xml version="1.0"?><gpx version="1.1"><trk><trkseg>${x}</trkseg></trk></gpx>`;
test('imports GPX track points',()=>assert.deepEqual(parseGpx(wrap('<trkpt lat="54.36" lon="-3.1"/><trkpt lon="-3.11" lat="54.37"><ele>800</ele></trkpt>')),[[54.36,-3.1],[54.37,-3.11]]));
test('rejects malformed coordinate',()=>assert.throws(()=>parseGpx(wrap('<trkpt lat="99" lon="0"/><trkpt lat="54" lon="0"/>')),/Invalid GPX/));
test('rejects route-only GPX',()=>assert.throws(()=>parseGpx('<gpx><rte><rtept lat="54" lon="-3"/></rte></gpx>'),/No complete/));
test('rejects disconnected segments',()=>assert.throws(()=>parseGpx('<gpx><trk><trkseg><trkpt lat="54" lon="-3"/><trkpt lat="54.1" lon="-3"/></trkseg><trkseg><trkpt lat="54.2" lon="-3"/><trkpt lat="54.3" lon="-3"/></trkseg></trk></gpx>'),/Multiple/));
