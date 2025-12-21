import DashboardHeader from './components/DashboardHeader'
import StatCards from './components/StatCards'
import QuickActions from './components/QuickActions'
import RecentTenants from './components/RecentTenants'
import RecentApplications from './components/RecentApplications'


 export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <StatCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
             
            <QuickActions />
            <RecentTenants />
          </div>
                 
          {/* Quick Actions Panel */}
         
         
          {/* Alerts Section */}
          <RecentApplications />
        </div>

      </div>
    </div>
  )
}