'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { MdAccountCircle, MdLogout, MdKey, MdExpandMore } from 'react-icons/md'
import { cn } from '@/lib/utils'
import { useLocalizedToast } from '@/hooks/use-localized-toast'
import { Button } from '@/components/ui/button'
import ChangePasswordDialog from '@/components/ui/ChangePasswordDialog'

interface AccountMenuProps {
  isCollapsed?: boolean
  isMobile?: boolean
}

const AccountMenu = ({ isCollapsed = false, isMobile = false }: AccountMenuProps) => {
  const { t } = useLanguage()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const { showToast } = useLocalizedToast()
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    // Show logout success toast
    showToast.success(t('toast.logoutSuccess'), t('toast.logoutSuccessDesc'))
    
    // Clear any stored session data
    localStorage.removeItem('userToken')
    localStorage.removeItem('userData')
    
    // Redirect to login page after a short delay to show the toast
    setTimeout(() => {
      router.push('/login')
    }, 1000)
    setIsOpen(false)
  }

  const handleChangePassword = () => {
    setIsChangePasswordOpen(true)
    setIsOpen(false)
  }

  // Default user data - in a real app, this would come from context/props
  const userData = {
    name: 'Account Name',
    role: 'superAdmin' // Use the translation key instead of the actual text
  }

  return (
    <div ref={menuRef} className="relative">
      {/* Account Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer group",
          (isCollapsed && !isMobile)
            ? "justify-center p-2" 
            : "px-3 py-2"
        )}
        title={(isCollapsed && !isMobile) ? `${userData.name} (${t(`account.${userData.role}`)})` : undefined}
      >
        <MdAccountCircle className="w-8 h-8 text-gray-400 group-hover:text-gray-500 flex-shrink-0" />
        {(!isCollapsed || isMobile) && (
          <>
            <div className="ml-3 flex-1 text-left">
              <p className="text-sm font-medium text-gray-900 truncate">{userData.name}</p>
              <span className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset",
                userData.role === 'superAdmin' && "bg-purple-50 text-purple-700 ring-purple-600/20",
                userData.role === 'admin' && "bg-blue-50 text-blue-700 ring-blue-600/20",
                userData.role === 'user' && "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
              )}>
                {t(`account.${userData.role}`)}
              </span>
            </div>
            <MdExpandMore className={cn(
              "w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0",
              isOpen && "rotate-180"
            )} />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={cn(
          "absolute bottom-full mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50",
          (isCollapsed && !isMobile) ? "left-full ml-2 w-48" : "left-0 right-0"
        )}>
          <button
            onClick={handleChangePassword}
            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <MdKey className="w-4 h-4 mr-3 text-gray-400" />
            {t('account.changePassword')}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <MdLogout className="w-4 h-4 mr-3 text-red-500" />
            {t('dashboard.logout')}
          </button>
        </div>
      )}

      {/* Change Password Dialog */}
      <ChangePasswordDialog isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)} />
    </div>
  )
}

export default AccountMenu
