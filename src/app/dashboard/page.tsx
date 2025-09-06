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
  MdAccountBalanceWallet
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
  { id: 1, name: 'Chamber 1 - Cardiology' },
  { id: 2, name: 'Chamber 2 - Neurology' },
  { id: 3, name: 'Chamber 3 - Orthopedics' },
  { id: 4, name: 'Chamber 4 - General Medicine' },
]

const demoAdmins = [
  { id: 1, name: 'Dr. Ahmed Rahman' },
  { id: 2, name: 'Dr. Sarah Khan' },
  { id: 3, name: 'Dr. Mohammad Ali' },
  { id: 4, name: 'Dr. Fatima Sheikh' },
]

export default function Dashboard() {
  const { t } = useLanguage()
  const [selectedChamber, setSelectedChamber] = useState<string | undefined>()
  const [selectedAdmin, setSelectedAdmin] = useState<string | undefined>()
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount).replace('BDT', '৳')
  }

  const statsCards = [
    {
      title: 'Total Admin',
      value: demoStats.totalAdmin,
      icon: MdAdminPanelSettings,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      format: 'number'
    },
    {
      title: 'Total User',
      value: demoStats.totalUser,
      icon: MdPeople,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      format: 'number'
    },
    {
      title: 'Total Chamber',
      value: demoStats.totalChamber,
      icon: MdMeetingRoom,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      format: 'number'
    },
    {
      title: 'Total Income',
      value: demoStats.totalIncome,
      icon: MdTrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      format: 'currency'
    },
    {
      title: 'Total Expense',
      value: demoStats.totalExpense,
      icon: MdTrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      format: 'currency'
    },
    {
      title: 'Net Income',
      value: demoStats.netIncome,
      icon: MdAccountBalance,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      format: 'currency'
    },
    {
      title: 'Deposit',
      value: demoStats.deposit,
      icon: MdSavings,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      format: 'currency'
    },
    {
      title: 'Cash In Hand',
      value: demoStats.cashInHand,
      icon: MdAccountBalanceWallet,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      format: 'currency'
    }
  ]
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-semibold text-gray-900">{t('dashboard.title')}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-base text-gray-600">{t('dashboard.welcome')}</span>
                <LanguageSwitcher size="sm" />
                <Button variant="outline" size="sm" className="cursor-pointer">
                  {t('dashboard.logout')}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900">{t('dashboard.title')}</h2>
            <p className="text-gray-600 mt-2 text-lg">{t('dashboard.subtitle')}</p>
          </div>

          {/* Filter Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Chamber Filter */}
                <div className="space-y-2">
                  <Label htmlFor="chamber-filter">Filter by Chamber</Label>
                  <Select value={selectedChamber} onValueChange={setSelectedChamber}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Chambers" />
                    </SelectTrigger>
                    <SelectContent>
                      {demoChambers.map((chamber) => (
                        <SelectItem key={chamber.id} value={chamber.id.toString()}>
                          {chamber.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Admin Filter */}
                <div className="space-y-2">
                  <Label htmlFor="admin-filter">Filter by Admin</Label>
                  <Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Admins" />
                    </SelectTrigger>
                    <SelectContent>
                      {demoAdmins.map((admin) => (
                        <SelectItem key={admin.id} value={admin.id.toString()}>
                          {admin.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Start Date Filter */}
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <DatePicker
                    date={startDate}
                    onDateChange={setStartDate}
                    placeholder="Select start date"
                  />
                </div>

                {/* End Date Filter */}
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <DatePicker
                    date={endDate}
                    onDateChange={setEndDate}
                    placeholder="Select end date"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedChamber(undefined)
                    setSelectedAdmin(undefined)
                    setStartDate(undefined)
                    setEndDate(undefined)
                  }}
                >
                  Reset Filters
                </Button>
                <Button>Apply Filters</Button>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stat.format === 'currency' 
                            ? formatCurrency(stat.value)
                            : stat.value.toLocaleString()
                          }
                        </p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.bgColor}`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
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
