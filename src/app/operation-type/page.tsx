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
  MdCategory
} from 'react-icons/md'
import { BiUser, BiBuildings, BiCategory } from 'react-icons/bi'

// Demo data for doctors (doctors)
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

// Demo data for operation types
const demoOperationTypes = [
  { 
    id: 1, 
    doctorId: 1,
    doctorName: 'Dr. Ahmed Rahman', 
    doctorNameBn: 'ডা. আহমেদ রহমান',
    chamberId: 1,
    chamberName: 'Cardiology Chamber',
    chamberNameBn: 'হৃদরোগ চেম্বার',
    operationType: 'Heart Surgery', 
    operationTypeBn: 'হার্ট সার্জারি',
    isActive: true 
  },
  { 
    id: 2, 
    doctorId: 1,
    doctorName: 'Dr. Ahmed Rahman', 
    doctorNameBn: 'ডা. আহমেদ রহমান',
    chamberId: 1,
    chamberName: 'Cardiology Chamber',
    chamberNameBn: 'হৃদরোগ চেম্বার',
    operationType: 'Angioplasty', 
    operationTypeBn: 'এনজিওপ্লাস্টি',
    isActive: true 
  },
  { 
    id: 3, 
    doctorId: 2,
    doctorName: 'Dr. Sarah Khan', 
    doctorNameBn: 'ডা. সারাহ খান',
    chamberId: 2,
    chamberName: 'Neurology Center',
    chamberNameBn: 'স্নায়ুরোগ কেন্দ্র',
    operationType: 'Brain Surgery', 
    operationTypeBn: 'ব্রেইন সার্জারি',
    isActive: true 
  },
  { 
    id: 4, 
    doctorId: 3,
    doctorName: 'Dr. Mohammad Ali', 
    doctorNameBn: 'ডা. মোহাম্মদ আলী',
    chamberId: 3,
    chamberName: 'Orthopedic Clinic',
    chamberNameBn: 'অর্থোপেডিক ক্লিনিক',
    operationType: 'Knee Replacement', 
    operationTypeBn: 'হাঁটু প্রতিস্থাপন',
    isActive: false 
  },
  { 
    id: 5, 
    doctorId: 4,
    doctorName: 'Dr. Fatima Sheikh', 
    doctorNameBn: 'ডা. ফাতিমা শেখ',
    chamberId: 4,
    chamberName: 'General Medicine',
    chamberNameBn: 'সাধারণ চিকিৎসা',
    operationType: 'Appendectomy', 
    operationTypeBn: 'অ্যাপেন্ডেক্টমি',
    isActive: true 
  },
  { 
    id: 6, 
    doctorId: 5,
    doctorName: 'Dr. Rahman Khan', 
    doctorNameBn: 'ডা. রহমান খান',
    chamberId: 5,
    chamberName: 'Pediatric Care',
    chamberNameBn: 'শিশু চিকিৎসা',
    operationType: 'Tonsillectomy', 
    operationTypeBn: 'টনসিলেক্টমি',
    isActive: true 
  },
  { 
    id: 7, 
    doctorId: 6,
    doctorName: 'Dr. Ayesha Begum', 
    doctorNameBn: 'ডা. আয়েশা বেগম',
    chamberId: 6,
    chamberName: 'Gynecology Clinic',
    chamberNameBn: 'গাইনোকোলজি ক্লিনিক',
    operationType: 'Cesarean Section', 
    operationTypeBn: 'সিজারিয়ান সেকশন',
    isActive: false 
  },
  { 
    id: 8, 
    doctorId: 7,
    doctorName: 'Dr. Hassan Ali', 
    doctorNameBn: 'ডা. হাসান আলী',
    chamberId: 7,
    chamberName: 'Emergency Care',
    chamberNameBn: 'জরুরি চিকিৎসা',
    operationType: 'Emergency Surgery', 
    operationTypeBn: 'জরুরি সার্জারি',
    isActive: true 
  },
  { 
    id: 9, 
    doctorId: 8,
    doctorName: 'Dr. Nadia Islam', 
    doctorNameBn: 'ডা. নাদিয়া ইসলাম',
    chamberId: 8,
    chamberName: 'Dermatology Center',
    chamberNameBn: 'চর্মরোগ কেন্দ্র',
    operationType: 'Skin Biopsy', 
    operationTypeBn: 'ত্বকের বায়োপসি',
    isActive: true 
  },
]

export default function OperationTypePage() {
  const { t, formatNumber, language } = useLanguage()
  const router = useRouter()
  const { showToast } = useLocalizedToast()

  const [operationTypes, setOperationTypes] = useState(demoOperationTypes)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>(undefined)
  const [selectedChamber, setSelectedChamber] = useState<string | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // New operation type form state
  const [newOperationTypeForm, setNewOperationTypeForm] = useState({
    doctorId: '',
    chamberId: '',
    operationType: ''
  })

  // Form validation errors
  const [formErrors, setFormErrors] = useState<{
    doctorId?: string
    chamberId?: string
    operationType?: string
  }>({})

  const itemsPerPage = 5

  // Get available chambers based on selected doctor
  const availableChambers = useMemo(() => {
    if (!newOperationTypeForm.doctorId) return []
    return demoChambers.filter(chamber => chamber.doctorId.toString() === newOperationTypeForm.doctorId)
  }, [newOperationTypeForm.doctorId])

  // Filter chambers for search filters
  const filterChambers = useMemo(() => {
    if (!selectedDoctor) return demoChambers
    return demoChambers.filter(chamber => chamber.doctorId.toString() === selectedDoctor)
  }, [selectedDoctor])

  // Filter operation types based on search query, selected doctor, and selected chamber
  const filteredOperationTypes = useMemo(() => {
    let filtered = operationTypes

    // Filter by doctor if selected
    if (selectedDoctor) {
      filtered = filtered.filter(operationType => operationType.doctorId.toString() === selectedDoctor)
    }

    // Filter by chamber if selected
    if (selectedChamber) {
      filtered = filtered.filter(operationType => operationType.chamberId.toString() === selectedChamber)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(operationType => {
        const doctorName = language === 'bn' ? operationType.doctorNameBn : operationType.doctorName
        const chamberName = language === 'bn' ? operationType.chamberNameBn : operationType.chamberName
        const operationTypeName = language === 'bn' ? operationType.operationTypeBn : operationType.operationType
        
        return doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               chamberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               operationTypeName.toLowerCase().includes(searchQuery.toLowerCase())
      })
    }

    return filtered
  }, [operationTypes, searchQuery, selectedDoctor, selectedChamber, language])

  // Pagination logic
  const totalPages = Math.ceil(filteredOperationTypes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentOperationTypes = filteredOperationTypes.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
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

  // Form validation
  const validateAddOperationTypeForm = () => {
    const newErrors: typeof formErrors = {}

    if (!newOperationTypeForm.doctorId) {
      newErrors.doctorId = t('operationType.doctorRequired')
    }

    if (!newOperationTypeForm.chamberId) {
      newErrors.chamberId = t('operationType.chamberRequired')
    }

    if (!newOperationTypeForm.operationType.trim()) {
      newErrors.operationType = t('operationType.operationTypeRequired')
    }

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddOperationType = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAddOperationTypeForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const selectedDoctorData = demoDoctors.find(doctor => doctor.id.toString() === newOperationTypeForm.doctorId)
      const selectedChamberData = demoChambers.find(chamber => chamber.id.toString() === newOperationTypeForm.chamberId)
      
      const newOperationType = {
        id: Math.max(...operationTypes.map(ot => ot.id)) + 1,
        doctorId: parseInt(newOperationTypeForm.doctorId),
        doctorName: selectedDoctorData?.name || '',
        doctorNameBn: selectedDoctorData?.nameBn || '',
        chamberId: parseInt(newOperationTypeForm.chamberId),
        chamberName: selectedChamberData?.name || '',
        chamberNameBn: selectedChamberData?.nameBn || '',
        operationType: newOperationTypeForm.operationType,
        operationTypeBn: newOperationTypeForm.operationType, // In real app, you might want separate Bengali name field
        isActive: true
      }

      setOperationTypes(prevOperationTypes => [newOperationType, ...prevOperationTypes])
      setIsAddModalOpen(false)
      setNewOperationTypeForm({ doctorId: '', chamberId: '', operationType: '' })
      setFormErrors({})
      setIsSubmitting(false)

      showToast.success(t('operationType.operationTypeAdded'), t('operationType.operationTypeAddedDesc'))
    }, 1000)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setNewOperationTypeForm({ doctorId: '', chamberId: '', operationType: '' })
    setFormErrors({})
    setIsSubmitting(false)
  }

  const handleModalInputChange = (field: 'doctorId' | 'chamberId' | 'operationType') => (e: React.ChangeEvent<HTMLInputElement> | string) => {
    let value: string
    if (typeof e === 'string') {
      value = e // For Select component
    } else {
      value = e.target.value // For Input component
    }
    
    setNewOperationTypeForm(prev => {
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

  const handleStatusToggle = (operationTypeId: number) => {
    setOperationTypes(prevOperationTypes => 
      prevOperationTypes.map(operationType => 
        operationType.id === operationTypeId 
          ? { ...operationType, isActive: !operationType.isActive }
          : operationType
      )
    )
  }

  const handleEdit = (operationTypeId: number) => {
    // This will be implemented later
    showToast.info('Edit functionality', 'Edit functionality will be implemented soon')
    // TODO: Implement edit functionality using operationTypeId
    console.log('Edit operation type:', operationTypeId)
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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{t('operationType.title')}</h2>
                <p className="text-gray-600 mt-1 sm:mt-2 text-base sm:text-lg">{t('operationType.subtitle')}</p>
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="lg:self-start w-auto max-w-fit mx-auto lg:mx-0"
              >
                <MdCategory className="w-4 h-4 mr-2" />
                {t('operationType.addOperationType')}
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
                  <Label htmlFor="chamber-filter" className="text-sm sm:text-base">{t('operationType.filterByChamber')}</Label>
                  <Select value={selectedChamber} onValueChange={setSelectedChamber} disabled={!selectedDoctor}>
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue placeholder={selectedDoctor ? t('operationType.allChambers') : t('operationType.selectDoctorFirst')} />
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
                  <Label htmlFor="search" className="text-sm sm:text-base">{t('operationType.search')}</Label>
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('operationType.searchPlaceholder')}
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
                      <TableHead className="w-[180px] sm:w-[200px] h-10 px-3">{t('operationType.doctorName')}</TableHead>
                      <TableHead className="w-[180px] sm:w-[200px] h-10 px-3">{t('operationType.chamberName')}</TableHead>
                      <TableHead className="w-[180px] sm:w-[200px] h-10 px-3">{t('operationType.operationType')}</TableHead>
                      <TableHead className="w-[100px] text-center h-10 px-3">{t('operationType.actions')}</TableHead>
                      <TableHead className="w-[120px] text-center h-10 px-3">{t('operationType.status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentOperationTypes.length > 0 ? (
                      currentOperationTypes.map((operationType) => (
                        <TableRow key={operationType.id}>
                          <TableCell className="font-medium px-3 py-4">
                            {language === 'bn' ? operationType.doctorNameBn : operationType.doctorName}
                          </TableCell>
                          <TableCell className="px-3 py-4">
                            {language === 'bn' ? operationType.chamberNameBn : operationType.chamberName}
                          </TableCell>
                          <TableCell className="px-3 py-4">
                            {language === 'bn' ? operationType.operationTypeBn : operationType.operationType}
                          </TableCell>
                          <TableCell className="text-center px-3 py-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(operationType.id)}
                              className="h-8"
                            >
                              <MdEdit className="w-4 h-4 mr-1" />
                              {t('operationType.edit')}
                            </Button>
                          </TableCell>
                          <TableCell className="text-center px-3 py-4">
                            <div className="flex items-center justify-center space-x-2">
                              <Switch
                                checked={operationType.isActive}
                                onCheckedChange={() => handleStatusToggle(operationType.id)}
                              />
                              <span className="text-sm text-gray-600">
                                {operationType.isActive ? t('operationType.active') : t('operationType.inactive')}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 px-3 text-gray-500">
                          {t('operationType.noOperationTypes')}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredOperationTypes.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 p-3 border-t bg-gray-100 rounded-b-xl">
                  <div className="text-sm text-gray-700">
                    {t('operationType.showing')} {formatNumber(startIndex + 1)} {t('operationType.to')} {formatNumber(Math.min(endIndex, filteredOperationTypes.length))} {t('operationType.of')} {formatNumber(filteredOperationTypes.length)} {t('operationType.results')}
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
                      {t('operationType.previous')}
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
                      {t('operationType.next')}
                      <MdChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add Operation Type Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen} disableOutsideClick={true}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{t('operationType.addNewOperationType')}</DialogTitle>
            <DialogDescription>
              {t('operationType.addNewOperationTypeDesc')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddOperationType} className="space-y-4" autoComplete="off">
            {/* Doctor Name Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="doctorName" className="text-sm font-medium">
                {t('operationType.doctorName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newOperationTypeForm.doctorId} 
                  onValueChange={handleModalInputChange('doctorId')}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.doctorId ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={t('operationType.selectDoctor')} />
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
                {t('operationType.chamberName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiBuildings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newOperationTypeForm.chamberId} 
                  onValueChange={handleModalInputChange('chamberId')}
                  disabled={isSubmitting || !newOperationTypeForm.doctorId}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.chamberId ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={newOperationTypeForm.doctorId ? t('operationType.selectChamber') : t('operationType.selectDoctorFirst')} />
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

            {/* Operation Type Field */}
            <div className="space-y-2">
              <Label htmlFor="operationType" className="text-sm font-medium">
                {t('operationType.operationType')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiCategory className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="operationType"
                  type="text"
                  value={newOperationTypeForm.operationType}
                  onChange={handleModalInputChange('operationType')}
                  placeholder={t('operationType.operationTypePlaceholder')}
                  className={`pl-10 ${formErrors.operationType ? 'border-red-500 focus:border-red-500' : ''}`}
                  disabled={isSubmitting}
                  autoComplete="off"
                />
              </div>
              {formErrors.operationType && (
                <p className="text-sm text-red-600">{formErrors.operationType}</p>
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
