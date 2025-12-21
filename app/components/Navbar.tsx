'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [hydrated, setHydrated] = useState(false);
  const [userRole, setUserRole] = useState<'tenant' | 'admin' | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole') as 'tenant' | 'admin' | null;

    setIsLoggedIn(Boolean(token));
    setUserRole(role);
  }, [setIsLoggedIn]);

   const navContents = {
    logo: '/logoipsum-292.svg',
    title: 'Titan Rental',
  };

  return (
    <nav className="sticky top-0 z-50 p-3 border-b border-b-white bg-[#060219] shadow-sm">
      <div className="mx-auto flex justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative w-10 h-10">
            <Image
              src={navContents.logo}
              alt="Titan Rental Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="font-bold text-2xl text-gray-300">
            {navContents.title}
          </h1>
        </Link>

        {/* Before hydration finishes, keep SSR-safe */}
        {!hydrated ? (
          <Link
            href="/auth/login"
            className="bg-gradient-to-br from-blue-500 to-blue-800 text-white px-6 py-2 rounded-lg"
          >
            Login
          </Link>
        ) : isLoggedIn ? (
          userRole === 'tenant' ? (
            // Tenant navbar
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex space-x-6">
                <Link href="/tenant/tenant-dashboard" className="text-gray-300 hover:text-blue-600">
                  Dashboard
                </Link>
                <Link href="/tenant/payments" className="text-gray-300 hover:text-blue-600">
                  Payments
                </Link>
                <Link href="/tenant/messages" className="text-gray-300 hover:text-blue-600">
                  Messages
                </Link>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('userRole');
                  setIsLoggedIn(false);
                  setUserRole(null);
                }}
                className="bg-gradient-to-br from-red-500 to-red-800 text-white px-6 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            // Admin navbar
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex space-x-6">
                <Link href="/admin" className="text-gray-300 hover:text-blue-600">
                  Admin Dashboard
                </Link>
                <Link href="/admin/tenants" className="text-gray-300 hover:text-blue-600">
                  Tenants
                </Link>
                <Link href="/admin/messages" className="text-gray-300 hover:text-blue-600">
                  Messages
                </Link>
              </div>
                           <div className="hidden lg:flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Admin</p>
                  <p className="text-xs text-gray-400">Landlord</p>
                </div>
              </div>
              {/* <button
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('userRole');
                  setIsLoggedIn(false);
                  setUserRole(null);
                }}
                className="bg-gradient-to-br from-red-500 to-red-800 text-white px-6 py-2 rounded-lg"
              >
                Logout
              </button> */}
            </div>
          )
        ) : (
          <Link
            href="/auth/login"
            className="bg-gradient-to-br from-blue-500 to-blue-800 text-white px-6 py-2 rounded-lg"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
