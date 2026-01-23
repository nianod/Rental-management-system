"use client";

import { useEffect, useState } from "react";
import type { Update } from "@/app/types/data";

const Updates = () => {
  const [loading, setLoading] = useState(true);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchUpdates = async () => {
    try {
      const response = await fetch("/api/updates", { cache: "no-store" });
      if (!response.ok) throw new Error("Failed to fetch updates");

      const data: Update[] = await response.json();
      setUpdates(data);
    } catch (err) {
      console.error("Error fetching updates", err);
      setError("Could not load announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  if (loading) return <p className="p-4 text-gray-500">Loading updates…</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (updates.length === 0) return <p className="p-4 text-gray-500">No announcements yet</p>;

  return (
    <div className="max-w-xl mx-auto">
      <h3 className="text-lg font-semibold text-blue-600 mb-4">
        Announcements
      </h3>

      <div className="space-y-3">
        {updates.map((item) => (
          <div
            key={item._id}
            className="rounded-lg bg-white shadow p-4"
          >
            <h4 className="font-medium text-gray-900">{item.update}</h4>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Updates;
