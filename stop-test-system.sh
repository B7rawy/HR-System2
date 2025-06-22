#!/bin/bash

# اسكريبت إيقاف نظام الاختبار

echo "🛑 إيقاف نظام الموارد البشرية"
echo "============================"

# قراءة معرفات العمليات
if [ -f ".pids" ]; then
    source .pids
    echo "📋 معرفات العمليات المحفوظة:"
    echo "   Backend PID: $BACKEND_PID"
    echo "   Frontend PID: $FRONTEND_PID"
    
    # إيقاف العمليات
    if [ ! -z "$BACKEND_PID" ]; then
        echo "🔧 إيقاف الخادم الخلفي..."
        kill $BACKEND_PID 2>/dev/null && echo "✅ تم إيقاف الخادم الخلفي" || echo "⚠️ لم يتم العثور على عملية الخادم الخلفي"
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        echo "🎨 إيقاف الفرونت إند..."
        kill $FRONTEND_PID 2>/dev/null && echo "✅ تم إيقاف الفرونت إند" || echo "⚠️ لم يتم العثور على عملية الفرونت إند"
    fi
else
    echo "⚠️ ملف معرفات العمليات غير موجود"
fi

# إيقاف جميع العمليات المرتبطة
echo "🧹 تنظيف العمليات المتبقية..."
pkill -f "node.*server.js" 2>/dev/null && echo "✅ تم إيقاف خوادم Node.js" || true
pkill -f "npm.*start" 2>/dev/null && echo "✅ تم إيقاف عمليات npm" || true
pkill -f "react-scripts" 2>/dev/null && echo "✅ تم إيقاف React scripts" || true

# تنظيف الملفات المؤقتة
echo "🗂️ تنظيف الملفات المؤقتة..."
rm -f .pids
rm -f backend.log
rm -f frontend.log

# التحقق من إيقاف المنافذ
echo "🔍 التحقق من المنافذ..."
if lsof -ti:5001 > /dev/null 2>&1; then
    echo "⚠️ المنفذ 5001 لا يزال مستخدماً"
    lsof -ti:5001 | xargs kill -9 2>/dev/null && echo "✅ تم تحرير المنفذ 5001" || true
else
    echo "✅ المنفذ 5001 متاح"
fi

if lsof -ti:3000 > /dev/null 2>&1; then
    echo "⚠️ المنفذ 3000 لا يزال مستخدماً"
    lsof -ti:3000 | xargs kill -9 2>/dev/null && echo "✅ تم تحرير المنفذ 3000" || true
else
    echo "✅ المنفذ 3000 متاح"
fi

echo ""
echo "✅ تم إيقاف النظام بنجاح!"
echo "========================"
echo ""
echo "📋 لإعادة تشغيل النظام:"
echo "   ./start-test-system.sh"
echo ""
echo "🧪 لاختبار سريع لـ WhatsApp:"
echo "   ./test-whatsapp.sh"
echo "" 