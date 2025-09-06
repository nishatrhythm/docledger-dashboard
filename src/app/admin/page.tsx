'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import Sidebar from '@/components/ui/Sidebar'
import { useLanguage } from '@/contexts/LanguageContext'
import { useLocalizedToast } from '@/hooks/use-localized-toast'
import { 
  MdSearch,
  MdMenu,
  MdEdit,
  MdChevronLeft,
  MdChevronRight
} from 'react-icons/md'

// Demo data for admin users
const demoUsers = [
  { id: 1, name: 'Dr. Ahmed Rahman', nameBn: 'ডা. আহমেদ রহমান', phone: '01712345678', isActive: true },
  { id: 2, name: 'Dr. Sarah Khan', nameBn: 'ডা. সারাহ খান', phone: '01823456789', isActive: true },
  { id: 3, name: 'Dr. Mohammad Ali', nameBn: 'ডা. মোহাম্মদ আলী', phone: '01934567890', isActive: false },
  { id: 4, name: 'Dr. Fatima Sheikh', nameBn: 'ডা. ফাতিমা শেখ', phone: '01645678901', isActive: true },
  { id: 5, name: 'Dr. Rahman Khan', nameBn: 'ডা. রহমান খান', phone: '01756789012', isActive: true },
  { id: 6, name: 'Dr. Ayesha Begum', nameBn: 'ডা. আয়েশা বেগম', phone: '01867890123', isActive: false },
  { id: 7, name: 'Dr. Hassan Ali', nameBn: 'ডা. হাসান আলী', phone: '01978901234', isActive: true },
  { id: 8, name: 'Dr. Nadia Islam', nameBn: 'ডা. নাদিয়া ইসলাম', phone: '01589012345', isActive: true },
  { id: 9, name: 'Dr. Karim Ahmed', nameBn: 'ডা. করিম আহমেদ', phone: '01690123456', isActive: false },
  { id: 10, name: 'Dr. Rashida Khatun', nameBn: 'ডা. রশিদা খাতুন', phone: '01701234567', isActive: true },
  { id: 11, name: 'Dr. Mahmud Hassan', nameBn: 'ডা. মাহমুদ হাসান', phone: '01812345678', isActive: true },
  { id: 12, name: 'Dr. Sultana Rashid', nameBn: 'ডা. সুলতানা রশিদ', phone: '01923456789', isActive: false },
]

export default function AdminPage() {
  const { t, formatNumber, language } = useLanguage()
  const router = useRouter()
  const { showToast } = useLocalizedToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [users, setUsers] = useState(demoUsers)
  const itemsPerPage = 5

  const handleLogout = () => {
    // Show logout success toast
    showToast.success(t('toast.logoutSuccess'), t('toast.logoutSuccessDesc'))
    
    // Redirect to login page
    setTimeout(() => {
      router.push('/login')
    }, 1000) // Small delay to show the toast
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
  }

  const handleSearch = () => {
    // Since we're filtering in real-time, this button can be used for additional search actions if needed
    // For now, it's just a visual element as requested
  }

  const handleResetSearch = () => {
    setSearchQuery('')
    setCurrentPage(1)
  }

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users
    
    return users.filter(user => {
      const name = language === 'bn' ? user.nameBn : user.name
      return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             user.phone.includes(searchQuery)
    })
  }, [users, searchQuery, language])

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
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 flex items-center">{t('admin.title')}</h1>
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{t('admin.title')}</h2>
            <p className="text-gray-600 mt-1 sm:mt-2 text-base sm:text-lg">{t('admin.subtitle')}</p>
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
                {/* Search Field */}
                <div className="w-full sm:w-80 space-y-1">
                  <Label htmlFor="search" className="text-sm sm:text-base">{t('admin.search')}</Label>
                  <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('admin.searchPlaceholder')}
                      className="pl-10 h-10 sm:h-11"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="w-full sm:w-auto">
                  <Button 
                    onClick={handleSearch}
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
                      <TableHead className="w-[200px] sm:w-[250px] h-10 px-3">{t('admin.name')}</TableHead>
                      <TableHead className="w-[150px] h-10 px-3">{t('admin.phoneNumber')}</TableHead>
                      <TableHead className="w-[100px] text-center h-10 px-3">{t('admin.actions')}</TableHead>
                      <TableHead className="w-[120px] text-center h-10 px-3">{t('admin.status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentUsers.length > 0 ? (
                      currentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium px-3 py-4">
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
                              {t('admin.edit')}
                            </Button>
                          </TableCell>
                          <TableCell className="text-center px-3 py-4">
                            <div className="flex items-center justify-center space-x-2">
                              <Switch
                                checked={user.isActive}
                                onCheckedChange={() => handleStatusToggle(user.id)}
                              />
                              <span className="text-sm text-gray-600">
                                {user.isActive ? t('admin.active') : t('admin.inactive')}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 px-3 text-gray-500">
                          No users found
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
                    {t('admin.showing')} {formatNumber(startIndex + 1)} {t('admin.to')} {formatNumber(Math.min(endIndex, filteredUsers.length))} {t('admin.of')} {formatNumber(filteredUsers.length)} {t('admin.results')}
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
                      {t('admin.previous')}
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
                      {t('admin.next')}
                      <MdChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}