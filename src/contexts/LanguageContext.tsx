'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type Language = 'en' | 'bn'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Login Form
    'login.title': 'Welcome back',
    'login.subtitle': 'Sign in to your DocLedger account',
    'login.phone': 'Phone Number',
    'login.phonePlaceholder': '01XXXXXXXXX',
    'login.password': 'Password',
    'login.passwordPlaceholder': 'Enter your password',
    'login.signingIn': 'Signing in...',
    'login.signIn': 'Sign In',
    'login.needHelp': 'Need help? Contact',
    'login.allRightsReserved': 'All rights reserved',
    
    // Login Page
    'login.brandTitle': 'DocLedger',
    'login.brandSubtitle': 'Streamline your document workflow',
    
    // Dashboard
    'dashboard.welcome': 'Welcome to Dashboard',
    'dashboard.logout': 'Logout',
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Welcome to your DocLedger dashboard',
    'dashboard.documents': 'Documents',
    'dashboard.documentsDesc': 'Manage your documents here',
    'dashboard.reports': 'Reports',
    'dashboard.reportsDesc': 'View and generate reports',
    'dashboard.settings': 'Settings',
    'dashboard.settingsDesc': 'Configure your preferences',
    
    // Sidebar
    'sidebar.dashboard': 'Dashboard',
    'sidebar.admin': 'Admin',
    'sidebar.chamber': 'Chamber',
    'sidebar.user': 'User',
    'sidebar.appointment': 'Appointment',
    'sidebar.operation': 'Operation',
    'sidebar.expenditure': 'Expenditure',
    'sidebar.account': 'Account Information',
    'sidebar.deposit': 'Deposit',
    'sidebar.docledger': 'DocLedger',
    
    // Validation
    'validation.phoneRequired': 'Phone number is required',
    'validation.phoneLength': 'Mobile number must be 11 digits',
    'validation.phoneStart': 'Mobile number must start with 01',
    'validation.phoneOperator': 'Invalid operator code (3rd digit must be 3-9)',
    'validation.passwordRequired': 'Password is required',
    'validation.passwordLength': 'Password must be at least 6 characters',
    'validation.invalidCredentials': 'Invalid credentials. Please try again.',
    
    // Common
    'common.language': 'Language',
  },
  bn: {
    // Login Form
    'login.title': 'স্বাগতম',
    'login.subtitle': 'আপনার DocLedger অ্যাকাউন্টে সাইন ইন করুন',
    'login.phone': 'মোবাইল নম্বর',
    'login.phonePlaceholder': '০১XXXXXXXXX',
    'login.password': 'পাসওয়ার্ড',
    'login.passwordPlaceholder': 'আপনার পাসওয়ার্ড লিখুন',
    'login.signingIn': 'সাইন ইন করা হচ্ছে...',
    'login.signIn': 'সাইন ইন',
    'login.needHelp': 'সাহায্য প্রয়োজন? যোগাযোগ করুন',
    'login.allRightsReserved': 'সকল অধিকার সংরক্ষিত',
    
    // Login Page
    'login.brandTitle': 'ডকলেজার',
    'login.brandSubtitle': 'আপনার ডকুমেন্ট ওয়ার্কফ্লো সহজ করুন',
    
    // Dashboard
    'dashboard.welcome': 'ড্যাশবোর্ডে স্বাগতম',
    'dashboard.logout': 'লগ আউট',
    'dashboard.title': 'ড্যাশবোর্ড',
    'dashboard.subtitle': 'আপনার DocLedger ড্যাশবোর্ডে স্বাগতম',
    'dashboard.documents': 'ডকুমেন্ট',
    'dashboard.documentsDesc': 'এখানে আপনার ডকুমেন্ট পরিচালনা করুন',
    'dashboard.reports': 'রিপোর্ট',
    'dashboard.reportsDesc': 'রিপোর্ট দেখুন এবং তৈরি করুন',
    'dashboard.settings': 'সেটিংস',
    'dashboard.settingsDesc': 'আপনার পছন্দ কনফিগার করুন',
    
    // Sidebar
    'sidebar.dashboard': 'ড্যাশবোর্ড',
    'sidebar.admin': 'অ্যাডমিন',
    'sidebar.chamber': 'চেম্বার',
    'sidebar.user': 'ইউজার',
    'sidebar.appointment': 'অ্যাপয়েন্টমেন্ট',
    'sidebar.operation': 'অপারেশন',
    'sidebar.expenditure': 'ব্যয়',
    'sidebar.account': 'অ্যাকাউন্ট তথ্য',
    'sidebar.deposit': 'জমা',
    'sidebar.docledger': 'ডকলেজার',
    
    // Validation
    'validation.phoneRequired': 'ফোন নম্বর প্রয়োজন',
    'validation.phoneLength': 'মোবাইল নম্বর অবশ্যই ১১ সংখ্যার হতে হবে',
    'validation.phoneStart': 'মোবাইল নম্বর অবশ্যই ০১ দিয়ে শুরু হতে হবে',
    'validation.phoneOperator': 'অবৈধ অপারেটর কোড (৩য় সংখ্যা ৩-৯ হতে হবে)',
    'validation.passwordRequired': 'পাসওয়ার্ড প্রয়োজন',
    'validation.passwordLength': 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে',
    'validation.invalidCredentials': 'অবৈধ প্রমাণপত্র। আবার চেষ্টা করুন।',
    
    // Common
    'common.language': 'ভাষা',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en')

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('docledger-language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('docledger-language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  const value = {
    language,
    setLanguage: handleLanguageChange,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      <div className={language === 'bn' ? 'font-bengali' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
