//components/StatCards.tsx

"use client"

import StatCard from "./StatCard"
import { useTenants } from "../context/TenantsContext"

const StatCards = () => {
  const { tenants } = useTenants()
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard title="Tenants" value={tenants.length} />
      <StatCard title="Pending Apps" value={0} />
      
      <StatCard title="Rent Collected this month" value="KES 120,000" />
      <StatCard title="Expected rent this month" value="KES 200,000" />
     
    </div>
  )
}

export default StatCards