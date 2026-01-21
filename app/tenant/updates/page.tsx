"use client"
import { useEffect, useState } from 'react'
import type { Update } from '@/app/types/data'
 
const Updates = () => {

    const [loading, setLoading] = useState<Boolean>(true)
    const [updates, setUpdates] = useState<Update[]>([])

    const fetchUpdates = async () => {
        try{
            const response = await fetch('/api/updates')
            const data = await response.json()
            setUpdates(data)
            setLoading(false)
             
        } catch(err) {
            console.error("Error fetching updates", err)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUpdates()
    }, [])

    if(loading) {
        return <p>Loading updates....</p>
    }
    if(!updates) {
        return <p>No updates yet</p>
    }
  return (
    <div>
        <h3 className="font-semibold text-blue-700 p-3">ANNOUNCEMENTS FROM LANDLORD</h3>
         <div className="space-y-4">
            {updates.map((item) => (
                <div key={item._id} className="border p-4 rounded bg-gray-900">
                    <h3 className="font-semibold">{item.update}</h3>
                    <p className="text-sm text-gray-300">
                        {item.description}
                    </p>
                    <small className="text-xs text-gray-400">
                        {new Date(item.createdAt).toLocaleString()}
                    </small>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Updates