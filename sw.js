const CACHE_NAME = 'braincode-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// Installation : Mise en cache des ressources de base
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activation et nettoyage des anciens caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    })
  );
});

// Stratégie : Réseau d'abord, sinon Cache (pour garantir les updates de l'IA)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
