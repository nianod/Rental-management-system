// app/admin/components/RecentActivity.tsx
import { CheckCircle, FileText, MessageSquare, AlertTriangle, Calendar, CreditCard, UserPlus } from 'lucide-react'
import Link from 'next/link'

export default function RecentActivity() {
  const activities = [
    { 
      type: 'payment',
      title: 'Rent Paid',
      description: 'Room 305 - KES 12,000',
      time: '2 hours ago',
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
      color: 'green'
    },
    { 
      type: 'announcement',
      title: 'Announcement Posted',
      description: 'Water maintenance scheduled',
      time: '4 hours ago',
      icon: <MessageSquare className="w-5 h-5 text-blue-400" />,
      color: 'blue'
    },
    { 
      type: 'maintenance',
      title: 'Maintenance Report',
      description: 'New request - Room 101',
      time: '1 day ago',
      icon: <AlertTriangle className="w-5 h-5 text-orange-400" />,
      color: 'orange'
    },
    { 
      type: 'application',
      title: 'New Application',
      description: 'Alex Turner - Studio',
      time: '2 days ago',
      icon: <UserPlus className="w-5 h-5 text-purple-400" />,
      color: 'purple'
    },
    { 
      type: 'payment',
      title: 'Rent Overdue',
      description: 'Room 205 - KES 15,000',
      time: '3 days ago',
      icon: <CreditCard className="w-5 h-5 text-red-400" />,
      color: 'red'
    }
  ]

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Recent Activity</h2>
        <Link 
          href="/admin/activity" 
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          View all
        </Link>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-800/30 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-gray-700">
              {activity.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{activity.title}</p>
              <p className="text-sm text-gray-400 truncate">{activity.description}</p>
            </div>
            
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex items-center gap-3 text-gray-400">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Next rent collection: 15th February</span>
        </div>
      </div>
    </div>
  )
}