'use client'
import Link from "next/link";
import Image from "next/image";
 
const Navbar = ({ isLoggedIn, setIsLoggedIn }: { isLoggedIn: boolean, setIsLoggedIn: (v: boolean) => void }) => {
  const navContents = {
    logo: "/logoipsum-292.svg",
    title: "Titan Rental",
  };

  return (
    <nav className="sticky top-0 z-50 p-3 border-b border-b-white bg-[#060219] shadow-sm">
      <div className="mx-auto flex justify-between">
        <div className="flex items-center space-x-3">
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
            <h1 className="font-bold text-2xl text-gray-300">{navContents.title}</h1>
          </Link>
        </div>

        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-6">
              <Link href="/dashboard" className="text-gray-300 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>
              <Link href="/updates" className="text-gray-300 hover:text-blue-600 transition-colors">
                Updates
              </Link>
              <Link href="/arreas" className="text-gray-300 hover:text-blue-600 transition-colors">
                Arreas
              </Link>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="cursor-pointer bg-gradient-to-br from-red-500 to-red-800 text-white px-6 py-2 rounded-lg hover:from-red-600 hover:to-red-900 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/auth/login"
            className="cursor-pointer bg-gradient-to-br from-blue-500 to-blue-800 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-900 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
