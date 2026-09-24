'use client'

import { useTranslation } from '@/lib/i18n'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  const { t } = useTranslation()

  const features = [
    {
      icon: '🧪',
      title: t('home.features.virtualLabs.title'),
      description: t('home.features.virtualLabs.description'),
    },
    {
      icon: '🔬',
      title: t('home.features.realExperiments.title'),
      description: t('home.features.realExperiments.description'),
    },
    {
      icon: '📊',
      title: t('home.features.tracking.title'),
      description: t('home.features.tracking.description'),
    },
    {
      icon: '👨‍🏫',
      title: t('home.features.instructorTools.title'),
      description: t('home.features.instructorTools.description'),
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-blue-600 to-indigo-700">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 start-10 h-72 w-72 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-10 end-10 h-96 w-96 rounded-full bg-teal-300 blur-3xl" />
            <div className="absolute top-1/2 start-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
            <div className="text-center">
              {/* Lab icon */}
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-5xl backdrop-blur-sm">
                🧬
              </div>

              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t('home.title')}
              </h1>

              <p className="mx-auto mb-4 max-w-2xl text-xl text-teal-100 sm:text-2xl">
                {t('home.subtitle')}
              </p>

              <p className="mx-auto mb-10 max-w-3xl text-lg text-blue-100/80">
                {t('home.description')}
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/login">
                  <Button variant="primary" size="lg" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg shadow-blue-900/30 font-semibold px-8 py-3 text-lg">
                    {t('home.getStarted')}
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="secondary" size="lg" className="border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 text-lg bg-transparent">
                    {t('home.learnMore')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 start-0 end-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb" />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                {t('home.featuresTitle')}
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                {t('home.featuresSubtitle')}
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="group relative overflow-hidden border border-gray-100 p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-blue-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-100 to-blue-100 text-4xl transition-transform duration-300 group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-teal-600 to-blue-600 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white">
              {t('home.ctaTitle')}
            </h2>
            <p className="mb-8 text-lg text-teal-100">
              {t('home.ctaDescription')}
            </p>
            <Link href="/register">
              <Button variant="primary" size="lg" className="bg-white text-teal-700 hover:bg-teal-50 font-semibold px-10 py-3 text-lg shadow-lg">
                {t('home.createAccount')}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
