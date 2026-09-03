const C="volluto-estoque-v2",A=["./","./index.html","./cloud-config.js","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A))));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
self.addEventListener("push",e=>{
  let d={title:"Volluto Estoque",body:"Há uma atualização de estoque."};
  try{d=e.data.json()}catch(_){}
  e.waitUntil(self.registration.showNotification(d.title||"Volluto Estoque",{body:d.body||"",icon:"icon-192.png",badge:"icon-192.png",data:d.url||"./"}));
});
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data||"./"));
});
