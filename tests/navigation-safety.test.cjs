const {test}=require('node:test');
const assert=require('node:assert/strict');
const {loadRouting}=require('./load-routing.cjs');
const plain=x=>JSON.parse(JSON.stringify(x));
// Synthetic geometry for offline control-flow tests, never replacement walking tracks.
const points=[{lat:54.36,lon:-3.1},{lat:54.37,lon:-3.12},{lat:54.38,lon:-3.14}];
function encode(coords){let lat=0,lon=0;return coords.map(p=>{const a=Math.round(p.lat*1e6),b=Math.round(p.lon*1e6);const out=[a-lat,b-lon].map(d=>{let n=d<0?-d*2-1:d*2,s='';while(n>=32){s+=String.fromCharCode((n%32)+95);n=Math.floor(n/32)}return s+String.fromCharCode(n+63)}).join('');lat=a;lon=b;return out}).join('')}
const shape=encode(points);
function response(length=3.42){return {trip:{status:0,units:'kilometers',summary:{length,time:3600},legs:[{shape,maneuvers:[{begin_shape_index:0,end_shape_index:1,length:1.71,time:1800,type:1,instruction:'Synthetic start'},{begin_shape_index:1,end_shape_index:2,length:1.71,time:1800,type:4,instruction:'Synthetic finish'}]}]}}}
function cardFor(routes=[{route:'Synthetic ascent',miles:2.125,ascentFt:1000,time:'1h'}]){
 const list=new Set();const node=()=>({className:'',textContent:'',innerHTML:'',classList:{add(x){list.add(x)},remove(x){list.delete(x)},contains:x=>list.has(x),toggle(){}},closest:()=>({open:false}),querySelector:()=>null,scrollIntoView(){}});
 const panel=node(),status=node(),live=node(),off=node(),nav={disabled:true};
 const buttons=routes.map((_,i)=>({classList:{contains:()=>i===0,toggle:(_,on)=>{buttons[i].classList.contains=()=>on;}}}));
 const selected=node(),picker={dataset:{routes:JSON.stringify(routes)},querySelectorAll:()=>buttons,parentElement:{querySelector:()=>selected}};
 const elements={'.turn-panel':panel,'.route-map-status':status,'.nav-live':live,'[data-nav-start]':nav,'.offroute-actions':off,'.route-picker':picker};
 const card={dataset:{routes:JSON.stringify(routes),lat:'54.38',lon:'-3.14',fell:'Synthetic summit'},querySelector:s=>elements[s]||null};
 buttons.forEach(b=>b.closest=s=>s==='.route-picker'?picker:card);
 return {card,panel,status,live,nav,buttons,btn:{closest:()=>card,disabled:false}};
}
function setup(fetch=async()=>({ok:true,json:async()=>response()})){
 const c=cardFor(),calls={watch:0,clear:0,draws:0,speech:0,cancel:0},callbacks=[];
 const layer=()=>({addTo(){return this},bindTooltip(){return this},setLatLng(){return this}});
 const {run,context}=loadRouting({fetch,console:{warn(){}},L:{geoJSON(){calls.draws++;return layer()},circleMarker:layer,featureGroup:()=>({getBounds:()=>[]})},map:{fitBounds(){},removeLayer(){},closePopup(){},panTo(){}},navigator:{geolocation:{watchPosition(fn){calls.watch++;callbacks.push(fn);return calls.watch},clearWatch(){calls.clear++}}}});
 const doc=context.document;
 doc.querySelectorAll=s=>s==='[data-nav-start]'?[c.nav]:s==='.turn-panel'?[c.panel]:s==='.nav-live'?[c.live]:[];
 doc.body.classList.add=()=>{};
 context.c=c.card;context.btn=c.btn;context.data=response();context.points=points;context.route={route:'Synthetic ascent',miles:2.125};
 context.window.speechSynthesis={cancel(){calls.cancel++},speak(){calls.speech++}};
 context.SpeechSynthesisUtterance=function(t){this.text=t};
 run('geocodeStart=async()=>points[0]');
 function install(data=response(),card=c.card,route=JSON.parse(card.dataset.routes)[0]){
  context.data=data;context.c=card;context.route=route;
  run('clearRouteOverlay(false);activeRouteContext={card:c,route,points,generation:routePreviewGeneration,routeKey:JSON.stringify(route),safety:assessRouteGuidance(route,data,points,true,c.dataset.fell)};valhallaRouteToGeo(data);renderDirections(c,data.trip.summary)');
 }
 return {c,calls,callbacks,run,context,install};
}
test('distance gate blocks each recorded Coniston detour at button and navigation entry point',()=>{
 for(const result of require('../docs/coniston-live-check.json').results){
  const h=setup();const route=plain(h.run(`routeVariantsFor({name:'Coniston Old Man'}).find(r=>r.route===${JSON.stringify(result.route)})`));
  const c=cardFor([route]);h.install(response(result.lengthKm),c.card,route);
  assert.equal(c.nav.disabled,true);assert.match(c.live.textContent,/Large distance discrepancy/);
  c.nav.disabled=false;h.context.window.startNavigation(c.btn);assert.equal(h.calls.watch,0);assert.equal(c.nav.disabled,true);
 }
});
test('distance gate uses >50% in both directions; passing remains unverified',()=>{
 const h=setup();
 for(const [miles,allowed] of [[.99999,false],[1,true],[1.00001,true],[3,true],[3.00001,false]]){
  h.context.data=response(miles*1.609344);h.context.route={miles:2};
  // Isolate exact threshold from the separate shape consistency diagnostic.
  assert.equal(h.run('!!routeDistanceWarning(route,data.trip.summary)'),!allowed);
 }
 h.install();assert.equal(h.c.nav.disabled,false);assert.match(h.c.live.textContent,/does not independently verify/);assert.match(h.c.panel.innerHTML,/unverified line/);
 h.context.window.startNavigation(h.c.btn);assert.equal(h.calls.watch,1);
 h.run('window.stopNavigation()');assert.equal(h.calls.clear,1);
});
test('invalid summaries, units, status, geometry, endpoints and turn indices fail closed',()=>{
 const changes=[
  d=>delete d.trip.summary,d=>d.trip.summary.length=NaN,d=>d.trip.summary.length=Infinity,d=>d.trip.summary.length=0,d=>d.trip.summary.length=-1,d=>d.trip.summary.length='3.42',
  d=>d.trip.summary.time=-1,d=>d.trip.units='miles',d=>d.trip.status=400,d=>d.trip.legs=[],d=>d.trip.legs[0].shape='',d=>d.trip.legs[0].shape='_',
  d=>d.trip.legs[0].shape=encode([{lat:91,lon:0},points[1]]),d=>d.trip.legs[0].shape=encode([points[0],points[0]]),
  d=>d.trip.legs[0].shape=encode([points[1],points[2]]),d=>d.trip.legs[0].shape=encode([points[0],points[1]]),
  d=>d.trip.legs[0].maneuvers=[],d=>d.trip.legs[0].maneuvers[0].begin_shape_index=-1,d=>d.trip.legs[0].maneuvers[0].begin_shape_index=99,
  d=>d.trip.legs[0].maneuvers[0].end_shape_index=99,d=>delete d.trip.legs[0].maneuvers[0].begin_shape_index,
  d=>d.trip.legs[0].maneuvers[0].length=-1,d=>d.trip.legs[0].maneuvers[0].time=Infinity,d=>d.trip.legs[0].maneuvers[0].instruction='',
  d=>d.trip.summary.length=2,
  d=>d.trip.legs.push({...d.trip.legs[0],shape:encode([points[0],points[1]])})
 ];
 const h=setup();for(const change of changes){const d=response();change(d);h.context.data=d;assert.equal(h.run('assessRouteGuidance(route,data,points).allowed'),false,String(change))}
 for(const miles of [undefined,0,-1,Infinity,'2.125']){h.context.route={miles};h.context.data=response();assert.equal(h.run('assessRouteGuidance(route,data,points).allowed'),false)}
});
test('drawable but invalid routing remains inspectable with a visible restriction',async()=>{
 const d=response();d.trip.legs[0].maneuvers[0].begin_shape_index=99;
 const h=setup(async()=>({ok:true,json:async()=>d}));await h.context.window.drawRouteFromPopup(h.c.btn);
 assert.equal(h.calls.draws,1);assert.equal(h.c.nav.disabled,true);assert.match(h.c.live.textContent,/Invalid turn instructions/);assert.match(h.c.status.textContent,/Unverified generated walking line shown/);assert.match(h.c.live.textContent,/independent walking-route links remain available/);
});
test('invalid encoded shapes are rejected without a fabricated map track or guidance',async()=>{
 const d=response();d.trip.legs[0].shape='_';const h=setup(async()=>({ok:true,json:async()=>d}));await h.context.window.drawRouteFromPopup(h.c.btn);
 assert.equal(h.calls.draws,0);assert.equal(h.c.nav.disabled,true);assert.match(h.c.status.textContent,/invalid route geometry/);h.context.window.startNavigation(h.c.btn);assert.equal(h.calls.watch,0);
});
test('clear and ascent changes invalidate eligibility and late GPS callbacks',()=>{
 const h=setup();h.install();h.context.window.startNavigation(h.c.btn);const cb=h.callbacks[0];
 const cancels=h.calls.cancel;h.run('clearRouteOverlay()');assert.ok(h.calls.cancel>cancels);h.context.window.startNavigation(h.c.btn);cb({coords:{latitude:54.36,longitude:-3.1}});
 assert.equal(h.calls.watch,1);assert.equal(h.run('lastUserPos'),null);assert.equal(h.c.nav.disabled,true);
 h.install();h.context.b=h.c.buttons[0];h.run('window.selectRouteOption(b,0)');h.context.window.startNavigation(h.c.btn);assert.equal(h.calls.watch,1);
});
test('another card or changed route metadata cannot reuse the active route',()=>{
 const h=setup();h.install();const other=cardFor();h.context.window.startNavigation(other.btn);assert.equal(h.calls.watch,0);
 h.c.card.dataset.routes=JSON.stringify([{route:'Different ascent',miles:2.125}]);h.context.window.startNavigation(h.c.btn);assert.equal(h.calls.watch,0);
});
test('a new or failed preview immediately revokes old guidance and eligibility',async()=>{
 let release;const h=setup(()=>new Promise(r=>{release=r}));h.install();h.context.window.startNavigation(h.c.btn);
 const pending=h.context.window.drawRouteFromPopup(h.c.btn);assert.equal(h.calls.clear,1);h.context.window.startNavigation(h.c.btn);assert.equal(h.calls.watch,1);
 await new Promise(r=>setImmediate(r));release({ok:false,status:503});await pending;
 h.context.window.startNavigation(h.c.btn);assert.equal(h.calls.watch,1);assert.equal(h.c.nav.disabled,true);
});
test('recalculation stops guidance, retains a preview and cannot start or speak guidance',async()=>{
 const h=setup();h.install();h.context.window.startNavigation(h.c.btn);h.run('lastUserPos=points[0];voiceGuidance=true');
 await h.context.window.recalculateFromHere(h.c.btn);
 assert.equal(h.calls.clear,1);assert.equal(h.calls.draws,1);assert.equal(h.c.nav.disabled,true);assert.match(h.c.live.textContent,/preview-only/);
 h.context.window.startNavigation(h.c.btn);h.context.window.toggleVoiceGuidance(h.c.btn);h.context.window.toggleVoiceHud(h.c.btn);
 assert.equal(h.calls.watch,1);assert.equal(h.calls.speech,0);assert.equal(h.run('activeNavCard'),null);
 // A fresh complete ascent preview is assessed on its own data, never promoted to verified.
 await h.context.window.drawRouteFromPopup(h.c.btn);assert.equal(h.c.nav.disabled,false);assert.match(h.c.live.textContent,/does not independently verify/);
});
test('blocked routes remain blocked after recalculation, including failed recalculation',async()=>{
 for(const fail of [false,true]){
  const h=setup(async()=>fail?{ok:false,status:503}:{ok:true,json:async()=>response()});h.install(response(12));h.run('lastUserPos=points[0]');
  await h.context.window.recalculateFromHere(h.c.btn);h.context.window.startNavigation(h.c.btn);
  assert.equal(h.calls.watch,0);assert.equal(h.c.nav.disabled,true);assert.match(h.c.live.textContent,/preview-only/);
 }
});
test('late recalculation responses cannot replace a cleared, changed or newer preview',async()=>{
 for(const action of ['clear','change','newer']){
  let release,calls=0;const h=setup(()=>++calls===1?new Promise(r=>{release=r}):Promise.resolve({ok:true,json:async()=>response()}));h.install();h.run('lastUserPos=points[0]');
  const pending=h.context.window.recalculateFromHere(h.c.btn);
  if(action==='clear')h.run('clearRouteOverlay()');
  if(action==='change'){h.context.b=h.c.buttons[0];h.run('window.selectRouteOption(b,0)')}
  if(action==='newer')await h.context.window.drawRouteFromPopup(h.c.btn);
  release({ok:true,json:async()=>response(12)});await pending;
  assert.equal(h.calls.draws,action==='newer'?1:0);assert.equal(h.c.nav.disabled,action!=='newer');
 }
});
test('stopping during recalculation cannot resume live guidance',async()=>{
 // stopNavigation alone cancels GPS. Route response may still become a restricted preview.
 let release;const h=setup(()=>new Promise(r=>{release=r}));h.install();h.run('lastUserPos=points[0]');
 const pending=h.context.window.recalculateFromHere(h.c.btn);h.run('stopNavigation()');release({ok:true,json:async()=>response()});await pending;
 assert.equal(h.c.nav.disabled,true);assert.equal(h.run('activeNavCard'),null);
});
test('valid GPS guidance keeps near-route, off-route and HUD behavior',()=>{
 const h=setup();h.install();
 h.context.window.startNavigation(h.c.btn);const cb=h.callbacks[0];cb({coords:{latitude:54.36,longitude:-3.1}});
 assert.match(h.c.live.textContent,/Next in about/);
 for(let i=0;i<4;i++)cb({coords:{latitude:54.36,longitude:-3.105}});
 assert.match(h.c.live.textContent,/Off-route alert/);
});

test('malformed manoeuvre lists keep actual map geometry inspectable',async()=>{
 const d=response();d.trip.legs[0].maneuvers={invalid:true};const h=setup(async()=>({ok:true,json:async()=>d}));await h.context.window.drawRouteFromPopup(h.c.btn);
 assert.equal(h.calls.draws,1);assert.equal(h.c.nav.disabled,true);assert.match(h.c.live.textContent,/Missing turn instructions/);
});
test('disconnected legs remain separate map lines without an invented connecting track',()=>{
 const h=setup();const d=response();d.trip.legs.push({...d.trip.legs[0],shape:encode([points[0],points[1]])});h.context.data=d;
 assert.equal(h.run('assessRouteGuidance(route,data,points).allowed'),false);
 const geometry=plain(h.run('valhallaRouteToGeo(data).features[0].geometry'));assert.equal(geometry.type,'MultiLineString');assert.equal(geometry.coordinates.length,2);
 assert.deepEqual(geometry.coordinates[1],points.slice(0,2).map(p=>[p.lon,p.lat]));
});

test('new collision inputs remain preview-only even with otherwise eligible geometry and a forced Start click',async()=>{
 for(const f of require('./collision-guide-sources.json')){
  const h=setup(),route={route:f.route,miles:2.125,ascentFt:1000,time:'1h'},c=cardFor([route]);
  c.card.dataset.fell=f.fell;
  h.install(response(),c.card,route);assert.equal(c.nav.disabled,true);assert.match(c.live.textContent,/awaiting generated-line review/);
  c.nav.disabled=false;h.context.window.startNavigation(c.btn);assert.equal(h.calls.watch,0);assert.equal(c.nav.disabled,true);
  await h.context.window.drawRouteFromPopup(c.btn);assert.doesNotMatch(c.status.textContent,/No route-specific guide points/);assert.match(c.status.textContent,/awaiting generated-line review/);assert.equal(c.nav.disabled,true);
 }
});
