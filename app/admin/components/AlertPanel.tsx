const AlertsPanel = () => {
  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <h2 className="font-semibold mb-3">Recent Activity</h2>
      <ul className="space-y-2 text-sm text-gray-400">
        <li>Tenant 305 paid rent</li>
        <li>Announcement posted</li>
        <li>Maintenance request created</li>
      </ul>
    </div>
  )
}
export default AlertsPanel