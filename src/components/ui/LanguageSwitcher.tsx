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
      className={`flex items-center space-x-2 cursor-pointer ${
        variant === 'light' 
          ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
          : ''
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
