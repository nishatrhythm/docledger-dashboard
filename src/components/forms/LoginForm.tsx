'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { BiLock, BiPhone } from 'react-icons/bi'
import { validateBangladeshiMobile, validatePassword, formatMobileNumber } from '@/lib/validation'
import { useLanguage } from '@/contexts/LanguageContext'

const LoginForm = () => {
  const router = useRouter()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  })
  const [errors, setErrors] = useState<{phone?: string; password?: string}>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const validateForm = () => {
    const newErrors: {phone?: string; password?: string} = {}

    const phoneValidation = validateBangladeshiMobile(formData.phone, t)
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error || t('validation.phoneRequired')
    }

    const passwordValidation = validatePassword(formData.password, t)
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error || t('validation.passwordRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For now, just redirect to dashboard
      // In a real app, you would make an API call here
      console.log('Login attempt:', formData)
      
      // Simulate successful login
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ phone: t('validation.invalidCredentials') })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: 'phone' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    // Format phone number as user types
    if (field === 'phone') {
      value = formatMobileNumber(value)
    }
    
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">{t('login.title')}</CardTitle>
        <CardDescription className="text-center">
          {t('login.subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone">{t('login.phone')}</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BiPhone className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                placeholder={t('login.phonePlaceholder')}
                className={`pl-10 ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                maxLength={11}
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('login.password')}</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BiLock className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange('password')}
                placeholder={t('login.passwordPlaceholder')}
                className={`pl-10 pr-12 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              >
                {showPassword ? <AiOutlineEyeInvisible className="w-4 h-4" /> : <AiOutlineEye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t('login.signingIn')}
              </div>
            ) : (
              t('login.signIn')
            )}
          </Button>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {t('login.needHelp')}{' '}
              <a 
                href="mailto:info@thegobd.com" 
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
              >
                info@thegobd.com
              </a>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
