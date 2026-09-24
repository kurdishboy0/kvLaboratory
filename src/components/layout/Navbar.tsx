'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🔬</span>
              <span className="font-bold text-xl text-gray-900">{t('home.title') || 'Virtual Lab'}</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">{t('nav.home')}</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium">{t('nav.about')}</Link>
            <Link href="/laboratories" className="text-gray-600 hover:text-blue-600 font-medium">{t('nav.laboratories')}</Link>
            
            {user ? (
              <>
                <Link 
                  href={user.role === 'instructor' ? '/instructor/dashboard' : '/dashboard'} 
                  className="text-gray-600 hover:text-blue-600 font-medium"
                >
                  {user.role === 'instructor' ? t('nav.instructorDashboard') : t('nav.dashboard')}
                </Link>
                <Link href="/profile" className="text-gray-600 hover:text-blue-600 font-medium">
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">{t('nav.login')}</Link>
            )}
            
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <LanguageSwitcher />
          </div>

          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">{t('nav.home')}</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">{t('nav.about')}</Link>
            <Link href="/laboratories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">{t('nav.laboratories')}</Link>
            {user ? (
              <>
                <Link href={user.role === 'instructor' ? '/instructor/dashboard' : '/dashboard'} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                  {user.role === 'instructor' ? t('nav.instructorDashboard') : t('nav.dashboard')}
                </Link>
                <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                  Profile
                </Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50">
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">{t('nav.login')}</Link>
            )}
            <div className="px-3 py-2 mt-4 border-t border-gray-100 pt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
