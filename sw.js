const V='ricettario-v2',A=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'],X='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(V);await c.addAll(A);try{await c.put(X,await fetch(X,{mode:'no-cors'}))}catch(_){}self.skipWaiting()})())});
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==V)await caches.delete(k);await self.clients.claim()})()));
const OK=u=>u.origin===location.origin||u.hostname==='cdnjs.cloudflare.com'||u.pathname.startsWith('/firebasejs/');
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!OK(new URL(e.request.url)))return;e.respondWith((async()=>{const c=await caches.open(V),m=await c.match(e.request,{ignoreSearch:true});
const n=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque'))c.put(e.request,r.clone());return r}).catch(()=>null);
return m||(await n)||(e.request.mode==='navigate'?await c.match('./index.html'):Response.error())})())});
