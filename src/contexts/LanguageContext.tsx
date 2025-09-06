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
    
    // Common
    'common.language': 'Language',
    'common.search': 'Search',
    'common.cancel': 'Cancel',
    'common.create': 'Create',
    'common.creating': 'Creating...',
    
    // Auth
    'auth.password': 'Password',
    'auth.passwordPlaceholder': 'Enter password',
    'auth.phonePlaceholder': '01XXXXXXXXX',
    
    // Validation
    'validation.nameRequired': 'Name is required',
    'validation.phoneRequired': 'Phone number is required',
    'validation.phoneLength': 'Phone number must be exactly 11 digits',
    'validation.phoneStart': 'Phone number must start with 01',
    'validation.phoneOperator': 'Invalid operator code (3rd digit must be 3-9)',
    'validation.passwordRequired': 'Password is required',
    'validation.passwordLength': 'Password must be at least 6 characters',
    'validation.invalidCredentials': 'Invalid credentials. Please try again.',
    
    // Toast
    'toast.success': 'Success',
    'toast.error': 'Error',
    'toast.warning': 'Warning',
    'toast.info': 'Information',
    'toast.close': 'Close',
    'toast.loginSuccess': 'Login Successful',
    'toast.loginSuccessDesc': 'Welcome back! You have been logged in successfully.',
    'toast.logoutSuccess': 'Logout Successful',
    'toast.logoutSuccessDesc': 'You have been logged out successfully.',
    'toast.loginError': 'Login Failed',
    'toast.loginErrorDesc': 'Invalid credentials. Please check your phone number and password.',
    
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
    
    // Admin
    'admin.title': 'Admin Management',
    'admin.subtitle': 'Manage admin users and their permissions',
    'admin.search': 'Search users...',
    'admin.searchPlaceholder': 'Search by name or phone number',
    'admin.name': 'Name',
    'admin.phoneNumber': 'Phone Number',
    'admin.status': 'Status',
    'admin.actions': 'Actions',
    'admin.edit': 'Edit',
    'admin.active': 'Active',
    'admin.inactive': 'Inactive',
    'admin.previous': 'Previous',
    'admin.next': 'Next',
    'admin.showing': 'Showing',
    'admin.to': 'to',
    'admin.of': 'of',
    'admin.results': 'results',
    'admin.addAdmin': 'Add Admin',
    'admin.addNewAdmin': 'Add New Admin',
    'admin.addNewAdminDesc': 'Create a new admin user account',
    'admin.namePlaceholder': 'Enter admin name',
    'admin.adminAdded': 'Admin Added',
    'admin.adminAddedDesc': 'New admin user has been created successfully',

    // Chamber
    'chamber.title': 'Chamber Management',
    'chamber.subtitle': 'Manage chambers and their details',
    'chamber.search': 'Search chambers...',
    'chamber.searchPlaceholder': 'Search by admin name, chamber name or address',
    'chamber.adminName': 'Admin Name',
    'chamber.chamberName': 'Chamber Name',
    'chamber.address': 'Chamber Address',
    'chamber.status': 'Status',
    'chamber.actions': 'Actions',
    'chamber.edit': 'Edit',
    'chamber.active': 'Active',
    'chamber.inactive': 'Inactive',
    'chamber.previous': 'Previous',
    'chamber.next': 'Next',
    'chamber.showing': 'Showing',
    'chamber.to': 'to',
    'chamber.of': 'of',
    'chamber.results': 'results',
    'chamber.addChamber': 'Add Chamber',
    'chamber.addNewChamber': 'Add New Chamber',
    'chamber.addNewChamberDesc': 'Create a new chamber with admin assignment',
    'chamber.selectAdmin': 'Select Admin',
    'chamber.chamberNamePlaceholder': 'Enter chamber name',
    'chamber.addressPlaceholder': 'Enter chamber address',
    'chamber.chamberAdded': 'Chamber Added',
    'chamber.chamberAddedDesc': 'New chamber has been created successfully',
    'chamber.noChambers': 'No chambers found',
    'chamber.adminRequired': 'Admin selection is required',
    'chamber.chamberNameRequired': 'Chamber name is required',
    'chamber.addressRequired': 'Chamber address is required',

    // User
    'user.title': 'User Management',
    'user.subtitle': 'Manage users and their chamber assignments',
    'user.search': 'Search users...',
    'user.searchPlaceholder': 'Search by admin name, chamber name, user name or phone number',
    'user.adminName': 'Admin Name',
    'user.chamberName': 'Chamber Name',
    'user.userName': 'User Name',
    'user.phoneNumber': 'Phone Number',
    'user.status': 'Status',
    'user.actions': 'Actions',
    'user.edit': 'Edit',
    'user.active': 'Active',
    'user.inactive': 'Inactive',
    'user.previous': 'Previous',
    'user.next': 'Next',
    'user.showing': 'Showing',
    'user.to': 'to',
    'user.of': 'of',
    'user.results': 'results',
    'user.addUser': 'Add User',
    'user.addNewUser': 'Add New User',
    'user.addNewUserDesc': 'Create a new user account with chamber assignment',
    'user.selectAdmin': 'Select Admin',
    'user.selectChamber': 'Select Chamber',
    'user.selectAdminFirst': 'Select admin first',
    'user.userNamePlaceholder': 'Enter user name',
    'user.userAdded': 'User Added',
    'user.userAddedDesc': 'New user has been created successfully',
    'user.noUsers': 'No users found',
    'user.adminRequired': 'Admin selection is required',
    'user.chamberRequired': 'Chamber selection is required',
    'user.filterByChamber': 'Filter by Chamber',
    'user.allChambers': 'All Chambers',

    // Appointment
    'appointment.title': 'Appointment Management',
    'appointment.subtitle': 'Manage patient appointments and schedules',
    'appointment.search': 'Search appointments...',
    'appointment.searchPlaceholder': 'Search by admin, chamber, patient name, type, phone, date, time or amount',
    'appointment.adminName': 'Admin Name',
    'appointment.chamberName': 'Chamber Name',
    'appointment.patientName': 'Patient Name',
    'appointment.patientType': 'Patient Type',
    'appointment.patientPhone': 'Patient Phone',
    'appointment.date': 'Date',
    'appointment.time': 'Time',
    'appointment.amount': 'Amount',
    'appointment.status': 'Status',
    'appointment.actions': 'Actions',
    'appointment.edit': 'Edit',
    'appointment.active': 'Active',
    'appointment.inactive': 'Inactive',
    'appointment.previous': 'Previous',
    'appointment.next': 'Next',
    'appointment.showing': 'Showing',
    'appointment.to': 'to',
    'appointment.of': 'of',
    'appointment.results': 'results',
    'appointment.addAppointment': 'Add Appointment',
    'appointment.addNewAppointment': 'Add New Appointment',
    'appointment.addNewAppointmentDesc': 'Schedule a new patient appointment',
    'appointment.selectAdmin': 'Select Admin',
    'appointment.selectChamber': 'Select Chamber',
    'appointment.selectAdminFirst': 'Select admin first',
    'appointment.selectPatientType': 'Select Patient Type',
    'appointment.selectDate': 'Select appointment date',
    'appointment.selectTime': 'Select appointment time',
    'appointment.patientNamePlaceholder': 'Enter patient name',
    'appointment.amountPlaceholder': 'Enter amount (e.g., 1500.00)',
    'appointment.appointmentAdded': 'Appointment Added',
    'appointment.appointmentAddedDesc': 'New appointment has been scheduled successfully',
    'appointment.noAppointments': 'No appointments found',
    'appointment.adminRequired': 'Admin selection is required',
    'appointment.chamberRequired': 'Chamber selection is required',
    'appointment.patientNameRequired': 'Patient name is required',
    'appointment.patientTypeRequired': 'Patient type is required',
    'appointment.dateRequired': 'Appointment date is required',
    'appointment.timeRequired': 'Appointment time is required',
    'appointment.amountRequired': 'Amount is required',
    'appointment.invalidAmount': 'Please enter a valid amount',
    'appointment.pastDateNotAllowed': 'Past dates are not allowed',
    'appointment.filterByChamber': 'Filter by Chamber',
    'appointment.allChambers': 'All Chambers',
  },
  bn: {
    // Login Form
    'login.title': 'স্বাগতম',
    'login.subtitle': 'আপনার ডকলেজার অ্যাকাউন্টে সাইন ইন করুন',
    'login.phone': 'ফোন নম্বর',
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
    'dashboard.subtitle': 'আপনার ডকলেজার ড্যাশবোর্ডে স্বাগতম',
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
    'dashboard.netIncome': 'নেট আয়',
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
    'validation.phoneLength': 'ফোন নম্বর অবশ্যই ১১ সংখ্যার হতে হবে',
    'validation.phoneStart': 'ফোন নম্বর অবশ্যই ০১ দিয়ে শুরু হতে হবে',
    'validation.phoneOperator': 'অবৈধ অপারেটর কোড (৩য় সংখ্যা ৩-৯ হতে হবে)',
    'validation.passwordRequired': 'পাসওয়ার্ড প্রয়োজন',
    'validation.passwordLength': 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে',
    'validation.invalidCredentials': 'অবৈধ প্রমাণপত্র। আবার চেষ্টা করুন।',
    
    // Common
    'common.language': 'ভাষা',
    'common.search': 'খুঁজুন',
    'common.cancel': 'বাতিল',
    'common.create': 'তৈরি',
    'common.creating': 'তৈরি করা হচ্ছে...',
    
    // Auth
    'auth.password': 'পাসওয়ার্ড',
    'auth.passwordPlaceholder': 'পাসওয়ার্ড লিখুন',
    'auth.phonePlaceholder': '০১XXXXXXXXX',
    
    // Validation
    'validation.nameRequired': 'নাম প্রয়োজন',
    
    // Toast
    'toast.success': 'সফল',
    'toast.error': 'ত্রুটি',
    'toast.warning': 'সতর্কতা',
    'toast.info': 'তথ্য',
    'toast.close': 'বন্ধ করুন',
    'toast.loginSuccess': 'লগইন সফল',
    'toast.loginSuccessDesc': 'স্বাগতম! আপনি সফলভাবে লগইন করেছেন।',
    'toast.logoutSuccess': 'লগআউট সফল',
    'toast.logoutSuccessDesc': 'আপনি সফলভাবে লগআউট করেছেন।',
    'toast.loginError': 'লগইন ব্যর্থ',
    'toast.loginErrorDesc': 'অবৈধ প্রমাণপত্র। অনুগ্রহ করে আপনার ফোন নম্বর এবং পাসওয়ার্ড পরীক্ষা করুন।',
    
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
    
    // Admin
    'admin.title': 'অ্যাডমিন ব্যবস্থাপনা',
    'admin.subtitle': 'অ্যাডমিন ইউজার এবং তাদের অনুমতি পরিচালনা করুন',
    'admin.search': 'ইউজার খুঁজুন...',
    'admin.searchPlaceholder': 'নাম বা ফোন নম্বর দিয়ে খুঁজুন',
    'admin.name': 'নাম',
    'admin.phoneNumber': 'ফোন নম্বর',
    'admin.status': 'অবস্থা',
    'admin.actions': 'কার্যক্রম',
    'admin.edit': 'সম্পাদনা',
    'admin.active': 'সক্রিয়',
    'admin.inactive': 'নিষ্ক্রিয়',
    'admin.previous': 'পূর্ববর্তী',
    'admin.next': 'পরবর্তী',
    'admin.showing': 'দেখানো হচ্ছে',
    'admin.to': 'থেকে',
    'admin.of': 'এর মধ্যে',
    'admin.results': 'ফলাফল',
    'admin.addAdmin': 'অ্যাডমিন যোগ করুন',
    'admin.addNewAdmin': 'নতুন অ্যাডমিন যোগ করুন',
    'admin.addNewAdminDesc': 'একটি নতুন অ্যাডমিন ইউজার অ্যাকাউন্ট তৈরি করুন',
    'admin.namePlaceholder': 'অ্যাডমিনের নাম লিখুন',
    'admin.adminAdded': 'অ্যাডমিন যোগ করা হয়েছে',
    'admin.adminAddedDesc': 'নতুন অ্যাডমিন ইউজার সফলভাবে তৈরি করা হয়েছে',

    // Chamber
    'chamber.title': 'চেম্বার ব্যবস্থাপনা',
    'chamber.subtitle': 'চেম্বার এবং তাদের বিবরণ পরিচালনা করুন',
    'chamber.search': 'চেম্বার খুঁজুন...',
    'chamber.searchPlaceholder': 'অ্যাডমিনের নাম, চেম্বারের নাম বা ঠিকানা দিয়ে খুঁজুন',
    'chamber.adminName': 'অ্যাডমিনের নাম',
    'chamber.chamberName': 'চেম্বারের নাম',
    'chamber.address': 'চেম্বারের ঠিকানা',
    'chamber.status': 'অবস্থা',
    'chamber.actions': 'কার্যক্রম',
    'chamber.edit': 'সম্পাদনা',
    'chamber.active': 'সক্রিয়',
    'chamber.inactive': 'নিষ্ক্রিয়',
    'chamber.previous': 'পূর্ববর্তী',
    'chamber.next': 'পরবর্তী',
    'chamber.showing': 'দেখানো হচ্ছে',
    'chamber.to': 'থেকে',
    'chamber.of': 'এর মধ্যে',
    'chamber.results': 'ফলাফল',
    'chamber.addChamber': 'চেম্বার যোগ করুন',
    'chamber.addNewChamber': 'নতুন চেম্বার যোগ করুন',
    'chamber.addNewChamberDesc': 'অ্যাডমিন নিয়োগ সহ একটি নতুন চেম্বার তৈরি করুন',
    'chamber.selectAdmin': 'অ্যাডমিন নির্বাচন করুন',
    'chamber.chamberNamePlaceholder': 'চেম্বারের নাম লিখুন',
    'chamber.addressPlaceholder': 'চেম্বারের ঠিকানা লিখুন',
    'chamber.chamberAdded': 'চেম্বার যোগ করা হয়েছে',
    'chamber.chamberAddedDesc': 'নতুন চেম্বার সফলভাবে তৈরি করা হয়েছে',
    'chamber.noChambers': 'কোন চেম্বার পাওয়া যায়নি',
    'chamber.adminRequired': 'অ্যাডমিন নির্বাচন প্রয়োজন',
    'chamber.chamberNameRequired': 'চেম্বারের নাম প্রয়োজন',
    'chamber.addressRequired': 'চেম্বারের ঠিকানা প্রয়োজন',

    // User
    'user.title': 'ইউজার ব্যবস্থাপনা',
    'user.subtitle': 'ইউজার এবং তাদের চেম্বার নিয়োগ পরিচালনা করুন',
    'user.search': 'ইউজার খুঁজুন...',
    'user.searchPlaceholder': 'অ্যাডমিনের নাম, চেম্বারের নাম, ইউজারের নাম বা ফোন নম্বর দিয়ে খুঁজুন',
    'user.adminName': 'অ্যাডমিনের নাম',
    'user.chamberName': 'চেম্বারের নাম',
    'user.userName': 'ইউজারের নাম',
    'user.phoneNumber': 'ফোন নম্বর',
    'user.status': 'অবস্থা',
    'user.actions': 'কার্যক্রম',
    'user.edit': 'সম্পাদনা',
    'user.active': 'সক্রিয়',
    'user.inactive': 'নিষ্ক্রিয়',
    'user.previous': 'পূর্ববর্তী',
    'user.next': 'পরবর্তী',
    'user.showing': 'দেখানো হচ্ছে',
    'user.to': 'থেকে',
    'user.of': 'এর মধ্যে',
    'user.results': 'ফলাফল',
    'user.addUser': 'ইউজার যোগ করুন',
    'user.addNewUser': 'নতুন ইউজার যোগ করুন',
    'user.addNewUserDesc': 'চেম্বার নিয়োগ সহ একটি নতুন ইউজার অ্যাকাউন্ট তৈরি করুন',
    'user.selectAdmin': 'অ্যাডমিন নির্বাচন করুন',
    'user.selectChamber': 'চেম্বার নির্বাচন করুন',
    'user.selectAdminFirst': 'প্রথমে অ্যাডমিন নির্বাচন করুন',
    'user.userNamePlaceholder': 'ইউজারের নাম লিখুন',
    'user.userAdded': 'ইউজার যোগ করা হয়েছে',
    'user.userAddedDesc': 'নতুন ইউজার সফলভাবে তৈরি করা হয়েছে',
    'user.noUsers': 'কোন ইউজার পাওয়া যায়নি',
    'user.adminRequired': 'অ্যাডমিন নির্বাচন প্রয়োজন',
    'user.chamberRequired': 'চেম্বার নির্বাচন প্রয়োজন',
    'user.filterByChamber': 'চেম্বার দিয়ে ফিল্টার',
    'user.allChambers': 'সকল চেম্বার',

    // Appointment
    'appointment.title': 'অ্যাপয়েন্টমেন্ট ব্যবস্থাপনা',
    'appointment.subtitle': 'রোগীর অ্যাপয়েন্টমেন্ট এবং সময়সূচী পরিচালনা করুন',
    'appointment.search': 'অ্যাপয়েন্টমেন্ট খুঁজুন...',
    'appointment.searchPlaceholder': 'অ্যাডমিন, চেম্বার, রোগীর নাম, ধরন, ফোন, তারিখ, সময় বা পরিমাণ দিয়ে খুঁজুন',
    'appointment.adminName': 'অ্যাডমিনের নাম',
    'appointment.chamberName': 'চেম্বারের নাম',
    'appointment.patientName': 'রোগীর নাম',
    'appointment.patientType': 'রোগীর ধরন',
    'appointment.patientPhone': 'রোগীর ফোন',
    'appointment.date': 'তারিখ',
    'appointment.time': 'সময়',
    'appointment.amount': 'পরিমাণ',
    'appointment.status': 'অবস্থা',
    'appointment.actions': 'কার্যক্রম',
    'appointment.edit': 'সম্পাদনা',
    'appointment.active': 'সক্রিয়',
    'appointment.inactive': 'নিষ্ক্রিয়',
    'appointment.previous': 'পূর্ববর্তী',
    'appointment.next': 'পরবর্তী',
    'appointment.showing': 'দেখানো হচ্ছে',
    'appointment.to': 'থেকে',
    'appointment.of': 'এর মধ্যে',
    'appointment.results': 'ফলাফল',
    'appointment.addAppointment': 'অ্যাপয়েন্টমেন্ট যোগ করুন',
    'appointment.addNewAppointment': 'নতুন অ্যাপয়েন্টমেন্ট যোগ করুন',
    'appointment.addNewAppointmentDesc': 'একটি নতুন রোগী অ্যাপয়েন্টমেন্ট নির্ধারণ করুন',
    'appointment.selectAdmin': 'অ্যাডমিন নির্বাচন করুন',
    'appointment.selectChamber': 'চেম্বার নির্বাচন করুন',
    'appointment.selectAdminFirst': 'প্রথমে অ্যাডমিন নির্বাচন করুন',
    'appointment.selectPatientType': 'রোগীর ধরন নির্বাচন করুন',
    'appointment.selectDate': 'অ্যাপয়েন্টমেন্ট তারিখ নির্বাচন করুন',
    'appointment.selectTime': 'অ্যাপয়েন্টমেন্ট সময় নির্বাচন করুন',
    'appointment.patientNamePlaceholder': 'রোগীর নাম লিখুন',
    'appointment.amountPlaceholder': 'পরিমাণ লিখুন (যেমন, ১৫০০.০০)',
    'appointment.appointmentAdded': 'অ্যাপয়েন্টমেন্ট যোগ করা হয়েছে',
    'appointment.appointmentAddedDesc': 'নতুন অ্যাপয়েন্টমেন্ট সফলভাবে নির্ধারণ করা হয়েছে',
    'appointment.noAppointments': 'কোন অ্যাপয়েন্টমেন্ট পাওয়া যায়নি',
    'appointment.adminRequired': 'অ্যাডমিন নির্বাচন প্রয়োজন',
    'appointment.chamberRequired': 'চেম্বার নির্বাচন প্রয়োজন',
    'appointment.patientNameRequired': 'রোগীর নাম প্রয়োজন',
    'appointment.patientTypeRequired': 'রোগীর ধরন প্রয়োজন',
    'appointment.dateRequired': 'অ্যাপয়েন্টমেন্ট তারিখ প্রয়োজন',
    'appointment.timeRequired': 'অ্যাপয়েন্টমেন্ট সময় প্রয়োজন',
    'appointment.amountRequired': 'পরিমাণ প্রয়োজন',
    'appointment.invalidAmount': 'অনুগ্রহ করে একটি বৈধ পরিমাণ লিখুন',
    'appointment.pastDateNotAllowed': 'অতীতের তারিখ অনুমোদিত নয়',
    'appointment.filterByChamber': 'চেম্বার দিয়ে ফিল্টার',
    'appointment.allChambers': 'সকল চেম্বার',
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
  }, [language])

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
