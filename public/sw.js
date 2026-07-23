/* Arab Fonetika Platformasi — Service Worker (F1: build-ID versiyalash)
 *
 * `__BUILD_ID__` build vaqtida ilova bundle'ining kontent-hashi bilan
 * almashtiriladi (qarang: vite.config.ts → sw-build-id plugin). Shu tufayli
 * har HAQIQIY o'zgarishda sw.js baytlari o'zgaradi → brauzer yangi SW ni
 * ishonchli aniqlaydi va `activate` da eski versiya keshlarini purge qiladi.
 * Bu eski `afp-v1` muammosini (kesh nomi doimiy → hech qachon tozalanmasdi)
 * butunlay hal qiladi.
 *
 * Strategiya:
 *   - HTML / navigatsiya → network-first (doim yangi; offline'da keshdan)
 *   - /assets/* (Vite hashli, immutable) → cache-first (tez, offline-safe;
 *     kesh nomi build-ID bilan → eski assetlar har deploy'da tozalanadi,
 *     stale-tuzoq YO'Q)
 *
 * Majburiy reload YO'Q (Faza 0'dagi favqulodda reload olib tashlandi) —
 * yangi SW eski oynalar yopilgach aktivlashadi; user tabiiy qayta ochganda
 * yangi versiyani oladi. Yumshoq "yangilang" bildirishnomasi F3 da qo'shiladi.
 */
const BUILD_ID = "__BUILD_ID__";
const CACHE = "afp-" + BUILD_ID;
const BASE = "/arabic-fanetika-platformasi-/";

// Offline uchun minimal app-shell.
const SHELL = [BASE, BASE + "index.html"];

self.addEventListener("install", (event) => {
  self.skipWaiting(); // Yangi versiya darhol aktivlashsin, banner kutmasdan
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {})
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // Bu versiyadan boshqa BARCHA keshni o'chiramiz (eski build-ID'lar,
      // shuningdek eski afp-v1 / afp-reset-* qoldiqlari).
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

// "Yangilash" banneri shu xabarni yuboradi — kutayotgan SW darhol
// aktivlashadi (F3). Aks holda yangi SW eski oynalar yopilguncha kutadi.
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  if (!req.url.startsWith(self.location.origin)) return;

  // Hashli assetlar (immutable) → cache-first.
  if (req.url.includes("/assets/")) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        });
      })
    );
    return;
  }

  // HTML / boshqa GET → network-first, offline'da keshdan (yoki app-shell).
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches
          .match(req)
          .then((cached) => cached ?? caches.match(BASE + "index.html"))
          .then((r) => r ?? new Response("offline", { status: 503 }))
      )
  );
});

// Push bildirishnoma (server tomonidan push uchun).
self.addEventListener("push", (event) => {
  const data = event.data
    ? (() => {
        try {
          return event.data.json();
        } catch {
          return {};
        }
      })()
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

// Bildirishnoma bosilganda — mavjud oynani fokuslaydi yoki ilovani ochadi.
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
