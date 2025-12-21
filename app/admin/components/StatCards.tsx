import StatCard from "./StatCard"

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard title="Tenants" value={42} icon="🏠" />
      <StatCard title="Pending Apps" value={3} icon="📄" />
      <StatCard title="Rent Collected" value="KES 120,000" icon="💰" />
      <StatCard title="Open Issues" value={2} icon="⚠️" />
    </div>
  )
}
export default StatCards