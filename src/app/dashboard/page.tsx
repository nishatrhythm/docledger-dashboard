'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import Sidebar from '@/components/ui/Sidebar'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Dashboard() {
  const { t } = useLanguage()
  
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
              <h1 className="text-xl font-semibold text-gray-900">{t('dashboard.title')}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{t('dashboard.welcome')}</span>
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
            <h2 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h2>
            <p className="text-gray-600 mt-2">{t('dashboard.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>{t('dashboard.documents')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t('dashboard.documentsDesc')}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>{t('dashboard.reports')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t('dashboard.reportsDesc')}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>{t('dashboard.settings')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t('dashboard.settingsDesc')}</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
