// app/admin/rooms/page.tsx
'use client';

import { useState } from 'react';

export default function AdminRoomsPage() {
  const [form, setForm] = useState({
    roomNumber: '',
    title: '',
    description: '',
    price: '',
    features: '',
    status: 'vacant',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${adminToken}` // if you enforce admin auth
        },
        body: JSON.stringify({
          roomNumber: form.roomNumber,
          title: form.title,
          description: form.description,
          price: Number(form.price),
          features: form.features
            .split(',')
            .map(f => f.trim())
            .filter(Boolean),
          status: form.status,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'Failed to create room');
      } else {
        setMessage('Room created successfully');
        setForm({
          roomNumber: '',
          title: '',
          description: '',
          price: '',
          features: '',
          status: 'vacant',
        });
      }
    } catch (err) {
      console.error(err);
      setMessage('Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060219] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Rooms</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg space-y-4 bg-gray-900 p-6 rounded-xl border border-gray-700"
      >
        <input
          name="roomNumber"
          value={form.roomNumber}
          onChange={handleChange}
          placeholder="Room Number"
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
        />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
        />
        <input
          name="features"
          value={form.features}
          onChange={handleChange}
          placeholder="Features (comma-separated)"
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
        >
          <option value="vacant">Vacant</option>
          <option value="occupied">Occupied</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
        >
          {loading ? 'Saving...' : 'Create Room'}
        </button>

        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
}
