# ⚡ Zainstein — Foundations of Software Engineering & AI

صفحة تعريف وتسجيل عربية (RTL) لكورس **Foundations of Software Engineering & AI** بتصميم **Neo-Brutalism** جريء ومرح وموجّه للطلاب.

---

## 🎨 اتجاه ومواصفات التصميم

- **الأسلوب:** Neo-Brutalism (خلفية ورقية منقّطة فاتحة، حدود سوداء سميكة، ظلال صلبة، كروت واضحة).
- **الألوان:** أصفر أساسي (`#ffe15a`)، أزرق (`#435bff`)، مرجاني (`#ff7866`)، نعناعي (`#b9edcf`)، ليلكي (`#d9c6ff`)، حبر داكن (`#171717`)، وورق فاتح (`#fff9ed`).
- **اللغة والاتجاه:** لغة عربية كاملة بدعم RTL وخط Cairo.
- **التجاوب:** متجاوب بالكامل مع الهواتف والشاشات اللوحية وسطح المكتب، مع مراعاة تفادي التمرير الأفقي وتسهيل تجربة النموذج.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **React 18** — بناء الواجهة
- **Vite** — بيئة التطوير والبناء السريع
- **CSS3 / Neo-Brutalism Stylesheet** — تنسيقات متقدمة ومتجاوبة في `src/index.css`
- **Supabase** — قاعدة بيانات التسجيلات مع تفعيل Row Level Security (RLS)
- **EmailJS** — إرسال إشعارات فورية بالبريد عند تسجيل مشترك جديد

---

## 📁 هيكل المشروع الرئيسي

```text
zainstein-landing/
├── public/
│   ├── course-cover.webp       # غلاف الكورس الرسمي
│   ├── zainstein-logo.png      # شعار Zainstein
│   └── zainstein-favicon.png   # أيقونة التبويب
├── src/
│   ├── App.jsx                 # الصفحة الرئيسية، الأقسام، ومنطق النموذج والتسجيل
│   ├── index.css               # نظام التنسيقات والألوان والاستجابة (Neo-Brutalism)
│   └── main.jsx                # نقطة تشغيل التطبيق
├── supabase/
│   └── migrations/
│       └── 20261028000000_course_registrations.sql # هيكل جدول التسجيلات وسياسات RLS
├── .env.example                # نموذج متغيرات البيئة
├── SUPABASE_SETUP.md           # دليل إعداد Supabase وEmailJS بالتفصيل
├── HANDOFF_BRIEF.md            # بريف تسليم وتفاصيل الحالة للمشروع
├── index.html                  # ملف HTML الرئيسي ومكتبة EmailJS
└── package.json                # التبعيات وأوامر التشغيل
```

> [!NOTE]
> التطبيق النشط والمكونات الفعلية مدمجة بالكامل ومحسّنة في `src/App.jsx`. المكونات القديمة داخل `src/components/` والتوثيقات السابقة تمثل إصدارات قديمة موروثة.

---

## 🚀 البدء والتشغيل المحلي

### 1. تثبيت الحزم
```bash
npm install
```

### 2. تشغيل سيرفر التطوير
```bash
npm run dev
```

### 3. بناء المشروع للإنتاج
```bash
npm run build
```

---

## 🔐 إعداد قاعدة البيانات والبريد

النموذج يرسل بيانات المسجل إلى جدول `course_registrations` في Supabase، ثم يُطلق إشعاراً عبر EmailJS.

### 1. متغيرات البيئة (`.env`)
أنشئ ملف `.env` محلياً (لا ترفعه إلى المستودع):
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key

# اختياري لتجاوز القيم الافتراضية
VITE_EMAILJS_PUBLIC_KEY=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_ADMIN_EMAIL=
```

### 2. قاعدة بيانات Supabase
1. افتح [Supabase Dashboard](https://supabase.com/dashboard) وأنشئ مشروعاً جديداً.
2. شغّل الـ Migration الموجود في `supabase/migrations/20261028000000_course_registrations.sql` من الـ SQL Editor.
3. انسخ Project URL والمفتاح القابل للنشر (Publishable Key / Anon Key) وضعهما في `.env` وفي إعدادات Vercel.
4. لمزيد من التفاصيل راجع [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md).

---

## 📋 سياسة الأمان والبيانات

- تم تأمين الجدول بسياسات **Row Level Security (RLS)** تسمح للزوار بالإدخال فقط (`INSERT`) ولا تمنح صلاحيات القراءة (`SELECT`) أو التعديل أو الحذف من المتصفح.
- إدارة التسجيلات ومتابعة المشتركين تتم حصرياً عبر لوحة تحكم Supabase في **Table Editor → course_registrations**.
- لا يتم تضمين أي مفتاح سري (`service_role` أو `secret`) في كود الواجهة أو متغيرات `VITE_`.

---

## 📄 الترخيص وحقوق الملكية

2026 © **Zainstein** — تصميم وتطوير: **Ahmed Al Malah**
