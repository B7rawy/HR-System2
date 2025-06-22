import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  DollarSign,
  Users,
  CreditCard,
  FolderOpen,
  UserCircle,
  BookOpen,
  Settings,
  Menu,
  X,
  Search,
  MessageCircle,
  CheckCircle,
  Activity,
  Building
} from 'lucide-react'
import { Button } from './ui/button'

const NavigationHeader = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    setCurrentUser(user)
  }, [])

  const navigationItems = [
    {
      id: 'dashboard',
      title: 'لوحة التحكم',
      icon: LayoutDashboard,
      path: '/',
      roles: ['admin', 'employee']
    },
    {
      id: 'transactions',
      title: 'المعاملات المالية',
      icon: DollarSign,
      path: '/transactions',
      roles: ['admin']
    },
    {
      id: 'approvals',
      title: 'الموافقات',
      icon: CheckCircle,
      path: '/approvals',
      roles: ['admin']
    },
    {
      id: 'employees',
      title: 'الموظفين',
      icon: Users,
      path: '/employees',
      roles: ['admin']
    },
    {
      id: 'clients',
      title: 'العملاء',
      icon: Building,
      path: '/clients',
      roles: ['admin']
    },
    {
      id: 'payroll',
      title: 'الرواتب',
      icon: CreditCard,
      path: '/payroll',
      roles: ['admin']
    },
    {
      id: 'categories',
      title: 'التصنيفات',
      icon: FolderOpen,
      path: '/categories',
      roles: ['admin']
    },
    {
      id: 'me',
      title: 'حسابي الشخصي',
      icon: UserCircle,
      path: '/me/overview',
      roles: ['admin', 'employee']
    },
    {
      id: 'employees-list',
      title: 'دليل الموظفين',
      icon: BookOpen,
      path: '/employees-list',
      roles: ['employee']
    },

    {
      id: 'whatsapp',
      title: 'واتساب',
      icon: MessageCircle,
      path: '/whatsapp',
      roles: ['admin']
    },
    {
      id: 'settings',
      title: 'الإعدادات',
      icon: Settings,
      path: '/settings',
      roles: ['admin']
    },
    {
      id: 'system-logs',
      title: 'سجل النظام',
      icon: Activity,
      path: '/system-logs',
      roles: ['admin']
    }
  ]

  // فلترة العناصر حسب دور المستخدم
  const filteredItems = navigationItems.filter(item => 
    !currentUser?.role || item.roles.includes(currentUser.role)
  )

  const isActiveRoute = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const handleNavigation = (path) => {
    navigate(path)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="nav-header bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between h-12 lg:h-14">
          <nav className="flex space-x-1 lg:space-x-2 rtl:space-x-reverse overflow-x-auto scrollbar-hide">
            {filteredItems.map((item) => {
              const Icon = item.icon
              const isActive = isActiveRoute(item.path)
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`nav-item flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl text-xs lg:text-sm font-medium transition-all duration-300 whitespace-nowrap shadow-sm hover:shadow-md ${
                    isActive
                      ? 'active bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-300 hover:text-white bg-white/50 dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${isActive ? 'text-white' : ''}`} />
                  <span className="hidden lg:inline">{item.title}</span>
                  <span className="lg:hidden">{item.title.split(' ')[0]}</span>
                </button>
              )
            })}
          </nav>

          {/* إضافات إضافية في الناحية اليمنى */}
          <div className="flex items-center space-x-2 lg:space-x-4 rtl:space-x-reverse">
            {/* مؤشر الحالة */}
            <div className="flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse text-xs lg:text-sm text-gray-500 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
              <div className="status-online w-2 h-2 bg-green-500 rounded-full shadow-lg"></div>
              <span className="font-medium text-green-700 dark:text-green-400">متصل</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-between h-12">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              ) : (
                <Menu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              )}
            </Button>

            {/* Current Page Title */}
            <div className="flex-1 text-center">
              {(() => {
                const currentItem = filteredItems.find(item => isActiveRoute(item.path))
                const Icon = currentItem?.icon || LayoutDashboard
                return (
                  <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 px-3 py-1.5 rounded-xl">
                    <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:text-blue-400">
                      {currentItem?.title || 'لوحة التحكم'}
                    </span>
                  </div>
                )
              })()}
            </div>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full shadow-lg animate-pulse"></div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="mobile-menu absolute top-full left-0 right-0 bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600 shadow-xl z-40 backdrop-blur-sm">
              <div className="px-3 py-3">
                <div className="grid grid-cols-2 gap-2">
                  {filteredItems.map((item) => {
                    const Icon = item.icon
                    const isActive = isActiveRoute(item.path)
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigation(item.path)}
                        className={`flex flex-col items-center space-y-1 p-3 rounded-xl text-xs font-medium transition-all duration-300 shadow-sm hover:shadow-md min-h-[60px] ${
                          isActive
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                            : 'text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 hover:bg-gradient-to-br hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-700 dark:hover:to-gray-600 border border-gray-200/50 dark:border-gray-600/50'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                        <span className="text-center leading-tight">{item.title}</span>
                      </button>
                    )
                  })}
                </div>
                
                {/* Mobile search */}
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="relative">
                    <Search className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="البحث في النظام..."
                      className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div className="breadcrumb hidden lg:block bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-2 text-xs text-gray-500 dark:text-gray-400">
            {(() => {
              const currentItem = filteredItems.find(item => isActiveRoute(item.path))
              return (
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span>الرئيسية</span>
                  <span>←</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {currentItem?.title || 'لوحة التحكم'}
                  </span>
                </div>
              )
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationHeader 