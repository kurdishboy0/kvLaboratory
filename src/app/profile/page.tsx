'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useTranslation } from '@/lib/i18n'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const router = useRouter()
  const { t } = useTranslation()
  
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      setName(user.name)
      setPassword(user.password)
    }
  }, [user, router])

  if (!user) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({ name, password })
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Profile</h1>
          
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && (
                <div className="p-4 rounded-md bg-green-50 text-green-700 text-sm">
                  Profile updated successfully!
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full rounded-md border-gray-300 bg-gray-100 shadow-sm px-4 py-2 opacity-70 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={4}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <Button type="submit" className="w-full" variant="primary">
                Save Changes
              </Button>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

