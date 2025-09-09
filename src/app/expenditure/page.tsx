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
import { BiUser, BiBuildings, BiMoney, BiFileBlank } from 'react-icons/bi'

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

// Demo data for expenditures
const demoExpenditures = [
  { 
    id: 1, 
    doctorId: 1,
    doctorName: 'Dr. Ahmed Rahman', 
    doctorNameBn: 'ডা. আহমেদ রহমান',
    chamberId: 1,
    chamberName: 'Cardiology Chamber',
    chamberNameBn: 'হৃদরোগ চেম্বার',
    expenditureDetails: 'Medical Equipment Purchase - ECG Machine',
    expenditureDetailsBn: 'চিকিৎসা সরঞ্জাম ক্রয় - ইসিজি মেশিন',
    amount: 25000.00,
    attachments: [
      new File([""], "ecg-machine-receipt.pdf", { type: "application/pdf" }),
      new File([""], "warranty-card.jpg", { type: "image/jpeg" })
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
    expenditureDetails: 'Office Supplies and Stationery',
    expenditureDetailsBn: 'অফিস সরবরাহ এবং স্টেশনারি',
    amount: 3500.50,
    attachments: [
      new File([""], "office-supplies.jpg", { type: "image/jpeg" })
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
    expenditureDetails: 'Rent Payment for Chamber - September',
    expenditureDetailsBn: 'চেম্বারের ভাড়া পেমেন্ট - সেপ্টেম্বর',
    amount: 15000.00,
    attachments: [
      new File([""], "rent-receipt-september.png", { type: "image/png" })
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
    expenditureDetails: 'Pharmacy Stock Purchase',
    expenditureDetailsBn: 'ফার্মেসি স্টক ক্রয়',
    amount: 8750.25,
    attachments: [
      new File([""], "pharmacy-invoice.pdf", { type: "application/pdf" }),
      new File([""], "pharmacy-delivery-note.jpg", { type: "image/jpeg" })
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
    expenditureDetails: 'Cleaning and Maintenance Services',
    expenditureDetailsBn: 'পরিষ্কার এবং রক্ষণাবেক্ষণ সেবা',
    amount: 4200.00,
    attachments: [
      new File([""], "cleaning-service-bill.jpg", { type: "image/jpeg" })
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
    expenditureDetails: 'Utility Bills - Electricity and Water',
    expenditureDetailsBn: 'ইউটিলিটি বিল - বিদ্যুৎ এবং পানি',
    amount: 6300.75,
    attachments: [
      new File([""], "utility-bills.pdf", { type: "application/pdf" }),
      new File([""], "electricity-bill.jpg", { type: "image/jpeg" }),
      new File([""], "water-bill.jpg", { type: "image/jpeg" })
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
    expenditureDetails: 'Emergency Medical Equipment Repair',
    expenditureDetailsBn: 'জরুরি চিকিৎসা সরঞ্জাম মেরামত',
    amount: 12500.00,
    attachments: [
      new File([""], "equipment-repair.png", { type: "image/png" })
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
    expenditureDetails: 'Medical Conference and Training Fees',
    expenditureDetailsBn: 'চিকিৎসা সম্মেলন এবং প্রশিক্ষণ ফি',
    amount: 18000.00,
    attachments: [
      new File([""], "conference-receipt.jpg", { type: "image/jpeg" }),
      new File([""], "conference-certificate.pdf", { type: "application/pdf" })
    ],
    date: new Date('2025-09-01'),
    isActive: true 
  },
]

export default function ExpenditurePage() {
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
  const [expenditures, setExpenditures] = useState(demoExpenditures)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newExpenditureForm, setNewExpenditureForm] = useState({
    doctorId: '',
    chamberId: '',
    expenditureDetails: '',
    amount: '',
    attachments: [] as File[]
  })
  const [formErrors, setFormErrors] = useState<{doctorId?: string; chamberId?: string; expenditureDetails?: string; amount?: string; attachments?: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const itemsPerPage = 5

  const handleLogout = () => {
    // Show logout success toast
    showToast.success(t('toast.logoutSuccess'), t('toast.logoutSuccessDesc'))
    
    // Redirect to login page
    setTimeout(() => {
      router.push('/login')
    }, 1000) // Small delay to show the toast
  }

  const validateAddExpenditureForm = () => {
    const newErrors: {doctorId?: string; chamberId?: string; expenditureDetails?: string; amount?: string; attachments?: string} = {}

    if (!newExpenditureForm.doctorId) {
      newErrors.doctorId = t('expenditure.doctorRequired')
    }

    if (!newExpenditureForm.chamberId) {
      newErrors.chamberId = t('expenditure.chamberRequired')
    }

    if (!newExpenditureForm.expenditureDetails.trim()) {
      newErrors.expenditureDetails = t('expenditure.expenditureDetailsRequired')
    }

    if (!newExpenditureForm.amount.trim()) {
      newErrors.amount = t('expenditure.amountRequired')
    } else {
      const amount = parseFloat(newExpenditureForm.amount)
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = t('expenditure.invalidAmount')
      }
    }

    if (newExpenditureForm.attachments.length === 0) {
      newErrors.attachments = t('expenditure.attachmentRequired')
    }

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddExpenditure = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAddExpenditureForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const selectedDoctorData = demoDoctors.find(doctor => doctor.id.toString() === newExpenditureForm.doctorId)
      const selectedChamberData = demoChambers.find(chamber => chamber.id.toString() === newExpenditureForm.chamberId)
      
      const newExpenditure = {
        id: Math.max(...expenditures.map(e => e.id)) + 1,
        doctorId: parseInt(newExpenditureForm.doctorId),
        doctorName: selectedDoctorData?.name || '',
        doctorNameBn: selectedDoctorData?.nameBn || '',
        chamberId: parseInt(newExpenditureForm.chamberId),
        chamberName: selectedChamberData?.name || '',
        chamberNameBn: selectedChamberData?.nameBn || '',
        expenditureDetails: newExpenditureForm.expenditureDetails,
        expenditureDetailsBn: newExpenditureForm.expenditureDetails, // In real app, you might want separate Bengali field
        amount: parseFloat(newExpenditureForm.amount),
        attachments: newExpenditureForm.attachments,
        date: new Date(),
        isActive: true
      }

      setExpenditures(prevExpenditures => [newExpenditure, ...prevExpenditures])
      setIsAddModalOpen(false)
      setNewExpenditureForm({ 
        doctorId: '', 
        chamberId: '', 
        expenditureDetails: '', 
        amount: '',
        attachments: []
      })
      setFormErrors({})
      setPreviewUrls([])
      setIsSubmitting(false)

      showToast.success(t('expenditure.expenditureAdded'), t('expenditure.expenditureAddedDesc'))
    }, 1000)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setNewExpenditureForm({ 
      doctorId: '', 
      chamberId: '', 
      expenditureDetails: '', 
      amount: '',
      attachments: []
    })
    setFormErrors({})
    setPreviewUrls([])
    setIsSubmitting(false)
  }

  const handleModalInputChange = (field: keyof typeof newExpenditureForm) => (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | string) => {
    let value: string | File[]
    if (field === 'attachments') {
      const fileInput = e as React.ChangeEvent<HTMLInputElement>
      const newFiles = Array.from(fileInput.target.files || [])
      
      // Append new files to existing files instead of replacing
      const existingFiles = newExpenditureForm.attachments || []
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
    
    setNewExpenditureForm(prev => {
      const newForm = { ...prev, [field]: value }
      
      // Reset chamber selection when doctor changes
      if (field === 'doctorId') {
        newForm.chamberId = ''
      }
      
      return newForm
    })
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleRemoveFile = (index: number) => {
    const fileToRemove = newExpenditureForm.attachments[index]
    const newFiles = newExpenditureForm.attachments.filter((_, i) => i !== index)
    
    // If the removed file was an image, we need to remove its preview URL
    if (fileToRemove && fileToRemove.type.startsWith('image/')) {
      // Find the preview URL index for this image file
      let imageIndex = 0
      for (let i = 0; i < index; i++) {
        if (newExpenditureForm.attachments[i].type.startsWith('image/')) {
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
    
    setNewExpenditureForm(prev => ({ ...prev, attachments: newFiles }))
  }

  const handleStatusToggle = (expenditureId: number) => {
    setExpenditures(prevExpenditures => 
      prevExpenditures.map(expenditure => 
        expenditure.id === expenditureId 
          ? { ...expenditure, isActive: !expenditure.isActive }
          : expenditure
      )
    )
  }

  const handleEdit = (expenditureId: number) => {
    // This will be implemented later
    showToast.info('Edit functionality', 'Edit functionality will be implemented soon')
    console.log('Edit expenditure:', expenditureId)
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
    if (!newExpenditureForm.doctorId) return []
    return demoChambers.filter(chamber => chamber.doctorId.toString() === newExpenditureForm.doctorId)
  }, [newExpenditureForm.doctorId])

  // Get chambers for filter dropdown based on selected doctor
  const filterChambers = useMemo(() => {
    if (!selectedDoctor) return demoChambers
    return demoChambers.filter(chamber => chamber.doctorId.toString() === selectedDoctor)
  }, [selectedDoctor])

  // Filter expenditures based on search query, selected doctor, and selected chamber
  const filteredExpenditures = useMemo(() => {
    let filtered = expenditures

    // Filter by doctor if selected
    if (selectedDoctor) {
      filtered = filtered.filter(expenditure => expenditure.doctorId.toString() === selectedDoctor)
    }

    // Filter by chamber if selected
    if (selectedChamber) {
      filtered = filtered.filter(expenditure => expenditure.chamberId.toString() === selectedChamber)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(expenditure => {
        const doctorName = language === 'bn' ? expenditure.doctorNameBn : expenditure.doctorName
        const chamberName = language === 'bn' ? expenditure.chamberNameBn : expenditure.chamberName
        const expenditureDetails = language === 'bn' ? expenditure.expenditureDetailsBn : expenditure.expenditureDetails
        
        return doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               chamberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               expenditureDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
               formatCurrency(expenditure.amount).includes(searchQuery)
      })
    }

    return filtered
  }, [expenditures, searchQuery, selectedDoctor, selectedChamber, language, formatCurrency])

  // Pagination logic
  const totalPages = Math.ceil(filteredExpenditures.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentExpenditures = filteredExpenditures.slice(startIndex, endIndex)

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
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleLogout}
                  className="cursor-pointer text-xs sm:text-sm bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:text-red-700"
                >
                  {t('dashboard.logout')}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1">
          <div className="mb-6 lg:mb-8 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{t('expenditure.title')}</h2>
                <p className="text-gray-600 mt-1 sm:mt-2 text-base sm:text-lg">{t('expenditure.subtitle')}</p>
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="lg:self-start w-auto max-w-fit mx-auto lg:mx-0"
              >
                <MdAccountBalanceWallet className="w-4 h-4 mr-2" />
                {t('expenditure.addExpenditure')}
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
                  <Label htmlFor="chamber-filter" className="text-sm sm:text-base">{t('expenditure.filterByChamber')}</Label>
                  <Select value={selectedChamber} onValueChange={setSelectedChamber} disabled={!selectedDoctor}>
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue placeholder={selectedDoctor ? t('expenditure.allChambers') : t('expenditure.selectDoctorFirst')} />
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
                  <Label htmlFor="search" className="text-sm sm:text-base">{t('expenditure.search')}</Label>
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('expenditure.searchPlaceholder')}
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
                      <TableHead className="w-[150px] sm:w-[180px] h-10 px-3">{t('expenditure.doctorName')}</TableHead>
                      <TableHead className="w-[150px] sm:w-[180px] h-10 px-3">{t('expenditure.chamberName')}</TableHead>
                      <TableHead className="w-[200px] sm:w-[250px] h-10 px-3">{t('expenditure.expenditureDetails')}</TableHead>
                      <TableHead className="w-[100px] h-10 px-3">{t('expenditure.amount')}</TableHead>
                      <TableHead className="w-[100px] text-center h-10 px-3">{t('expenditure.actions')}</TableHead>
                      <TableHead className="w-[120px] text-center h-10 px-3">{t('expenditure.status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentExpenditures.length > 0 ? (
                      currentExpenditures.map((expenditure) => {
                        return (
                          <TableRow key={expenditure.id}>
                            <TableCell className="font-medium px-3 py-4">
                              {language === 'bn' ? expenditure.doctorNameBn : expenditure.doctorName}
                            </TableCell>
                            <TableCell className="px-3 py-4">
                              {language === 'bn' ? expenditure.chamberNameBn : expenditure.chamberName}
                            </TableCell>
                            <TableCell className="px-3 py-4">
                              <div className="max-w-xs">
                                <p className="text-sm break-words">
                                  {language === 'bn' ? expenditure.expenditureDetailsBn : expenditure.expenditureDetails}
                                </p>
                                {expenditure.attachments && expenditure.attachments.length > 0 && (
                                  <div className="mt-2">
                                    <p className="text-xs text-gray-500 mb-1">{expenditure.attachments.length} file(s)</p>
                                    <div className="flex flex-wrap gap-1">
                                      {expenditure.attachments.map((attachment, index) => (
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
                            <TableCell className="px-3 py-4">{formatCurrency(expenditure.amount)}</TableCell>
                            <TableCell className="text-center px-3 py-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(expenditure.id)}
                                className="h-8"
                              >
                                <MdEdit className="w-4 h-4 mr-1" />
                                {t('expenditure.edit')}
                              </Button>
                            </TableCell>
                            <TableCell className="text-center px-3 py-4">
                              <div className="flex items-center justify-center space-x-2">
                                <Switch
                                  checked={expenditure.isActive}
                                  onCheckedChange={() => handleStatusToggle(expenditure.id)}
                                />
                                <span className="text-sm text-gray-600">
                                  {expenditure.isActive ? t('expenditure.active') : t('expenditure.inactive')}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 px-3 text-gray-500">
                          {t('expenditure.noExpenditures')}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredExpenditures.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 p-3 border-t bg-gray-100 rounded-b-xl">
                  <div className="text-sm text-gray-700">
                    {t('expenditure.showing')} {formatNumber(startIndex + 1)} {t('expenditure.to')} {formatNumber(Math.min(endIndex, filteredExpenditures.length))} {t('expenditure.of')} {formatNumber(filteredExpenditures.length)} {t('expenditure.results')}
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
                      {t('expenditure.previous')}
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
                      {t('expenditure.next')}
                      <MdChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add Expenditure Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen} disableOutsideClick={true}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{t('expenditure.addNewExpenditure')}</DialogTitle>
            <DialogDescription>
              {t('expenditure.addNewExpenditureDesc')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddExpenditure} className="space-y-4" autoComplete="off">
            {/* Doctor Name Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="doctorName" className="text-sm font-medium">
                {t('expenditure.doctorName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newExpenditureForm.doctorId} 
                  onValueChange={handleModalInputChange('doctorId')}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.doctorId ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={t('expenditure.selectDoctor')} />
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
                {t('expenditure.chamberName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiBuildings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newExpenditureForm.chamberId} 
                  onValueChange={handleModalInputChange('chamberId')}
                  disabled={isSubmitting || !newExpenditureForm.doctorId}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.chamberId ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={newExpenditureForm.doctorId ? t('expenditure.selectChamber') : t('expenditure.selectDoctorFirst')} />
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

            {/* Expenditure Details Field */}
            <div className="space-y-2">
              <Label htmlFor="expenditureDetails" className="text-sm font-medium">
                {t('expenditure.expenditureDetails')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiFileBlank className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <textarea
                  id="expenditureDetails"
                  value={newExpenditureForm.expenditureDetails}
                  onChange={handleModalInputChange('expenditureDetails')}
                  placeholder={t('expenditure.expenditureDetailsPlaceholder')}
                  className={`w-full pl-10 pr-3 py-2 text-sm border rounded-md resize-none h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.expenditureDetails ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                  disabled={isSubmitting}
                />
              </div>
              {formErrors.expenditureDetails && (
                <p className="text-sm text-red-600">{formErrors.expenditureDetails}</p>
              )}
            </div>

            {/* Amount Field */}
            <div className="space-y-2">
              <Label htmlFor="expenditureAmount" className="text-sm font-medium">
                {t('expenditure.amount')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiMoney className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="expenditureAmount"
                  type="number"
                  step="0.01"
                  inputMode="decimal"
                  value={newExpenditureForm.amount}
                  onChange={handleModalInputChange('amount')}
                  placeholder={t('expenditure.amountPlaceholder')}
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
                {t('expenditure.attachment')} <span className="text-red-500">*</span>
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
                    <MdAttachFile className="w-5 h-5 text-gray-500" />
                    <div className="text-sm">
                      {newExpenditureForm.attachments.length === 0 ? (
                        <span className="text-gray-500">{t('expenditure.dragDropFiles')}</span>
                      ) : (
                        <span className="text-gray-700">
                          {newExpenditureForm.attachments.length} {' '}
                          {newExpenditureForm.attachments.length === 1 
                            ? t('expenditure.fileSelected') 
                            : t('expenditure.filesSelected')
                          }
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {newExpenditureForm.attachments.length > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs"
                      >
                        {t('expenditure.addMoreFiles')}
                      </Button>
                    )}
                    {newExpenditureForm.attachments.length === 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs"
                      >
                        {t('expenditure.chooseFiles')}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-500">{t('expenditure.attachmentHelper')}</p>
              <p className="text-xs text-blue-600 mt-1">
                {t('expenditure.multipleFilesTip')}
              </p>
              {formErrors.attachments && (
                <p className="text-sm text-red-600">{formErrors.attachments}</p>
              )}
              
              {/* File previews */}
              {newExpenditureForm.attachments.some(file => file.type.startsWith('image/')) && (
                <div className="mt-2">
                  <Label className="text-sm font-medium">{t('expenditure.preview')}</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1 border rounded-lg p-2">
                    {newExpenditureForm.attachments.map((file, index) => {
                      if (!file.type.startsWith('image/')) return null
                      
                      // Find the preview URL for this image file
                      let imageIndex = 0
                      for (let i = 0; i < index; i++) {
                        if (newExpenditureForm.attachments[i].type.startsWith('image/')) {
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
              {newExpenditureForm.attachments.some(file => !file.type.startsWith('image/')) && (
                <div className="mt-2">
                  <Label className="text-sm font-medium">{t('expenditure.selectedFiles')}</Label>
                  <div className="mt-1 space-y-1">
                    {newExpenditureForm.attachments.map((file, index) => {
                      if (file.type.startsWith('image/')) return null
                      return (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                          <div className="flex items-center gap-2">
                            <MdAttachFile className="w-4 h-4 text-gray-500" />
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
