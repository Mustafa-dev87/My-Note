# Mizan 360 — ميزان 360

تطبيق ويب (PWA) لتنظيم اليوم: عادات، تركيز، مهام، مواقيت الصلاة.

## المميزات
- شاشة ترحيب (3 خطوات): اللغة، اللون، وقوالب عادات جاهزة (طالب / صحة / روحاني)
- تتبع العادات (أيوة/لأ أو بالدقائق) مع سلاسل الالتزام وتعديل كامل للعادة
- رادار "توازن اليوم" ومستويات ونقاط وشارات
- مؤقت بومودورو وقطع التليفون وجلسات التركيز
- ألوان قابلة للتغيير + وضع ليلي/نهاري + عربي/English
- نسخة احتياطية: تصدير واستيراد البيانات (JSON)
- تذكير يومي بالعادات (Notification API)
- مواقيت الصلاة حسب الموقع (Aladhan API) مع تنبيه وقت الصلاة
- اتجاه القبلة بالبوصلة (حساب الاتجاه + مستشعر الموبايل)
- وضع رمضان: عادات رمضان + عدّاد يوم رمضان + الإمساك والإفطار
- 7 ثيمات ألوان (محيط، غابة، ملكي، غروب، وردي، ذهبي) و6 خطوط للاختيار
- نسخة احتياطية على Google Drive (يدوي أو تلقائي يومي)
- يشتغل أوفلاين ويتثبت كتطبيق (Service Worker + Manifest)

## التشغيل محلياً
    python -m http.server 8000
ثم افتح http://localhost:8000

## إعداد النسخ الاحتياطي على Google Drive (اختياري)
الميزة بتفضل مقفولة لحد ما تحط Client ID:
1. ادخل https://console.cloud.google.com وأنشئ مشروع
2. APIs & Services > Library > فعّل **Google Drive API**
3. OAuth consent screen: اختار External وأضف نفسك كـ Test user (أو انشر التطبيق)
4. Credentials > Create credentials > OAuth client ID > Web application
5. في **Authorized JavaScript origins** حط رابط موقعك مثل `https://USERNAME.github.io` (ومعاه `http://localhost:8000` للتجربة)
6. انسخ الـ Client ID وحطه في أول `index.html` في `var GCID=""` ثم ارفع من جديد

النسخة بتتخزن في مجلد التطبيق المخفي (appDataFolder) ومحدش يشوفها في ملفاتك، والصلاحية المطلوبة `drive.appdata` بس.
ملاحظة: تسجيل دخول Google مش بيشتغل جوه تطبيق الأندرويد (WebView)، فاستخدمه من المتصفح أو من التطبيق المثبّت من GitHub Pages. التصدير والاستيراد اليدوي بيشتغلوا في كل مكان.

## النشر على GitHub Pages
1. ارفع كل الملفات في الـ root بتاع الريبو
2. Settings > Pages > Branch: main / root > Save
3. الرابط: https://USERNAME.github.io/REPO/

## تحويله لتطبيق أندرويد (APK)
- تلقائي: ارفع المشروع على GitHub ← تبويب Actions ← "Build Android APK" ← Run workflow. بعد ما يخلص نزّل ملف `Mizan360-apk` من Artifacts وفيه `app-debug.apk` تثبّته على الموبايل.
- أو يدوي: `npm install` ثم `npm run prepare-www` ثم `npx cap add android` و `npx cap sync android` و `npx cap open android`.
- أو اتثبّت كتطبيق مباشرة من المتصفح (Add to Home Screen) بعد النشر على GitHub Pages.

## ملاحظات
- التنبيهات بتشتغل لما التطبيق مفتوح أو في الخلفية.
- البوصلة محتاجة موبايل فيه مستشعر وHTTPS؛ على آيفون بتطلب إذن.
- عدّاد رمضان بيعتمد على تقويم أم القرى وممكن يختلف يوم عن رؤية بلدك.

## الملفات
- `index.html` الواجهة والمنطق كله
- `sw.js` الـ Service Worker (كاش وأوفلاين وإشعارات)
- `manifest.webmanifest` بيانات التثبيت
- `package.json` و `capacitor.config.json` و `.github/workflows/android.yml` لبناء تطبيق الأندرويد
