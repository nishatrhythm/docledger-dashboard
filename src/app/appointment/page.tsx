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
  MdCalendarToday
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

// Patient types
const patientTypes = [
  { value: 'new', labelEn: 'New', labelBn: 'নতুন' },
  { value: 'old', labelEn: 'Old', labelBn: 'পুরাতন' }
]

// Demo data for appointments
const demoAppointments = [
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
    patientType: 'new',
    patientPhone: '01712345678',
    date: new Date('2025-09-10'),
    time: '10:00 AM',
    amount: 1500.00,
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
    patientType: 'old',
    patientPhone: '01823456789',
    date: new Date('2025-09-11'),
    time: '02:30 PM',
    amount: 2000.50,
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
    patientType: 'new',
    patientPhone: '01934567890',
    date: new Date('2025-09-12'),
    time: '04:00 PM',
    amount: 1800.75,
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
    patientType: 'old',
    patientPhone: '01645678901',
    date: new Date('2025-09-13'),
    time: '11:30 AM',
    amount: 1200.00,
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
    patientType: 'new',
    patientPhone: '01756789012',
    date: new Date('2025-09-14'),
    time: '09:30 AM',
    amount: 1000.00,
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
    patientType: 'old',
    patientPhone: '01867890123',
    date: new Date('2025-09-15'),
    time: '03:00 PM',
    amount: 2500.25,
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
    patientType: 'new',
    patientPhone: '01978901234',
    date: new Date('2025-09-16'),
    time: '06:30 PM',
    amount: 3000.50,
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
    patientType: 'old',
    patientPhone: '01589012345',
    date: new Date('2025-09-17'),
    time: '05:00 PM',
    amount: 1750.00,
    isActive: true 
  },
]

export default function AppointmentPage() {
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
  const [appointments, setAppointments] = useState(demoAppointments)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newAppointmentForm, setNewAppointmentForm] = useState({
    doctorId: '',
    chamberId: '',
    patientName: '',
    patientType: '',
    patientPhone: '',
    date: undefined as Date | undefined,
    time: '',
    amount: ''
  })
  const [formErrors, setFormErrors] = useState<{doctorId?: string; chamberId?: string; patientName?: string; patientType?: string; patientPhone?: string; date?: string; time?: string; amount?: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const itemsPerPage = 5

  const handleLogout = () => {
    // Show logout success toast
    showToast.success(t('toast.logoutSuccess'), t('toast.logoutSuccessDesc'))
    
    // Redirect to login page
    setTimeout(() => {
      router.push('/login')
    }, 1000) // Small delay to show the toast
  }

  const validateAddAppointmentForm = () => {
    const newErrors: {doctorId?: string; chamberId?: string; patientName?: string; patientType?: string; patientPhone?: string; date?: string; time?: string; amount?: string} = {}

    if (!newAppointmentForm.doctorId) {
      newErrors.doctorId = t('appointment.doctorRequired')
    }

    if (!newAppointmentForm.chamberId) {
      newErrors.chamberId = t('appointment.chamberRequired')
    }

    if (!newAppointmentForm.patientName.trim()) {
      newErrors.patientName = t('appointment.patientNameRequired')
    }

    if (!newAppointmentForm.patientType) {
      newErrors.patientType = t('appointment.patientTypeRequired')
    }

    const phoneValidation = validateBangladeshiMobile(newAppointmentForm.patientPhone, t)
    if (!phoneValidation.isValid) {
      newErrors.patientPhone = phoneValidation.error || t('validation.phoneRequired')
    }

    if (!newAppointmentForm.date) {
      newErrors.date = t('appointment.dateRequired')
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selectedDate = new Date(newAppointmentForm.date)
      selectedDate.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        newErrors.date = t('appointment.pastDateNotAllowed')
      }
    }

    if (!newAppointmentForm.time) {
      newErrors.time = t('appointment.timeRequired')
    }

    if (!newAppointmentForm.amount.trim()) {
      newErrors.amount = t('appointment.amountRequired')
    } else {
      const amount = parseFloat(newAppointmentForm.amount)
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = t('appointment.invalidAmount')
      }
    }

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAddAppointmentForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const selectedDoctorData = demoDoctors.find(doctor => doctor.id.toString() === newAppointmentForm.doctorId)
      const selectedChamberData = demoChambers.find(chamber => chamber.id.toString() === newAppointmentForm.chamberId)
      
      const newAppointment = {
        id: Math.max(...appointments.map(a => a.id)) + 1,
        doctorId: parseInt(newAppointmentForm.doctorId),
        doctorName: selectedDoctorData?.name || '',
        doctorNameBn: selectedDoctorData?.nameBn || '',
        chamberId: parseInt(newAppointmentForm.chamberId),
        chamberName: selectedChamberData?.name || '',
        chamberNameBn: selectedChamberData?.nameBn || '',
        patientName: newAppointmentForm.patientName,
        patientNameBn: newAppointmentForm.patientName, // In real app, you might want separate Bengali name field
        patientType: newAppointmentForm.patientType,
        patientPhone: newAppointmentForm.patientPhone,
        date: newAppointmentForm.date!,
        time: newAppointmentForm.time,
        amount: parseFloat(newAppointmentForm.amount),
        isActive: true
      }

      setAppointments(prevAppointments => [newAppointment, ...prevAppointments])
      setIsAddModalOpen(false)
      setNewAppointmentForm({ 
        doctorId: '', 
        chamberId: '', 
        patientName: '', 
        patientType: '', 
        patientPhone: '', 
        date: undefined, 
        time: '', 
        amount: '' 
      })
      setFormErrors({})
      setIsSubmitting(false)

      showToast.success(t('appointment.appointmentAdded'), t('appointment.appointmentAddedDesc'))
    }, 1000)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setNewAppointmentForm({ 
      doctorId: '', 
      chamberId: '', 
      patientName: '', 
      patientType: '', 
      patientPhone: '', 
      date: undefined, 
      time: '', 
      amount: '' 
    })
    setFormErrors({})
    setIsSubmitting(false)
  }

  const handleModalInputChange = (field: keyof typeof newAppointmentForm) => (e: React.ChangeEvent<HTMLInputElement> | string | Date | undefined) => {
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
    
    setNewAppointmentForm(prev => {
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

  const handleStatusToggle = (appointmentId: number) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, isActive: !appointment.isActive }
          : appointment
      )
    )
  }

  const handleEdit = (appointmentId: number) => {
    // This will be implemented later
    showToast.info('Edit functionality', 'Edit functionality will be implemented soon')
    // TODO: Implement edit functionality using appointmentId
    console.log('Edit appointment:', appointmentId)
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
    if (!newAppointmentForm.doctorId) return []
    return demoChambers.filter(chamber => chamber.doctorId.toString() === newAppointmentForm.doctorId)
  }, [newAppointmentForm.doctorId])

  // Get chambers for filter dropdown based on selected doctor
  const filterChambers = useMemo(() => {
    if (!selectedDoctor) return demoChambers
    return demoChambers.filter(chamber => chamber.doctorId.toString() === selectedDoctor)
  }, [selectedDoctor])

  // Filter appointments based on search query, selected doctor, and selected chamber
  const filteredAppointments = useMemo(() => {
    let filtered = appointments

    // Filter by doctor if selected
    if (selectedDoctor) {
      filtered = filtered.filter(appointment => appointment.doctorId.toString() === selectedDoctor)
    }

    // Filter by chamber if selected
    if (selectedChamber) {
      filtered = filtered.filter(appointment => appointment.chamberId.toString() === selectedChamber)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(appointment => {
        const doctorName = language === 'bn' ? appointment.doctorNameBn : appointment.doctorName
        const chamberName = language === 'bn' ? appointment.chamberNameBn : appointment.chamberName
        const patientName = language === 'bn' ? appointment.patientNameBn : appointment.patientName
        const patientTypeLabel = patientTypes.find(pt => pt.value === appointment.patientType)
        const patientType = patientTypeLabel ? (language === 'bn' ? patientTypeLabel.labelBn : patientTypeLabel.labelEn) : ''
        
        return doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               chamberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               patientType.toLowerCase().includes(searchQuery.toLowerCase()) ||
               appointment.patientPhone.includes(searchQuery) ||
               formatDate(appointment.date).toLowerCase().includes(searchQuery.toLowerCase()) ||
               appointment.time.toLowerCase().includes(searchQuery.toLowerCase()) ||
               formatCurrency(appointment.amount).includes(searchQuery)
      })
    }

    return filtered
  }, [appointments, searchQuery, selectedDoctor, selectedChamber, language, formatDate, formatCurrency])

  // Pagination logic
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex)

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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{t('appointment.title')}</h2>
                <p className="text-gray-600 mt-1 sm:mt-2 text-base sm:text-lg">{t('appointment.subtitle')}</p>
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="lg:self-start w-auto max-w-fit mx-auto lg:mx-0"
              >
                <MdCalendarToday className="w-4 h-4 mr-2" />
                {t('appointment.addAppointment')}
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
                  <Label htmlFor="chamber-filter" className="text-sm sm:text-base">{t('appointment.filterByChamber')}</Label>
                  <Select value={selectedChamber} onValueChange={setSelectedChamber} disabled={!selectedDoctor}>
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue placeholder={selectedDoctor ? t('appointment.allChambers') : t('appointment.selectDoctorFirst')} />
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
                  <Label htmlFor="search" className="text-sm sm:text-base">{t('appointment.search')}</Label>
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('appointment.searchPlaceholder')}
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
                      <TableHead className="w-[150px] sm:w-[180px] h-10 px-3">{t('appointment.doctorName')}</TableHead>
                      <TableHead className="w-[150px] sm:w-[180px] h-10 px-3">{t('appointment.chamberName')}</TableHead>
                      <TableHead className="w-[150px] sm:w-[180px] h-10 px-3">{t('appointment.patientName')}</TableHead>
                      <TableHead className="w-[100px] h-10 px-3">{t('appointment.patientType')}</TableHead>
                      <TableHead className="w-[120px] h-10 px-3">{t('appointment.patientPhone')}</TableHead>
                      <TableHead className="w-[120px] h-10 px-3">{t('appointment.date')}</TableHead>
                      <TableHead className="w-[100px] h-10 px-3">{t('appointment.time')}</TableHead>
                      <TableHead className="w-[100px] h-10 px-3">{t('appointment.amount')}</TableHead>
                      <TableHead className="w-[100px] text-center h-10 px-3">{t('appointment.actions')}</TableHead>
                      <TableHead className="w-[120px] text-center h-10 px-3">{t('appointment.status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentAppointments.length > 0 ? (
                      currentAppointments.map((appointment) => {
                        const patientTypeLabel = patientTypes.find(pt => pt.value === appointment.patientType)
                        const patientTypeDisplay = patientTypeLabel ? (language === 'bn' ? patientTypeLabel.labelBn : patientTypeLabel.labelEn) : appointment.patientType
                        
                        return (
                          <TableRow key={appointment.id}>
                            <TableCell className="font-medium px-3 py-4">
                              {language === 'bn' ? appointment.doctorNameBn : appointment.doctorName}
                            </TableCell>
                            <TableCell className="px-3 py-4">
                              {language === 'bn' ? appointment.chamberNameBn : appointment.chamberName}
                            </TableCell>
                            <TableCell className="px-3 py-4">
                              {language === 'bn' ? appointment.patientNameBn : appointment.patientName}
                            </TableCell>
                            <TableCell className="px-3 py-4">{patientTypeDisplay}</TableCell>
                            <TableCell className="px-3 py-4">{appointment.patientPhone}</TableCell>
                            <TableCell className="px-3 py-4">{formatDate(appointment.date, 'MMM d, yyyy')}</TableCell>
                            <TableCell className="px-3 py-4">{formatTime(appointment.time)}</TableCell>
                            <TableCell className="px-3 py-4">{formatCurrency(appointment.amount)}</TableCell>
                            <TableCell className="text-center px-3 py-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(appointment.id)}
                                className="h-8"
                              >
                                <MdEdit className="w-4 h-4 mr-1" />
                                {t('appointment.edit')}
                              </Button>
                            </TableCell>
                            <TableCell className="text-center px-3 py-4">
                              <div className="flex items-center justify-center space-x-2">
                                <Switch
                                  checked={appointment.isActive}
                                  onCheckedChange={() => handleStatusToggle(appointment.id)}
                                />
                                <span className="text-sm text-gray-600">
                                  {appointment.isActive ? t('appointment.active') : t('appointment.inactive')}
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-8 px-3 text-gray-500">
                          {t('appointment.noAppointments')}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredAppointments.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 p-3 border-t bg-gray-100 rounded-b-xl">
                  <div className="text-sm text-gray-700">
                    {t('appointment.showing')} {formatNumber(startIndex + 1)} {t('appointment.to')} {formatNumber(Math.min(endIndex, filteredAppointments.length))} {t('appointment.of')} {formatNumber(filteredAppointments.length)} {t('appointment.results')}
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
                      {t('appointment.previous')}
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
                      {t('appointment.next')}
                      <MdChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add Appointment Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen} disableOutsideClick={true}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{t('appointment.addNewAppointment')}</DialogTitle>
            <DialogDescription>
              {t('appointment.addNewAppointmentDesc')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddAppointment} className="space-y-4" autoComplete="off">
            {/* Doctor Name Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="doctorName" className="text-sm font-medium">
                {t('appointment.doctorName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newAppointmentForm.doctorId} 
                  onValueChange={handleModalInputChange('doctorId')}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.doctorId ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={t('appointment.selectDoctor')} />
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
                {t('appointment.chamberName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiBuildings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newAppointmentForm.chamberId} 
                  onValueChange={handleModalInputChange('chamberId')}
                  disabled={isSubmitting || !newAppointmentForm.doctorId}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.chamberId ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={newAppointmentForm.doctorId ? t('appointment.selectChamber') : t('appointment.selectDoctorFirst')} />
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

            {/* Patient Name Field */}
            <div className="space-y-2">
              <Label htmlFor="patientName" className="text-sm font-medium">
                {t('appointment.patientName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="patientName"
                  type="text"
                  value={newAppointmentForm.patientName}
                  onChange={handleModalInputChange('patientName')}
                  placeholder={t('appointment.patientNamePlaceholder')}
                  className={`pl-10 ${formErrors.patientName ? 'border-red-500 focus:border-red-500' : ''}`}
                  disabled={isSubmitting}
                  autoComplete="off"
                />
              </div>
              {formErrors.patientName && (
                <p className="text-sm text-red-600">{formErrors.patientName}</p>
              )}
            </div>

            {/* Patient Type Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="patientType" className="text-sm font-medium">
                {t('appointment.patientType')} <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={newAppointmentForm.patientType} 
                onValueChange={handleModalInputChange('patientType')}
                disabled={isSubmitting}
              >
                <SelectTrigger className={formErrors.patientType ? 'border-red-500 focus:border-red-500' : ''}>
                  <SelectValue placeholder={t('appointment.selectPatientType')} />
                </SelectTrigger>
                <SelectContent>
                  {patientTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {language === 'bn' ? type.labelBn : type.labelEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.patientType && (
                <p className="text-sm text-red-600">{formErrors.patientType}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="patientPhone" className="text-sm font-medium">
                {t('appointment.patientPhone')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="patientPhone"
                  type="tel"
                  value={newAppointmentForm.patientPhone}
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

            {/* Date Field */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {t('appointment.date')} <span className="text-red-500">*</span>
              </Label>
              <DatePicker
                date={newAppointmentForm.date}
                onDateChange={handleModalInputChange('date')}
                placeholder={t('appointment.selectDate')}
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
              <Label htmlFor="appointmentTime" className="text-sm font-medium">
                {t('appointment.time')} <span className="text-red-500">*</span>
              </Label>
              <TimePicker
                time={newAppointmentForm.time}
                onTimeChange={handleModalInputChange('time')}
                placeholder={t('appointment.selectTime')}
                className={`w-full ${formErrors.time ? 'border-red-500 focus:border-red-500' : ''}`}
                disabled={isSubmitting}
              />
              {formErrors.time && (
                <p className="text-sm text-red-600">{formErrors.time}</p>
              )}
            </div>

            {/* Amount Field */}
            <div className="space-y-2">
              <Label htmlFor="appointmentAmount" className="text-sm font-medium">
                {t('appointment.amount')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiMoney className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="appointmentAmount"
                  type="number"
                  step="0.01"
                  inputMode="decimal"
                  value={newAppointmentForm.amount}
                  onChange={handleModalInputChange('amount')}
                  placeholder={t('appointment.amountPlaceholder')}
                  className={`pl-10 ${formErrors.amount ? 'border-red-500 focus:border-red-500' : ''} [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]`}
                  disabled={isSubmitting}
                  autoComplete="off"
                />
              </div>
              {formErrors.amount && (
                <p className="text-sm text-red-600">{formErrors.amount}</p>
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
