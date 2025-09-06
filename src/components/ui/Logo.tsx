import React from 'react'
import { cn } from '@/lib/utils'
import { FaStethoscope } from 'react-icons/fa'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  className?: string
  variant?: 'dark' | 'light'
  showText?: boolean
}

const Logo = ({ size = 'md', className, variant = 'dark', showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    xxl: 'text-4xl'
  }

  const iconColors = variant === 'light' 
    ? 'bg-white text-slate-900' 
    : 'bg-slate-900 text-white'
    
  const textColors = variant === 'light' 
    ? 'text-white' 
    : 'text-slate-900'

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    xxl: 'w-10 h-10'
  }

  return (
    <div className={cn('flex items-center justify-center', showText ? 'space-x-2' : '', className)}>
      <div className={cn(
        'flex items-center justify-center rounded-lg',
        iconColors,
        size === 'sm' && 'w-8 h-8',
        size === 'md' && 'w-10 h-10',
        size === 'lg' && 'w-12 h-12',
        size === 'xl' && 'w-16 h-16',
        size === 'xxl' && 'w-20 h-20'
      )}>
        <FaStethoscope className={cn(iconSizes[size], 'flex-shrink-0')} />
      </div>
      {showText && (
        <span className={cn('font-bold', textColors, sizeClasses[size])}>
          DocLedger
        </span>
      )}
    </div>
  )
}

export default Logo
