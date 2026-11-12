const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {loadRouting}=require('./load-routing.cjs');
const fixtures=require('./coniston-guide-sources.json');
const plain=x=>JSON.parse(JSON.stringify(x));
function cardFor(routes,index=0){
 const status={};const selected={};
 const buttons=routes.map((_,i)=>({classList:{contains:()=>i===index,toggle:(_,on)=>{buttons[i].classList.contains=()=>on;}}}));
 const picker={dataset:{routes:JSON.stringify(routes)},querySelectorAll:()=>buttons,parentElement:{querySelector:()=>selected}};
 const card={dataset:{routes:JSON.stringify(routes),lat:'54.37066',lon:'-3.12145',fell:'Old Man of Coniston'},querySelector:s=>s==='.route-picker'?picker:s==='.route-map-status'?status:null};
 buttons.forEach(b=>b.closest=s=>s==='.route-picker'?picker:card);
 return {card,buttons,status,selected};
}
test('all inline scripts parse',()=>{
 for(const m of fs.readFileSync('index.html','utf8').matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
});
test('Coniston aliases select the five existing published choices without changing statistics',()=>{
 const {run}=loadRouting();
 for(const name of ['Coniston Old Man','Old Man of Coniston','The Old Man of Coniston']){
  const rs=plain(run(`routeVariantsFor({name:${JSON.stringify(name)}})`));
  assert.equal(rs.length,5);assert.deepEqual(rs.map(r=>r.miles),[2.4,2,2.8,1.6,3.5]);
 }
});
test('Coniston source coordinates are used verbatim, ordered and route-specific',()=>{
 const {run}=loadRouting();const requests=[];
 for(const f of fixtures){
  const r=JSON.stringify(f.route);
  assert.deepEqual(plain(run(`embeddedStartFor(${r})`)),{lat:f.start[0],lon:f.start[1],source:'embedded route start'});
  const guides=plain(run(`routeViaPoints(${r})`));
  assert.deepEqual(guides.map(({lat,lon})=>({lat,lon})),f.guides.map(({lat,lon})=>({lat,lon})));
  assert.equal(run(`ROUTE_GUIDE_SOURCES[${r}].source`),f.source);
  const payload=plain(run(`buildWalkingRequest(embeddedStartFor(${r}),routeViaPoints(${r}),{lat:54.37066,lon:-3.12145})`));
  assert.deepEqual(payload.locations.map(p=>p.type),['break','through','through','through','through','break']);
  assert.equal(payload.costing,'pedestrian');assert.equal(payload.units,'kilometers');
  requests.push(JSON.stringify(payload.locations));
 }
 assert.equal(new Set(requests).size,3);
});
test('unknown guide coverage is explicit and invalid coordinates are rejected',()=>{
 const {run}=loadRouting();
 assert.match(run(`routeMappingNotice("From Mungrisdale via the east ridge")`),/No route-specific guide points/);
 assert.match(run(`routeDetailHTML({route:"From Mosedale via Coomb Height",miles:3.3,ascentFt:2570,time:"2h 40m"})`),/Published ascent:[\s\S]*Unverified generated walking line/);
 assert.throws(()=>run('buildWalkingRequest({lat:NaN,lon:0},[],{lat:54,lon:-3})'),/invalid routing coordinate/);
});
test('changing selected ascent clears the old line and updates published details',()=>{
 const {run,context}=loadRouting();
 const routes=plain(run('routeVariantsFor({name:"Coniston Old Man"})'));
 const c=cardFor(routes);context.card=c.card;context.btn=c.buttons[3];context.clears=0;
 run('clearRouteOverlay=()=>{clears++};window.selectRouteOption(btn,3)');
 assert.equal(context.clears,1);
 assert.equal(run('selectedRouteFromCard(card).route'),routes[3].route);
 assert.match(c.selected.innerHTML,/Diamond path/);assert.match(c.selected.innerHTML,/Unverified/);
});
test('draw sends selected route guide points to Valhalla and labels the returned line unverified',async()=>{
 const sent=[];
 const layer=()=>({addTo(){return this},bindTooltip(){return this}});
 const {run,context}=loadRouting({
  fetch:async(url,opts)=>{sent.push({url,payload:JSON.parse(opts.body)});return {ok:true,json:async()=>({trip:{summary:{length:3,time:3600}}})}},
  L:{geoJSON:layer,circleMarker:layer,featureGroup:()=>({getBounds:()=>[]})},
  map:{fitBounds(){},removeLayer(){}}
 });
 run('valhallaRouteToGeo=()=>({});renderDirections=()=>{};formatKmPreferred=x=>x+" km";formatDuration=()=>"1h"');
 const routes=plain(run('routeVariantsFor({name:"Coniston Old Man"})'));
 for(const i of [0,1,3]){
  const c=cardFor(routes,i);context.card=c.card;
  const btn={closest:()=>c.card,disabled:false};await context.window.drawRouteFromPopup(btn);
  assert.equal(btn.disabled,false);assert.match(c.status.textContent,/Unverified generated walking line shown/);
  const expected=plain(run(`buildWalkingRequest(embeddedStartFor(${JSON.stringify(routes[i].route)}),routeViaPoints(${JSON.stringify(routes[i].route)}),{lat:54.37066,lon:-3.12145})`));
  assert.deepEqual(sent.at(-1).payload,expected);assert.equal(sent.at(-1).url,'https://valhalla1.openstreetmap.de/route');
 }
 assert.equal(new Set(sent.map(x=>JSON.stringify(x.payload.locations))).size,3);
});
test('failed routing restores the button and keeps published information available',async()=>{
 const {run,context}=loadRouting({fetch:async()=>({ok:false,status:503}),console:{warn(){}}});
 const c=cardFor(plain(run('routeVariantsFor({name:"Coniston Old Man"})')),1);
 const btn={closest:()=>c.card,disabled:false};await context.window.drawRouteFromPopup(btn);
 assert.equal(btn.disabled,false);assert.match(c.status.textContent,/HTTP 503/);assert.match(c.status.textContent,/GPX links are still available/);
});
test('additional sourced choices have distinct guide locations for the same start and summit',()=>{
 const {run}=loadRouting();const fixtures=require('./other-guide-sources.json');
 for(let i=0;i<fixtures.length;i+=2){
  const keys=[];
  for(const f of fixtures.slice(i,i+2)){
   const r=JSON.stringify(f.route);const guides=plain(run(`routeViaPoints(${r})`));
   assert.deepEqual(guides.map(({lat,lon})=>({lat,lon})),f.guides.map(({lat,lon})=>({lat,lon})));
   assert.equal(run(`ROUTE_GUIDE_SOURCES[${r}].source`),f.source);
   keys.push(JSON.stringify(plain(run(`buildWalkingRequest({lat:54.5,lon:-3.1},routeViaPoints(${r}),{lat:54.4,lon:-3.2})`)).locations));
  }
  assert.notEqual(keys[0],keys[1]);
 }
});
test('stale response cannot draw the previous ascent after selection changes',async()=>{
 let release;let draws=0;
 const {run,context}=loadRouting({fetch:()=>new Promise(resolve=>{release=resolve}),L:{geoJSON:()=>{draws++;throw Error('stale draw')}},console:{warn(){}}});
 const routes=plain(run('routeVariantsFor({name:"Coniston Old Man"})'));
 const c=cardFor(routes);const btn={closest:()=>c.card,disabled:false};
 const pending=context.window.drawRouteFromPopup(btn);
 await new Promise(resolve=>setImmediate(resolve));
 context.btn=c.buttons[1];run('window.selectRouteOption(btn,1)');
 release({ok:true,json:async()=>({trip:{}})});await pending;
 assert.equal(draws,0);assert.equal(btn.disabled,false);assert.match(c.status.textContent,/Route choice changed/);
});
test('audit snapshot distinguishes fixed and unresolved route choices',()=>{
 const {execFileSync}=require('node:child_process');
 const output=JSON.parse(execFileSync(process.execPath,['scripts/audit-route-locations.cjs'],{encoding:'utf8'}));
 assert.deepEqual(output,JSON.parse(fs.readFileSync('docs/route-location-collisions.json','utf8')));
 assert.equal(output.length,0);
 for(const fell of ['Coniston Old Man','Catstycam','Allen Crags','Great End'])assert.ok(!output.some(g=>g.fell===fell));
 assert.equal(output.filter(g=>g.resolution==='embedded coordinates').length,0);
});
test('route-start directions use corrected fell-gate coordinates',()=>{
 const {run}=loadRouting();
 for(const f of require('./coniston-guide-sources.json')){
  assert.equal(decodeURIComponent(run(`startDirectionsUrl(${JSON.stringify(f.route)})`)).split('query=')[1],f.start.join(','));
 }
 assert.equal(decodeURIComponent(run('startDirectionsUrl("From Bridgend via Greenhow End","Fairfield")')).split('query=')[1],require('./collision-guide-sources.json').find(f=>f.route==='From Bridgend via Greenhow End').start.join(','));
});
test('observed live detours receive an explicit published-versus-generated warning',()=>{
 const {run}=loadRouting();
 for(const result of require('../docs/coniston-live-check.json').results){
  const route=run(`routeVariantsFor({name:"Coniston Old Man"}).find(r=>r.route===${JSON.stringify(result.route)})`);
  const warning=run(`routeDistanceWarning(${JSON.stringify(route)},{length:${result.lengthKm}})`);
  assert.match(warning,/Large distance discrepancy/);assert.match(warning,/may not follow the selected ascent/);
 }
 assert.equal(run('routeDistanceWarning({miles:2},{})'),'');
 assert.match(run('routeMappingNotice("From Coniston (fell gate) via Low Water")'),/Unverified/);
});
