'use client'

import React from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { HiLanguage } from 'react-icons/hi2'

interface LanguageSwitcherProps {
  variant?: 'default' | 'light'
  size?: 'sm' | 'md'
}

const LanguageSwitcher = ({ variant = 'default', size = 'md' }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en')
  }

  const buttonVariant = variant === 'light' ? 'outline' : 'ghost'
  const buttonSize = size === 'sm' ? 'sm' : 'default'

  return (
    <Button
      variant={buttonVariant}
      size={buttonSize}
      onClick={toggleLanguage}
      className={`flex items-center space-x-0.5 cursor-pointer text-xs sm:text-sm ${
        variant === 'light' 
          ? 'bg-white/10 border-white/20 text-white hover:bg-slate-600 hover:text-white hover:border-slate-500' 
          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
      }`}
    >
      <HiLanguage className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language === 'en' ? 'বাংলা' : 'English'}
      </span>
    </Button>
  )
}

export default LanguageSwitcher
