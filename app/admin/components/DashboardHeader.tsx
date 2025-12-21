import greeting from '@/app/utils/greeting'

const DashboardHeader = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">{greeting()} </h1>
      <p className="text-gray-400">Here’s what’s happening today</p>
    </div>
  )
}

export default DashboardHeader