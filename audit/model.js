(function(root){
'use strict';
const statuses=['unreviewed','investigating','proposed','ready_for_pr','in_pr','merged','dismissed'];
function validateData(d){
 if(!d || !/^1\.\d+\.\d+$/.test(d.schemaVersion)) throw Error('Unsupported audit schema. Use a compatible 1.x export; your reviews have been retained.');
 if(!Array.isArray(d.summits)||!Array.isArray(d.routingInputCollisions)) throw Error('Missing summit or collision records.');
 const ids=new Set(); const claim=id=>{if(typeof id!=='string'||!id||ids.has(id))throw Error('Missing or duplicate record ID.');ids.add(id);};
 for(const s of d.summits){claim(s.id);if(typeof s.name!=='string'||!s.catalogue||!['associated','naming_mismatch','missing_route_record'].includes(s.association?.status)||!Array.isArray(s.ascents)||!Array.isArray(s.collisionIds))throw Error('Invalid summit record.');
 for(const a of s.ascents){claim(a.id);if(typeof a.published?.route!=='string'||!a.start||!Array.isArray(a.guideWaypoints)||!Array.isArray(a.missingEvidence)||!Array.isArray(a.collisionIds))throw Error('Invalid ascent record.');}}
 for(const c of d.routingInputCollisions){claim(c.id);if(!Array.isArray(c.routes)||typeof c.fell!=='string')throw Error('Invalid collision record.');}return d;
}
function allIds(d){return new Set(d.summits.flatMap(s=>[s.id,...s.ascents.map(a=>a.id)]).concat(d.routingInputCollisions.map(c=>c.id)));}
function matches(s,{search='',association='',verification='',review=''}={},records={}){
 const asc=s.ascents;
 return (!search||JSON.stringify([s.name,s.alternativeNames,s.association.routeKey,asc.map(a=>a.start.text)]).toLowerCase().includes(search.toLowerCase()))&&(!association||s.association.status===association)&&(!review||(records[s.id]?.status||'unreviewed')===review)&&(!verification||
 (verification==='source_guides'&&asc.some(a=>a.guideWaypoints.some(w=>w.verification==='source_backed_coordinates')))||
 (verification==='no_guides'&&asc.some(a=>!a.guideWaypoints.length))||
 (verification==='gaps'&&((s.missingEvidence||[]).length>0||asc.some(a=>a.missingEvidence.length)))||
 (verification==='unverified'&&asc.some(a=>a.generatedWalkingLine?.verification==='unverified')));
}
function safeUrl(value){try{const u=new URL(value);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;}}
function prNumber(value){try{const u=new URL(value);const m=u.pathname.match(/^\/sgtpain37-commits\/wainwrights-walk-planner\/pull\/(\d+)\/?$/);return u.protocol==='https:'&&u.hostname==='github.com'&&m?Number(m[1]):null;}catch{return null;}}
function validateReviews(d){
 if(d?.reviewSchemaVersion!==1||!d.records||typeof d.records!=='object'||Array.isArray(d.records))throw Error('Invalid review backup.');
 const out=Object.create(null);
 for(const [id,r] of Object.entries(d.records)){
 if(!/^(summit|ascent|collision)-[a-f0-9]{16}$/.test(id)||!r||!statuses.includes(r.status)||['correction','evidence','pr','updatedAt','label'].some(k=>typeof r[k]!=='string'))throw Error('Invalid review record.');
 out[id]={status:r.status,correction:r.correction,evidence:r.evidence,pr:r.pr,updatedAt:r.updatedAt,label:r.label};}return out;
}
function mergeReviews(current,incoming){const result=Object.assign(Object.create(null),current);for(const [id,r] of Object.entries(incoming)){if(result[id]&&['status','correction','evidence','pr','updatedAt','label'].some(k=>result[id][k]!==r[k]))throw Error('Conflicting review for '+id+'. No records were imported; export your current backup before reconciling.');result[id]=r;}return result;}
function checklist(records,ids){return '# Wainwrights audit review checklist\n\nReview decisions only. Imported audit data and walking-line verification remain unchanged.\n\n'+Object.entries(records).map(([id,r])=>`- [${r.status==='merged'?'x':' '}] ${r.label} (${id}) — ${r.status}${ids.has(id)?'':' [not in current export; reconcile identity]'}\n  Proposed correction: ${r.correction||'—'}\n  Evidence: ${r.evidence||'—'}\n  Pull request: ${r.pr||'—'}\n  Updated: ${r.updatedAt}\n`).join('\n');}
const api={statuses,validateData,allIds,matches,safeUrl,prNumber,validateReviews,mergeReviews,checklist};if(typeof module==='object')module.exports=api;else root.AuditModel=api;
})(globalThis);
