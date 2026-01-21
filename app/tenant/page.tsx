// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Calendar, 
  DollarSign, 
  Bell, 
  MessageSquare,
  Wifi,
  Droplets,
  Car,
  CheckCircle,
  Clock
} from 'lucide-react';

type Tenant = {
  name: string;
  roomNumber: string;
  moveInDate: string;
  monthlyRent: number;
  nextPaymentDue: string;
  rentStatus: 'paid' | 'pending' | 'overdue';
  notifications: number;
  unreadMessages: number;
};

export default function TenantDashboard() {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching tenant data
    setTimeout(() => {
      setTenant({
        name: 'Sarah Johnson',
        roomNumber: '101',
        moveInDate: '2023-06-15',
        monthlyRent: 12000,
        nextPaymentDue: '2024-02-15',
        rentStatus: 'pending',
        notifications: 3,
        unreadMessages: 2,
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading || !tenant) {
    return (
      <div className="min-h-screen bg-[#060219] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate days until next payment
  const daysUntilPayment = Math.ceil(
    (new Date(tenant.nextPaymentDue).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate months stayed
  const moveIn = new Date(tenant.moveInDate);
  const today = new Date();
  const monthsStayed = (today.getFullYear() - moveIn.getFullYear()) * 12 + 
                      (today.getMonth() - moveIn.getMonth());

  return (
    <div className="bg-[#060219] text-white">
    

      <div className="container mx-auto px-4">
        {/* Main Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Tenant Info Card */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-600  rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{tenant.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{tenant.name}</h2>
                <p className="text-gray-400">Tenant</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Room Number</span>
                <span className="font-medium">{tenant.roomNumber}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Stayed Since</span>
                <span className="font-medium">
                  {new Date(tenant.moveInDate).toLocaleDateString()} ({monthsStayed} months)
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Monthly Rent</span>
                <span className="font-medium">KES {tenant.monthlyRent.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Rent Status Card */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-900/30 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Rent Status</h2>
                <p className="text-gray-400">Current payment status</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className={`flex items-center gap-3 p-4 rounded-lg bg-green-600`}>
                <span>
                  Your rent is Due
                </span>
              </div>
 
              <Link 
                href="/tenant/payments"
                className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg text-center transition-all duration-300"
              >
                Track Rent & Make Payment
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              href="/tenant/payments"
              className="bg-gray-900/50 border border-gray-700 hover:border-blue-500 rounded-xl p-4 text-center transition-colors"
            >
              <DollarSign className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <span className="text-sm">Pay Rent</span>
            </Link>
            
            <Link 
              href="/tenant/discussions"
              className="bg-gray-900/50 border border-gray-700 hover:border-green-500 rounded-xl p-4 text-center transition-colors"
            >
              <Home className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <span className="text-sm">Maintenance</span>
            </Link>
            
            <Link 
              href="/tenant/messages"
              className="bg-gray-900/50 border border-gray-700 hover:border-purple-500 rounded-xl p-4 text-center transition-colors"
            >
              <MessageSquare className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <span className="text-sm">Messages</span>
            </Link>
            
            <Link 
              href="/tenant/updates"
              className="bg-gray-900/50 border border-gray-700 hover:border-yellow-500 rounded-xl p-4 text-center transition-colors"
            >
              <Bell className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <span className="text-sm">Updates</span>
            </Link>
          </div>
        </div>

   

      
      </div>
    </div>
  );
}