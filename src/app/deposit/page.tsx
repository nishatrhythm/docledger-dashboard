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
import { 
  MdSearch,
  MdMenu,
  MdEdit,
  MdChevronLeft,
  MdChevronRight,
  MdAccountBalanceWallet,
  MdAttachFile,
  MdRemoveRedEye,
  MdDownload
} from 'react-icons/md'
import { BiUser, BiBuildings, BiMoney, BiCreditCard } from 'react-icons/bi'

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

// Demo data for chambers
const demoChambers = [
  { 
    id: 1, 
    doctorId: 1,
    name: 'Cardiology Chamber', 
    nameBn: 'হৃদরোগ চেম্বার',
  },
  { 
    id: 2, 
    doctorId: 2,
    name: 'Neurology Center', 
    nameBn: 'স্নায়ুরোগ কেন্দ্র',
  },
  { 
    id: 3, 
    doctorId: 3,
    name: 'Orthopedic Clinic', 
    nameBn: 'অর্থোপেডিক ক্লিনিক',
  },
  { 
    id: 4, 
    doctorId: 4,
    name: 'General Medicine', 
    nameBn: 'সাধারণ চিকিৎসা',
  },
  { 
    id: 5, 
    doctorId: 5,
    name: 'Pediatric Care', 
    nameBn: 'শিশু চিকিৎসা',
  },
  { 
    id: 6, 
    doctorId: 6,
    name: 'Gynecology Clinic', 
    nameBn: 'গাইনোকোলজি ক্লিনিক',
  },
  { 
    id: 7, 
    doctorId: 7,
    name: 'Emergency Care', 
    nameBn: 'জরুরি চিকিৎসা',
  },
  { 
    id: 8, 
    doctorId: 8,
    name: 'Dermatology Center', 
    nameBn: 'চর্মরোগ কেন্দ্র',
  },
]

// Demo data for accounts (based on doctor)
const demoAccounts = [
  { 
    id: 1, 
    doctorId: 1,
    name: 'Cardiology Chamber - Main Account', 
    nameBn: 'হৃদরোগ চেম্বার - মূল অ্যাকাউন্ট',
    accountNumber: '1234567890',
    bankName: 'Islami Bank Bangladesh',
    bankNameBn: 'ইসলামী ব্যাংক বাংলাদেশ'
  },
  { 
    id: 2, 
    doctorId: 1,
    name: 'Cardiology Chamber - Savings Account', 
    nameBn: 'হৃদরোগ চেম্বার - সঞ্চয় অ্যাকাউন্ট',
    accountNumber: '1234567891',
    bankName: 'Dutch Bangla Bank',
    bankNameBn: 'ডাচ-বাংলা ব্যাংক'
  },
  { 
    id: 3, 
    doctorId: 2,
    name: 'Neurology Center - Business Account', 
    nameBn: 'স্নায়ুরোগ কেন্দ্র - ব্যবসায়িক অ্যাকাউন্ট',
    accountNumber: '2234567890',
    bankName: 'Brac Bank',
    bankNameBn: 'ব্র্যাক ব্যাংক'
  },
  { 
    id: 4, 
    doctorId: 2,
    name: 'Neurology Center - Cash Account', 
    nameBn: 'স্নায়ুরোগ কেন্দ্র - নগদ অ্যাকাউন্ট',
    accountNumber: '2234567891',
    bankName: 'City Bank',
    bankNameBn: 'সিটি ব্যাংক'
  },
  { 
    id: 5, 
    doctorId: 3,
    name: 'Orthopedic Clinic - Main Account', 
    nameBn: 'অর্থোপেডিক ক্লিনিক - মূল অ্যাকাউন্ট',
    accountNumber: '3234567890',
    bankName: 'Eastern Bank',
    bankNameBn: 'ইস্টার্ন ব্যাংক'
  },
  { 
    id: 6, 
    doctorId: 4,
    name: 'General Medicine - Primary Account', 
    nameBn: 'সাধারণ চিকিৎসা - প্রাথমিক অ্যাকাউন্ট',
    accountNumber: '4234567890',
    bankName: 'Standard Chartered Bank',
    bankNameBn: 'স্ট্যান্ডার্ড চার্টার্ড ব্যাংক'
  },
  { 
    id: 7, 
    doctorId: 5,
    name: 'Pediatric Care - Main Account', 
    nameBn: 'শিশু চিকিৎসা - মূল অ্যাকাউন্ট',
    accountNumber: '5234567890',
    bankName: 'Prime Bank',
    bankNameBn: 'প্রাইম ব্যাংক'
  },
  { 
    id: 8, 
    doctorId: 6,
    name: 'Gynecology Clinic - Business Account', 
    nameBn: 'গাইনোকোলজি ক্লিনিক - ব্যবসায়িক অ্যাকাউন্ট',
    accountNumber: '6234567890',
    bankName: 'Mercantile Bank',
    bankNameBn: 'মার্কেন্টাইল ব্যাংক'
  },
  { 
    id: 9, 
    doctorId: 7,
    name: 'Emergency Care - Emergency Fund', 
    nameBn: 'জরুরি চিকিৎসা - জরুরি তহবিল',
    accountNumber: '7234567890',
    bankName: 'AB Bank',
    bankNameBn: 'এবি ব্যাংক'
  },
  { 
    id: 10, 
    doctorId: 8,
    name: 'Dermatology Center - Main Account', 
    nameBn: 'চর্মরোগ কেন্দ্র - মূল অ্যাকাউন্ট',
    accountNumber: '8234567890',
    bankName: 'Southeast Bank',
    bankNameBn: 'সাউথইস্ট ব্যাংক'
  },
]

// Demo data for deposits
const demoDeposits = [
  { 
    id: 1, 
    doctorId: 1,
    doctorName: 'Dr. Ahmed Rahman', 
    doctorNameBn: 'ডা. আহমেদ রহমান',
    chamberId: 1,
    chamberName: 'Cardiology Chamber',
    chamberNameBn: 'হৃদরোগ চেম্বার',
    accountId: 1,
    accountName: 'Cardiology Chamber - Main Account',
    accountNameBn: 'হৃদরোগ চেম্বার - মূল অ্যাকাউন্ট',
    amount: 50000.00,
    attachments: [
      new File([""], "deposit-slip-1.jpg", { type: "image/jpeg" }),
      new File([""], "bank-receipt-1.pdf", { type: "application/pdf" })
    ],
    date: new Date('2025-09-08'),
    isActive: true 
  },
  { 
    id: 2, 
    doctorId: 2,
    doctorName: 'Dr. Sarah Khan', 
    doctorNameBn: 'ডা. সারাহ খান',
    chamberId: 2,
    chamberName: 'Neurology Center',
    chamberNameBn: 'স্নায়ুরোগ কেন্দ্র',
    accountId: 3,
    accountName: 'Neurology Center - Business Account',
    accountNameBn: 'স্নায়ুরোগ কেন্দ্র - ব্যবসায়িক অ্যাকাউন্ট',
    amount: 75000.50,
    attachments: [
      new File([""], "deposit-slip-2.png", { type: "image/png" })
    ],
    date: new Date('2025-09-07'),
    isActive: true 
  },
  { 
    id: 3, 
    doctorId: 3,
    doctorName: 'Dr. Mohammad Ali', 
    doctorNameBn: 'ডা. মোহাম্মদ আলী',
    chamberId: 3,
    chamberName: 'Orthopedic Clinic',
    chamberNameBn: 'অর্থোপেডিক ক্লিনিক',
    accountId: 5,
    accountName: 'Orthopedic Clinic - Main Account',
    accountNameBn: 'অর্থোপেডিক ক্লিনিক - মূল অ্যাকাউন্ট',
    amount: 60000.00,
    attachments: [
      new File([""], "deposit-receipt-3.pdf", { type: "application/pdf" }),
      new File([""], "transaction-slip-3.jpg", { type: "image/jpeg" })
    ],
    date: new Date('2025-09-06'),
    isActive: false 
  },
  { 
    id: 4, 
    doctorId: 4,
    doctorName: 'Dr. Fatima Sheikh', 
    doctorNameBn: 'ডা. ফাতিমা শেখ',
    chamberId: 4,
    chamberName: 'General Medicine',
    chamberNameBn: 'সাধারণ চিকিৎসা',
    accountId: 6,
    accountName: 'General Medicine - Primary Account',
    accountNameBn: 'সাধারণ চিকিৎসা - প্রাথমিক অ্যাকাউন্ট',
    amount: 40000.25,
    attachments: [
      new File([""], "bank-deposit-4.jpg", { type: "image/jpeg" })
    ],
    date: new Date('2025-09-05'),
    isActive: true 
  },
  { 
    id: 5, 
    doctorId: 5,
    doctorName: 'Dr. Rahman Khan', 
    doctorNameBn: 'ডা. রহমান খান',
    chamberId: 5,
    chamberName: 'Pediatric Care',
    chamberNameBn: 'শিশু চিকিৎসা',
    accountId: 7,
    accountName: 'Pediatric Care - Main Account',
    accountNameBn: 'শিশু চিকিৎসা - মূল অ্যাকাউন্ট',
    amount: 85000.00,
    attachments: [
      new File([""], "cash-deposit-5.pdf", { type: "application/pdf" }),
      new File([""], "receipt-5.jpg", { type: "image/jpeg" })
    ],
    date: new Date('2025-09-04'),
    isActive: true 
  },
  { 
    id: 6, 
    doctorId: 6,
    doctorName: 'Dr. Ayesha Begum', 
    doctorNameBn: 'ডা. আয়েশা বেগম',
    chamberId: 6,
    chamberName: 'Gynecology Clinic',
    chamberNameBn: 'গাইনোকোলজি ক্লিনিক',
    accountId: 8,
    accountName: 'Gynecology Clinic - Business Account',
    accountNameBn: 'গাইনোকোলজি ক্লিনিক - ব্যবসায়িক অ্যাকাউন্ট',
    amount: 30000.75,
    attachments: [
      new File([""], "online-deposit-6.png", { type: "image/png" })
    ],
    date: new Date('2025-09-03'),
    isActive: false 
  },
  { 
    id: 7, 
    doctorId: 7,
    doctorName: 'Dr. Hassan Ali', 
    doctorNameBn: 'ডা. হাসান আলী',
    chamberId: 7,
    chamberName: 'Emergency Care',
    chamberNameBn: 'জরুরি চিকিৎসা',
    accountId: 9,
    accountName: 'Emergency Care - Emergency Fund',
    accountNameBn: 'জরুরি চিকিৎসা - জরুরি তহবিল',
    amount: 120000.00,
    attachments: [
      new File([""], "emergency-fund-deposit.pdf", { type: "application/pdf" }),
      new File([""], "bank-statement-7.jpg", { type: "image/jpeg" })
    ],
    date: new Date('2025-09-02'),
    isActive: true 
  },
  { 
    id: 8, 
    doctorId: 8,
    doctorName: 'Dr. Nadia Islam', 
    doctorNameBn: 'ডা. নাদিয়া ইসলাম',
    chamberId: 8,
    chamberName: 'Dermatology Center',
    chamberNameBn: 'চর্মরোগ কেন্দ্র',
    accountId: 10,
    accountName: 'Dermatology Center - Main Account',
    accountNameBn: 'চর্মরোগ কেন্দ্র - মূল অ্যাকাউন্ট',
    amount: 55000.00,
    attachments: [
      new File([""], "monthly-deposit-8.jpg", { type: "image/jpeg" }),
      new File([""], "transaction-receipt-8.pdf", { type: "application/pdf" })
    ],
    date: new Date('2025-09-01'),
    isActive: true 
  },
]

export default function DepositPage() {
  const { t, formatNumber, formatCurrency, formatDate, language } = useLanguage()
  
  // Bengali number conversion function
  const englishToBengaliNumbers = (num: string): string => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
    return num.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit)])
  }
  
  const router = useRouter()
  const { showToast } = useLocalizedToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>()
  const [selectedChamber, setSelectedChamber] = useState<string | undefined>()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [deposits, setDeposits] = useState(demoDeposits)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newDepositForm, setNewDepositForm] = useState({
    doctorId: '',
    chamberId: '',
    accountId: '',
    amount: '',
    attachments: [] as File[]
  })
  const [formErrors, setFormErrors] = useState<{doctorId?: string; chamberId?: string; accountId?: string; amount?: string; attachments?: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const itemsPerPage = 5

  const validateAddDepositForm = () => {
    const newErrors: {doctorId?: string; chamberId?: string; accountId?: string; amount?: string; attachments?: string} = {}

    if (!newDepositForm.doctorId) {
      newErrors.doctorId = t('deposit.doctorRequired')
    }

    if (!newDepositForm.chamberId) {
      newErrors.chamberId = t('deposit.chamberRequired')
    }

    if (!newDepositForm.accountId) {
      newErrors.accountId = t('deposit.accountRequired')
    }

    if (!newDepositForm.amount.trim()) {
      newErrors.amount = t('deposit.amountRequired')
    } else {
      const amount = parseFloat(newDepositForm.amount)
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = t('deposit.invalidAmount')
      }
    }

    if (newDepositForm.attachments.length === 0) {
      newErrors.attachments = t('deposit.attachmentRequired')
    }

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddDeposit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAddDepositForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const selectedDoctorData = demoDoctors.find(doctor => doctor.id.toString() === newDepositForm.doctorId)
      const selectedChamberData = demoChambers.find(chamber => chamber.id.toString() === newDepositForm.chamberId)
      const selectedAccountData = demoAccounts.find(account => account.id.toString() === newDepositForm.accountId)
      
      const newDeposit = {
        id: Math.max(...deposits.map(d => d.id)) + 1,
        doctorId: parseInt(newDepositForm.doctorId),
        doctorName: selectedDoctorData?.name || '',
        doctorNameBn: selectedDoctorData?.nameBn || '',
        chamberId: parseInt(newDepositForm.chamberId),
        chamberName: selectedChamberData?.name || '',
        chamberNameBn: selectedChamberData?.nameBn || '',
        accountId: parseInt(newDepositForm.accountId),
        accountName: selectedAccountData?.name || '',
        accountNameBn: selectedAccountData?.nameBn || '',
        amount: parseFloat(newDepositForm.amount),
        attachments: newDepositForm.attachments,
        date: new Date(),
        isActive: true
      }

      setDeposits(prevDeposits => [newDeposit, ...prevDeposits])
      setIsAddModalOpen(false)
      setNewDepositForm({ 
        doctorId: '', 
        chamberId: '', 
        accountId: '',
        amount: '',
        attachments: []
      })
      setFormErrors({})
      setPreviewUrls([])
      setIsSubmitting(false)

      showToast.success(t('deposit.depositAdded'), t('deposit.depositAddedDesc'))
    }, 1000)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setNewDepositForm({ 
      doctorId: '', 
      chamberId: '', 
      accountId: '',
      amount: '',
      attachments: []
    })
    setFormErrors({})
    setPreviewUrls([])
    setIsSubmitting(false)
  }

  const handleModalInputChange = (field: keyof typeof newDepositForm) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | string) => {
    let value: string | File[]
    if (field === 'attachments') {
      const fileInput = e as React.ChangeEvent<HTMLInputElement>
      const newFiles = Array.from(fileInput.target.files || [])
      
      // Append new files to existing files instead of replacing
      const existingFiles = newDepositForm.attachments || []
      value = [...existingFiles, ...newFiles]
      
      // Create previews for new image files and append to existing previews
      const newPreviewUrls: string[] = []
      newFiles.forEach(file => {
        if (file.type.startsWith('image/')) {
          newPreviewUrls.push(URL.createObjectURL(file))
        }
      })
      setPreviewUrls(prev => [...prev, ...newPreviewUrls])
      
      // Clear the file input so the same file can be selected again if needed
      fileInput.target.value = ''
    } else if (typeof e === 'string') {
      value = e // For Select component
    } else {
      value = (e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>).target.value // For Input/Textarea component
    }

    // Format amount to allow only numbers and decimal
    if (field === 'amount' && typeof value === 'string') {
      // Allow only numbers and one decimal point
      const cleanValue = value.replace(/[^0-9.]/g, '')
      const parts = cleanValue.split('.')
      if (parts.length > 2) {
        value = parts[0] + '.' + parts.slice(1).join('')
      } else if (parts.length === 2 && parts[1].length > 2) {
        value = parts[0] + '.' + parts[1].substring(0, 2)
      } else {
        value = cleanValue
      }
    }
    
    setNewDepositForm(prev => {
      const newForm = { ...prev, [field]: value }
      
      // Reset chamber and account selection when doctor changes
      if (field === 'doctorId') {
        newForm.chamberId = ''
        newForm.accountId = ''
      }
      
      return newForm
    })
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleRemoveFile = (index: number) => {
    const fileToRemove = newDepositForm.attachments[index]
    const newFiles = newDepositForm.attachments.filter((_, i) => i !== index)
    
    // If the removed file was an image, we need to remove its preview URL
    if (fileToRemove && fileToRemove.type.startsWith('image/')) {
      // Find the preview URL index for this image file
      let imageIndex = 0
      for (let i = 0; i < index; i++) {
        if (newDepositForm.attachments[i].type.startsWith('image/')) {
          imageIndex++
        }
      }
      
      // Remove the preview URL at the calculated image index
      const newPreviews = previewUrls.filter((_, i) => i !== imageIndex)
      setPreviewUrls(newPreviews)
      
      // Revoke the object URL to free memory
      if (previewUrls[imageIndex]) {
        URL.revokeObjectURL(previewUrls[imageIndex])
      }
    }
    
    setNewDepositForm(prev => ({ ...prev, attachments: newFiles }))
  }

  const handleStatusToggle = (depositId: number) => {
    setDeposits(prevDeposits => 
      prevDeposits.map(deposit => 
        deposit.id === depositId 
          ? { ...deposit, isActive: !deposit.isActive }
          : deposit
      )
    )
  }

  const handleEdit = (depositId: number) => {
    // This will be implemented later
    showToast.info('Edit functionality', 'Edit functionality will be implemented soon')
    console.log('Edit deposit:', depositId)
  }

  const handleSearch = () => {
    // Since we're filtering in real-time, this button can be used for additional search actions if needed
  }

  const handleResetSearch = () => {
    setSearchQuery('')
    setSelectedDoctor(undefined)
    setSelectedChamber(undefined)
    setCurrentPage(1)
  }

  const handleViewAttachment = (attachment: File) => {
    // Create a temporary URL for the file
    const url = URL.createObjectURL(attachment)
    window.open(url, '_blank')
    // Note: In a real app, you might want to revoke the URL after some time
    // setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const handleDownloadAttachment = (attachment: File) => {
    // Create a temporary URL for the file
    const url = URL.createObjectURL(attachment)
    const link = document.createElement('a')
    link.href = url
    link.download = attachment.name
    link.click()
    URL.revokeObjectURL(url)
  }

  // Get available chambers based on selected doctor
  const availableChambers = useMemo(() => {
    if (!newDepositForm.doctorId) return []
    return demoChambers.filter(chamber => chamber.doctorId.toString() === newDepositForm.doctorId)
  }, [newDepositForm.doctorId])

  // Get available accounts based on selected doctor
  const availableAccounts = useMemo(() => {
    if (!newDepositForm.doctorId) return []
    return demoAccounts.filter(account => account.doctorId.toString() === newDepositForm.doctorId)
  }, [newDepositForm.doctorId])

  // Get chambers for filter dropdown based on selected doctor
  const filterChambers = useMemo(() => {
    if (!selectedDoctor) return demoChambers
    return demoChambers.filter(chamber => chamber.doctorId.toString() === selectedDoctor)
  }, [selectedDoctor])

  // Filter deposits based on search query, selected doctor, and selected chamber
  const filteredDeposits = useMemo(() => {
    let filtered = deposits

    // Filter by doctor if selected
    if (selectedDoctor) {
      filtered = filtered.filter(deposit => deposit.doctorId.toString() === selectedDoctor)
    }

    // Filter by chamber if selected
    if (selectedChamber) {
      filtered = filtered.filter(deposit => deposit.chamberId.toString() === selectedChamber)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(deposit => {
        const doctorName = language === 'bn' ? deposit.doctorNameBn : deposit.doctorName
        const chamberName = language === 'bn' ? deposit.chamberNameBn : deposit.chamberName
        const accountName = language === 'bn' ? deposit.accountNameBn : deposit.accountName
        
        return doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               chamberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               accountName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               formatCurrency(deposit.amount).includes(searchQuery)
      })
    }

    return filtered
  }, [deposits, searchQuery, selectedDoctor, selectedChamber, language, formatCurrency])

  // Pagination logic
  const totalPages = Math.ceil(filteredDeposits.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDeposits = filteredDeposits.slice(startIndex, endIndex)

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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{t('deposit.title')}</h2>
                <p className="text-gray-600 mt-1 sm:mt-2 text-base sm:text-lg">{t('deposit.subtitle')}</p>
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="lg:self-start w-auto max-w-fit mx-auto lg:mx-0"
              >
                <MdAccountBalanceWallet className="w-4 h-4 mr-2" />
                {t('deposit.addDeposit')}
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
                  <Select value={selectedDoctor} onValueChange={(value) => {
                    setSelectedDoctor(value)
                    setSelectedChamber(undefined) // Reset chamber when doctor changes
                  }}>
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

                {/* Chamber Filter */}
                <div className="w-full sm:w-1/4 space-y-1">
                  <Label htmlFor="chamber-filter" className="text-sm sm:text-base">{t('deposit.filterByChamber')}</Label>
                  <Select value={selectedChamber} onValueChange={setSelectedChamber} disabled={!selectedDoctor}>
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue placeholder={selectedDoctor ? t('deposit.allChambers') : t('deposit.selectDoctorFirst')} />
                    </SelectTrigger>
                    <SelectContent>
                      {filterChambers.map((chamber) => (
                        <SelectItem key={chamber.id} value={chamber.id.toString()}>
                          {language === 'bn' ? chamber.nameBn : chamber.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Field */}
                <div className="w-full sm:w-80 space-y-1">
                  <Label htmlFor="search" className="text-sm sm:text-base">{t('deposit.search')}</Label>
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('deposit.searchPlaceholder')}
                      className="pl-10 h-10 sm:h-11"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="w-full sm:w-auto">
                  <Button 
                    onClick={handleSearch}
                    disabled={!searchQuery.trim() && !selectedDoctor && !selectedChamber}
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
                      <TableHead className="w-[150px] sm:w-[180px] h-10 px-3">{t('deposit.doctorName')}</TableHead>
                      <TableHead className="w-[150px] sm:w-[180px] h-10 px-3">{t('deposit.chamberName')}</TableHead>
                      <TableHead className="w-[200px] sm:w-[250px] h-10 px-3">{t('deposit.account')}</TableHead>
                      <TableHead className="w-[100px] h-10 px-3">{t('deposit.amount')}</TableHead>
                      <TableHead className="w-[100px] text-center h-10 px-3">{t('deposit.actions')}</TableHead>
                      <TableHead className="w-[120px] text-center h-10 px-3">{t('deposit.status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentDeposits.length > 0 ? (
                      currentDeposits.map((deposit) => {
                        return (
                          <TableRow key={deposit.id}>
                            <TableCell className="font-medium px-3 py-4">
                              {language === 'bn' ? deposit.doctorNameBn : deposit.doctorName}
                            </TableCell>
                            <TableCell className="px-3 py-4">
                              {language === 'bn' ? deposit.chamberNameBn : deposit.chamberName}
                            </TableCell>
                            <TableCell className="px-3 py-4">
                              <div className="max-w-xs">
                                <p className="text-sm break-words">
                                  {language === 'bn' ? deposit.accountNameBn : deposit.accountName}
                                </p>
                                {deposit.attachments && deposit.attachments.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs text-gray-500 mb-1">{deposit.attachments.length} file(s)</p>
                                    <div className="flex flex-wrap gap-1">
                                      {deposit.attachments.map((attachment, index) => (
                                        <div key={index} className="flex gap-1">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleViewAttachment(attachment)}
                                            className="h-6 px-2 text-xs"
                                          >
                                            <MdRemoveRedEye className="w-3 h-3 mr-1" />
                                            {index + 1}
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDownloadAttachment(attachment)}
                                            className="h-6 px-2 text-xs"
                                          >
                                            <MdDownload className="w-3 h-3" />
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="px-3 py-4">{formatCurrency(deposit.amount)}</TableCell>
                            <TableCell className="text-center px-3 py-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(deposit.id)}
                                className="h-8"
                              >
                                <MdEdit className="w-4 h-4 mr-1" />
                                {t('deposit.edit')}
                              </Button>
                            </TableCell>
                            <TableCell className="text-center px-3 py-4">
                              <div className="flex items-center justify-center space-x-2">
                                <Switch
                                  checked={deposit.isActive}
                                  onCheckedChange={() => handleStatusToggle(deposit.id)}
                                />
                                <span className="text-sm text-gray-600">
                                  {deposit.isActive ? t('deposit.active') : t('deposit.inactive')}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 px-3 text-gray-500">
                          {t('deposit.noDeposits')}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredDeposits.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 p-3 border-t bg-gray-100 rounded-b-xl">
                  <div className="text-sm text-gray-700">
                    {t('deposit.showing')} {formatNumber(startIndex + 1)} {t('deposit.to')} {formatNumber(Math.min(endIndex, filteredDeposits.length))} {t('deposit.of')} {formatNumber(filteredDeposits.length)} {t('deposit.results')}
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
                      {t('deposit.previous')}
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
                      {t('deposit.next')}
                      <MdChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add Deposit Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen} disableOutsideClick={true}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{t('deposit.addNewDeposit')}</DialogTitle>
            <DialogDescription>
              {t('deposit.addNewDepositDesc')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddDeposit} className="space-y-4" autoComplete="off">
            {/* Doctor Name Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="doctorName" className="text-sm font-medium">
                {t('deposit.doctorName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newDepositForm.doctorId} 
                  onValueChange={handleModalInputChange('doctorId')}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.doctorId ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={t('deposit.selectDoctor')} />
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

            {/* Chamber Name Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="chamberName" className="text-sm font-medium">
                {t('deposit.chamberName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiBuildings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newDepositForm.chamberId} 
                  onValueChange={handleModalInputChange('chamberId')}
                  disabled={isSubmitting || !newDepositForm.doctorId}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.chamberId ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={newDepositForm.doctorId ? t('deposit.selectChamber') : t('deposit.selectDoctorFirst')} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableChambers.map((chamber) => (
                      <SelectItem key={chamber.id} value={chamber.id.toString()}>
                        {language === 'bn' ? chamber.nameBn : chamber.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formErrors.chamberId && (
                <p className="text-sm text-red-600">{formErrors.chamberId}</p>
              )}
            </div>

            {/* Account Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="accountName" className="text-sm font-medium">
                {t('deposit.account')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newDepositForm.accountId} 
                  onValueChange={handleModalInputChange('accountId')}
                  disabled={isSubmitting || !newDepositForm.doctorId}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.accountId ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={newDepositForm.doctorId ? t('deposit.selectAccount') : t('deposit.selectDoctorFirst')} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAccounts.map((account) => (
                      <SelectItem key={account.id} value={account.id.toString()}>
                        {language === 'bn' ? account.nameBn : account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formErrors.accountId && (
                <p className="text-sm text-red-600">{formErrors.accountId}</p>
              )}
            </div>

            {/* Amount Field */}
            <div className="space-y-2">
              <Label htmlFor="depositAmount" className="text-sm font-medium">
                {t('deposit.amount')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiMoney className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="depositAmount"
                  type="number"
                  step="0.01"
                  inputMode="decimal"
                  value={newDepositForm.amount}
                  onChange={handleModalInputChange('amount')}
                  placeholder={t('deposit.amountPlaceholder')}
                  className={`pl-10 ${formErrors.amount ? 'border-red-500 focus:border-red-500' : ''} [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]`}
                  disabled={isSubmitting}
                  autoComplete="off"
                />
              </div>
              {formErrors.amount && (
                <p className="text-sm text-red-600">{formErrors.amount}</p>
              )}
            </div>

            {/* Attachment Field */}
            <div className="space-y-2">
              <Label htmlFor="attachments" className="text-sm font-medium">
                {t('deposit.attachment')} <span className="text-red-500">*</span>
              </Label>
              
              {/* Custom File Input */}
              <div className="relative">
                <input
                  id="attachments"
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                  onChange={handleModalInputChange('attachments')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={isSubmitting}
                />
                <div className={`flex items-center justify-between p-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors hover:border-blue-400 hover:bg-blue-50 ${formErrors.attachments ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <MdAttachFile className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <div className="text-sm">
                      {newDepositForm.attachments.length === 0 ? (
                        <span className="text-gray-500">{t('deposit.dragDropFiles')}</span>
                      ) : (
                        <span className="text-gray-700">
                          {newDepositForm.attachments.length} {' '}
                          {newDepositForm.attachments.length === 1 
                            ? t('deposit.fileSelected') 
                            : t('deposit.filesSelected')
                          }
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {newDepositForm.attachments.length > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs"
                      >
                        {t('deposit.addMoreFiles')}
                      </Button>
                    )}
                    {newDepositForm.attachments.length === 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs"
                      >
                        {t('deposit.chooseFiles')}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500">{t('deposit.attachmentHelper')}</p>
              <p className="text-xs text-blue-600 mt-1">
                {t('deposit.multipleFilesTip')}
              </p>
              {formErrors.attachments && (
                <p className="text-sm text-red-600">{formErrors.attachments}</p>
              )}
              
              {/* File previews */}
              {newDepositForm.attachments.some(file => file.type.startsWith('image/')) && (
                <div className="mt-2">
                  <Label className="text-sm font-medium">{t('deposit.preview')}</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1 border rounded-lg p-2">
                    {newDepositForm.attachments.map((file, index) => {
                      if (!file.type.startsWith('image/')) return null
                      
                      // Find the preview URL for this image file
                      let imageIndex = 0
                      for (let i = 0; i < index; i++) {
                        if (newDepositForm.attachments[i].type.startsWith('image/')) {
                          imageIndex++
                        }
                      }
                      
                      return (
                        <div key={index} className="relative">
                          <img
                            src={previewUrls[imageIndex] || URL.createObjectURL(file)}
                            alt={`Preview ${file.name}`}
                            className="w-full h-20 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              
              {/* Non-image files list */}
              {newDepositForm.attachments.some(file => !file.type.startsWith('image/')) && (
                <div className="mt-2">
                  <Label className="text-sm font-medium">{t('deposit.selectedFiles')}</Label>
                  <div className="mt-1 space-y-1">
                    {newDepositForm.attachments.map((file, index) => {
                      if (file.type.startsWith('image/')) return null
                      return (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                          <div className="flex items-center gap-2">
                            <MdAttachFile className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{file.name}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            ×
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>
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
