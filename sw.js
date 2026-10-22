// با هر تغییر مهم فایل‌ها، عدد نسخه را بالا ببرید
const V = "leitner-v2";
const FILES = ["./", "./index.html", "./manifest.webmanifest",
  "./icons/icon-180.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png"];

self.addEventListener("install", e => e.waitUntil(caches.open(V).then(c => c.addAll(FILES))));

self.addEventListener("activate", e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));

// نسخه جدید تا تأیید کاربر منتظر می‌ماند
self.addEventListener("message", e => { if (e.data === "SKIP_WAITING") self.skipWaiting(); });

// stale-while-revalidate: سریع و آفلاین، و در پس‌زمینه تازه می‌شود
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET" || new URL(r.url).origin !== location.origin) return;
  // فروشگاه دسته‌ها: اول شبکه (تازه)، آفلاین از کش
  if (new URL(r.url).pathname.includes("/decks/")) {
    e.respondWith(fetch(r).then(res => { if (res.ok) { const c = res.clone(); caches.open(V).then(x => x.put(r, c)); } return res; })
      .catch(() => caches.match(r)));
    return;
  }
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(hit => {
    const net = fetch(r).then(res => {
      if (res.ok) { const c = res.clone(); caches.open(V).then(x => x.put(r, c)); }
      return res;
    }).catch(() => hit || caches.match("./index.html"));
    e.waitUntil(net.catch(() => {}));
    return hit || net;
  }));
});
