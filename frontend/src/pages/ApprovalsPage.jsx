import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { 
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  AlertTriangle
} from 'lucide-react'
import { formatCurrency, formatDate } from '../utils/formatters'
import { transactionService } from '../services/api'

const ApprovalsPage = () => {
  // حالات المكون
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب المعاملات المعلقة
  const fetchPendingTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await transactionService.getAll({ status: 'pending' });
      setPendingTransactions(response.data || []);
    } catch (err) {
      console.error('Failed to fetch pending transactions:', err);
      setError('فشل في جلب المعاملات المعلقة. يرجى المحاولة لاحقاً.');
      setPendingTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingTransactions();
  }, []);

  // معلومات المستخدم الحالي
  const getCurrentUser = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return {
        id: user.id || 'unknown',
        name: user.name || 'غير معروف',
        role: user.role || 'user'
      };
    } catch (e) {
      console.error('Error parsing user data:', e);
      return {
        id: 'unknown',
        name: 'غير معروف',
        role: 'user'
      };
    }
  };

  const currentUser = getCurrentUser();
  const canApprove = ['admin', 'manager'].includes(currentUser.role);

  // معالجة الموافقة على المعاملة
  const handleApprove = async (id) => {
    if (!window.confirm('هل تريد الموافقة على هذه المعاملة؟')) return;
    
    try {
      await transactionService.update(id, { 
        status: 'approved', 
        approvedBy: currentUser.name,
        approvedAt: new Date().toISOString()
      });
      setPendingTransactions(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error('Failed to approve transaction:', err);
      alert('فشل في الموافقة على المعاملة. يرجى المحاولة لاحقاً.');
    }
  };

  // معالجة رفض المعاملة
  const handleReject = async (id) => {
    const reason = window.prompt('سبب الرفض (اختياري):');
    if (reason === null) return; // User cancelled
    
    try {
      await transactionService.update(id, { 
        status: 'rejected', 
        rejectedBy: currentUser.name,
        rejectionReason: reason || 'غير محدد',
        rejectedAt: new Date().toISOString()
      });
      setPendingTransactions(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error('Failed to reject transaction:', err);
      alert('فشل في رفض المعاملة. يرجى المحاولة لاحقاً.');
    }
  };

  // بطاقة معاملة للموافقة
  const TransactionApprovalCard = ({ transaction }) => {
    const safeTransaction = {
      ...transaction,
      _id: transaction._id || 'unknown-' + Math.random().toString(36).substr(2, 9),
      description: transaction.description || 'معاملة بدون وصف',
      type: transaction.type || 'expense',
      amount: parseFloat(transaction.amount) || 0,
      currency: transaction.currency || 'SAR',
      category: transaction.category || 'غير محدد',
      subcategory: transaction.subcategory || '',
      paymentMethod: transaction.paymentMethod || 'غير محدد',
      status: transaction.status || 'pending',
      createdBy: transaction.createdBy || 'غير معروف',
      date: transaction.date ? formatDate(transaction.date) : 'غير محدد',
      notes: transaction.notes || '',
      attachments: transaction.attachments || [],
      transactionNumber: transaction.transactionNumber || 'غير محدد',
      reference: transaction.reference || '',
      clientId: transaction.clientId || '',
      employeeId: transaction.employeeId || ''
    };

    return (
      <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-yellow-400">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-3 rounded-full ${
                  safeTransaction.type === 'income' 
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  {safeTransaction.type === 'income' ? (
                    <ArrowDownCircle className="w-5 h-5" />
                  ) : (
                    <ArrowUpCircle className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {safeTransaction.description}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span>رقم المعاملة: </span>
                    <span className="font-semibold">{safeTransaction.transactionNumber}</span>
                    {safeTransaction.reference && <span> • {safeTransaction.reference}</span>}
                    {safeTransaction.date && <span> • {safeTransaction.date}</span>}
                  </p>
                  <Badge variant="outline" className="mt-1 text-yellow-600 border-yellow-200">
                    <Clock className="w-3 h-3 mr-1" />
                    قيد المراجعة
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${
                safeTransaction.type === 'income' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {safeTransaction.type === 'income' ? '+' : '-'}{formatCurrency(safeTransaction.amount)}
                <span className="text-base ml-1">{safeTransaction.currency}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {safeTransaction.type === 'income' ? 'إيرادات' : 'مصروفات'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="text-gray-500 dark:text-gray-400">التصنيف: </span>
              <span className="font-medium text-gray-900 dark:text-white">{safeTransaction.category}</span>
              {safeTransaction.subcategory && (
                <span className="ml-2 text-gray-500 dark:text-gray-400">({safeTransaction.subcategory})</span>
              )}
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">طريقة الدفع: </span>
              <span className="font-medium text-gray-900 dark:text-white">{safeTransaction.paymentMethod}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">الحالة: </span>
              <span className="font-medium text-gray-900 dark:text-white">{safeTransaction.status}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">طالب الموافقة: </span>
              <span className="font-medium text-gray-900 dark:text-white">{safeTransaction.createdBy}</span>
            </div>
            {safeTransaction.clientId && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">العميل: </span>
                <span className="font-medium text-gray-900 dark:text-white">{safeTransaction.clientId}</span>
              </div>
            )}
            {safeTransaction.employeeId && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">الموظف: </span>
                <span className="font-medium text-gray-900 dark:text-white">{safeTransaction.employeeId}</span>
              </div>
            )}
          </div>

          {safeTransaction.notes && (
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-gray-500 dark:text-gray-400 text-sm">تفاصيل المعاملة: </span>
              <p className="text-gray-700 dark:text-gray-300 mt-1">{safeTransaction.notes}</p>
            </div>
          )}

          {safeTransaction.attachments.length > 0 && (
            <div className="mb-4">
              <span className="text-gray-500 dark:text-gray-400 text-sm">المرفقات: </span>
              <ul className="list-disc ml-6 mt-1">
                {safeTransaction.attachments.map((file, idx) => (
                  <li key={idx} className="text-blue-600 dark:text-blue-400 underline cursor-pointer">
                    {typeof file === 'string' ? file : 'ملف غير معروف'}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {canApprove && (
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button 
                onClick={() => handleApprove(safeTransaction._id)}
                className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                size="lg"
              >
                <CheckCircle className="w-5 h-5" />
                موافقة
              </Button>
              <Button 
                onClick={() => handleReject(safeTransaction._id)}
                variant="outline"
                className="flex-1 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 font-semibold py-3"
                size="lg"
              >
                <XCircle className="w-5 h-5" />
                رفض
              </Button>
              <Button 
                variant="outline"
                className="gap-2 px-6"
                size="lg"
              >
                <Eye className="w-4 h-4" />
                تفاصيل
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // إحصائيات المعاملات
  const getStats = () => {
    return {
      totalPending: pendingTransactions.length,
      totalAmount: pendingTransactions.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0),
      expenses: pendingTransactions.filter(t => t.type === 'expense').length,
      income: pendingTransactions.filter(t => t.type === 'income').length
    };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
        <AlertTriangle className="w-8 h-8 mx-auto text-red-500 mb-2" />
        <h3 className="text-lg font-medium text-red-800 dark:text-red-200">{error}</h3>
        <Button 
          onClick={fetchPendingTransactions} 
          className="mt-3 bg-red-600 hover:bg-red-700"
        >
          إعادة المحاولة
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
            <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              موافقات المعاملات المالية
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              راجع ووافق على المعاملات المالية المطلوبة
            </p>
          </div>
        </div>
      </div>

      {/* الإحصائيات السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">المعاملات المعلقة</p>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                  {stats.totalPending}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">إجمالي المبلغ</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {formatCurrency(stats.totalAmount)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-300">مصروفات معلقة</p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                  {stats.expenses}
                </p>
              </div>
              <ArrowUpCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">إيرادات معلقة</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {stats.income}
                </p>
              </div>
              <ArrowDownCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* قائمة المعاملات قيد المراجعة */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          المعاملات المطلوبة للمراجعة ({pendingTransactions.length})
        </h2>
        
        {pendingTransactions.length > 0 ? (
          pendingTransactions.map(transaction => (
            <TransactionApprovalCard 
              key={transaction._id || 'trans-' + Math.random().toString(36).substr(2, 9)} 
              transaction={transaction} 
            />
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500 dark:text-gray-400">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-50 text-green-500" />
                <h3 className="text-lg font-medium mb-2">ممتاز! لا توجد معاملات معلقة</h3>
                <p>تم الانتهاء من مراجعة جميع المعاملات المالية</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ApprovalsPage