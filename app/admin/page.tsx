// app/admin/page.tsx - DASHBOARD LANDING PAGE
import DashboardHeader from './components/DashboardHeader'
import StatCards from './components/StatCards'
import RecentActivity from './components/RecentActivity'
import QuickActions from './components/QuickActions'
import RecentTenants from './components/RecentTenants'
import RecentApplications from './components/RecentApplications'
import AlertsPanel from './components/AlertPanel'
export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <StatCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentTenants />
            <RecentApplications />
          </div>
          
          {/* Alerts Section */}
          <AlertsPanel />
        </div>
        
        <div className="space-y-6">
          {/* Recent Activity Feed */}
          <RecentActivity />
          
          {/* Quick Actions Panel */}
          <QuickActions />
        </div>
      </div>
    </div>
  )
}