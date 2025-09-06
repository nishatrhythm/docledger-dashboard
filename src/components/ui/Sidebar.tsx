'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Logo from '@/components/ui/Logo'
import { 
  MdDashboard, 
  MdAdminPanelSettings, 
  MdMeetingRoom,
  MdPerson,
  MdCalendarToday,
  MdLocalHospital,
  MdAccountBalanceWallet,
  MdAccountBox,
  MdSavings,
  MdMenu,
  MdMenuOpen
} from 'react-icons/md'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
}

const Sidebar = ({ className }: SidebarProps) => {
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    { id: 'dashboard', label: t('sidebar.dashboard'), icon: MdDashboard, href: '/dashboard' },
    { id: 'admin', label: t('sidebar.admin'), icon: MdAdminPanelSettings, href: '/admin' },
    { id: 'chamber', label: t('sidebar.chamber'), icon: MdMeetingRoom, href: '/chamber' },
    { id: 'user', label: t('sidebar.user'), icon: MdPerson, href: '/user' },
    { id: 'appointment', label: t('sidebar.appointment'), icon: MdCalendarToday, href: '/appointment' },
    { id: 'operation', label: t('sidebar.operation'), icon: MdLocalHospital, href: '/operation' },
    { id: 'expenditure', label: t('sidebar.expenditure'), icon: MdAccountBalanceWallet, href: '/expenditure' },
    { id: 'account', label: t('sidebar.account'), icon: MdAccountBox, href: '/account' },
    { id: 'deposit', label: t('sidebar.deposit'), icon: MdSavings, href: '/deposit' },
  ]

  return (
    <div className={cn(
      'bg-white border-r border-gray-200 min-h-screen flex flex-col transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64',
      className
    )}>
      {/* Collapse/Expand Button - Aligned with navbar */}
      <div className={cn(
        "h-16 flex items-center border-b border-gray-200",
        isCollapsed ? "justify-center px-2" : "justify-between px-4"
      )}>
        {!isCollapsed && (
          <Logo size="sm" showText={true} />
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <MdMenu className="w-5 h-5 text-gray-600" />
          ) : (
            <MdMenuOpen className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4">
        <ul className={cn("space-y-1", isCollapsed ? "px-2" : "px-3")}>
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 cursor-pointer group",
                    isCollapsed 
                      ? "justify-center p-2" 
                      : "px-3 py-2"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-gray-500 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="ml-3">{item.label}</span>
                  )}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {!isCollapsed && (
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} {t('sidebar.docledger')}
          </p>
        )}
      </div>
    </div>
  )
}

export default Sidebar
