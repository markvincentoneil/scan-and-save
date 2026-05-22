const CACHE = "scan-and-save-v2-app-17";

const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/html5-qrcode.min.js",
  "https://unpkg.com/@zxing/library@0.21.3/umd/index.min.js",
];

function isGoUpcProxyRequest(url) {
  return url.pathname.endsWith("/goupc-proxy") || url.pathname.endsWith("goupc-proxy");
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (isGoUpcProxyRequest(url)) {
    const code = url.searchParams.get("q");
    if (!code) {
      event.respondWith(Response.error());
      return;
    }
    const target =
      "https://go-upc.com/search?q=" + encodeURIComponent(code.trim());
    event.respondWith(
      fetch(target)
        .then(function (res) {
          if (!res.ok) return Response.error();
          return res.text().then(function (html) {
            return new Response(html, {
              status: 200,
              headers: { "Content-Type": "text/html; charset=utf-8" },
            });
          });
        })
        .catch(function () {
          return Response.error();
        })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => {
        const sameOrigin = url.origin === self.location.origin;
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          if (sameOrigin && event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
          return Response.error();
        });
      })
  );
});
