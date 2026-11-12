const {test}=require('node:test');
const assert=require('node:assert/strict');
const {decodePolyline6,prepare}=require('../scripts/prepare-coniston-valhalla.cjs');
function encode(points){
 let a=0,b=0,out='';
 for(const [lat,lon] of points){
  for(const [n,old] of [[Math.round(lat*1e6),a],[Math.round(lon*1e6),b]]){
   let delta=n-old;let value=delta<0?(-delta*2-1):delta*2;
   while(value>=32){out+=String.fromCharCode((32|(value&31))+63);value=Math.floor(value/32);}
   out+=String.fromCharCode(value+63);
  }
  a=Math.round(lat*1e6);b=Math.round(lon*1e6);
 }
 return out;
}
test('decodes Valhalla polyline6 coordinates',()=>{
 const p=[[54.363508,-3.096256],[54.37066,-3.12145]];
 assert.deepEqual(decodePolyline6(encode(p)),p);
});
test('joins leg shapes without duplicated connecting point',()=>{
 const a=[54.36,-3.1],b=[54.37,-3.11],c=[54.38,-3.12];
 const result=prepare({name:'test',published:[a,c],shapes:[encode([a,b]),encode([b,c])]});
 assert.deepEqual(result.generated,[a,b,c]);
});
test('rejects truncated and missing shapes',()=>{
 assert.throws(()=>decodePolyline6('~'),/Truncated/);
 assert.throws(()=>prepare({name:'missing'}),/No Valhalla legs/);
});
