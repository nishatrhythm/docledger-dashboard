'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { format as formatDateFn } from 'date-fns'

type Language = 'en' | 'bn'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  formatNumber: (num: number) => string
  formatCurrency: (amount: number) => string
  formatDate: (date: Date, format?: string) => string
}

// Bengali number conversion
const englishToBengaliNumbers = (num: string): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return num.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit)])
}

// Bengali month names
const bengaliMonths = [
  'জানুয়ারী', 'ফেব্রুয়ারী', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
]

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
    
    // Dashboard Stats
    'dashboard.totalAdmin': 'Total Admin',
    'dashboard.totalUser': 'Total User',
    'dashboard.totalChamber': 'Total Chamber',
    'dashboard.totalIncome': 'Total Income',
    'dashboard.totalExpense': 'Total Expense',
    'dashboard.netIncome': 'Net Income',
    'dashboard.deposit': 'Deposit',
    'dashboard.cashInHand': 'Cash In Hand',
    
    // Dashboard Filters
    'dashboard.filters': 'Filters',
    'dashboard.filterByChamber': 'Filter by Chamber',
    'dashboard.filterByAdmin': 'Filter by Admin',
    'dashboard.startDate': 'Start Date',
    'dashboard.endDate': 'End Date',
    'dashboard.allChambers': 'All Chambers',
    'dashboard.allAdmins': 'All Admins',
    'dashboard.selectStartDate': 'Select start date',
    'dashboard.selectEndDate': 'Select end date',
    'dashboard.resetFilters': 'Reset Filters',
    'dashboard.applyFilters': 'Apply Filters',
    'dashboard.pickDate': 'Pick a date',
    
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
    
    // Calendar
    'calendar.today': 'Today',
    'calendar.previousMonth': 'Previous month',
    'calendar.nextMonth': 'Next month',
    'calendar.january': 'January',
    'calendar.february': 'February',
    'calendar.march': 'March',
    'calendar.april': 'April',
    'calendar.may': 'May',
    'calendar.june': 'June',
    'calendar.july': 'July',
    'calendar.august': 'August',
    'calendar.september': 'September',
    'calendar.october': 'October',
    'calendar.november': 'November',
    'calendar.december': 'December',
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
    'login.allRightsReserved': 'সর্বস্বত্ব সংরক্ষিত',
    
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
    
    // Dashboard Stats
    'dashboard.totalAdmin': 'মোট অ্যাডমিন',
    'dashboard.totalUser': 'মোট ইউজার',
    'dashboard.totalChamber': 'মোট চেম্বার',
    'dashboard.totalIncome': 'মোট আয়',
    'dashboard.totalExpense': 'মোট ব্যয়',
    'dashboard.netIncome': 'নিট আয়',
    'dashboard.deposit': 'জমা',
    'dashboard.cashInHand': 'হাতে নগদ',
    
    // Dashboard Filters
    'dashboard.filters': 'ফিল্টার',
    'dashboard.filterByChamber': 'চেম্বার দিয়ে ফিল্টার',
    'dashboard.filterByAdmin': 'অ্যাডমিন দিয়ে ফিল্টার',
    'dashboard.startDate': 'শুরুর তারিখ',
    'dashboard.endDate': 'শেষের তারিখ',
    'dashboard.allChambers': 'সকল চেম্বার',
    'dashboard.allAdmins': 'সকল অ্যাডমিন',
    'dashboard.selectStartDate': 'শুরুর তারিখ নির্বাচন করুন',
    'dashboard.selectEndDate': 'শেষের তারিখ নির্বাচন করুন',
    'dashboard.resetFilters': 'ফিল্টার রিসেট',
    'dashboard.applyFilters': 'ফিল্টার প্রয়োগ',
    'dashboard.pickDate': 'তারিখ নির্বাচন করুন',
    
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
    
    // Calendar
    'calendar.today': 'আজ',
    'calendar.previousMonth': 'পূর্ববর্তী মাস',
    'calendar.nextMonth': 'পরবর্তী মাস',
    'calendar.january': 'জানুয়ারী',
    'calendar.february': 'ফেব্রুয়ারী',
    'calendar.march': 'মার্চ',
    'calendar.april': 'এপ্রিল',
    'calendar.may': 'মে',
    'calendar.june': 'জুন',
    'calendar.july': 'জুলাই',
    'calendar.august': 'আগস্ট',
    'calendar.september': 'সেপ্টেম্বর',
    'calendar.october': 'অক্টোবর',
    'calendar.november': 'নভেম্বর',
    'calendar.december': 'ডিসেম্বর',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Helper to detect client-side rendering
const isClient = typeof window !== 'undefined'

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Add a state to track if we've mounted to avoid hydration mismatch
  const [mounted, setMounted] = useState(false)
  
  // Use a state initialization function to check localStorage synchronously at first render
  const [language, setLanguage] = useState<Language>(() => {
    // Only access localStorage on the client-side
    if (isClient) {
      const savedLanguage = localStorage.getItem('docledger-language') as Language
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
        return savedLanguage
      }
    }
    return 'en'
  })

  // Mark component as mounted after first render
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // This useEffect is kept to handle any changes to localStorage that might happen outside this component
  useEffect(() => {
    const savedLanguage = localStorage.getItem('docledger-language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn') && savedLanguage !== language) {
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

  const formatNumber = (num: number): string => {
    const formattedNum = num.toLocaleString()
    return language === 'bn' ? englishToBengaliNumbers(formattedNum) : formattedNum
  }

  const formatCurrency = (amount: number): string => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount).replace('BDT', '৳')
    
    return language === 'bn' ? englishToBengaliNumbers(formatted) : formatted
  }

  const formatDate = (date: Date, format: string = 'MMMM d, yyyy'): string => {
    if (language === 'bn') {
      const day = englishToBengaliNumbers(date.getDate().toString())
      const month = bengaliMonths[date.getMonth()]
      const year = englishToBengaliNumbers(date.getFullYear().toString())
      
      if (format === 'MMMM d, yyyy') {
        return `${month} ${day}, ${year}`
      }
      // Add more format options as needed
      return `${day}/${englishToBengaliNumbers((date.getMonth() + 1).toString())}/${year}`
    }
    
    // For English, use dynamic import to avoid SSR issues
    if (typeof window !== 'undefined') {
      return formatDateFn(date, format)
    }
    
    // Fallback for SSR
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const value = {
    language,
    setLanguage: handleLanguageChange,
    t,
    formatNumber,
    formatCurrency,
    formatDate
  }

  // If we haven't mounted yet, return a div with the same className structure but no content
  // to avoid flickering. We could also return null, but that might cause layout shifts.
  if (!mounted && isClient) {
    return (
      <div className="font-sans">
        {/* Empty div with the same structure to prevent layout shift */}
      </div>
    )
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
