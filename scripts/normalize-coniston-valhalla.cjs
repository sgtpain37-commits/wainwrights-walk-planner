#!/usr/bin/env node
'use strict';
// Normalize recorded outputs from scripts/check-live-routing.cjs.
// Never treat Valhalla geometry as independently verified walking guidance.
const fs=require('node:fs');
const {decodePolyline6}=require('./prepare-coniston-valhalla.cjs');
function normalize(record){
 if(!record||typeof record.route!=='string'||!record.route.trim())throw Error('Missing route name');
 if(!Array.isArray(record.shapes)||!record.shapes.length)throw Error('Missing route shapes');
 const points=[];
 for(const shape of record.shapes){
  const leg=decodePolyline6(shape);
  if(points.length&&points.at(-1)[0]===leg[0][0]&&points.at(-1)[1]===leg[0][1])leg.shift();
  points.push(...leg);
 }
 if(points.length<2)throw Error('Insufficient route geometry');
 return {name:record.route,generated:points,summary:record.summary??null,verification:'unverified_generated_route'};
}
function parseJsonLines(text){
 const records=text.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
 if(!records.length)throw Error('No routing records');
 return {routes:records.map((line,i)=>{
  let record;try{record=JSON.parse(line);}catch{throw Error('Invalid JSON at line '+(i+1));}
  return normalize(record);
 })};
}
if(require.main===module){
 try{
  if(process.argv.length!==3)throw Error('Usage: node scripts/normalize-coniston-valhalla.cjs captured.jsonl');
  console.log(JSON.stringify(parseJsonLines(fs.readFileSync(process.argv[2],'utf8')),null,2));
 }catch(e){console.error(e.message);process.exitCode=1;}
}
module.exports={normalize,parseJsonLines};
