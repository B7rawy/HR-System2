@echo off
echo ====================================
echo         تشغيل نظام HR مع حل مشكلة 401
echo ====================================
echo.

echo 🔧 تشغيل الخادم الخلفي...
start "Backend Server" cmd /k "cd backend && npm start"

echo ⏳ انتظار تشغيل الخادم الخلفي...
timeout /t 10 /nobreak

echo 🌐 تشغيل الخادم الأمامي...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo ⏳ انتظار تشغيل الخادم الأمامي...
timeout /t 10 /nobreak

echo 🔍 فتح صفحة التشخيص...
start test-login-api.html

echo.
echo ====================================
echo           تعليمات مهمة:
echo ====================================
echo 1. ستفتح صفحة تشخيص المشكلة تلقائياً
echo 2. اضغط "فحص حالة الخادم الخلفي" أولاً  
echo 3. ثم اضغط "اختبار تسجيل الدخول"
echo 4. إذا نجح، ستحصل على توكن صحيح
echo 5. اذهب إلى http://localhost:3000 لاستخدام النظام
echo.
echo 📋 بيانات تسجيل الدخول:
echo    اسم المستخدم: admin
echo    كلمة المرور: admin123
echo.
echo ✅ إذا لم تعمل صفحة التشخيص:
echo    - اذهب مباشرة إلى http://localhost:3000/login
echo    - استخدم البيانات أعلاه
echo.
pause 