"use client";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const Page = () => {
  const [form, setForm] = useState({
    update: "",
    description: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [res, setRes] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRes(null); // Clear previous response
    
    try {
      const response = await axios.post("/api/updates", form);
      setRes(response.data.message || "Update sent successfully!");
      setError(null);
      
      // Clear form on success
      setForm({ update: "", description: "" });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to send update");
      } else {
        setError("An unexpected error occurred");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description..."
          rows={4}
          className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed py-2 rounded font-semibold transition-colors flex items-center justify-center"
        >
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            "Send"
          )}
        </button>
         
        {error && (
          <span className="text-red-500">{error}</span>
        )}
       
        {res && (
          <p className="mt-2 text-sm text-center bg-green-600 p-3 rounded border border-gray-700">
            {res}
          </p>
        )}
      </form>
    </div>
  );
};

export default Page;