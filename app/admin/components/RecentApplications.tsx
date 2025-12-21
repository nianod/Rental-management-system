// app/admin/components/RecentApplications.tsx
import Link from 'next/link'
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react'

const recentApplications = [
  { 
    id: 1, 
    name: 'Alex Turner', 
    email: 'alex@email.com', 
    room: 'Studio', 
    date: 'Today', 
    status: 'pending',
    contact: '+254 712 345 678'
  },
  { 
    id: 2, 
    name: 'Maya Patel', 
    email: 'maya@email.com', 
    room: '1-Bedroom', 
    date: 'Yesterday', 
    status: 'reviewed',
    contact: '+254 723 456 789'
  },
  { 
    id: 3, 
    name: 'John Doe', 
    email: 'john@email.com', 
    room: '2-Bedroom', 
    date: '2 days ago', 
    status: 'pending',
    contact: '+254 734 567 890'
  },
]

export default function RecentApplications() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-900/30 rounded-lg">
            <FileText className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Recent Applications</h2>
            <p className="text-gray-400 text-sm">New rental inquiries</p>
          </div>
        </div>
        <Link 
          href="/admin/applications" 
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          View all →
        </Link>
      </div>
      
      <div className="space-y-4">
        {recentApplications.map((app) => (
          <div 
            key={app.id} 
            className="p-4 bg-gray-800/30 hover:bg-gray-700/30 rounded-xl transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium text-white">{app.name}</p>
                <p className="text-sm text-gray-400 mt-1">{app.email}</p>
                <p className="text-xs text-gray-500 mt-1">{app.contact}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                app.status === 'pending' 
                  ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/30'
                  : 'bg-blue-900/30 text-blue-400 border border-blue-700/30'
              }`}>
                {app.status === 'pending' ? (
                  <>
                    <Clock className="w-3 h-3" />
                    Pending
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    Reviewed
                  </>
                )}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300">
                  Room: <span className="font-medium">{app.room}</span>
                </span>
                <span className="text-sm text-gray-500">{app.date}</span>
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-green-900/30 text-green-400 rounded-lg transition-colors">
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors">
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Average response time</span>
          <span className="text-white font-semibold text-sm">24-48 hours</span>
        </div>
      </div>
    </div>
  )
}