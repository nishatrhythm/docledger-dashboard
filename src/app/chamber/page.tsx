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
  MdMeetingRoom
} from 'react-icons/md'
import { BiMapPin, BiUser, BiBuildings } from 'react-icons/bi'

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
    doctorName: 'Dr. Ahmed Rahman', 
    doctorNameBn: 'ডা. আহমেদ রহমান', 
    chamberName: 'Cardiology Chamber', 
    chamberNameBn: 'হৃদরোগ চেম্বার',
    address: '123 Main Street, Dhaka-1000', 
    addressBn: '১২৩ মেইন স্ট্রিট, ঢাকা-১০০০',
    isActive: true 
  },
  { 
    id: 2, 
    doctorId: 2,
    doctorName: 'Dr. Sarah Khan', 
    doctorNameBn: 'ডা. সারাহ খান', 
    chamberName: 'Neurology Center', 
    chamberNameBn: 'স্নায়ুরোগ কেন্দ্র',
    address: '456 Hospital Road, Chittagong-4000', 
    addressBn: '৪৫৬ হাসপাতাল রোড, চট্টগ্রাম-৪০০০',
    isActive: true 
  },
  { 
    id: 3, 
    doctorId: 3,
    doctorName: 'Dr. Mohammad Ali', 
    doctorNameBn: 'ডা. মোহাম্মদ আলী', 
    chamberName: 'Orthopedic Clinic', 
    chamberNameBn: 'অর্থোপেডিক ক্লিনিক',
    address: '789 Medical Street, Sylhet-3100', 
    addressBn: '৭৮৯ মেডিকেল স্ট্রিট, সিলেট-৩১০০',
    isActive: false 
  },
  { 
    id: 4, 
    doctorId: 4,
    doctorName: 'Dr. Fatima Sheikh', 
    doctorNameBn: 'ডা. ফাতিমা শেখ', 
    chamberName: 'General Medicine', 
    chamberNameBn: 'সাধারণ চিকিৎসা',
    address: '321 Health Avenue, Rajshahi-6000', 
    addressBn: '৩২১ স্বাস্থ্য এভিনিউ, রাজশাহী-৬০০০',
    isActive: true 
  },
  { 
    id: 5, 
    doctorId: 5,
    doctorName: 'Dr. Rahman Khan', 
    doctorNameBn: 'ডা. রহমান খান', 
    chamberName: 'Pediatric Care', 
    chamberNameBn: 'শিশু চিকিৎসা',
    address: '654 Children Hospital, Khulna-9000', 
    addressBn: '৬৫৪ শিশু হাসপাতাল, খুলনা-৯০০০',
    isActive: true 
  },
  { 
    id: 6, 
    doctorId: 6,
    doctorName: 'Dr. Ayesha Begum', 
    doctorNameBn: 'ডা. আয়েশা বেগম', 
    chamberName: 'Gynecology Clinic', 
    chamberNameBn: 'গাইনোকোলজি ক্লিনিক',
    address: '987 Women Hospital Road, Barisal-8200', 
    addressBn: '৯৮৭ মহিলা হাসপাতাল রোড, বরিশাল-৮২০০',
    isActive: false 
  },
  { 
    id: 7, 
    doctorId: 7,
    doctorName: 'Dr. Hassan Ali', 
    doctorNameBn: 'ডা. হাসান আলী', 
    chamberName: 'Emergency Care', 
    chamberNameBn: 'জরুরি চিকিৎসা',
    address: '147 Emergency Lane, Rangpur-5400', 
    addressBn: '১৪৭ জরুরি লেন, রংপুর-৫৪০০',
    isActive: true 
  },
  { 
    id: 8, 
    doctorId: 8,
    doctorName: 'Dr. Nadia Islam', 
    doctorNameBn: 'ডা. নাদিয়া ইসলাম', 
    chamberName: 'Dermatology Center', 
    chamberNameBn: 'চর্মরোগ কেন্দ্র',
    address: '258 Skin Care Street, Comilla-3500', 
    addressBn: '২৫৮ স্কিন কেয়ার স্ট্রিট, কুমিল্লা-৩৫০০',
    isActive: true 
  },
]

export default function ChamberPage() {
  const { t, formatNumber, language } = useLanguage()
  const router = useRouter()
  const { showToast } = useLocalizedToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [chambers, setChambers] = useState(demoChambers)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newChamberForm, setNewChamberForm] = useState({
    doctorId: '',
    chamberName: '',
    address: ''
  })
  const [formErrors, setFormErrors] = useState<{doctorId?: string; chamberName?: string; address?: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const itemsPerPage = 5

  const validateAddChamberForm = () => {
    const newErrors: {doctorId?: string; chamberName?: string; address?: string} = {}

    if (!newChamberForm.doctorId) {
      newErrors.doctorId = t('chamber.doctorRequired')
    }

    if (!newChamberForm.chamberName.trim()) {
      newErrors.chamberName = t('chamber.chamberNameRequired')
    }

    if (!newChamberForm.address.trim()) {
      newErrors.address = t('chamber.addressRequired')
    }

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddChamber = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAddChamberForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const selectedDoctorData = demoDoctors.find(doctor => doctor.id.toString() === newChamberForm.doctorId)
      
      const newChamber = {
        id: Math.max(...chambers.map(c => c.id)) + 1,
        doctorId: parseInt(newChamberForm.doctorId),
        doctorName: selectedDoctorData?.name || '',
        doctorNameBn: selectedDoctorData?.nameBn || '',
        chamberName: newChamberForm.chamberName,
        chamberNameBn: newChamberForm.chamberName, // In real app, you might want separate Bengali name field
        address: newChamberForm.address,
        addressBn: newChamberForm.address, // In real app, you might want separate Bengali address field
        isActive: true
      }

      setChambers(prevChambers => [newChamber, ...prevChambers])
      setIsAddModalOpen(false)
      setNewChamberForm({ doctorId: '', chamberName: '', address: '' })
      setFormErrors({})
      setIsSubmitting(false)

      showToast.success(t('chamber.chamberAdded'), t('chamber.chamberAddedDesc'))
    }, 1000)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setNewChamberForm({ doctorId: '', chamberName: '', address: '' })
    setFormErrors({})
    setIsSubmitting(false)
  }

  const handleModalInputChange = (field: 'doctorId' | 'chamberName' | 'address') => (e: React.ChangeEvent<HTMLInputElement> | string) => {
    let value: string
    if (typeof e === 'string') {
      value = e // For Select component
    } else {
      value = e.target.value // For Input component
    }
    
    setNewChamberForm(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleStatusToggle = (chamberId: number) => {
    setChambers(prevChambers => 
      prevChambers.map(chamber => 
        chamber.id === chamberId 
          ? { ...chamber, isActive: !chamber.isActive }
          : chamber
      )
    )
  }

  const handleEdit = (chamberId: number) => {
    // This will be implemented later
    showToast.info('Edit functionality', 'Edit functionality will be implemented soon')
    // TODO: Implement edit functionality using chamberId
    console.log('Edit chamber:', chamberId)
  }

  const handleSearch = () => {
    // Since we're filtering in real-time, this button can be used for additional search actions if needed
    // For now, it's just a visual element as requested
  }

  const handleResetSearch = () => {
    setSearchQuery('')
    setSelectedDoctor(undefined)
    setCurrentPage(1)
  }

  // Filter chambers based on search query and selected doctor
  const filteredChambers = useMemo(() => {
    let filtered = chambers

    // Filter by doctor if selected
    if (selectedDoctor) {
      filtered = filtered.filter(chamber => chamber.doctorId.toString() === selectedDoctor)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(chamber => {
        const doctorName = language === 'bn' ? chamber.doctorNameBn : chamber.doctorName
        const chamberName = language === 'bn' ? chamber.chamberNameBn : chamber.chamberName
        const address = language === 'bn' ? chamber.addressBn : chamber.address
        
        return doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               chamberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               address.toLowerCase().includes(searchQuery.toLowerCase())
      })
    }

    return filtered
  }, [chambers, searchQuery, selectedDoctor, language])

  // Pagination logic
  const totalPages = Math.ceil(filteredChambers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentChambers = filteredChambers.slice(startIndex, endIndex)

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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{t('chamber.title')}</h2>
                <p className="text-gray-600 mt-1 sm:mt-2 text-base sm:text-lg">{t('chamber.subtitle')}</p>
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="lg:self-start w-auto max-w-fit mx-auto lg:mx-0"
              >
                <MdMeetingRoom className="w-4 h-4 mr-2" />
                {t('chamber.addChamber')}
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
                  <Label htmlFor="search" className="text-sm sm:text-base">{t('chamber.search')}</Label>
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('chamber.searchPlaceholder')}
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
                      <TableHead className="w-[200px] sm:w-[250px] h-10 px-3">{t('chamber.doctorName')}</TableHead>
                      <TableHead className="w-[200px] sm:w-[250px] h-10 px-3">{t('chamber.chamberName')}</TableHead>
                      <TableHead className="w-[250px] sm:w-[300px] h-10 px-3">{t('chamber.address')}</TableHead>
                      <TableHead className="w-[100px] text-center h-10 px-3">{t('chamber.actions')}</TableHead>
                      <TableHead className="w-[120px] text-center h-10 px-3">{t('chamber.status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentChambers.length > 0 ? (
                      currentChambers.map((chamber) => (
                        <TableRow key={chamber.id}>
                          <TableCell className="font-medium px-3 py-4">
                            {language === 'bn' ? chamber.doctorNameBn : chamber.doctorName}
                          </TableCell>
                          <TableCell className="px-3 py-4">
                            {language === 'bn' ? chamber.chamberNameBn : chamber.chamberName}
                          </TableCell>
                          <TableCell className="px-3 py-4">
                            {language === 'bn' ? chamber.addressBn : chamber.address}
                          </TableCell>
                          <TableCell className="text-center px-3 py-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(chamber.id)}
                              className="h-8"
                            >
                              <MdEdit className="w-4 h-4 mr-1" />
                              {t('chamber.edit')}
                            </Button>
                          </TableCell>
                          <TableCell className="text-center px-3 py-4">
                            <div className="flex items-center justify-center space-x-2">
                              <Switch
                                checked={chamber.isActive}
                                onCheckedChange={() => handleStatusToggle(chamber.id)}
                              />
                              <span className="text-sm text-gray-600">
                                {chamber.isActive ? t('chamber.active') : t('chamber.inactive')}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 px-3 text-gray-500">
                          {t('chamber.noChambers')}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredChambers.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 p-3 border-t bg-gray-100 rounded-b-xl">
                  <div className="text-sm text-gray-700">
                    {t('chamber.showing')} {formatNumber(startIndex + 1)} {t('chamber.to')} {formatNumber(Math.min(endIndex, filteredChambers.length))} {t('chamber.of')} {formatNumber(filteredChambers.length)} {t('chamber.results')}
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
                      {t('chamber.previous')}
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
                      {t('chamber.next')}
                      <MdChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add Chamber Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen} disableOutsideClick={true}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{t('chamber.addNewChamber')}</DialogTitle>
            <DialogDescription>
              {t('chamber.addNewChamberDesc')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddChamber} className="space-y-4" autoComplete="off">
            {/* Doctor Name Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="doctorName" className="text-sm font-medium">
                {t('chamber.doctorName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newChamberForm.doctorId} 
                  onValueChange={handleModalInputChange('doctorId')}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.doctorId ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={t('chamber.selectDoctor')} />
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

            {/* Chamber Name Field */}
            <div className="space-y-2">
              <Label htmlFor="chamberName" className="text-sm font-medium">
                {t('chamber.chamberName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiBuildings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="chamberName"
                  type="text"
                  value={newChamberForm.chamberName}
                  onChange={handleModalInputChange('chamberName')}
                  placeholder={t('chamber.chamberNamePlaceholder')}
                  className={`pl-10 ${formErrors.chamberName ? 'border-red-500 focus:border-red-500' : ''}`}
                  disabled={isSubmitting}
                  autoComplete="off"
                />
              </div>
              {formErrors.chamberName && (
                <p className="text-sm text-red-600">{formErrors.chamberName}</p>
              )}
            </div>

            {/* Address Field */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">
                {t('chamber.address')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="address"
                  type="text"
                  value={newChamberForm.address}
                  onChange={handleModalInputChange('address')}
                  placeholder={t('chamber.addressPlaceholder')}
                  className={`pl-10 ${formErrors.address ? 'border-red-500 focus:border-red-500' : ''}`}
                  disabled={isSubmitting}
                  autoComplete="off"
                />
              </div>
              {formErrors.address && (
                <p className="text-sm text-red-600">{formErrors.address}</p>
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
