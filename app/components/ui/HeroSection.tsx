import { ArrowRight, CheckCircle, Home, Shield } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center  overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-9">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-blue-700/30 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-blue-300" />
                <span className="text-sm text-blue-200">Secure Digital Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-white">Modern Living,</span> <br />
                <span className="text-transparent bg-clip-text bg-blue-600">Simplified Management</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Titan Rental connects landlords and tenants through a secure digital platform. 
                Streamline rent payments, maintenance requests, and communication, all in one place.
              </p>

              {/* Key Features */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  'Secure Room-Based Login',
                  'Digital Rent Payments',
                  'Maintenance Requests',
                  'Direct Landlord Messaging'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#rooms"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  View Available Rooms
                  <ArrowRight className="w-5 h-5" />
                </a>
                
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-blue-500 hover:bg-blue-500/10 text-blue-300 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
                >
                  Login
                </Link>
              </div>
            </div>

            {/* Right Stats Card */}
            <div className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Current Availability</h3>
                <p className="text-gray-400 mt-2">Updated in real-time</p>
              </div>

              <div className="space-y-6">
                {[
                  { label: 'Total Rooms', value: '116', color: 'text-blue-400' },
                  { label: 'Currently Vacant', value: '12', color: 'text-green-400' },
                  { label: 'Avg. Rent per month', value: 'ksh 5500', color: 'text-purple-400' },
                  { label: 'New Applications', value: '8', color: 'text-yellow-400' },
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-gray-400">{stat.label}</span>
                    <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Average approval time</p>
                  <p className="text-white font-bold text-xl">24-48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;