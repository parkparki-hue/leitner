# لایتنر (PWA)

## ساختار پوشه در ریپو
```
apps/leitner/
├─ index.html
├─ manifest.webmanifest
├─ sw.js
└─ icons/ (180، 192، 512، maskable-512)
```
همه مسیرها نسبی هستند، پس برنامه در هر زیرمسیر (مثلاً `/apps/leitner/`) کار می‌کند و `scope` آن مستقل است.

## انتشار
1. پوشه را در ریپوی apps بگذارید و GitHub Pages را فعال کنید (HTTPS لازم است).
2. آدرس `https://USER.github.io/REPO/apps/leitner/` را به‌عنوان `url` آیتم در `index.json` کاتالوگ بدهید.

## به‌روزرسانی
- هر بار فایل‌ها را تغییر دادید، مقدار `V` در `sw.js` را بالا ببرید (مثلاً `leitner-v2`).
- کاربر پیام «نسخه جدید آماده است» می‌بیند و با یک ضربه به‌روز می‌شود.

## تست محلی
service worker فقط روی HTTPS یا localhost کار می‌کند:
`python3 -m http.server 8000` سپس `http://localhost:8000`

## سازگاری با داده قبلی
کلیدهای localStorage همان نسخه قبلی هستند (`leitner_m_*`)، پس پیشرفت کاربران حفظ می‌شود.
