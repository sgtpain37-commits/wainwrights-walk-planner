const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const audit=require('../docs/wainwrights-audit.v1.json');
const html=fs.readFileSync('index.html','utf8');
const summits=audit.summits.map(s=>({name:s.name,...s.catalogue}));
function searchHarness(){
 const fields={search:{value:''},heightFilter:{value:'all'},sort:{value:'name'},shownCount:{}};
 const context=vm.createContext({document:{getElementById:id=>fields[id]},fells:summits,filtered:[],currentGrade:'all',grade:()=> 'moderate',renderMarkers(){},renderList(){},updateStats(){}});
 vm.runInContext(html.match(/function cleanName\(name\)\{[^\n]+/)[0]+'\n'+html.match(/function applyFilters\(\)\{[^\n]+/)[0],context);
 return {context,fields,display:name=>vm.runInContext(`cleanName(${JSON.stringify(name)})`,context),search(q){fields.search.value=q;vm.runInContext('applyFilters()',context);assert.equal(fields.shownCount.textContent,context.filtered.length);return Array.from(context.filtered);}};
}
test('complete displayed and raw names find the same original catalogue object for all 214 summits',()=>{
 const h=searchHarness();assert.equal(summits.length,214);
 for(const f of summits){for(const query of [f.name,h.display(f.name)])assert.ok(h.search(query).includes(f),query);}
});
test('Blencathra full display, raw name, short names, case and surrounding spaces work',()=>{
 const h=searchHarness();const f=summits.find(f=>f.name==='Blencathra-Hallsfell Top');assert.ok(f);
 for(const q of ['Blencathra — Hallsfell Top','Blencathra-Hallsfell Top','Blencathra','Hallsfell Top','  BLENCATHRA — HALLSFELL TOP  '])assert.deepEqual(h.search(q),[f]);
});
test('every previously matching substring and grid reference remains searchable',()=>{
 const h=searchHarness();
 for(const f of summits){for(const q of [f.name.slice(0,4),f.name.slice(-5),f.gridReference,f.gridReference.slice(0,4)]){
  const previous=summits.filter(s=>s.name.toLowerCase().includes(q.toLowerCase())||(s.gridReference||'').toLowerCase().includes(q.toLowerCase()));
  const actual=h.search(q);for(const match of previous)assert.ok(actual.includes(match),q);
 }}assert.equal(h.search('').length,214);
});
test('qualified mountain names stay distinct without fuzzy matching',()=>{
 const h=searchHarness();
 for(const name of ['Harter Fell (Eskdale)','Harter Fell (Mardale)'])assert.deepEqual(h.search(name).map(f=>f.name),[name]);
 assert.equal(h.search('Blencathraa').length,0);
 assert.equal(h.search('Harter Fell (Other)').length,0);
});
test('height and grade filters still apply to displayed-name searches',()=>{
 const h=searchHarness();h.fields.search.value='Blencathra — Hallsfell Top';h.fields.heightFilter.value='under500';
 assert.equal(h.search(h.fields.search.value).length,0);
 h.fields.heightFilter.value='all';h.context.currentGrade='easy';assert.equal(h.search(h.fields.search.value).length,0);
});
