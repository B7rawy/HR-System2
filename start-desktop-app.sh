#!/bin/bash

# 🚀 HR Time Tracker Desktop App Launcher
# تشغيل تطبيق تتبع الوقت المكتبي

echo "🚀 بدء تشغيل HR Time Tracker Desktop App..."
echo "================================================"

# التحقق من وجود Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً"
    echo "   تحميل من: https://nodejs.org/"
    exit 1
fi

# التحقق من وجود npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm غير متاح. يرجى تثبيت npm أولاً"
    exit 1
fi

# الانتقال لمجلد التطبيق
cd "$(dirname "$0")"

echo "📁 المجلد الحالي: $(pwd)"

# التحقق من وجود package.json
if [ ! -f "package.json" ]; then
    echo "❌ ملف package.json غير موجود"
    echo "   تأكد من أنك في مجلد التطبيق الصحيح"
    exit 1
fi

# التحقق من وجود node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 تثبيت المتطلبات..."
    npm install
    
    if [ $? -ne 0 ]; then
        echo "❌ فشل في تثبيت المتطلبات"
        exit 1
    fi
fi

# التحقق من تشغيل خادم الموارد البشرية
echo "🔍 فحص اتصال خادم الموارد البشرية..."
if curl -s http://localhost:5001/api/health > /dev/null 2>&1; then
    echo "✅ خادم الموارد البشرية متصل"
else
    echo "⚠️  تحذير: خادم الموارد البشرية غير متصل"
    echo "   يرجى تشغيل الخادم أولاً:"
    echo "   cd /Users/wael/Downloads/HR-System-main/backend"
    echo "   npm start"
    echo ""
    echo "🤔 هل تريد المتابعة؟ (y/n)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "❌ تم إلغاء التشغيل"
        exit 1
    fi
fi

echo ""
echo "🎯 بيانات تسجيل الدخول التجريبية:"
echo "   البريد الإلكتروني: fatima@company.com"
echo "   كلمة المرور: 123456"
echo "   رابط الخادم: http://localhost:5001"
echo ""

echo "🚀 تشغيل التطبيق..."
echo "================================================"

# تشغيل التطبيق
npm start

# في حالة فشل التشغيل
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ فشل في تشغيل التطبيق"
    echo ""
    echo "🔧 خطوات استكشاف الأخطاء:"
    echo "1. تأكد من تثبيت Node.js (الإصدار 16+)"
    echo "2. تأكد من تشغيل خادم الموارد البشرية"
    echo "3. تحقق من رسائل الخطأ أعلاه"
    echo "4. جرب: npm install && npm start"
    echo ""
    exit 1
fi

echo ""
echo "✅ تم إغلاق التطبيق بنجاح" 