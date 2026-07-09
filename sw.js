const CACHE='gymtrack-v7';
const ASSETS=['.','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  e.respondWith(fetch(e.request).then(r=>{
    if(e.request.method==='GET'&&r.ok&&new URL(e.request.url).origin===location.origin){
      const cl=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cl));
    }
    return r;
  }).catch(()=>caches.match(e.request)));
});
