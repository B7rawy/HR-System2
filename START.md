# تشغيل النظام - HR Time Tracker v2.2.1

## الخطوات السريعة للتشغيل 🚀

### 1️⃣ تشغيل الخادم الخلفي
```bash
cd backend
npm start
```

### 2️⃣ تشغيل تطبيق سطح المكتب
```bash
# في مجلد جديد في Terminal
npm start
```

### 3️⃣ تشغيل الواجهة الأمامية (اختياري)
```bash
cd frontend
npm start
```

## معلومات تسجيل الدخول 🔐

### للتطبيق المكتبي:
- **الخادم**: `http://localhost:5001`
- **اسم المستخدم**: `admin` 
- **كلمة المرور**: `123456`

### للواجهة الويب:
- **الرابط**: `http://localhost:3000`
- **اسم المستخدم**: `admin`
- **كلمة المرور**: `123456`

## حالة الإصلاحات ✅

### تم إصلاحه في v2.2.1:
- ✅ خطأ `Notification is not defined`
- ✅ خطأ `Tracking model declared twice`
- ✅ خطأ `isIdleCountdownActive is not defined`
- ✅ خطأ `stopIdleCountdown is not defined`

### نظام الخمول:
- ⏰ **8 ثوان**: بداية تحذير الخمول
- ⏰ **10 ثوان**: انتقال كامل للخمول
- 🔄 **إلغاء فوري**: عند أي حركة

## الاختبار السريع 🧪

1. افتح التطبيق وسجل دخولك
2. اضغط "بدء العمل"
3. توقف عن تحريك الماوس لمدة 8 ثوان
4. ✅ يجب أن يظهر عداد الخمول
5. حرك الماوس لإلغاء العداد

## المشاكل الشائعة والحلول 🔧

### خطأ "address already in use"
```bash
# إيقاف العمليات على المنفذ 5001
pkill -f "node server.js"
```

### مشاكل MongoDB
- تأكد من أن MongoDB متاح في السحابة
- تحقق من اتصال الإنترنت

### مشاكل Electron
```bash
# إعادة تثبيت النود الوحدات
rm -rf node_modules
npm install
```

---
## 📞 الدعم

إذا واجهت أي مشاكل، قم بفحص:
1. رسائل وحدة التحكم في المتصفح/Terminal
2. ملف `CHANGELOG.md` لآخر التحديثات
3. تأكد من تشغيل جميع الخدمات المطلوبة 