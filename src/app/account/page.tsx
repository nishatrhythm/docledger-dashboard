'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import Sidebar from '@/components/ui/Sidebar'
import { useLanguage } from '@/contexts/LanguageContext'
import { useLocalizedToast } from '@/hooks/use-localized-toast'
import { validateBangladeshiMobile } from '@/lib/validation'
import { 
  MdSearch,
  MdMenu,
  MdEdit,
  MdChevronLeft,
  MdChevronRight,
  MdAccountBalance
} from 'react-icons/md'
import { BiUser, BiCreditCard, BiBuildings, BiHash } from 'react-icons/bi'

// Demo data for doctors (for dropdown)
const demoDoctors = [
  { id: 1, name: 'Dr. Ahmed Rahman', nameBn: 'ডা. আহমেদ রহমান' },
  { id: 2, name: 'Dr. Sarah Khan', nameBn: 'ডা. সারাহ খান' },
  { id: 3, name: 'Dr. Mohammad Ali', nameBn: 'ডা. মোহাম্মদ আলী' },
  { id: 4, name: 'Dr. Fatima Sheikh', nameBn: 'ডা. ফাতিমা শেখ' },
  { id: 5, name: 'Dr. Rahman Khan', nameBn: 'ডা. রহমান খান' },
  { id: 6, name: 'Dr. Ayesha Begum', nameBn: 'ডা. আয়েশা বেগম' },
  { id: 7, name: 'Dr. Hassan Ali', nameBn: 'ডা. হাসান আলী' },
  { id: 8, name: 'Dr. Nadia Islam', nameBn: 'ডা. নাদিয়া ইসলাম' },
]

// Account types
const accountTypes = [
  { value: 'mfs', labelEn: 'MFS', labelBn: 'মোবাইল ব্যাংকিং' },
  { value: 'bank', labelEn: 'Bank', labelBn: 'ব্যাংক' }
]

// Demo data for accounts
const demoAccounts = [
  { 
    id: 1, 
    doctorId: 1,
    doctorName: 'Dr. Ahmed Rahman', 
    doctorNameBn: 'ডা. আহমেদ রহমান',
    accountType: 'bank',
    accountTypeName: 'Bank',
    accountTypeNameBn: 'ব্যাংক',
    accountOrganization: 'Islami Bank Bangladesh',
    accountOrganizationBn: 'ইসলামী ব্যাংক বাংলাদেশ',
    accountNumber: '1234567890',
    date: new Date('2025-09-08'),
    isActive: true 
  },
  { 
    id: 2, 
    doctorId: 1,
    doctorName: 'Dr. Ahmed Rahman', 
    doctorNameBn: 'ডা. আহমেদ রহমান',
    accountType: 'mfs',
    accountTypeName: 'MFS',
    accountTypeNameBn: 'মোবাইল ব্যাংকিং',
    accountOrganization: 'bKash',
    accountOrganizationBn: 'বিকাশ',
    accountNumber: '01712345678',
    date: new Date('2025-09-07'),
    isActive: true 
  },
  { 
    id: 3, 
    doctorId: 2,
    doctorName: 'Dr. Sarah Khan', 
    doctorNameBn: 'ডা. সারাহ খান',
    accountType: 'bank',
    accountTypeName: 'Bank',
    accountTypeNameBn: 'ব্যাংক',
    accountOrganization: 'Dutch Bangla Bank',
    accountOrganizationBn: 'ডাচ-বাংলা ব্যাংক',
    accountNumber: '2234567890',
    date: new Date('2025-09-06'),
    isActive: false 
  },
  { 
    id: 4, 
    doctorId: 2,
    doctorName: 'Dr. Sarah Khan', 
    doctorNameBn: 'ডা. সারাহ খান',
    accountType: 'mfs',
    accountTypeName: 'MFS',
    accountTypeNameBn: 'মোবাইল ব্যাংকিং',
    accountOrganization: 'Nagad',
    accountOrganizationBn: 'নগদ',
    accountNumber: '01823456789',
    date: new Date('2025-09-05'),
    isActive: true 
  },
  { 
    id: 5, 
    doctorId: 3,
    doctorName: 'Dr. Mohammad Ali', 
    doctorNameBn: 'ডা. মোহাম্মদ আলী',
    accountType: 'bank',
    accountTypeName: 'Bank',
    accountTypeNameBn: 'ব্যাংক',
    accountOrganization: 'Brac Bank',
    accountOrganizationBn: 'ব্র্যাক ব্যাংক',
    accountNumber: '3234567890',
    date: new Date('2025-09-04'),
    isActive: true 
  },
  { 
    id: 6, 
    doctorId: 4,
    doctorName: 'Dr. Fatima Sheikh', 
    doctorNameBn: 'ডা. ফাতিমা শেখ',
    accountType: 'bank',
    accountTypeName: 'Bank',
    accountTypeNameBn: 'ব্যাংক',
    accountOrganization: 'City Bank',
    accountOrganizationBn: 'সিটি ব্যাংক',
    accountNumber: '4234567890',
    date: new Date('2025-09-03'),
    isActive: false 
  },
  { 
    id: 7, 
    doctorId: 5,
    doctorName: 'Dr. Rahman Khan', 
    doctorNameBn: 'ডা. রহমান খান',
    accountType: 'mfs',
    accountTypeName: 'MFS',
    accountTypeNameBn: 'মোবাইল ব্যাংকিং',
    accountOrganization: 'Rocket',
    accountOrganizationBn: 'রকেট',
    accountNumber: '01934567890',
    date: new Date('2025-09-02'),
    isActive: true 
  },
  { 
    id: 8, 
    doctorId: 6,
    doctorName: 'Dr. Ayesha Begum', 
    doctorNameBn: 'ডা. আয়েশা বেগম',
    accountType: 'bank',
    accountTypeName: 'Bank',
    accountTypeNameBn: 'ব্যাংক',
    accountOrganization: 'Eastern Bank',
    accountOrganizationBn: 'ইস্টার্ন ব্যাংক',
    accountNumber: '6234567890',
    date: new Date('2025-09-01'),
    isActive: true 
  },
  { 
    id: 9, 
    doctorId: 7,
    doctorName: 'Dr. Hassan Ali', 
    doctorNameBn: 'ডা. হাসান আলী',
    accountType: 'bank',
    accountTypeName: 'Bank',
    accountTypeNameBn: 'ব্যাংক',
    accountOrganization: 'Standard Chartered Bank',
    accountOrganizationBn: 'স্ট্যান্ডার্ড চার্টার্ড ব্যাংক',
    accountNumber: '7234567890',
    date: new Date('2025-08-31'),
    isActive: true 
  },
  { 
    id: 10, 
    doctorId: 8,
    doctorName: 'Dr. Nadia Islam', 
    doctorNameBn: 'ডা. নাদিয়া ইসলাম',
    accountType: 'mfs',
    accountTypeName: 'MFS',
    accountTypeNameBn: 'মোবাইল ব্যাংকিং',
    accountOrganization: 'bKash',
    accountOrganizationBn: 'বিকাশ',
    accountNumber: '01645678901',
    date: new Date('2025-08-30'),
    isActive: false 
  },
]

export default function AccountPage() {
  const { t, formatNumber, formatDate, language } = useLanguage()
  
  // Bengali number conversion function
  const englishToBengaliNumbers = (num: string): string => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
    return num.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit)])
  }
  
  const router = useRouter()
  const { showToast } = useLocalizedToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [accounts, setAccounts] = useState(demoAccounts)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newAccountForm, setNewAccountForm] = useState({
    doctorId: '',
    accountType: '',
    accountOrganization: '',
    accountNumber: ''
  })
  const [formErrors, setFormErrors] = useState<{doctorId?: string; accountType?: string; accountOrganization?: string; accountNumber?: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const itemsPerPage = 5

  const validateAddAccountForm = () => {
    const newErrors: {doctorId?: string; accountType?: string; accountOrganization?: string; accountNumber?: string} = {}

    if (!newAccountForm.doctorId) {
      newErrors.doctorId = t('account.doctorRequired')
    }

    if (!newAccountForm.accountType) {
      newErrors.accountType = t('account.accountTypeRequired')
    }

    if (!newAccountForm.accountOrganization.trim()) {
      newErrors.accountOrganization = t('account.accountOrganizationRequired')
    }

    if (!newAccountForm.accountNumber.trim()) {
      newErrors.accountNumber = t('account.accountNumberRequired')
    } else {
      // Validation based on account type
      if (newAccountForm.accountType === 'bank') {
        // Bank account: 8-18 digits
        if (!/^\d{8,18}$/.test(newAccountForm.accountNumber)) {
          newErrors.accountNumber = t('account.invalidAccountNumber')
        }
      } else if (newAccountForm.accountType === 'mfs') {
        // MFS account: Use the same validation as phone numbers (01X-XXXXXXX where X is 3-9)
        const mfsValidation = validateBangladeshiMobile(newAccountForm.accountNumber, t)
        if (!mfsValidation.isValid) {
          newErrors.accountNumber = mfsValidation.error || t('account.invalidAccountNumber')
        }
      }
    }

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAddAccountForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const selectedDoctorData = demoDoctors.find(doctor => doctor.id.toString() === newAccountForm.doctorId)
      const selectedAccountType = accountTypes.find(type => type.value === newAccountForm.accountType)
      
      const newAccount = {
        id: Math.max(...accounts.map(a => a.id)) + 1,
        doctorId: parseInt(newAccountForm.doctorId),
        doctorName: selectedDoctorData?.name || '',
        doctorNameBn: selectedDoctorData?.nameBn || '',
        accountType: newAccountForm.accountType,
        accountTypeName: selectedAccountType?.labelEn || '',
        accountTypeNameBn: selectedAccountType?.labelBn || '',
        accountOrganization: newAccountForm.accountOrganization,
        accountOrganizationBn: newAccountForm.accountOrganization, // In real app, you might want separate Bengali field
        accountNumber: newAccountForm.accountNumber,
        date: new Date(),
        isActive: true
      }

      setAccounts(prevAccounts => [newAccount, ...prevAccounts])
      setIsAddModalOpen(false)
      setNewAccountForm({ 
        doctorId: '', 
        accountType: '', 
        accountOrganization: '',
        accountNumber: ''
      })
      setFormErrors({})
      setIsSubmitting(false)

      showToast.success(t('account.accountAdded'), t('account.accountAddedDesc'))
    }, 1000)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setNewAccountForm({ 
      doctorId: '', 
      accountType: '', 
      accountOrganization: '',
      accountNumber: ''
    })
    setFormErrors({})
    setIsSubmitting(false)
  }

  const handleModalInputChange = (field: keyof typeof newAccountForm) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | string) => {
    let value: string
    if (typeof e === 'string') {
      value = e // For Select component
    } else {
      value = (e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>).target.value // For Input/Textarea component
    }

    // Format account number based on account type
    if (field === 'accountNumber') {
      if (newAccountForm.accountType === 'bank') {
        // Allow only numbers for bank accounts (8-18 digits)
        value = value.replace(/[^0-9]/g, '')
        if (value.length > 18) {
          value = value.substring(0, 18)
        }
      } else if (newAccountForm.accountType === 'mfs') {
        // Allow only numbers and format as phone number for MFS (11 digits)
        value = value.replace(/[^0-9]/g, '')
        if (value.length > 11) {
          value = value.substring(0, 11)
        }
      }
    }
    
    setNewAccountForm(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleStatusToggle = (accountId: number) => {
    setAccounts(prevAccounts => 
      prevAccounts.map(account => 
        account.id === accountId 
          ? { ...account, isActive: !account.isActive }
          : account
      )
    )
  }

  const handleEdit = (accountId: number) => {
    // This will be implemented later
    showToast.info('Edit functionality', 'Edit functionality will be implemented soon')
    console.log('Edit account:', accountId)
  }

  const handleSearch = () => {
    // Since we're filtering in real-time, this button can be used for additional search actions if needed
  }

  const handleResetSearch = () => {
    setSearchQuery('')
    setSelectedDoctor(undefined)
    setCurrentPage(1)
  }

  // Filter accounts based on search query and selected doctor
  const filteredAccounts = useMemo(() => {
    let filtered = accounts

    // Filter by doctor if selected
    if (selectedDoctor) {
      filtered = filtered.filter(account => account.doctorId.toString() === selectedDoctor)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(account => {
        const doctorName = language === 'bn' ? account.doctorNameBn : account.doctorName
        const accountTypeName = language === 'bn' ? account.accountTypeNameBn : account.accountTypeName
        const accountOrganization = language === 'bn' ? account.accountOrganizationBn : account.accountOrganization
        
        return doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               accountTypeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               accountOrganization.toLowerCase().includes(searchQuery.toLowerCase()) ||
               account.accountNumber.includes(searchQuery)
      })
    }

    return filtered
  }, [accounts, searchQuery, selectedDoctor, language])

  // Pagination logic
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAccounts = filteredAccounts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto lg:ml-0">
        {/* Header */}
        <header className="sticky top-0 bg-white shadow-sm border-b z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 sm:h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-2 mr-3 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Open menu"
                >
                  <MdMenu className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="hidden sm:inline text-sm lg:text-base text-gray-600">{t('dashboard.welcome')}</span>
                <LanguageSwitcher size="sm" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1">
          <div className="mb-6 lg:mb-8 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{t('account.title')}</h2>
                <p className="text-gray-600 mt-1 sm:mt-2 text-base sm:text-lg">{t('account.subtitle')}</p>
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="lg:self-start w-auto max-w-fit mx-auto lg:mx-0"
              >
                <MdAccountBalance className="w-4 h-4 mr-2" />
                {t('account.addAccount')}
              </Button>
            </div>
          </div>

          {/* Filter Section */}
          <Card className="mb-6 lg:mb-8">
            <CardHeader className="pb-1 sm:pb-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 gap-1 sm:gap-2">
                <CardTitle className="text-lg sm:text-xl">{t('dashboard.filters')}</CardTitle>
                <div className="hidden sm:flex">
                  <Button
                    variant="outline"
                    onClick={handleResetSearch}
                    className="text-sm sm:text-base h-9 sm:h-10"
                  >
                    {t('dashboard.resetFilters')}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-1">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-end">
                {/* Doctor Filter */}
                <div className="w-full sm:w-1/4 space-y-1">
                  <Label htmlFor="doctor-filter" className="text-sm sm:text-base">{t('dashboard.filterByDoctor')}</Label>
                  <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue placeholder={t('dashboard.allDoctors')} />
                    </SelectTrigger>
                    <SelectContent>
                      {demoDoctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id.toString()}>
                          {language === 'bn' ? doctor.nameBn : doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Field */}
                <div className="w-full sm:w-80 space-y-1">
                  <Label htmlFor="search" className="text-sm sm:text-base">{t('account.search')}</Label>
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('account.searchPlaceholder')}
                      className="pl-10 h-10 sm:h-11"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="w-full sm:w-auto">
                  <Button 
                    onClick={handleSearch}
                    disabled={!searchQuery.trim() && !selectedDoctor}
                    className="text-sm sm:text-base h-10 sm:h-11 w-full sm:w-auto"
                  >
                    {t('common.search')}
                  </Button>
                </div>
              </div>

              {/* Mobile Reset Button */}
              <div className="mt-2 sm:hidden">
                <Button
                  variant="outline"
                  onClick={handleResetSearch}
                  className="text-sm h-9 w-full"
                >
                  {t('dashboard.resetFilters')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Data Table */}
          <Card className="py-0 gap-0">
            <CardContent className="p-0">
              {/* Table */}
              <div className="overflow-x-auto rounded-t-xl">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="w-[150px] sm:w-[180px] h-10 px-3">{t('account.doctorName')}</TableHead>
                      <TableHead className="w-[120px] sm:w-[140px] h-10 px-3">{t('account.accountType')}</TableHead>
                      <TableHead className="w-[180px] sm:w-[220px] h-10 px-3">{t('account.accountOrganization')}</TableHead>
                      <TableHead className="w-[140px] sm:w-[160px] h-10 px-3">{t('account.accountNumber')}</TableHead>
                      <TableHead className="w-[100px] text-center h-10 px-3">{t('account.actions')}</TableHead>
                      <TableHead className="w-[120px] text-center h-10 px-3">{t('account.status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentAccounts.length > 0 ? (
                      currentAccounts.map((account) => {
                        return (
                          <TableRow key={account.id}>
                            <TableCell className="font-medium px-3 py-4">
                              {language === 'bn' ? account.doctorNameBn : account.doctorName}
                            </TableCell>
                            <TableCell className="px-3 py-4">
                              {language === 'bn' ? account.accountTypeNameBn : account.accountTypeName}
                            </TableCell>
                            <TableCell className="px-3 py-4">
                              {language === 'bn' ? account.accountOrganizationBn : account.accountOrganization}
                            </TableCell>
                            <TableCell className="px-3 py-4">
                              <span className="font-mono text-sm">
                                {language === 'bn' ? englishToBengaliNumbers(account.accountNumber) : account.accountNumber}
                              </span>
                            </TableCell>
                            <TableCell className="text-center px-3 py-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(account.id)}
                                className="h-8"
                              >
                                <MdEdit className="w-4 h-4 mr-1" />
                                {t('account.edit')}
                              </Button>
                            </TableCell>
                            <TableCell className="text-center px-3 py-4">
                              <div className="flex items-center justify-center space-x-2">
                                <Switch
                                  checked={account.isActive}
                                  onCheckedChange={() => handleStatusToggle(account.id)}
                                />
                                <span className="text-sm text-gray-600">
                                  {account.isActive ? t('account.active') : t('account.inactive')}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 px-3 text-gray-500">
                          {t('account.noAccounts')}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredAccounts.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 p-3 border-t bg-gray-100 rounded-b-xl">
                  <div className="text-sm text-gray-700">
                    {t('account.showing')} {formatNumber(startIndex + 1)} {t('account.to')} {formatNumber(Math.min(endIndex, filteredAccounts.length))} {t('account.of')} {formatNumber(filteredAccounts.length)} {t('account.results')}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-8"
                    >
                      <MdChevronLeft className="w-4 h-4 mr-1" />
                      {t('account.previous')}
                    </Button>
                    
                    {/* Page Numbers */}
                    <div className="flex space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="h-8 w-8 p-0"
                        >
                          {formatNumber(page)}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-8"
                    >
                      {t('account.next')}
                      <MdChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add Account Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen} disableOutsideClick={true}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{t('account.addNewAccount')}</DialogTitle>
            <DialogDescription>
              {t('account.addNewAccountDesc')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddAccount} className="space-y-4" autoComplete="off">
            {/* Doctor Name Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="doctorName" className="text-sm font-medium">
                {t('account.doctorName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newAccountForm.doctorId} 
                  onValueChange={handleModalInputChange('doctorId')}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.doctorId ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={t('account.selectDoctor')} />
                  </SelectTrigger>
                  <SelectContent>
                    {demoDoctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id.toString()}>
                        {language === 'bn' ? doctor.nameBn : doctor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formErrors.doctorId && (
                <p className="text-sm text-red-600">{formErrors.doctorId}</p>
              )}
            </div>

            {/* Account Type Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="accountType" className="text-sm font-medium">
                {t('account.accountType')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newAccountForm.accountType} 
                  onValueChange={handleModalInputChange('accountType')}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.accountType ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={t('account.selectAccountType')} />
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {language === 'bn' ? type.labelBn : type.labelEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formErrors.accountType && (
                <p className="text-sm text-red-600">{formErrors.accountType}</p>
              )}
            </div>

            {/* Account Organization Field */}
            <div className="space-y-2">
              <Label htmlFor="accountOrganization" className="text-sm font-medium">
                {t('account.accountOrganization')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiBuildings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="accountOrganization"
                  type="text"
                  value={newAccountForm.accountOrganization}
                  onChange={handleModalInputChange('accountOrganization')}
                  placeholder={t('account.accountOrganizationPlaceholder')}
                  className={`pl-10 ${formErrors.accountOrganization ? 'border-red-500 focus:border-red-500' : ''}`}
                  disabled={isSubmitting}
                  autoComplete="off"
                />
              </div>
              {formErrors.accountOrganization && (
                <p className="text-sm text-red-600">{formErrors.accountOrganization}</p>
              )}
            </div>

            {/* Account Number Field */}
            <div className="space-y-2">
              <Label htmlFor="accountNumber" className="text-sm font-medium">
                {t('account.accountNumber')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiHash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="accountNumber"
                  type="text"
                  inputMode="numeric"
                  value={newAccountForm.accountNumber}
                  onChange={handleModalInputChange('accountNumber')}
                  placeholder={t('account.accountNumberPlaceholder')}
                  className={`pl-10 ${formErrors.accountNumber ? 'border-red-500 focus:border-red-500' : ''}`}
                  disabled={isSubmitting}
                  autoComplete="off"
                />
              </div>
              {formErrors.accountNumber && (
                <p className="text-sm text-red-600">{formErrors.accountNumber}</p>
              )}
              {newAccountForm.accountType === 'mfs' && (
                <p className="text-xs text-blue-600">
                  {t('account.mfsFormatHint')}
                </p>
              )}
              {newAccountForm.accountType === 'bank' && (
                <p className="text-xs text-blue-600">
                  {t('account.bankFormatHint')}
                </p>
              )}
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
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
                {isSubmitting ? t('common.creating') : t('common.create')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
