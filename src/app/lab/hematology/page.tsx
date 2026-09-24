'use client'

import React, { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { Equipment } from '@/types'

export default function HematologyLabPage() {
  const { t, locale } = useTranslation()
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)

  const experiments = [
    {
      id: 'blood-typing',
      nameKey: 'experiments.bloodTyping.name',
      descriptionKey: 'experiments.bloodTyping.description',
      href: '/lab/hematology/blood-typing',
      active: true,
    },
  ]

  const labEquipment: Equipment[] = [
    {
      id: 'microscope',
      name: { en: 'Microscope', ku: 'مایکرۆسکۆپ', ar: 'مجهر' },
      function: { en: 'Examines blood smears for cell morphology.', ku: 'پشکنینی نموونەی خوێن بۆ شێوەی خانەکان.', ar: 'يفحص مسحات الدم لتشكيل الخلايا.' },
      example: { en: 'Observing red blood cells, white blood cells, and platelets.', ku: 'بینینی خڕۆکە سوورەکان، خڕۆکە سپییەکان و پەڕەکانی خوێن.', ar: 'مراقبة خلايا الدم الحمراء وخلايا الدم البيضاء والصفائح الدموية.' },
      icon: 'ðŸ”¬',
      category: 'instrument',
    },
    {
      id: 'centrifuge',
      name: { en: 'Centrifuge', ku: 'سەنتریفیوج', ar: 'جهاز طرد مركزي' },
      function: { en: 'Spins blood tubes to separate plasma from cells.', ku: 'خولانەوەی بۆریەکانی خوێن بۆ جیاکردنەوەی پلازما لە خانەکان.', ar: 'يدور أنابيب الدم لفصل البلازما عن الخلايا.' },
      example: { en: 'Measuring hematocrit levels.', ku: 'پێوانەکردنی ئاستی هیماتۆکریت.', ar: 'قياس مستويات الهيماتوكريت.' },
      icon: 'âš—ï¸ ',
      category: 'instrument',
    },
    {
      id: 'slides',
      name: { en: 'Glass Slides', ku: 'سلایدی شووشە', ar: 'شرائح زجاجية' },
      function: { en: 'Holds blood samples for testing and observation.', ku: 'هەڵگرتنی نموونەی خوێن بۆ پشکنین و تاقیکردنەوە.', ar: 'يحمل عينات الدم للاختبار والمراقبة.' },
      example: { en: 'Performing blood typing agglutination tests.', ku: 'ئەنجامدانی پشکنینی دیاریکردنی جۆری خوێن.', ar: 'إجراء اختبارات تراص فصائل الدم.' },
      icon: 'ðŸ“Ž',
      category: 'consumable',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-100 text-4xl shadow-sm">
              ðŸ©¸
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {t('labs.hematology.name')}
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              {t('labs.hematology.description')}
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              
              <section>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  {t('dashboard.availableExperiments')}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {experiments.map((exp) => (
                    <Card key={exp.id} className="p-6 transition-shadow hover:shadow-md border border-gray-200">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="inline-flex items-center rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-800">
                          {exp.active ? t('labs.active') : t('labs.comingSoon')}
                        </span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold text-gray-900">{t(exp.nameKey)}</h3>
                      <p className="mb-6 text-gray-600 line-clamp-2">{t(exp.descriptionKey)}</p>
                      
                      {exp.active ? (
                        <Link href={exp.href}>
                          <Button variant="primary" className="w-full bg-teal-600 hover:bg-teal-700">
                            {t('dashboard.startExperiment')}
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="secondary" disabled className="w-full">
                          {t('labs.comingSoon')}
                        </Button>
                      )}
                    </Card>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  {t('lab.equipment.title')}
                </h2>
                <p className="mb-6 text-gray-600">
                  {t('lab.equipment.instruction')}
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {labEquipment.map((eq) => (
                    <button
                      key={eq.id}
                      onClick={() => setSelectedEquipment(eq)}
                      className={`flex flex-col items-center rounded-xl border-2 p-4 text-center transition-all ${
                        selectedEquipment?.id === eq.id
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/50'
                      }`}
                    >
                      <span className="mb-3 text-4xl">{eq.icon}</span>
                      <span className="font-semibold text-gray-900">{eq.name[locale]}</span>
                    </button>
                  ))}
                </div>
              </section>

            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="p-6 border border-gray-200 bg-white shadow-sm">
                  {selectedEquipment ? (
                    <div>
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-teal-100 text-3xl">
                          {selectedEquipment.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{selectedEquipment.name[locale]}</h3>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600">
                            {t('lab.equipment.function')}
                          </h4>
                          <p className="mt-1 text-gray-700">{selectedEquipment.function[locale]}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600">
                            {t('lab.equipment.example')}
                          </h4>
                          <p className="mt-1 text-gray-700 italic">{selectedEquipment.example[locale]}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-64 flex-col items-center justify-center text-center text-gray-400">
                      <span className="mb-4 text-5xl">âš—ï¸ </span>
                      <p>Select an equipment to see details</p>
                    </div>
                  )}
                </Card>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
