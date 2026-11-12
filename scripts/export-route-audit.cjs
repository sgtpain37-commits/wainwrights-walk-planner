// Offline, deterministic audit. Reads planner helpers; never mutates planner data.
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {execFileSync}=require('node:child_process');
const {loadRouting}=require('../tests/load-routing.cjs');
const ROOT=path.resolve(__dirname,'..');
const OUTPUT='docs/wainwrights-audit.v1.json';
const INPUTS=['docs/route-mapping.md','index.html','data/audit/wainwrights.csv','data/audit/catalogue-source.json','data/audit/associations.json','tests/coniston-guide-sources.json','tests/other-guide-sources.json','tests/collision-guide-sources.json','scripts/audit-route-locations.cjs','tests/load-routing.cjs','scripts/export-route-audit.cjs'];
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const json=p=>JSON.parse(read(p));
const plain=x=>JSON.parse(JSON.stringify(x));
const id=s=>crypto.createHash('sha256').update(s).digest('hex').slice(0,16);
// RFC4180-style quoted fields, escaped quotes, CRLF and embedded newlines.
function parseCSV(text){
 const rows=[];let row=[],field='',quoted=false;
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(c==='"'){if(quoted&&text[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}
  else if(!quoted&&(c===','||c==='\n')){row.push(field.replace(/\r$/,''));field='';if(c==='\n'){rows.push(row);row=[];}}
  else field+=c;
 }
 if(quoted)throw Error('Unterminated CSV quote');
 if(field||row.length){row.push(field.replace(/\r$/,''));rows.push(row);}
 const headers=rows.shift();
 return rows.filter(r=>r.some(Boolean)).map(r=>{if(r.length!==headers.length)throw Error('CSV column count');return Object.fromEntries(headers.map((h,i)=>[h,r[i]]));});
}
function buildAudit(){
 const catalogue=parseCSV(read('data/audit/wainwrights.csv'));
 if(catalogue.length!==214||new Set(catalogue.map(r=>r.name)).size!==214)throw Error('Expected 214 unique summits');
 const {run}=loadRouting({},read('index.html'));
 const evaluate=(fn,value)=>plain(run(`${fn}(${JSON.stringify(value)})`));
 const keys=plain(run('Object.keys({...ROUTE_STATS,...ROUTE_VARIANTS})'));
 const aliases=plain(run('ROUTE_ALIASES'));
 const associations=json('data/audit/associations.json');
 const fixtures=['tests/coniston-guide-sources.json','tests/other-guide-sources.json','tests/collision-guide-sources.json'].flatMap(fixture=>json(fixture).map(f=>({...f,fixture})));
 const collisions=JSON.parse(execFileSync(process.execPath,[path.join(ROOT,'scripts/audit-route-locations.cjs'),path.join(ROOT,'index.html')],{cwd:ROOT,encoding:'utf8'})).map(g=>({...g,id:'collision-'+id(g.fell+'\n'+g.routes.join('\n')),status:'unresolved'}));
 for(const [name,a] of Object.entries(associations)){
  if(!catalogue.some(r=>r.name===name)||!keys.includes(a.routeKey))throw Error('Invalid explicit association: '+name);
 }
 const summits=catalogue.map(c=>{
  const summitId='summit-'+id(c.name);
  const plannerKey=aliases[evaluate('routeKey',c.name)]||evaluate('routeKey',c.name);
  const current=evaluate('routeVariantsFor',{name:c.name});
  const mapping=associations[c.name];
  const key=current.length?plannerKey:mapping?.routeKey||null;
  const records=key?evaluate('routeVariantsFor',{name:key}):[];
  const collisionIds=collisions.filter(g=>g.fell===key).map(g=>g.id);
  const ascents=records.map(r=>{
   const start=plain(run(`embeddedStartFor(${JSON.stringify(r.route)},${JSON.stringify(key)})`));
   const guides=plain(run(`routeViaPoints(${JSON.stringify(r.route)},${JSON.stringify(key)})`));
   const declaredSource=plain(run(`routeGuideSource(${JSON.stringify(r.route)},${JSON.stringify(key)})`));
   // A shared route string is not sufficient provenance: match the coordinates too.
   const evidence=fixtures.find(f=>(!f.fell||f.fell===key)&&f.route===r.route&&f.source===declaredSource?.source&&JSON.stringify(f.guides.map(p=>[p.lat,p.lon]))===JSON.stringify(guides.map(p=>[p.lat,p.lon])));
   const sourcedStart=!!(start&&evidence?.start&&JSON.stringify(evidence.start)===JSON.stringify([start.lat,start.lon]));
   const missingEvidence=[];
   if(!guides.length)missingEvidence.push('route_specific_guide_coordinates');
   else if(!evidence)missingEvidence.push('guide_coordinate_provenance');
   if(!start)missingEvidence.push('resolved_start_coordinates');
   else if(!sourcedStart)missingEvidence.push('start_coordinate_provenance');
   if(!evidence)missingEvidence.push('route_specific_source_reference');
   missingEvidence.push('independent_full_walking_line_verification');
   return {
    id:'ascent-'+id(summitId+'\n'+r.route),published:{...r,statisticsSource:{attribution:'Wainwright Routes (planner attribution)',url:'https://www.wainwrightroutes.co.uk/',scope:'general attribution; not route-specific statistics verification'}},
    start:{text:evaluate('routeStartText',r.route),coordinates:start?{lat:start.lat,lon:start.lon}:null,resolution:start?start.source:'unresolved_place_name_fallback',fallbackQuery:start?null:evaluate('routeStartText',r.route)+', Lake District, Cumbria, UK',normalizedFallbackKey:start?null:evaluate('normPlace',evaluate('routeStartText',r.route)),verification:sourcedStart?'source_backed_coordinates':start?'embedded_coordinates_without_source_evidence':'unresolved',source:sourcedStart?evidence.source:null},
    guideWaypoints:guides.map((p,i)=>({...p,order:i+1,verification:evidence?'source_backed_coordinates':'embedded_coordinates_without_source_evidence',source:evidence?.source||null,sampleIndex:evidence?.guides[i].index??null})),
    sourceReferences:evidence?[{url:evidence.source,retrieved:evidence.retrieved,scope:'sampled guide coordinates; not full walking line verification',fixture:evidence.fixture}]:[],
    declaredGuideSource:declaredSource?.source||null,
    generatedWalkingLine:{verification:'unverified',geometry:null,reason:declaredSource?.previewOnlyReason||'Generated on demand by the planner; guide provenance does not verify the connecting walking line.'},
    collisionIds:collisions.filter(g=>g.fell===key&&g.routes.includes(r.route)).map(g=>g.id),missingEvidence
   };
  });
  return {id:summitId,name:c.name,alternativeNames:[...new Set([key,...Object.keys(aliases).filter(a=>aliases[a]===key)].filter(n=>n&&n!==c.name))],catalogue:{...c,heightMetres:Number(c.heightMetres),heightFt:Number(c.heightFt),latitude:Number(c.latitude),longitude:Number(c.longitude)},
   association:{status:current.length?'associated':mapping?'naming_mismatch':'missing_route_record',plannerResolves:!!current.length,routeKey:key,basis:current.length?'Existing planner lookup':mapping?.basis||'No route record identified in this repository; does not claim no real-world route exists.',proposedCorrection:!current.length&&mapping?{type:'explicit_name_association',status:'proposed',routeKey:key}:null},ascents,collisionIds,missingEvidence:records.length?[]:['repository_published_ascent_record','route_specific_source_reference']};
 });
 const used=new Set(summits.map(s=>s.association.routeKey));
 return {schemaVersion:'1.0.0',coordinateOrder:'latitude, longitude',catalogueSource:json('data/audit/catalogue-source.json'),inputs:INPUTS.map(p=>({path:p,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT,p))).digest('hex')})),
  summary:{summits:summits.length,associated:summits.filter(s=>s.association.status==='associated').length,namingMismatches:summits.filter(s=>s.association.status==='naming_mismatch').length,missingRouteRecords:summits.filter(s=>s.association.status==='missing_route_record').length,publishedAscents:summits.reduce((n,s)=>n+s.ascents.length,0),unresolvedCollisionPairs:collisions.reduce((n,g)=>n+g.routes.length*(g.routes.length-1)/2,0)},
  repositorySourceReferences:[...new Set([...read('docs/route-mapping.md').matchAll(/https:\/\/www\.wainwrightroutes\.co\.uk\/[^\s)]+/g)].map(m=>m[0]))].map(url=>({url,recordedIn:'docs/route-mapping.md',scope:'Existing documentation reference; no new retrieval or full-line verification'})),
  summits,routingInputCollisions:collisions,unassociatedRouteKeys:keys.filter(k=>!used.has(k))};
}
function serialize(){return JSON.stringify(buildAudit(),null,2)+'\n';}
if(require.main===module){
 const result=serialize();
 if(process.argv.includes('--check')){if(read(OUTPUT)!==result){console.error('Audit export is stale. Run node scripts/export-route-audit.cjs --write');process.exitCode=1;}}
 else if(process.argv.includes('--write'))fs.writeFileSync(path.join(ROOT,OUTPUT),result);
 else process.stdout.write(result);
}
module.exports={buildAudit,serialize,parseCSV};
