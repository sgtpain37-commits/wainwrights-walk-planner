const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const P=require('../progress.js');
const catalogue=require('../docs/wainwrights-audit.v1.json').summits;
const html=fs.readFileSync('index.html','utf8');
const names=P.CATALOGUE.map(s=>s.name);
function storage(){const data=new Map();return {getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v),clear:()=>data.clear()};}
function harness(initial=[]){
 const store=storage();P.save(store,initial);
 const elements=new Map();
 function element(){return {listeners:{},children:[],textContent:'',files:[],addEventListener(k,f){this.listeners[k]=f},append(...v){this.children.push(...v)},replaceChildren(){this.children=[]},click(){this.clicked=true},remove(){},showModal(){this.open=true},close(){this.open=false;this.listeners.close?.()},value:''};}
 const document={getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id)},createElement:()=>element(),body:element()};
 const ctx={WainwrightProgress:P,localStorage:store,document,climbed:new Set(initial),progressReadError:null,Blob,URL:{createObjectURL:b=>{ctx.download=b;return 'blob:test'},revokeObjectURL(){}},setTimeout(){},applyFilters(){ctx.refreshed++;},refreshed:0};
 vm.createContext(ctx);
 vm.runInContext(html.match(/function setClimbed\(name,on\).*\nfunction replaceProgress[^\n]+/)[0]+'\n'+html.slice(html.indexOf('// Progress import never writes'),html.indexOf('\ninit();')),ctx);
 return {ctx,store,el:id=>document.getElementById(id),async upload(text){const file=document.getElementById('progressFile');file.files=[{size:text.length,text:async()=>text}];await file.listeners.change();},click(id){document.getElementById(id).listeners.click();}};
}
test('versioned backups cover all 214 existing audit identities exactly',()=>{
 assert.deepEqual(P.CATALOGUE,catalogue.map(s=>({id:s.id,name:s.name})));
 const b=P.backup(names);assert.equal(b.format,'wainwrights-progress');assert.equal(b.version,1);assert.ok(!isNaN(Date.parse(b.exportedAt)));assert.equal(b.completed.length,214);
 assert.deepEqual(P.parse(JSON.stringify(b)).names,[...names].sort());
});
test('similar mountains never alias each other or accept mismatched IDs',()=>{
 for(const group of ['Harter Fell','Red Pike','High Raise']){
  const matches=names.filter(n=>n.includes(group));assert.ok(matches.length>=2);
  for(const name of matches)assert.deepEqual(P.parse(JSON.stringify(P.backup([name]))).names,[name]);
  const b=P.backup([matches[0]]);b.completed[0].name=matches[1];assert.throws(()=>P.parse(JSON.stringify(b)),/identity/);
 }
});
test('duplicates collapse to one completed summit and are reported',()=>{
 const b=P.backup([names[0],names[0]]);assert.equal(b.completed.length,1);b.completed.push(b.completed[0]);
 assert.deepEqual(P.parse(JSON.stringify(b)),{names:[names[0]],duplicates:1});
});
test('invalid, wrong version, wrong app, malformed and unknown records are rejected',()=>{
 for(const value of ['{','null','[]','{}',JSON.stringify({format:'audit',version:1,completed:[]}),JSON.stringify({...P.backup([]),version:2}),JSON.stringify({...P.backup([]),completed:[null]}),JSON.stringify({...P.backup([]),completed:[{id:'unknown',name:names[0]}]}),JSON.stringify({...P.backup([]),completed:['Harter Fell']})])assert.throws(()=>P.parse(value),value);
 assert.throws(()=>P.parse(' '.repeat(1000001)),/1 MB/);
});
test('existing storage round-trips and can restore after browser data is cleared',()=>{
 const s=storage();P.save(s,[names[0],names[4]]);const file=JSON.stringify(P.backup(P.read(s)));s.clear();assert.deepEqual(P.read(s),[]);P.save(s,P.parse(file).names);assert.deepEqual(P.read(s),[names[0],names[4]].sort());
});
test('malformed or unknown existing records are preserved rather than overwritten',()=>{
 const s=storage();for(const raw of ['{','["Unknown summit"]','{}']){s.setItem(P.KEY,raw);assert.throws(()=>P.read(s));assert.equal(s.getItem(P.KEY),raw);}
});
test('preview accurately lists additions, removals and unchanged summits',()=>{
 assert.deepEqual(P.preview([names[0],names[1]],[names[1],names[2]]),{added:[names[2]],removed:[names[0]],kept:[names[1]]});
});
test('download button produces a valid versioned JSON file',async()=>{
 const h=harness([names[0]]);h.click('exportProgress');assert.deepEqual(P.parse(await h.ctx.download.text()).names,[names[0]]);assert.match(h.el('progressMessage').textContent,/1 completed/);
});
test('file selection previews without saving; cancel and Escape preserve progress',async()=>{
 const h=harness([names[0]]),before=h.store.getItem(P.KEY);await h.upload(JSON.stringify(P.backup([names[1]])));
 assert.equal(h.el('progressDialog').open,true);assert.equal(h.store.getItem(P.KEY),before);assert.match(h.el('progressPreview').children[0].textContent,/1 added, 1 removed, 0 kept/);
 h.click('cancelProgress');h.click('confirmProgress');assert.equal(h.store.getItem(P.KEY),before);
 await h.upload(JSON.stringify(P.backup([])));h.el('progressDialog').close();h.click('confirmProgress');assert.equal(h.store.getItem(P.KEY),before);
});
test('confirmed replacement updates persisted progress, live set and rendering; reload survives',async()=>{
 const h=harness([names[0]]);await h.upload(JSON.stringify(P.backup([names[1],names[2]])));h.click('confirmProgress');assert.deepEqual([...h.ctx.climbed],[names[1],names[2]].sort());assert.deepEqual(P.read(h.store),[names[1],names[2]].sort());assert.equal(h.ctx.refreshed,1);assert.equal(h.el('progressDialog').open,false);
});
test('empty backup requires confirmation and deliberately clears progress',async()=>{
 const h=harness([names[0]]);await h.upload(JSON.stringify(P.backup([])));assert.equal(h.ctx.climbed.size,1);assert.match(h.el('progressPreview').children[0].textContent,/0 completed.*1 removed/);h.click('confirmProgress');assert.deepEqual(P.read(h.store),[]);
});
test('invalid upload and failed storage writes leave stored and live progress unchanged',async()=>{
 const h=harness([names[0]]);await h.upload('{');assert.match(h.el('progressMessage').textContent,/not valid JSON/);assert.deepEqual(P.read(h.store),[names[0]]);
 await h.upload(JSON.stringify(P.backup([names[1]])));h.store.setItem=()=>{throw new Error('Storage full')};h.click('confirmProgress');assert.deepEqual([...h.ctx.climbed],[names[0]]);assert.match(h.el('progressMessage').textContent,/Storage full/);
 vm.runInContext(`setClimbed(${JSON.stringify(names[1])},true)`,h.ctx);assert.deepEqual([...h.ctx.climbed],[names[0]]);
});
test('changes in another tab after preview require a fresh review',async()=>{
 const h=harness([names[0]]);await h.upload(JSON.stringify(P.backup([names[1]])));P.save(h.store,[names[2]]);h.click('confirmProgress');assert.deepEqual(P.read(h.store),[names[2]]);assert.match(h.el('progressMessage').textContent,/changed since/);
});
test('statistics, mapping refresh and offline shell integration remain wired',()=>{
 assert.match(html,/function replaceProgress[^\n]+applyFilters\(\)/);assert.match(html,/function applyFilters[^\n]+renderMarkers\(\);renderList\(\);updateStats\(\)/);
 const ctx={climbed:new Set(names.slice(0,107)),document:{getElementById:id=>fields[id]}};const fields={climbedCount:{},progressPct:{}};vm.runInNewContext(html.match(/function updateStats[^\n]+/)[0]+';updateStats()',ctx);assert.equal(fields.climbedCount.textContent,107);assert.equal(fields.progressPct.textContent,'50%');
 assert.match(fs.readFileSync('sw.js','utf8'),/'\.\/progress.js'/);
});
