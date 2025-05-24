// not-found.tsx for unknown service IDs
import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
      <p className="mb-6">The service you are looking for does not exist.</p>
      <Link
        href="/services"
        className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition-colors"
      >
        Back to Services
      </Link>
    </div>
  );
}
