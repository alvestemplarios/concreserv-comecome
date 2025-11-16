const CACHE_NAME = "concreserv-cache-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",

  // pastas do jogo
  "./img/truck_real.png",
  "./img/truck_pixel.png",
  "./img/truck_up.png",
  "./img/truck_down.png",
  "./img/ghost_red.png",
  "./img/ghost_blue.png",
  "./img/ghost_pink.png",
  "./img/ghost_orange.png",

  "./snd/eat.wav",
  "./snd/move.wav",
  "./snd/death.wav",
  "./snd/victory.wav"
];

// INSTALAÇÃO DO SW
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ATIVAÇÃO
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// INTERCEPTA REQUISIÇÕES
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((resp) => resp || fetch(evt.request))
  );
});
