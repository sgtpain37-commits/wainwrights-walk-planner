const VERSION='wainwrights-v13-1';
const APP_CACHE=`${VERSION}-app`;
const RUNTIME_CACHE=`${VERSION}-runtime`;
const APP_SHELL=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(APP_CACHE).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>!k.startsWith(VERSION)).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET') return;
  const url=new URL(req.url);
  // Navigation/app files: network first, cached fallback.
  if(req.mode==='navigate' || url.origin===self.location.origin){
    event.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(APP_CACHE).then(c=>c.put(req,copy));return res}).catch(()=>caches.match(req).then(r=>r||caches.match('./index.html'))));
    return;
  }
  // Runtime data/CDN requests: cache successful CORS responses after first use.
  // Map tiles and routing responses deliberately remain network-only so we do not imply reliable offline maps/navigation.
  if(url.hostname==='raw.githubusercontent.com' || url.hostname==='unpkg.com'){
    event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{if(res.ok||res.type==='opaque'){const copy=res.clone();caches.open(RUNTIME_CACHE).then(c=>c.put(req,copy))}return res})));
  }
});
