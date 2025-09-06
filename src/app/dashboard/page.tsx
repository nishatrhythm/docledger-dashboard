'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePicker } from '@/components/ui/date-picker'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import Sidebar from '@/components/ui/Sidebar'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  MdPeople, 
  MdAdminPanelSettings, 
  MdMeetingRoom, 
  MdTrendingUp, 
  MdTrendingDown, 
  MdAccountBalance,
  MdSavings,
  MdAccountBalanceWallet,
  MdMenu
} from 'react-icons/md'

// Demo data
const demoStats = {
  totalAdmin: 12,
  totalUser: 248,
  totalChamber: 8,
  totalIncome: 125000,
  totalExpense: 89000,
  netIncome: 36000,
  deposit: 450000,
  cashInHand: 75000
}

const demoChambers = [
  { id: 1, name: 'Chamber 1 - Cardiology', nameBn: 'চেম্বার ১ - হৃদরোগ বিশেষজ্ঞ' },
  { id: 2, name: 'Chamber 2 - Neurology', nameBn: 'চেম্বার ২ - স্নায়ুরোগ বিশেষজ্ঞ' },
  { id: 3, name: 'Chamber 3 - Orthopedics', nameBn: 'চেম্বার ৩ - হাড় ও জয়েন্ট বিশেষজ্ঞ' },
  { id: 4, name: 'Chamber 4 - General Medicine', nameBn: 'চেম্বার ৪ - সাধারণ চিকিৎসা' },
]

const demoAdmins = [
  { id: 1, name: 'Dr. Ahmed Rahman', nameBn: 'ডা. আহমেদ রহমান' },
  { id: 2, name: 'Dr. Sarah Khan', nameBn: 'ডা. সারাহ খান' },
  { id: 3, name: 'Dr. Mohammad Ali', nameBn: 'ডা. মোহাম্মদ আলী' },
  { id: 4, name: 'Dr. Fatima Sheikh', nameBn: 'ডা. ফাতিমা শেখ' },
]

export default function Dashboard() {
  const { t, formatNumber, formatCurrency, language } = useLanguage()
  const [selectedChamber, setSelectedChamber] = useState<string | undefined>()
  const [selectedAdmin, setSelectedAdmin] = useState<string | undefined>()
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const statsCards = [
    {
      title: t('dashboard.totalAdmin'),
      value: demoStats.totalAdmin,
      icon: MdAdminPanelSettings,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      format: 'number'
    },
    {
      title: t('dashboard.totalUser'),
      value: demoStats.totalUser,
      icon: MdPeople,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      format: 'number'
    },
    {
      title: t('dashboard.totalChamber'),
      value: demoStats.totalChamber,
      icon: MdMeetingRoom,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      format: 'number'
    },
    {
      title: t('dashboard.totalIncome'),
      value: demoStats.totalIncome,
      icon: MdTrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      format: 'currency'
    },
    {
      title: t('dashboard.totalExpense'),
      value: demoStats.totalExpense,
      icon: MdTrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      format: 'currency'
    },
    {
      title: t('dashboard.netIncome'),
      value: demoStats.netIncome,
      icon: MdAccountBalance,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      format: 'currency'
    },
    {
      title: t('dashboard.deposit'),
      value: demoStats.deposit,
      icon: MdSavings,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      format: 'currency'
    },
    {
      title: t('dashboard.cashInHand'),
      value: demoStats.cashInHand,
      icon: MdAccountBalanceWallet,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      format: 'currency'
    }
  ]
  
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
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 flex items-center">{t('dashboard.title')}</h1>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="hidden sm:inline text-sm lg:text-base text-gray-600">{t('dashboard.welcome')}</span>
                <LanguageSwitcher size="sm" />
                <Button variant="destructive" size="sm" className="cursor-pointer text-xs sm:text-sm bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:text-red-700">
                  {t('dashboard.logout')}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1">
          <div className="mb-6 lg:mb-8 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{t('dashboard.title')}</h2>
            <p className="text-gray-600 mt-1 sm:mt-2 text-base sm:text-lg">{t('dashboard.subtitle')}</p>
          </div>

          {/* Filter Section */}
          <Card className="mb-6 lg:mb-8">
            <CardHeader className="pb-0 sm:pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <CardTitle className="text-lg sm:text-xl">{t('dashboard.filters')}</CardTitle>
                <div className="hidden sm:flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedChamber(undefined)
                      setSelectedAdmin(undefined)
                      setStartDate(undefined)
                      setEndDate(undefined)
                    }}
                    className="text-sm sm:text-base h-9 sm:h-10"
                  >
                    {t('dashboard.resetFilters')}
                  </Button>
                  <Button className="text-sm sm:text-base h-9 sm:h-10">{t('dashboard.applyFilters')}</Button>
                </div>
              </div>
              
              {/* Mobile Chamber Filter - directly below header */}
              <div className="mt-0 sm:hidden">
                <div className="space-y-1">
                  <Label htmlFor="chamber-filter-mobile" className="text-sm">{t('dashboard.filterByChamber')}</Label>
                  <Select value={selectedChamber} onValueChange={setSelectedChamber}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder={t('dashboard.allChambers')} />
                    </SelectTrigger>
                    <SelectContent>
                      {demoChambers.map((chamber) => (
                        <SelectItem key={chamber.id} value={chamber.id.toString()}>
                          {language === 'bn' ? chamber.nameBn : chamber.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Chamber Filter - Hidden on mobile, shown on desktop */}
                <div className="space-y-1 hidden sm:block">
                  <Label htmlFor="chamber-filter" className="text-sm sm:text-base">{t('dashboard.filterByChamber')}</Label>
                  <Select value={selectedChamber} onValueChange={setSelectedChamber}>
                    <SelectTrigger className="h-10 sm:h-11">
                      <SelectValue placeholder={t('dashboard.allChambers')} />
                    </SelectTrigger>
                    <SelectContent>
                      {demoChambers.map((chamber) => (
                        <SelectItem key={chamber.id} value={chamber.id.toString()}>
                          {language === 'bn' ? chamber.nameBn : chamber.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Admin Filter */}
                <div className="space-y-1">
                  <Label htmlFor="admin-filter" className="text-sm sm:text-base">{t('dashboard.filterByAdmin')}</Label>
                  <Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
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

                {/* Start Date Filter */}
                <div className="space-y-1">
                  <Label className="text-sm sm:text-base">{t('dashboard.startDate')}</Label>
                  <DatePicker
                    date={startDate}
                    onDateChange={setStartDate}
                    placeholder={t('dashboard.selectStartDate')}
                    className="h-10 sm:h-11"
                  />
                </div>

                {/* End Date Filter */}
                <div className="space-y-1">
                  <Label className="text-sm sm:text-base">{t('dashboard.endDate')}</Label>
                  <DatePicker
                    date={endDate}
                    onDateChange={setEndDate}
                    placeholder={t('dashboard.selectEndDate')}
                    className="h-10 sm:h-11"
                  />
                </div>
              </div>

              {/* Mobile Filter Buttons */}
              <div className="mt-4 sm:hidden flex flex-col space-y-2">
                <Button className="text-sm h-9">{t('dashboard.applyFilters')}</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedChamber(undefined)
                    setSelectedAdmin(undefined)
                    setStartDate(undefined)
                    setEndDate(undefined)
                  }}
                  className="text-sm h-9"
                >
                  {t('dashboard.resetFilters')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">
                          {stat.title}
                        </p>
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 break-all">
                          {stat.format === 'currency' 
                            ? formatCurrency(stat.value)
                            : formatNumber(stat.value)
                          }
                        </p>
                      </div>
                      <div className={`p-2 sm:p-3 rounded-full ${stat.bgColor} flex-shrink-0 ml-3`}>
                        <Icon className={`w-4 h-4 sm:w-5 lg:w-6 sm:h-5 lg:h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
