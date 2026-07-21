/* Arab Fonetika Platformasi — Service Worker
 *
 * FAVQULODDA FLUSH (2026-07-21):
 * Eski keshda "qotib qolgan" foydalanuvchilarni majburan yangi versiyaga
 * o'tkazadi. Oldingi SW (afp-v1) uch sababga ko'ra userlarni turli
 * versiyalarda ushlab qolardi:
 *   1) kesh nomi doimiy edi → hech qachon tozalanmasdi;
 *   2) assetlar "cache-first" edi → eski bundle abadiy keshdan berilardi;
 *   3) HTML tarmoq uzilishida eski keshdan berilardi → eski assetlarga
 *      ishora qilib, ilovani eski versiyada muzlatib qo'yardi.
 *
 * Bu versiya: (a) BARCHA keshni o'chiradi, (b) ochiq oynalarni bir marta
 * qayta yuklaydi, (c) endi HECH QACHON cache-first ishlatmaydi (network-first;
 * kesh faqat oflayn zaxira). Shu tufayli "biri eski, biri yangi" holati
 * takrorlanmaydi.
 *
 * ⚠️ Reload loop yo'q: bu fayl bir marta deploy qilingach, keyingi
 * yuklashlarda sw.js baytlari BIR XIL bo'ladi → brauzer yangi SW ni
 * o'rnatmaydi → activate qayta ishlamaydi → qayta reload bo'lmaydi.
 */
const CACHE = "afp-reset-20260721";
const BASE = "/arabic-fanetika-platformasi-/";

self.addEventListener("install", () => {
  // Kutish navbatisiz darhol aktiv bo'lamiz.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // 1) BARCHA keshni o'chiramiz (afp-v1 va boshqa har qanday qoldiq).
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));

      // 2) Ochiq sahifalarni darhol nazoratga olamiz.
      await self.clients.claim();

      // 3) Ochiq oynalarni bir marta qayta yuklaymiz — ular yangi
      //    index.html + yangi bundle'ni oladi. Har bir client alohida
      //    try/catch bilan o'raladi: bittasi xato bersa qolganlari
      //    baribir yangilanadi.
      const wins = await self.clients.matchAll({ type: "window" });
      for (const w of wins) {
        try {
          if ("navigate" in w) w.navigate(w.url);
        } catch {
          /* e'tiborsiz qoldiramiz */
        }
      }
    })()
  );
});

// Network-first: eski keshni HECH QACHON birinchi bo'lib bermaymiz.
// Muvaffaqiyatli javob keshga zaxiraga yoziladi, faqat oflayn holatda ishlatiladi.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(event.request, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches
          .match(event.request)
          .then((cached) => cached ?? new Response("offline", { status: 503 }))
      )
  );
});

// Push bildirishnoma (server tomonidan push uchun) — o'zgarishsiz saqlandi.
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
