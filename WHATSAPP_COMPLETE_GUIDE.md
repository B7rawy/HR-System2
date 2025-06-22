# 🟢 دليل نظام WhatsApp Web.js المتكامل

## 📋 نظرة عامة

تم إنشاء نظام WhatsApp متكامل جديد من الصفر باستخدام **WhatsApp Web.js** ليكون أكثر استقراراً وموثوقية من النظام السابق. يوفر النظام الجديد واجهة سهلة الاستخدام مع 6 تبويبات رئيسية لإدارة جميع عمليات WhatsApp.

## ✨ المميزات الجديدة

### 🔧 المميزات التقنية
- **لا يحتاج تطبيق Business API** - استخدام مباشر لـ WhatsApp Web
- **QR Code Authentication** - مسح واحد للربط الدائم
- **Real-time Connection Status** - مراقبة حالة الاتصال لحظياً
- **Session Persistence** - الحفاظ على الجلسة عند إعادة التشغيل
- **Server-Sent Events** - تحديثات فورية بدون تحديث الصفحة
- **Rate Limiting** - حماية من تجاوز حدود الإرسال
- **Auto-backup System** - نسخ احتياطية تلقائية

### 📱 المميزات الوظيفية
- **7 قوالب رسائل جاهزة** باللغة العربية
- **Bulk Messaging** - إرسال رسائل جماعية مع تحكم في التوقيت
- **HR Integration** - تكامل مباشر مع نظام الموارد البشرية
- **Media Support** - إرسال الصور والملفات
- **Message Templates** - قوالب قابلة للتخصيص مع متغيرات
- **Statistics & Logs** - إحصائيات مفصلة وسجلات العمليات
- **Phone Validation** - التحقق من صحة أرقام الهواتف السعودية

## 🚀 طريقة التشغيل

### 1. تشغيل الخادم
```bash
cd backend
npm start
```

### 2. تشغيل الواجهة
```bash
cd frontend
npm start
```

### 3. الوصول للنظام
- افتح المتصفح على: `http://localhost:3000`
- سجل دخول كـ Admin
- انتقل إلى تبويب "واتساب" في الشريط العلوي

## 📱 دليل الاستخدام - التبويبات الـ 6

### 🔗 تبويب الاتصال (Connection)

**الوظيفة:** إدارة اتصال WhatsApp الأساسي

**الخطوات:**
1. اضغط على زر "🔗 اتصال"
2. ستظهر رمز QR Code
3. افتح WhatsApp على هاتفك
4. اذهب إلى الإعدادات → الأجهزة المرتبطة
5. امسح رمز QR المعروض
6. ستتغير الحالة إلى "✅ متصل"

**مؤشرات الحالة:**
- 🔴 غير متصل - لم يتم الاتصال بعد
- 🟡 جاري الاتصال - في انتظار مسح QR
- 🟢 متصل - جاهز للاستخدام

### 📝 تبويب القوالب (Templates)

**الوظيفة:** إدارة قوالب الرسائل

**القوالب الجاهزة:**
1. **ترحيب بموظف جديد** - `welcome_employee`
2. **إشعار صرف راتب** - `salary_notification`
3. **تذكير اجتماع** - `meeting_reminder`
4. **إشعار طلب إجازة** - `leave_approval`
5. **إعلان عام** - `general_announcement`
6. **تهنئة عيد ميلاد** - `birthday_wishes`
7. **تقييم أداء** - `performance_review`

**إضافة قالب جديد:**
1. اضغط "➕ قالب جديد"
2. املأ البيانات:
   - **اسم القالب:** اسم مميز
   - **الوصف:** وصف مختصر
   - **الفئة:** hr, payroll, meetings, general
   - **المحتوى:** نص الرسالة مع المتغيرات
3. استخدم `{{variableName}}` للمتغيرات
4. اضغط "💾 حفظ"

**مثال على المتغيرات:**
```
مرحباً {{employeeName}}!
راتبك لشهر {{month}} قدره {{amount}} ريال
```

### 📤 تبويب إرسال رسالة (Send Message)

**الوظيفة:** إرسال رسائل فردية

**خطوات الإرسال:**
1. أدخل رقم الهاتف (مثل: `966555555555`)
2. **اختر إما:**
   - رسالة نصية مباشرة
   - أو اختر قالب من القائمة
3. اضغط "📤 إرسال"

**تنسيق أرقام الهواتف المدعومة:**
- `966555555555` (الصيغة الدولية)
- `0555555555` (الصيغة المحلية)
- `555555555` (بدون الصفر)

### 📨 تبويب الإرسال المجمع (Bulk Send)

**الوظيفة:** إرسال رسائل جماعية

**تنسيق قائمة المستقبلين:**
```
966555555555,أحمد محمد
966666666666,فاطمة علي
966777777777,خالد أحمد
```

**إعدادات التحكم:**
- **التأخير بين الرسائل:** 2-10 ثوانِ
- **الحد الأقصى:** 50 مستقبل لكل عملية
- **شريط التقدم:** مراقبة حالة الإرسال

**خطوات الإرسال الجماعي:**
1. أدخل قائمة المستقبلين (رقم,اسم في كل سطر)
2. اختر القالب أو اكتب رسالة مخصصة
3. حدد التأخير المناسب
4. اضغط "📨 إرسال مجمع"
5. راقب التقدم في الشريط

### 👥 تبويب الموارد البشرية (HR Integration)

**الوظيفة:** قوالب مخصصة للموارد البشرية

**القوالب المتاحة:**
1. **ترحيب بموظف جديد**
   - المتغيرات: `employeeName, companyName, department, position`
2. **إشعار صرف راتب**
   - المتغيرات: `employeeName, month, amount`
3. **تذكير اجتماع**
   - المتغيرات: `employeeName, subject, date, time`
4. **إشعار طلب إجازة**
   - المتغيرات: `employeeName, status, startDate, endDate`
5. **إعلان عام**
   - المتغيرات: `title, content`
6. **تهنئة عيد ميلاد**
   - المتغيرات: `employeeName`
7. **تقييم أداء**
   - المتغيرات: `employeeName, period, meetingDate`

**طريقة الاستخدام:**
1. اختر القالب المطلوب
2. اضغط "استخدام"
3. سيتم توجيهك لتبويب الإرسال مع القالب المحدد

### 📊 تبويب الإحصائيات (Statistics)

**الوظيفة:** مراقبة وتحليل الأداء

**البطاقات الإحصائية:**
- 📨 **الرسائل المرسلة** - العدد الكلي
- ✅ **نجحت** - الرسائل المرسلة بنجاح
- ❌ **فشلت** - الرسائل التي فشلت
- 📊 **معدل النجاح** - النسبة المئوية
- ⏱️ **وقت التشغيل** - مدة تشغيل النظام
- 📥 **الرسائل الواردة** - الرسائل المستقبلة

**سجل العمليات:**
- عرض آخر 100 عملية
- تصفية حسب النوع والحالة
- تفاصيل كل عملية مع الوقت
- أنواع السجلات:
  - `message_sent` - رسالة مرسلة
  - `qr_generated` - توليد QR Code
  - `client_ready` - العميل جاهز
  - `bulk_send_completed` - إرسال جماعي مكتمل

## 🔌 API Endpoints الجديدة

### Connection Management
```
POST /api/whatsapp/initialize - بدء الاتصال
POST /api/whatsapp/disconnect - قطع الاتصال
GET  /api/whatsapp/status - حالة الاتصال
GET  /api/whatsapp/health - فحص صحة النظام
```

### Message Operations
```
POST /api/whatsapp/send - إرسال رسالة فردية
POST /api/whatsapp/send-template - إرسال رسالة بقالب
POST /api/whatsapp/send-bulk - إرسال رسائل جماعية
POST /api/whatsapp/send-media - إرسال ملفات وسائط
```

### Template Management
```
GET    /api/whatsapp/templates - جلب جميع القوالب
GET    /api/whatsapp/templates/:id - جلب قالب محدد
POST   /api/whatsapp/templates - إنشاء قالب جديد
PUT    /api/whatsapp/templates/:id - تحديث قالب
DELETE /api/whatsapp/templates/:id - حذف قالب
POST   /api/whatsapp/templates/preview - معاينة قالب
```

### Statistics & Analytics
```
GET /api/whatsapp/stats?days=30 - الإحصائيات
GET /api/whatsapp/logs?limit=100 - سجل العمليات
```

### Utility Functions
```
POST /api/whatsapp/validate-phone - التحقق من رقم الهاتف
POST /api/whatsapp/format-phone - تنسيق أرقام الهواتف
```

### HR Integration
```
POST /api/whatsapp/hr/welcome - رسالة ترحيب بموظف
POST /api/whatsapp/hr/salary-notification - إشعار راتب
POST /api/whatsapp/hr/meeting-reminder - تذكير اجتماع
POST /api/whatsapp/hr/leave-approval - إشعار إجازة
POST /api/whatsapp/hr/notification - إشعار عام
```

### System Management
```
POST /api/whatsapp/backup - إنشاء نسخة احتياطية
POST /api/whatsapp/cleanup - تنظيف السجلات القديمة
GET  /api/whatsapp/events - تدفق الأحداث المباشر
```

## 📁 هيكل الملفات الجديد

```
backend/
├── services/
│   └── WhatsAppManager.js     # الخدمة الرئيسية الجديدة
├── routes/
│   └── whatsapp.js           # جميع المسارات المحدثة
└── data/whatsapp/            # مجلد البيانات الجديد
    ├── session/              # بيانات الجلسة
    ├── templates.json        # القوالب
    ├── logs.json            # سجل العمليات
    ├── config.json          # الإعدادات
    ├── stats.json           # الإحصائيات
    └── backups/             # النسخ الاحتياطية

frontend/
├── services/
│   └── WhatsAppService.js    # خدمة الواجهة الجديدة
├── pages/
│   └── WhatsAppDashboard.jsx # لوحة التحكم الجديدة
└── pages/
    └── WhatsAppDashboard.css # تصميم لوحة التحكم
```

## 🔧 التكوين والإعدادات

### متغيرات البيئة
```bash
# Backend
PORT=5000
NODE_ENV=production

# Frontend
REACT_APP_API_URL=http://localhost:5000/api
```

### إعدادات WhatsApp Web.js
```javascript
puppeteer: {
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--single-process',
    '--disable-gpu'
  ]
}
```

### Rate Limiting Settings
- **General requests:** 100 requests per 15 minutes
- **Message sending:** 20 messages per minute
- **Bulk operations:** 5 operations per minute

## 🛡️ الأمان والحماية

### مميزات الأمان
1. **Rate Limiting** - منع إساءة الاستخدام
2. **Input Validation** - التحقق من صحة البيانات
3. **Error Handling** - معالجة محكمة للأخطاء
4. **Session Security** - جلسات آمنة ومشفرة
5. **CORS Protection** - حماية من الطلبات الخارجية

### نصائح الأمان
- احفظ نسخة احتياطية من مجلد `session/`
- لا تشارك ملفات الجلسة
- راقب سجل العمليات بانتظام
- استخدم HTTPS في الإنتاج

## 🚨 استكشاف الأخطاء

### مشاكل الاتصال
❌ **المشكلة:** QR Code لا يظهر
✅ **الحل:** 
- تأكد من تشغيل الخادم
- تحقق من إعدادات Puppeteer
- أعد تشغيل الخدمة

❌ **المشكلة:** فشل في الاتصال بعد مسح QR
✅ **الحل:**
- تأكد من اتصال الإنترنت
- تحقق من أن WhatsApp يعمل على الهاتف
- امسح مجلد `session/` وأعد المحاولة

### مشاكل الإرسال
❌ **المشكلة:** رسالة "Client not ready"
✅ **الحل:**
- تأكد من حالة الاتصال (متصل)
- انتظر حتى يكتمل التحميل
- أعد الاتصال إذا لزم الأمر

❌ **المشكلة:** فشل إرسال لرقم معين
✅ **الحل:**
- تحقق من تنسيق الرقم
- تأكد أن الرقم مسجل في WhatsApp
- جرب إرسال رسالة عادية أولاً

### مشاكل القوالب
❌ **المشكلة:** متغيرات لا تظهر
✅ **الحل:**
- تأكد من تنسيق `{{variableName}}`
- تحقق من إرسال البيانات الصحيحة
- راجع console للأخطاء

## 📈 التحسينات المستقبلية

### خطط التطوير
1. **Auto-reply System** - ردود تلقائية ذكية
2. **Webhook Integration** - تكامل مع أنظمة خارجية
3. **Advanced Analytics** - إحصائيات متقدمة
4. **Multi-device Support** - دعم أجهزة متعددة
5. **Scheduled Messages** - رسائل مجدولة
6. **Contact Management** - إدارة جهات الاتصال
7. **Message History** - تاريخ الرسائل المفصل

### تحسينات الأداء
- **Database Integration** - قاعدة بيانات حقيقية
- **Redis Caching** - تخزين مؤقت سريع
- **Load Balancing** - توزيع الأحمال
- **Message Queue** - طابور رسائل

## 💬 الدعم والمساعدة

### طرق الحصول على الدعم
1. **تحقق من Logs** - راجع سجل العمليات أولاً
2. **Console Errors** - ابحث عن أخطاء في المتصفح
3. **Network Issues** - تأكد من الاتصال
4. **Documentation** - راجع هذا الدليل

### معلومات مهمة للدعم
عند طلب المساعدة، قدم:
- **نسخة النظام:** WhatsApp Web.js v1.30.0
- **المتصفح المستخدم:** Chrome, Firefox, Safari
- **رسالة الخطأ:** نص الخطأ كاملاً
- **خطوات الإعادة:** ما فعلته قبل الخطأ
- **سجل العمليات:** آخر 10 عمليات من الـ Logs

## 🎯 خلاصة

تم إنشاء نظام WhatsApp متكامل وموثوق من الصفر باستخدام أحدث التقنيات. النظام يوفر:

✅ **سهولة الاستخدام** - واجهة بديهية بـ 6 تبويبات
✅ **الموثوقية** - اتصال مستقر وآمن
✅ **التكامل** - ربط مباشر مع نظام HR
✅ **المرونة** - قوالب قابلة للتخصيص
✅ **الشمولية** - جميع المميزات في مكان واحد
✅ **العربية** - دعم كامل للغة العربية

النظام جاهز للاستخدام الفوري ويدعم جميع احتياجات الشركات من إرسال الرسائل والإشعارات باللغة العربية. 🚀

---

**تم تطوير النظام بواسطة:** فريق تطوير نظام الموارد البشرية  
**التاريخ:** ديسمبر 2024  
**الإصدار:** 2.0.0 - WhatsApp Web.js Complete System 