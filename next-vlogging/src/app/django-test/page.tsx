"use client";

import { useEffect, useState } from "react";

const DJANGO_BASE_URL = process.env.NEXT_PUBLIC_DJANGO_API_BASE || "http://127.0.0.1:8000";

export default function DjangoTestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch data from the Django Backend
    fetch(`${DJANGO_BASE_URL}/api/hello/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch from Django");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">Next.js + Django Integration</h1>
      
      <div className="p-6 border rounded-lg shadow-sm bg-white text-black max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Django Backend Status:</h2>
        
        {loading && <p className="text-blue-500">Connecting to Django...</p>}
        
        {error && (
          <div className="text-red-500">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
            <p className="text-sm mt-2 text-gray-500">Make sure your Django server is running on port 8000!</p>
          </div>
        )}
        
        {data && (
          <div className="bg-green-50 p-4 rounded text-green-800 border border-green-200">
            <p className="font-bold">✅ Successfully connected!</p>
            <p className="mt-2"><strong>Message:</strong> {data.message}</p>
            <p><strong>Status:</strong> {data.status}</p>
          </div>
        )}
      </div>
    </div>
  );
}
