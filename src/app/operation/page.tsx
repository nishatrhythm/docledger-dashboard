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
import { DatePicker } from '@/components/ui/date-picker'
import { TimePicker } from '@/components/ui/time-picker'
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
import { validateBangladeshiMobile, formatMobileNumber } from '@/lib/validation'
import { 
  MdSearch,
  MdMenu,
  MdEdit,
  MdChevronLeft,
  MdChevronRight,
  MdHealing
} from 'react-icons/md'
import { BiPhone, BiUser, BiBuildings, BiMoney } from 'react-icons/bi'

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

// Operation types
const operationTypes = [
  { value: 'longo', labelEn: 'Longo', labelBn: 'লঙ্গো' },
  { value: 'perianal_abscess', labelEn: 'Perianal Abscess', labelBn: 'পেরিয়ানাল অ্যাবসেস' },
  { value: 'fistulectomy', labelEn: 'Fistulectomy', labelBn: 'ফিস্টুলেক্টমি' },
  { value: 'gluteal_labial_perineal_abscess', labelEn: 'Gluteal / Labial / Perineal Abscess / Axillary Abscess', labelBn: 'গ্লুটিয়াল / ল্যাবিয়াল / পেরিনিয়াল অ্যাবসেস / অ্যাক্সিলারি অ্যাবসেস' },
  { value: 'limberg_flap', labelEn: 'Limberg Flap for Pilonidal Sinus / Axillary Hidradenitis Suppurativa', labelBn: 'পাইলোনিডাল সাইনাস / অ্যাক্সিলারি হাইড্রাডেনাইটিস সাপ্পুরেটিভার জন্য লিমবার্গ ফ্ল্যাপ' },
  { value: 'breast_abscess', labelEn: 'Breast Abscess', labelBn: 'স্তন অ্যাবসেস' },
  { value: 'wle_tubercular_breast', labelEn: 'WLE for Tubercular Breast Abscess / Chronic Breast Abscess / IGM', labelBn: 'টিউবারকুলার স্তন অ্যাবসেস / দীর্ঘস্থায়ী স্তন অ্যাবসেস / আইজিএম এর জন্য WLE' },
  { value: 'enucleation_fa', labelEn: 'Enucleation of FA', labelBn: 'FA এর এনুক্লিয়েশন' },
  { value: 'mrm_plus_level_ii', labelEn: 'MRM Plus Level II Axillary Dissection', labelBn: 'MRM প্লাস লেভেল II অ্যাক্সিলারি ডিসেকশন' },
  { value: 'open_chol_lap_chol', labelEn: 'Open Chol / Lap Chol', labelBn: 'ওপেন কোল / ল্যাপ কোল' },
  { value: 'mesh_hernioplasty', labelEn: 'Mesh Hernioplasty', labelBn: 'মেশ হার্নিওপ্লাস্টি' }
]

// Demo data for operations
const demoOperations = [
  { 
    id: 1, 
    doctorId: 1,
    doctorName: 'Dr. Ahmed Rahman', 
    doctorNameBn: 'ডা. আহমেদ রহমান',
    chamberId: 1,
    chamberName: 'Cardiology Chamber',
    chamberNameBn: 'হৃদরোগ চেম্বার',
    patientName: 'Mohammad Karim', 
    patientNameBn: 'মোহাম্মদ করিম',
    patientPhone: '01712345678',
    operationType: 'longo',
    date: new Date('2025-09-10'),
    time: '10:00 AM',
    amount: 15000.00,
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
    patientName: 'Fatima Begum', 
    patientNameBn: 'ফাতিমা বেগম',
    patientPhone: '01823456789',
    operationType: 'perianal_abscess',
    date: new Date('2025-09-11'),
    time: '02:30 PM',
    amount: 20000.50,
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
    patientName: 'Abdul Rahman', 
    patientNameBn: 'আব্দুল রহমান',
    patientPhone: '01934567890',
    operationType: 'fistulectomy',
    date: new Date('2025-09-12'),
    time: '04:00 PM',
    amount: 18000.75,
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
    patientName: 'Rashida Khatun', 
    patientNameBn: 'রশিদা খাতুন',
    patientPhone: '01645678901',
    operationType: 'breast_abscess',
    date: new Date('2025-09-13'),
    time: '11:30 AM',
    amount: 12000.00,
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
    patientName: 'Sakib Ahmed', 
    patientNameBn: 'সাকিব আহমেদ',
    patientPhone: '01756789012',
    operationType: 'mesh_hernioplasty',
    date: new Date('2025-09-14'),
    time: '09:30 AM',
    amount: 25000.00,
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
    patientName: 'Nasreen Akter', 
    patientNameBn: 'নাসরীন আক্তার',
    patientPhone: '01867890123',
    operationType: 'wle_tubercular_breast',
    date: new Date('2025-09-15'),
    time: '03:00 PM',
    amount: 30000.25,
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
    patientName: 'Aminul Islam', 
    patientNameBn: 'আমিনুল ইসলাম',
    patientPhone: '01978901234',
    operationType: 'open_chol_lap_chol',
    date: new Date('2025-09-16'),
    time: '06:30 PM',
    amount: 35000.50,
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
    patientName: 'Salma Khatun', 
    patientNameBn: 'সালমা খাতুন',
    patientPhone: '01589012345',
    operationType: 'limberg_flap',
    date: new Date('2025-09-17'),
    time: '05:00 PM',
    amount: 22000.00,
    isActive: true 
  },
]

export default function OperationPage() {
  const { t, formatNumber, formatCurrency, formatDate, language } = useLanguage()
  
  // Bengali number conversion function
  const englishToBengaliNumbers = (num: string): string => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
    return num.replace(/[0-9]/g, (digit) => bengaliDigits[parseInt(digit)])
  }
  
  // Format time with Bengali numerals if language is Bengali
  const formatTime = (time: string): string => {
    return language === 'bn' ? englishToBengaliNumbers(time) : time
  }
  const router = useRouter()
  const { showToast } = useLocalizedToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>()
  const [selectedChamber, setSelectedChamber] = useState<string | undefined>()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [operations, setOperations] = useState(demoOperations)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newOperationForm, setNewOperationForm] = useState({
    doctorId: '',
    chamberId: '',
    patientName: '',
    operationType: '',
    patientPhone: '',
    date: undefined as Date | undefined,
    time: '',
    amount: ''
  })
  const [formErrors, setFormErrors] = useState<{doctorId?: string; chamberId?: string; patientName?: string; operationType?: string; patientPhone?: string; date?: string; time?: string; amount?: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const itemsPerPage = 5

  const validateAddOperationForm = () => {
    const newErrors: {doctorId?: string; chamberId?: string; patientName?: string; operationType?: string; patientPhone?: string; date?: string; time?: string; amount?: string} = {}

    if (!newOperationForm.doctorId) {
      newErrors.doctorId = t('operation.doctorRequired')
    }

    if (!newOperationForm.chamberId) {
      newErrors.chamberId = t('operation.chamberRequired')
    }

    if (!newOperationForm.patientName.trim()) {
      newErrors.patientName = t('operation.patientNameRequired')
    }

    if (!newOperationForm.operationType) {
      newErrors.operationType = t('operation.operationTypeRequired')
    }

    const phoneValidation = validateBangladeshiMobile(newOperationForm.patientPhone, t)
    if (!phoneValidation.isValid) {
      newErrors.patientPhone = phoneValidation.error || t('validation.phoneRequired')
    }

    if (!newOperationForm.date) {
      newErrors.date = t('operation.dateRequired')
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selectedDate = new Date(newOperationForm.date)
      selectedDate.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        newErrors.date = t('operation.pastDateNotAllowed')
      }
    }

    if (!newOperationForm.time) {
      newErrors.time = t('operation.timeRequired')
    }

    if (!newOperationForm.amount.trim()) {
      newErrors.amount = t('operation.amountRequired')
    } else {
      const amount = parseFloat(newOperationForm.amount)
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = t('operation.invalidAmount')
      }
    }

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddOperation = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAddOperationForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const selectedDoctorData = demoDoctors.find(doctor => doctor.id.toString() === newOperationForm.doctorId)
      const selectedChamberData = demoChambers.find(chamber => chamber.id.toString() === newOperationForm.chamberId)
      
      const newOperation = {
        id: Math.max(...operations.map(a => a.id)) + 1,
        doctorId: parseInt(newOperationForm.doctorId),
        doctorName: selectedDoctorData?.name || '',
        doctorNameBn: selectedDoctorData?.nameBn || '',
        chamberId: parseInt(newOperationForm.chamberId),
        chamberName: selectedChamberData?.name || '',
        chamberNameBn: selectedChamberData?.nameBn || '',
        patientName: newOperationForm.patientName,
        patientNameBn: newOperationForm.patientName, // In real app, you might want separate Bengali name field
        operationType: newOperationForm.operationType,
        patientPhone: newOperationForm.patientPhone,
        date: newOperationForm.date!,
        time: newOperationForm.time,
        amount: parseFloat(newOperationForm.amount),
        isActive: true
      }

      setOperations(prevOperations => [newOperation, ...prevOperations])
      setIsAddModalOpen(false)
      setNewOperationForm({ 
        doctorId: '', 
        chamberId: '', 
        patientName: '', 
        operationType: '', 
        patientPhone: '', 
        date: undefined, 
        time: '', 
        amount: '' 
      })
      setFormErrors({})
      setIsSubmitting(false)

      showToast.success(t('operation.operationAdded'), t('operation.operationAddedDesc'))
    }, 1000)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setNewOperationForm({ 
      doctorId: '', 
      chamberId: '', 
      patientName: '', 
      operationType: '', 
      patientPhone: '', 
      date: undefined, 
      time: '', 
      amount: '' 
    })
    setFormErrors({})
    setIsSubmitting(false)
  }

  const handleModalInputChange = (field: keyof typeof newOperationForm) => (e: React.ChangeEvent<HTMLInputElement> | string | Date | undefined) => {
    let value: string | Date | undefined
    if (field === 'date') {
      value = e as Date | undefined
    } else if (typeof e === 'string') {
      value = e // For Select component
    } else {
      value = (e as React.ChangeEvent<HTMLInputElement>).target.value // For Input component
    }
    
    // Format phone number as user types
    if (field === 'patientPhone' && typeof value === 'string') {
      value = formatMobileNumber(value)
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
    
    setNewOperationForm(prev => {
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

  const handleStatusToggle = (operationId: number) => {
    setOperations(prevOperations => 
      prevOperations.map(operation => 
        operation.id === operationId 
          ? { ...operation, isActive: !operation.isActive }
          : operation
      )
    )
  }

  const handleEdit = (operationId: number) => {
    // This will be implemented later
    showToast.info('Edit functionality', 'Edit functionality will be implemented soon')
    // TODO: Implement edit functionality using operationId
    console.log('Edit operation:', operationId)
  }

  const handleSearch = () => {
    // Since we're filtering in real-time, this button can be used for additional search actions if needed
    // For now, it's just a visual element as requested
  }

  const handleResetSearch = () => {
    setSearchQuery('')
    setSelectedDoctor(undefined)
    setSelectedChamber(undefined)
    setCurrentPage(1)
  }

  // Get available chambers based on selected doctor
  const availableChambers = useMemo(() => {
    if (!newOperationForm.doctorId) return []
    return demoChambers.filter(chamber => chamber.doctorId.toString() === newOperationForm.doctorId)
  }, [newOperationForm.doctorId])

  // Get chambers for filter dropdown based on selected doctor
  const filterChambers = useMemo(() => {
    if (!selectedDoctor) return demoChambers
    return demoChambers.filter(chamber => chamber.doctorId.toString() === selectedDoctor)
  }, [selectedDoctor])

  // Filter operations based on search query, selected doctor, and selected chamber
  const filteredOperations = useMemo(() => {
    let filtered = operations

    // Filter by doctor if selected
    if (selectedDoctor) {
      filtered = filtered.filter(operation => operation.doctorId.toString() === selectedDoctor)
    }

    // Filter by chamber if selected
    if (selectedChamber) {
      filtered = filtered.filter(operation => operation.chamberId.toString() === selectedChamber)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(operation => {
        const doctorName = language === 'bn' ? operation.doctorNameBn : operation.doctorName
        const chamberName = language === 'bn' ? operation.chamberNameBn : operation.chamberName
        const patientName = language === 'bn' ? operation.patientNameBn : operation.patientName
        const operationTypeLabel = operationTypes.find(ot => ot.value === operation.operationType)
        const operationType = operationTypeLabel ? (language === 'bn' ? operationTypeLabel.labelBn : operationTypeLabel.labelEn) : ''
        
        return doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               chamberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               operationType.toLowerCase().includes(searchQuery.toLowerCase()) ||
               operation.patientPhone.includes(searchQuery) ||
               formatDate(operation.date).toLowerCase().includes(searchQuery.toLowerCase()) ||
               operation.time.toLowerCase().includes(searchQuery.toLowerCase()) ||
               formatCurrency(operation.amount).includes(searchQuery)
      })
    }

    return filtered
  }, [operations, searchQuery, selectedDoctor, selectedChamber, language, formatDate, formatCurrency])

  // Pagination logic
  const totalPages = Math.ceil(filteredOperations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentOperations = filteredOperations.slice(startIndex, endIndex)

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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{t('operation.title')}</h2>
                <p className="text-gray-600 mt-1 sm:mt-2 text-base sm:text-lg">{t('operation.subtitle')}</p>
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="lg:self-start w-auto max-w-fit mx-auto lg:mx-0"
              >
                <MdHealing className="w-4 h-4 mr-2" />
                {t('operation.addOperation')}
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
                  <Label htmlFor="chamber-filter" className="text-sm sm:text-base">{t('operation.filterByChamber')}</Label>
                  <Select value={selectedChamber} onValueChange={setSelectedChamber} disabled={!selectedDoctor}>
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue placeholder={selectedDoctor ? t('operation.allChambers') : t('operation.selectDoctorFirst')} />
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
                  <Label htmlFor="search" className="text-sm sm:text-base">{t('operation.search')}</Label>
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('operation.searchPlaceholder')}
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
                      <TableHead className="w-[150px] sm:w-[180px] h-10 px-3">{t('operation.doctorName')}</TableHead>
                      <TableHead className="w-[150px] sm:w-[180px] h-10 px-3">{t('operation.chamberName')}</TableHead>
                      <TableHead className="w-[150px] sm:w-[180px] h-10 px-3">{t('operation.patientName')}</TableHead>
                      <TableHead className="w-[120px] h-10 px-3">{t('operation.patientPhone')}</TableHead>
                      <TableHead className="w-[200px] h-10 px-3">{t('operation.operationType')}</TableHead>
                      <TableHead className="w-[120px] h-10 px-3">{t('operation.date')}</TableHead>
                      <TableHead className="w-[100px] h-10 px-3">{t('operation.time')}</TableHead>
                      <TableHead className="w-[100px] h-10 px-3">{t('operation.amount')}</TableHead>
                      <TableHead className="w-[100px] text-center h-10 px-3">{t('operation.actions')}</TableHead>
                      <TableHead className="w-[120px] text-center h-10 px-3">{t('operation.status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentOperations.length > 0 ? (
                      currentOperations.map((operation) => {
                        const operationTypeLabel = operationTypes.find(ot => ot.value === operation.operationType)
                        const operationTypeDisplay = operationTypeLabel ? (language === 'bn' ? operationTypeLabel.labelBn : operationTypeLabel.labelEn) : operation.operationType
                        
                        return (
                          <TableRow key={operation.id}>
                            <TableCell className="font-medium px-3 py-4">
                              {language === 'bn' ? operation.doctorNameBn : operation.doctorName}
                            </TableCell>
                            <TableCell className="px-3 py-4">
                              {language === 'bn' ? operation.chamberNameBn : operation.chamberName}
                            </TableCell>
                            <TableCell className="px-3 py-4">
                              {language === 'bn' ? operation.patientNameBn : operation.patientName}
                            </TableCell>
                            <TableCell className="px-3 py-4">{operation.patientPhone}</TableCell>
                            <TableCell className="px-3 py-4">{operationTypeDisplay}</TableCell>
                            <TableCell className="px-3 py-4">{formatDate(operation.date, 'MMM d, yyyy')}</TableCell>
                            <TableCell className="px-3 py-4">{formatTime(operation.time)}</TableCell>
                            <TableCell className="px-3 py-4">{formatCurrency(operation.amount)}</TableCell>
                            <TableCell className="text-center px-3 py-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(operation.id)}
                                className="h-8"
                              >
                                <MdEdit className="w-4 h-4 mr-1" />
                                {t('operation.edit')}
                              </Button>
                            </TableCell>
                            <TableCell className="text-center px-3 py-4">
                              <div className="flex items-center justify-center space-x-2">
                                <Switch
                                  checked={operation.isActive}
                                  onCheckedChange={() => handleStatusToggle(operation.id)}
                                />
                                <span className="text-sm text-gray-600">
                                  {operation.isActive ? t('operation.active') : t('operation.inactive')}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-8 px-3 text-gray-500">
                          {t('operation.noOperations')}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredOperations.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 p-3 border-t bg-gray-100 rounded-b-xl">
                  <div className="text-sm text-gray-700">
                    {t('operation.showing')} {formatNumber(startIndex + 1)} {t('operation.to')} {formatNumber(Math.min(endIndex, filteredOperations.length))} {t('operation.of')} {formatNumber(filteredOperations.length)} {t('operation.results')}
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
                      {t('operation.previous')}
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
                      {t('operation.next')}
                      <MdChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add Operation Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen} disableOutsideClick={true} maxWidth="max-w-lg sm:max-w-4xl">
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{t('operation.addNewOperation')}</DialogTitle>
            <DialogDescription>
              {t('operation.addNewOperationDesc')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddOperation} className="space-y-4" autoComplete="off">
            {/* Doctor Name Dropdown - Full Width */}
            <div className="space-y-2">
              <Label htmlFor="doctorName" className="text-sm font-medium">
                {t('operation.doctorName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newOperationForm.doctorId} 
                  onValueChange={handleModalInputChange('doctorId')}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.doctorId ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={t('operation.selectDoctor')} />
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

            {/* Chamber Name Dropdown - Full Width */}
            <div className="space-y-2">
              <Label htmlFor="chamberName" className="text-sm font-medium">
                {t('operation.chamberName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiBuildings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newOperationForm.chamberId} 
                  onValueChange={handleModalInputChange('chamberId')}
                  disabled={isSubmitting || !newOperationForm.doctorId}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.chamberId ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={newOperationForm.doctorId ? t('operation.selectChamber') : t('operation.selectDoctorFirst')} />
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

            {/* Patient Name (Left) and Patient Phone (Right) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Patient Name Field */}
              <div className="space-y-2">
                <Label htmlFor="patientName" className="text-sm font-medium">
                  {t('operation.patientName')} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="patientName"
                    type="text"
                    value={newOperationForm.patientName}
                    onChange={handleModalInputChange('patientName')}
                    placeholder={t('operation.patientNamePlaceholder')}
                    className={`pl-10 ${formErrors.patientName ? 'border-red-500 focus:border-red-500' : ''}`}
                    disabled={isSubmitting}
                    autoComplete="off"
                  />
                </div>
                {formErrors.patientName && (
                  <p className="text-sm text-red-600">{formErrors.patientName}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="patientPhone" className="text-sm font-medium">
                  {t('operation.patientPhone')} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <BiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="patientPhone"
                    type="tel"
                    value={newOperationForm.patientPhone}
                    onChange={handleModalInputChange('patientPhone')}
                    placeholder={t('auth.phonePlaceholder')}
                    className={`pl-10 ${formErrors.patientPhone ? 'border-red-500 focus:border-red-500' : ''}`}
                    disabled={isSubmitting}
                    maxLength={11}
                    autoComplete="off"
                  />
                </div>
                {formErrors.patientPhone && (
                  <p className="text-sm text-red-600">{formErrors.patientPhone}</p>
                )}
              </div>
            </div>

            {/* Operation Type (Left) and Amount (Right) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Operation Type Dropdown */}
              <div className="space-y-2">
                <Label htmlFor="operationType" className="text-sm font-medium">
                  {t('operation.operationType')} <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={newOperationForm.operationType} 
                  onValueChange={handleModalInputChange('operationType')}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={formErrors.operationType ? 'border-red-500 focus:border-red-500' : ''}>
                    <SelectValue placeholder={t('operation.selectOperationType')} />
                  </SelectTrigger>
                  <SelectContent>
                    {operationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {language === 'bn' ? type.labelBn : type.labelEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.operationType && (
                  <p className="text-sm text-red-600">{formErrors.operationType}</p>
                )}
              </div>

              {/* Amount Field */}
              <div className="space-y-2">
                <Label htmlFor="operationAmount" className="text-sm font-medium">
                  {t('operation.amount')} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <BiMoney className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="operationAmount"
                    type="number"
                    step="0.01"
                    inputMode="decimal"
                    value={newOperationForm.amount}
                    onChange={handleModalInputChange('amount')}
                    placeholder={t('operation.amountPlaceholder')}
                    className={`pl-10 ${formErrors.amount ? 'border-red-500 focus:border-red-500' : ''} [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]`}
                    disabled={isSubmitting}
                    autoComplete="off"
                  />
                </div>
                {formErrors.amount && (
                  <p className="text-sm text-red-600">{formErrors.amount}</p>
                )}
              </div>
            </div>

            {/* Date (Left) and Time (Right) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date Field */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {t('operation.date')} <span className="text-red-500">*</span>
                </Label>
                <DatePicker
                  date={newOperationForm.date}
                  onDateChange={handleModalInputChange('date')}
                  placeholder={t('operation.selectDate')}
                  className={`h-10 ${formErrors.date ? 'border-red-500 focus:border-red-500' : ''}`}
                  disabled={isSubmitting}
                  allowFutureDates={true}
                />
                {formErrors.date && (
                  <p className="text-sm text-red-600">{formErrors.date}</p>
                )}
              </div>

              {/* Time Field */}
              <div className="space-y-2">
                <Label htmlFor="operationTime" className="text-sm font-medium">
                  {t('operation.time')} <span className="text-red-500">*</span>
                </Label>
                <TimePicker
                  time={newOperationForm.time}
                  onTimeChange={handleModalInputChange('time')}
                  placeholder={t('operation.selectTime')}
                  className={`w-full h-10 ${formErrors.time ? 'border-red-500 focus:border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {formErrors.time && (
                  <p className="text-sm text-red-600">{formErrors.time}</p>
                )}
              </div>
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
