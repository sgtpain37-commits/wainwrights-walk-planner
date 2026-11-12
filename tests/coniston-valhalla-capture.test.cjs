const {test}=require('node:test');
const assert=require('node:assert/strict');
const {normalize,parseJsonLines}=require('../scripts/normalize-coniston-valhalla.cjs');
function encode(points){
 let lat=0,lon=0,s='';
 for(const [a,b] of points){
  for(const [next,old] of [[Math.round(a*1e6),lat],[Math.round(b*1e6),lon]]){
   let n=next-old;let v=n<0?-2*n-1:2*n;
   while(v>=32){s+=String.fromCharCode((v&31|32)+63);v=Math.floor(v/32);}
   s+=String.fromCharCode(v+63);
  }
  lat=Math.round(a*1e6);lon=Math.round(b*1e6);
 }
 return s;
}
test('decodes recorded Valhalla shapes as unverified geometry',()=>{
 const a=[54.36,-3.1],b=[54.37,-3.11],c=[54.38,-3.12];
 const result=normalize({route:'Low Water',shapes:[encode([a,b]),encode([b,c])]});
 assert.deepEqual(result.generated,[a,b,c]);
 assert.equal(result.verification,'unverified_generated_route');
});
test('rejects missing or malformed shapes',()=>{
 assert.throws(()=>normalize({route:'Low Water',shapes:[]}),/Missing route shapes/);
 assert.throws(()=>normalize({route:'Low Water',shapes:['~']}),/Truncated/);
});
test('parses one JSON record per line',()=>{
 const shape=encode([[54.36,-3.1],[54.37,-3.11]]);
 const output=parseJsonLines(JSON.stringify({route:'Low Water',shapes:[shape]})+'\n');
 assert.equal(output.routes.length,1);
 assert.equal(output.routes[0].generated.length,2);
});
