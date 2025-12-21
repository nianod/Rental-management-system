// app/admin/components/RecentTenants.tsx
import Link from 'next/link'
import { Users, MoreVertical } from 'lucide-react'

const recentTenants = [
  { id: 1, name: 'Sarah Johnson', room: '101', status: 'paid', lastPayment: '2 days ago', rent: 'KES 12,000' },
  { id: 2, name: 'Michael Chen', room: '205', status: 'overdue', lastPayment: '15 days ago', rent: 'KES 15,000' },
  { id: 3, name: 'Emma Rodriguez', room: '312', status: 'paid', lastPayment: '5 days ago', rent: 'KES 18,000' },
  { id: 4, name: 'David Kim', room: '408', status: 'pending', lastPayment: 'Today', rent: 'KES 12,500' },
]

export default function RecentTenants() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-900/30 rounded-lg">
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Recent Tenants</h2>
            <p className="text-gray-400 text-sm">Latest rental activity</p>
          </div>
        </div>
        <Link 
          href="/admin/tenants" 
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          View all →
        </Link>
      </div>
      
      <div className="space-y-4">
        {recentTenants.map((tenant) => (
          <div 
            key={tenant.id} 
            className="flex items-center justify-between p-3 bg-gray-800/30 hover:bg-gray-700/30 rounded-xl transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{tenant.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-medium text-white">{tenant.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-400">Room {tenant.room}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">
                    {tenant.rent}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                tenant.status === 'paid' 
                  ? 'bg-green-900/30 text-green-400 border border-green-700/30'
                  : tenant.status === 'overdue'
                  ? 'bg-red-900/30 text-red-400 border border-red-700/30'
                  : 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/30'
              }`}>
                {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
              </span>
              <button className="p-1 hover:bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Total Monthly Revenue</span>
          <span className="text-white font-semibold">KES 57,500</span>
        </div>
      </div>
    </div>
  )
}