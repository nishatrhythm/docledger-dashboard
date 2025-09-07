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
import { validateBangladeshiMobile, validatePassword, formatMobileNumber } from '@/lib/validation'
import { 
  MdSearch,
  MdMenu,
  MdEdit,
  MdChevronLeft,
  MdChevronRight,
  MdPersonAdd
} from 'react-icons/md'
import { BiLock, BiPhone, BiUser, BiBuildings } from 'react-icons/bi'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

// Demo data for admin users (for dropdown)
const demoAdmins = [
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
    adminId: 1,
    name: 'Cardiology Chamber', 
    nameBn: 'হৃদরোগ চেম্বার',
  },
  { 
    id: 2, 
    adminId: 2,
    name: 'Neurology Center', 
    nameBn: 'স্নায়ুরোগ কেন্দ্র',
  },
  { 
    id: 3, 
    adminId: 3,
    name: 'Orthopedic Clinic', 
    nameBn: 'অর্থোপেডিক ক্লিনিক',
  },
  { 
    id: 4, 
    adminId: 4,
    name: 'General Medicine', 
    nameBn: 'সাধারণ চিকিৎসা',
  },
  { 
    id: 5, 
    adminId: 5,
    name: 'Pediatric Care', 
    nameBn: 'শিশু চিকিৎসা',
  },
  { 
    id: 6, 
    adminId: 6,
    name: 'Gynecology Clinic', 
    nameBn: 'গাইনোকোলজি ক্লিনিক',
  },
  { 
    id: 7, 
    adminId: 7,
    name: 'Emergency Care', 
    nameBn: 'জরুরি চিকিৎসা',
  },
  { 
    id: 8, 
    adminId: 8,
    name: 'Dermatology Center', 
    nameBn: 'চর্মরোগ কেন্দ্র',
  },
]

// Demo data for users
const demoUsers = [
  { 
    id: 1, 
    adminId: 1,
    adminName: 'Dr. Ahmed Rahman', 
    adminNameBn: 'ডা. আহমেদ রহমান',
    chamberId: 1,
    chamberName: 'Cardiology Chamber',
    chamberNameBn: 'হৃদরোগ চেম্বার',
    name: 'John Smith', 
    nameBn: 'জন স্মিথ',
    phone: '01712345678', 
    isActive: true 
  },
  { 
    id: 2, 
    adminId: 2,
    adminName: 'Dr. Sarah Khan', 
    adminNameBn: 'ডা. সারাহ খান',
    chamberId: 2,
    chamberName: 'Neurology Center',
    chamberNameBn: 'স্নায়ুরোগ কেন্দ্র',
    name: 'Alice Johnson', 
    nameBn: 'অ্যালিস জনসন',
    phone: '01823456789', 
    isActive: true 
  },
  { 
    id: 3, 
    adminId: 3,
    adminName: 'Dr. Mohammad Ali', 
    adminNameBn: 'ডা. মোহাম্মদ আলী',
    chamberId: 3,
    chamberName: 'Orthopedic Clinic',
    chamberNameBn: 'অর্থোপেডিক ক্লিনিক',
    name: 'Michael Brown', 
    nameBn: 'মাইকেল ব্রাউন',
    phone: '01934567890', 
    isActive: false 
  },
  { 
    id: 4, 
    adminId: 4,
    adminName: 'Dr. Fatima Sheikh', 
    adminNameBn: 'ডা. ফাতিমা শেখ',
    chamberId: 4,
    chamberName: 'General Medicine',
    chamberNameBn: 'সাধারণ চিকিৎসা',
    name: 'Emily Davis', 
    nameBn: 'এমিলি ডেভিস',
    phone: '01645678901', 
    isActive: true 
  },
  { 
    id: 5, 
    adminId: 5,
    adminName: 'Dr. Rahman Khan', 
    adminNameBn: 'ডা. রহমান খান',
    chamberId: 5,
    chamberName: 'Pediatric Care',
    chamberNameBn: 'শিশু চিকিৎসা',
    name: 'David Wilson', 
    nameBn: 'ডেভিড উইলসন',
    phone: '01756789012', 
    isActive: true 
  },
  { 
    id: 6, 
    adminId: 6,
    adminName: 'Dr. Ayesha Begum', 
    adminNameBn: 'ডা. আয়েশা বেগম',
    chamberId: 6,
    chamberName: 'Gynecology Clinic',
    chamberNameBn: 'গাইনোকোলজি ক্লিনিক',
    name: 'Sarah Miller', 
    nameBn: 'সারাহ মিলার',
    phone: '01867890123', 
    isActive: false 
  },
  { 
    id: 7, 
    adminId: 7,
    adminName: 'Dr. Hassan Ali', 
    adminNameBn: 'ডা. হাসান আলী',
    chamberId: 7,
    chamberName: 'Emergency Care',
    chamberNameBn: 'জরুরি চিকিৎসা',
    name: 'James Taylor', 
    nameBn: 'জেমস টেইলর',
    phone: '01978901234', 
    isActive: true 
  },
  { 
    id: 8, 
    adminId: 8,
    adminName: 'Dr. Nadia Islam', 
    adminNameBn: 'ডা. নাদিয়া ইসলাম',
    chamberId: 8,
    chamberName: 'Dermatology Center',
    chamberNameBn: 'চর্মরোগ কেন্দ্র',
    name: 'Lisa Anderson', 
    nameBn: 'লিসা অ্যান্ডারসন',
    phone: '01589012345', 
    isActive: true 
  },
  { 
    id: 9, 
    adminId: 1,
    adminName: 'Dr. Ahmed Rahman', 
    adminNameBn: 'ডা. আহমেদ রহমান',
    chamberId: 1,
    chamberName: 'Cardiology Chamber',
    chamberNameBn: 'হৃদরোগ চেম্বার',
    name: 'Robert Lee', 
    nameBn: 'রবার্ট লি',
    phone: '01690123456', 
    isActive: false 
  },
  { 
    id: 10, 
    adminId: 2,
    adminName: 'Dr. Sarah Khan', 
    adminNameBn: 'ডা. সারাহ খান',
    chamberId: 2,
    chamberName: 'Neurology Center',
    chamberNameBn: 'স্নায়ুরোগ কেন্দ্র',
    name: 'Jennifer White', 
    nameBn: 'জেনিফার হোয়াইট',
    phone: '01701234567', 
    isActive: true 
  },
]

export default function UserPage() {
  const { t, formatNumber, language } = useLanguage()
  const router = useRouter()
  const { showToast } = useLocalizedToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAdmin, setSelectedAdmin] = useState<string | undefined>()
  const [selectedChamber, setSelectedChamber] = useState<string | undefined>()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [users, setUsers] = useState(demoUsers)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newUserForm, setNewUserForm] = useState({
    adminId: '',
    chamberId: '',
    name: '',
    phone: '',
    password: ''
  })
  const [formErrors, setFormErrors] = useState<{adminId?: string; chamberId?: string; name?: string; phone?: string; password?: string}>({})
  const [showPassword, setShowPassword] = useState(false)
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

  const validateAddUserForm = () => {
    const newErrors: {adminId?: string; chamberId?: string; name?: string; phone?: string; password?: string} = {}

    if (!newUserForm.adminId) {
      newErrors.adminId = t('user.adminRequired')
    }

    if (!newUserForm.chamberId) {
      newErrors.chamberId = t('user.chamberRequired')
    }

    if (!newUserForm.name.trim()) {
      newErrors.name = t('validation.nameRequired')
    }

    const phoneValidation = validateBangladeshiMobile(newUserForm.phone, t)
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error || t('validation.phoneRequired')
    }

    const passwordValidation = validatePassword(newUserForm.password, t)
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error || t('validation.passwordRequired')
    }

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateAddUserForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const selectedAdminData = demoAdmins.find(admin => admin.id.toString() === newUserForm.adminId)
      const selectedChamberData = demoChambers.find(chamber => chamber.id.toString() === newUserForm.chamberId)
      
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        adminId: parseInt(newUserForm.adminId),
        adminName: selectedAdminData?.name || '',
        adminNameBn: selectedAdminData?.nameBn || '',
        chamberId: parseInt(newUserForm.chamberId),
        chamberName: selectedChamberData?.name || '',
        chamberNameBn: selectedChamberData?.nameBn || '',
        name: newUserForm.name,
        nameBn: newUserForm.name, // In real app, you might want separate Bengali name field
        phone: newUserForm.phone,
        isActive: true
      }

      setUsers(prevUsers => [newUser, ...prevUsers])
      setIsAddModalOpen(false)
      setNewUserForm({ adminId: '', chamberId: '', name: '', phone: '', password: '' })
      setFormErrors({})
      setShowPassword(false)
      setIsSubmitting(false)

      showToast.success(t('user.userAdded'), t('user.userAddedDesc'))
    }, 1000)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setNewUserForm({ adminId: '', chamberId: '', name: '', phone: '', password: '' })
    setFormErrors({})
    setShowPassword(false)
    setIsSubmitting(false)
  }

  const handleModalInputChange = (field: 'adminId' | 'chamberId' | 'name' | 'phone' | 'password') => (e: React.ChangeEvent<HTMLInputElement> | string) => {
    let value: string
    if (typeof e === 'string') {
      value = e // For Select component
    } else {
      value = e.target.value // For Input component
    }
    
    // Format phone number as user types (exactly like login form)
    if (field === 'phone' && typeof e !== 'string') {
      value = formatMobileNumber(value)
    }
    
    setNewUserForm(prev => {
      const newForm = { ...prev, [field]: value }
      
      // Reset chamber selection when admin changes
      if (field === 'adminId') {
        newForm.chamberId = ''
      }
      
      return newForm
    })
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleStatusToggle = (userId: number) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, isActive: !user.isActive }
          : user
      )
    )
  }

  const handleEdit = (userId: number) => {
    // This will be implemented later
    showToast.info('Edit functionality', 'Edit functionality will be implemented soon')
    // TODO: Implement edit functionality using userId
    console.log('Edit user:', userId)
  }

  const handleSearch = () => {
    // Since we're filtering in real-time, this button can be used for additional search actions if needed
    // For now, it's just a visual element as requested
  }

  const handleResetSearch = () => {
    setSearchQuery('')
    setSelectedAdmin(undefined)
    setSelectedChamber(undefined)
    setCurrentPage(1)
  }

  // Get available chambers based on selected admin
  const availableChambers = useMemo(() => {
    if (!newUserForm.adminId) return []
    return demoChambers.filter(chamber => chamber.adminId.toString() === newUserForm.adminId)
  }, [newUserForm.adminId])

  // Get chambers for filter dropdown based on selected admin
  const filterChambers = useMemo(() => {
    if (!selectedAdmin) return demoChambers
    return demoChambers.filter(chamber => chamber.adminId.toString() === selectedAdmin)
  }, [selectedAdmin])

  // Filter users based on search query, selected admin, and selected chamber
  const filteredUsers = useMemo(() => {
    let filtered = users

    // Filter by admin if selected
    if (selectedAdmin) {
      filtered = filtered.filter(user => user.adminId.toString() === selectedAdmin)
    }

    // Filter by chamber if selected
    if (selectedChamber) {
      filtered = filtered.filter(user => user.chamberId.toString() === selectedChamber)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(user => {
        const adminName = language === 'bn' ? user.adminNameBn : user.adminName
        const chamberName = language === 'bn' ? user.chamberNameBn : user.chamberName
        const userName = language === 'bn' ? user.nameBn : user.name
        
        return adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               chamberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
               user.phone.includes(searchQuery)
      })
    }

    return filtered
  }, [users, searchQuery, selectedAdmin, selectedChamber, language])

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentUsers = filteredUsers.slice(startIndex, endIndex)

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
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{t('user.title')}</h2>
                <p className="text-gray-600 mt-1 sm:mt-2 text-base sm:text-lg">{t('user.subtitle')}</p>
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="lg:self-start w-auto max-w-fit mx-auto lg:mx-0"
              >
                <MdPersonAdd className="w-4 h-4 mr-2" />
                {t('user.addUser')}
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
                {/* Admin Filter */}
                <div className="w-full sm:w-1/4 space-y-1">
                  <Label htmlFor="admin-filter" className="text-sm sm:text-base">{t('dashboard.filterByAdmin')}</Label>
                  <Select value={selectedAdmin} onValueChange={(value) => {
                    setSelectedAdmin(value)
                    setSelectedChamber(undefined) // Reset chamber when admin changes
                  }}>
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue placeholder={t('dashboard.allAdmins')} />
                    </SelectTrigger>
                    <SelectContent>
                      {demoAdmins.map((admin) => (
                        <SelectItem key={admin.id} value={admin.id.toString()}>
                          {language === 'bn' ? admin.nameBn : admin.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Chamber Filter */}
                <div className="w-full sm:w-1/4 space-y-1">
                  <Label htmlFor="chamber-filter" className="text-sm sm:text-base">{t('user.filterByChamber')}</Label>
                  <Select value={selectedChamber} onValueChange={setSelectedChamber} disabled={!selectedAdmin}>
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue placeholder={selectedAdmin ? t('user.allChambers') : t('user.selectAdminFirst')} />
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
                  <Label htmlFor="search" className="text-sm sm:text-base">{t('user.search')}</Label>
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('user.searchPlaceholder')}
                      className="pl-10 h-10 sm:h-11"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="w-full sm:w-auto">
                  <Button 
                    onClick={handleSearch}
                    disabled={!searchQuery.trim() && !selectedAdmin && !selectedChamber}
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
                      <TableHead className="w-[180px] sm:w-[200px] h-10 px-3">{t('user.adminName')}</TableHead>
                      <TableHead className="w-[180px] sm:w-[200px] h-10 px-3">{t('user.chamberName')}</TableHead>
                      <TableHead className="w-[180px] sm:w-[200px] h-10 px-3">{t('user.userName')}</TableHead>
                      <TableHead className="w-[150px] h-10 px-3">{t('user.phoneNumber')}</TableHead>
                      <TableHead className="w-[100px] text-center h-10 px-3">{t('user.actions')}</TableHead>
                      <TableHead className="w-[120px] text-center h-10 px-3">{t('user.status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentUsers.length > 0 ? (
                      currentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium px-3 py-4">
                            {language === 'bn' ? user.adminNameBn : user.adminName}
                          </TableCell>
                          <TableCell className="px-3 py-4">
                            {language === 'bn' ? user.chamberNameBn : user.chamberName}
                          </TableCell>
                          <TableCell className="px-3 py-4">
                            {language === 'bn' ? user.nameBn : user.name}
                          </TableCell>
                          <TableCell className="px-3 py-4">{user.phone}</TableCell>
                          <TableCell className="text-center px-3 py-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(user.id)}
                              className="h-8"
                            >
                              <MdEdit className="w-4 h-4 mr-1" />
                              {t('user.edit')}
                            </Button>
                          </TableCell>
                          <TableCell className="text-center px-3 py-4">
                            <div className="flex items-center justify-center space-x-2">
                              <Switch
                                checked={user.isActive}
                                onCheckedChange={() => handleStatusToggle(user.id)}
                              />
                              <span className="text-sm text-gray-600">
                                {user.isActive ? t('user.active') : t('user.inactive')}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 px-3 text-gray-500">
                          {t('user.noUsers')}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredUsers.length > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 p-3 border-t bg-gray-100 rounded-b-xl">
                  <div className="text-sm text-gray-700">
                    {t('user.showing')} {formatNumber(startIndex + 1)} {t('user.to')} {formatNumber(Math.min(endIndex, filteredUsers.length))} {t('user.of')} {formatNumber(filteredUsers.length)} {t('user.results')}
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
                      {t('user.previous')}
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
                      {t('user.next')}
                      <MdChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add User Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen} disableOutsideClick={true}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{t('user.addNewUser')}</DialogTitle>
            <DialogDescription>
              {t('user.addNewUserDesc')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddUser} className="space-y-4" autoComplete="off">
            {/* Admin Name Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="adminName" className="text-sm font-medium">
                {t('user.adminName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newUserForm.adminId} 
                  onValueChange={handleModalInputChange('adminId')}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.adminId ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={t('user.selectAdmin')} />
                  </SelectTrigger>
                  <SelectContent>
                    {demoAdmins.map((admin) => (
                      <SelectItem key={admin.id} value={admin.id.toString()}>
                        {language === 'bn' ? admin.nameBn : admin.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formErrors.adminId && (
                <p className="text-sm text-red-600">{formErrors.adminId}</p>
              )}
            </div>

            {/* Chamber Name Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="chamberName" className="text-sm font-medium">
                {t('user.chamberName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiBuildings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                <Select 
                  value={newUserForm.chamberId} 
                  onValueChange={handleModalInputChange('chamberId')}
                  disabled={isSubmitting || !newUserForm.adminId}
                >
                  <SelectTrigger className={`pl-10 ${formErrors.chamberId ? 'border-red-500 focus:border-red-500' : ''}`}>
                    <SelectValue placeholder={newUserForm.adminId ? t('user.selectChamber') : t('user.selectAdminFirst')} />
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

            {/* User Name Field */}
            <div className="space-y-2">
              <Label htmlFor="userName" className="text-sm font-medium">
                {t('user.userName')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="userName"
                  type="text"
                  value={newUserForm.name}
                  onChange={handleModalInputChange('name')}
                  placeholder={t('user.userNamePlaceholder')}
                  className={`pl-10 ${formErrors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                  disabled={isSubmitting}
                  autoComplete="off"
                />
              </div>
              {formErrors.name && (
                <p className="text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="userPhone" className="text-sm font-medium">
                {t('user.phoneNumber')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="userPhone"
                  type="tel"
                  value={newUserForm.phone}
                  onChange={handleModalInputChange('phone')}
                  placeholder={t('auth.phonePlaceholder')}
                  className={`pl-10 ${formErrors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                  disabled={isSubmitting}
                  maxLength={11}
                  autoComplete="off"
                />
              </div>
              {formErrors.phone && (
                <p className="text-sm text-red-600">{formErrors.phone}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="userPassword" className="text-sm font-medium">
                {t('auth.password')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <BiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="userPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={newUserForm.password}
                  onChange={handleModalInputChange('password')}
                  placeholder={t('auth.passwordPlaceholder')}
                  className={`pl-10 pr-10 ${formErrors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                  disabled={isSubmitting}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="w-4 h-4" />
                  ) : (
                    <AiOutlineEye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-sm text-red-600">{formErrors.password}</p>
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
