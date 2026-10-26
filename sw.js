const V='bowl-v1',A=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'],X='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(V);await Promise.all(A.map(async u=>{try{await c.put(u,await fetch(u,{cache:'reload'}))}catch(_){}}));try{await c.put(X,await fetch(X,{mode:'no-cors'}))}catch(_){}self.skipWaiting()})())});
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==V)await caches.delete(k);await self.clients.claim()})()));
const OK=u=>u.origin===location.origin||u.hostname==='cdnjs.cloudflare.com'||u.pathname.startsWith('/firebasejs/');
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||!OK(u))return;
e.respondWith((async()=>{const c=await caches.open(V);
if(u.origin===location.origin){
try{const n=await Promise.race([fetch(r.url,{cache:'no-cache'}),new Promise((_,j)=>setTimeout(j,4000))]);if(n.ok)c.put(r.url,n.clone());return n}
catch(_){return(await c.match(r.url,{ignoreSearch:true}))||(r.mode==='navigate'?await c.match('./index.html'):Response.error())}}
const m=await c.match(r);if(m)return m;
try{const n=await fetch(r);if(n&&(n.ok||n.type==='opaque'))c.put(r,n.clone());return n}catch(_){return Response.error()}})())});
