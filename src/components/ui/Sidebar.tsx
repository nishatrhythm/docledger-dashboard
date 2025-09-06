'use client'

import React, { useState, useEffect } from 'react'
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
  MdMenuOpen,
  MdClose
} from 'react-icons/md'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
  isMobileMenuOpen?: boolean
  onMobileMenuToggle?: () => void
}

const Sidebar = ({ className, isMobileMenuOpen = false, onMobileMenuToggle }: SidebarProps) => {
  const { t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(isMobileMenuOpen)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Sync mobile menu state with prop
  useEffect(() => {
    setIsMobileOpen(isMobileMenuOpen)
  }, [isMobileMenuOpen])

  // Handle mobile overlay click
  const handleOverlayClick = () => {
    if (isMobile) {
      if (onMobileMenuToggle) {
        onMobileMenuToggle()
      } else {
        setIsMobileOpen(false)
      }
    }
  }

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
    <>
      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 z-50',
        // Desktop behavior
        'lg:sticky lg:top-0 lg:translate-x-0',
        !isMobile && (isCollapsed ? 'w-16' : 'w-64'),
        // Mobile behavior
        'fixed lg:static',
        isMobile && 'w-64',
        isMobile && (isMobileOpen ? 'translate-x-0' : '-translate-x-full'),
        className
      )}>
        {/* Header */}
        <div className={cn(
          "h-14 sm:h-16 flex items-center border-b border-gray-200 flex-shrink-0",
          isCollapsed && !isMobile ? "justify-center px-2" : "justify-between px-4"
        )}>
          {(!isCollapsed || isMobile) && (
            <Logo size="sm" showText={true} />
          )}
          <button
            onClick={() => {
              if (isMobile) {
                if (onMobileMenuToggle) {
                  onMobileMenuToggle()
                } else {
                  setIsMobileOpen(false)
                }
              } else {
                setIsCollapsed(!isCollapsed)
              }
            }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            aria-label={isMobile ? 'Close menu' : (isCollapsed ? 'Expand sidebar' : 'Collapse sidebar')}
          >
            {isMobile ? (
              <MdClose className="w-5 h-5 text-gray-600" />
            ) : (
              isCollapsed ? (
                <MdMenu className="w-5 h-5 text-gray-600" />
              ) : (
                <MdMenuOpen className="w-5 h-5 text-gray-600" />
              )
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4 overflow-y-auto min-h-0">
          <ul className={cn("space-y-1", (isCollapsed && !isMobile) ? "px-2" : "px-3")}>
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={cn(
                      "flex items-center text-base font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 cursor-pointer group",
                      (isCollapsed && !isMobile)
                        ? "justify-center p-2" 
                        : "px-3 py-2"
                    )}
                    title={(isCollapsed && !isMobile) ? item.label : undefined}
                    onClick={() => {
                      if (isMobile) {
                        if (onMobileMenuToggle) {
                          onMobileMenuToggle()
                        } else {
                          setIsMobileOpen(false)
                        }
                      }
                    }}
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-gray-500 flex-shrink-0" />
                    {(!isCollapsed || isMobile) && (
                      <span className="ml-3">{item.label}</span>
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          {(!isCollapsed || isMobile) && (
            <p className="text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} {t('sidebar.docledger')}
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar
