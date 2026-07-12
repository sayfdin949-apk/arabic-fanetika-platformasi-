/* Arab Fonetika Platformasi — Service Worker */
const CACHE = "afp-v1";
const BASE = "/arabic-fanetika-platformasi-/";

// App-shell files to pre-cache
const SHELL = [BASE, BASE + "index.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL))
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

// Network-first for JS/CSS bundles (they have hashed names),
// cache-first fallback for everything else
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request).then((res) => {
        if (res.ok) {
          caches.open(CACHE).then((c) => c.put(event.request, res.clone()));
        }
        return res;
      }).catch(() => cached ?? new Response("offline", { status: 503 }));

      // For hashed assets (contain "assets/") use cache immediately if available
      if (cached && event.request.url.includes("/assets/")) return cached;
      return network;
    })
  );
});

// Push notification (for future server-side push)
self.addEventListener("push", (event) => {
  const data = event.data
    ? (() => { try { return event.data.json(); } catch { return {}; } })()
    : {};
  event.waitUntil(
    self.registration.showNotification(data.title || "Arab Fonetika", {
      body: data.body || "Yangi bildirishnoma",
      icon: BASE + "icon.svg",
      badge: BASE + "icon.svg",
      tag: data.tag || "afp",
      data: { url: data.url || BASE },
    })
  );
});

// Notification click — focus existing tab or open app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = event.notification.data?.url || BASE;
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.startsWith(self.location.origin + BASE) && "focus" in c) {
          return c.focus();
        }
      }
      return clients.openWindow(target);
    })
  );
});
