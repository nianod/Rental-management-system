'use client';
import {useAuth} from '@/app/context/AuthContext';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(Boolean(token));
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

        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-6">
              <Link href="/dashboard" className="text-gray-300 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/updates" className="text-gray-300 hover:text-blue-600">
                Updates
              </Link>
              <Link href="/arreas" className="text-gray-300 hover:text-blue-600">
                Arrears
              </Link>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
              }}
              className="bg-gradient-to-br from-red-500 to-red-800 text-white px-6 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
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
