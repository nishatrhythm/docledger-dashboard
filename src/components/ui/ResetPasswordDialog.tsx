'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useLocalizedToast } from '@/hooks/use-localized-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BiLock } from 'react-icons/bi'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

interface ResetPasswordDialogProps {
  isOpen: boolean
  onClose: () => void
  userName?: string
  userType?: 'doctor' | 'user'
}

const ResetPasswordDialog = ({ isOpen, onClose, userName, userType = 'user' }: ResetPasswordDialogProps) => {
  const { t, language } = useLanguage()
  const { showToast } = useLocalizedToast()
  
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  
  const [formErrors, setFormErrors] = useState<{
    newPassword?: string
    confirmPassword?: string
  }>({})
  
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: typeof formErrors = {}

    // New password validation
    if (!passwordForm.newPassword.trim()) {
      newErrors.newPassword = t('resetPassword.newPasswordRequired')
    } else if (passwordForm.newPassword.length < 6) {
      newErrors.newPassword = t('validation.passwordLength')
    }

    // Confirm password validation
    if (!passwordForm.confirmPassword.trim()) {
      newErrors.confirmPassword = t('resetPassword.confirmPasswordRequired')
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = t('resetPassword.passwordsDoNotMatch')
    }

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // In real app, this would make an API call to reset password
      showToast.success(t('resetPassword.passwordReset'), t('resetPassword.passwordResetDesc'))
      
      // Reset form and close modal
      handleClose()
      setIsSubmitting(false)
    }, 1000)
  }

  const handleClose = () => {
    setPasswordForm({
      newPassword: '',
      confirmPassword: ''
    })
    setFormErrors({})
    setShowPasswords({
      new: false,
      confirm: false
    })
    setIsSubmitting(false)
    onClose()
  }

  const handleInputChange = (field: keyof typeof passwordForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    setPasswordForm(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const togglePasswordVisibility = (field: 'new' | 'confirm') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} disableOutsideClick={true}>
      <DialogContent className={`sm:max-w-md ${language === 'bn' ? 'font-bengali' : ''}`}>
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {t('resetPassword.resetPassword')}
          </DialogTitle>
          {userName && (
            <p className="text-sm text-gray-600 mt-2">
              {t('resetPassword.resetPasswordFor')}: <span className="font-medium">{userName}</span>
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          {/* New Password Field */}
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-sm font-medium">
              {t('resetPassword.newPassword')} <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <BiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="newPassword"
                type={showPasswords.new ? 'text' : 'password'}
                value={passwordForm.newPassword}
                onChange={handleInputChange('newPassword')}
                placeholder={t('resetPassword.newPasswordPlaceholder')}
                className={`pl-10 pr-10 ${formErrors.newPassword ? 'border-red-500 focus:border-red-500' : ''}`}
                disabled={isSubmitting}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isSubmitting}
              >
                {showPasswords.new ? (
                  <AiOutlineEyeInvisible className="w-4 h-4" />
                ) : (
                  <AiOutlineEye className="w-4 h-4" />
                )}
              </button>
            </div>
            {formErrors.newPassword && (
              <p className="text-sm text-red-600">{formErrors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              {t('resetPassword.confirmPassword')} <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <BiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="confirmPassword"
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwordForm.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                placeholder={t('resetPassword.confirmPasswordPlaceholder')}
                className={`pl-10 pr-10 ${formErrors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''}`}
                disabled={isSubmitting}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isSubmitting}
              >
                {showPasswords.confirm ? (
                  <AiOutlineEyeInvisible className="w-4 h-4" />
                ) : (
                  <AiOutlineEye className="w-4 h-4" />
                )}
              </button>
            </div>
            {formErrors.confirmPassword && (
              <p className="text-sm text-red-600">{formErrors.confirmPassword}</p>
            )}
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="sm:mr-2 order-2 sm:order-1"
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              {isSubmitting ? t('resetPassword.resetting') : t('resetPassword.resetPassword')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ResetPasswordDialog
