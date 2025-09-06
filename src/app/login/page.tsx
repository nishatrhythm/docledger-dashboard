'use client'

import React from 'react'
import { motion } from 'framer-motion'
import LoginForm from '@/components/forms/LoginForm'
import Logo from '@/components/ui/Logo'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LoginPage() {
  const { t } = useLanguage()
  
  return (
    <motion.div 
      className="min-h-screen lg:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Panel - Logo and Branding (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 xl:p-12 items-center justify-center relative overflow-hidden">
        {/* Language Switcher for desktop */}
        <div className="absolute top-4 xl:top-6 right-4 xl:right-6 z-20">
          <LanguageSwitcher variant="light" size="sm" />
        </div>
        
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 border border-white rounded-full"></div>
        </motion.div>
        
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-white/5 to-transparent rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-l from-white/10 to-transparent rounded-full blur-2xl"
          animate={{
            scale: [1, 0.8, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.div 
          className="text-center text-white max-w-md lg:max-w-sm xl:max-w-md relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Logo size="xxl" variant="light" showText={false} className="mb-6 xl:mb-8 select-none pointer-events-none" />
          </motion.div>
          <motion.h2 
            className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 xl:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {t('login.brandTitle')}
          </motion.h2>
          <motion.p 
            className="text-lg lg:text-xl xl:text-2xl text-slate-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {t('login.brandSubtitle')}
          </motion.p>
        </motion.div>
      </div>

      {/* Right Panel - Login Form */}
      <div 
        className="w-full lg:w-1/2 flex flex-col bg-white min-h-screen relative overflow-hidden"
      >
        {/* Mobile Header with Logo and Language Switcher */}
        <div className="lg:hidden flex flex-col items-center pt-6 sm:pt-8 pb-4 sm:pb-6 relative">
          {/* Language Switcher positioned at top-right */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
            <LanguageSwitcher size="sm" />
          </div>
          
          {/* Logo centered */}
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>
          
          {/* Brand text */}
          <div className="text-center mt-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {t('login.brandTitle')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {t('login.brandSubtitle')}
            </p>
          </div>
        </div>
        
        {/* Subtle background animation for mobile/right panel */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-100/20 to-transparent rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-0 w-24 h-24 bg-gradient-to-tr from-slate-100/20 to-transparent rounded-full blur-xl"
          animate={{
            scale: [1, 0.7, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Main content area */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 pt-2 sm:pt-4 lg:pt-0">
          <div className="w-full max-w-sm sm:max-w-md relative z-10">
            <LoginForm />
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 sm:p-6 lg:p-8 pt-0 relative z-10">
          <div className="border-t border-gray-200 pt-3 sm:pt-4">
            <p className="text-xs sm:text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} {t('sidebar.docledger')}. {t('login.allRightsReserved')}.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
