const fs=require('node:fs');
const vm=require('node:vm');
function loadRouting(extra={},html=fs.readFileSync('index.html','utf8')){
 const context=vm.createContext({window:{},document:{querySelectorAll:()=>[],getElementById:()=>null,body:{classList:{remove(){}}}},navigator:{},console,...extra});
 const clean=html.match(/function cleanName\(name\)\{[^\n]+/)[0];
 vm.runInContext(clean+'\n'+html.match(/function havKm\([^\n]+/)[0]+'\n'+html.slice(html.indexOf('const ROUTE_STATS='),html.indexOf('const PARKING_HUBS=')),context);
 return {context,run:code=>vm.runInContext(code,context)};
}
module.exports={loadRouting};
