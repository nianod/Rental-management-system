"use client"

import { useState } from 'react'
import axios from 'axios'

const Page = () => {
  
  const [form, setForm] = useState({
    update: "",
    description: ""
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [res, setRes] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({...prev, [e.target.name]: e.target.value}))
  }
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('/api/updates', form)
      setRes(res.data.message)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
 <div className="min-h-screen bg-[#060219] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Send Announcements</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg space-y-4 bg-gray-900 p-6 rounded-xl border border-gray-700"
      >
 <input
  name="update"
  value={form.update}
  onChange={handleChange}
  placeholder="Update"
  required
  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
/>

<textarea
  name="description"
  value={form.description}
  onChange={handleChange}
  placeholder="Description..."
  className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
/>


        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
        >
          {loading ? 'Send...' : 'Send'}
        </button>

        {res && <p className="mt-2 text-sm">{res}</p>}
      </form>
    </div>
  )
}

export default Page