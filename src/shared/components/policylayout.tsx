"use client";

import React from "react";

export default function PolicyLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 md:p-10">
        
        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
          {title}
        </h1>

        {/* Content */}
        <div className="space-y-5 text-gray-700 leading-relaxed text-sm md:text-base">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-10 border-t pt-5 text-sm text-gray-500">
          By using CarTradez, you agree to our policies.
        </div>
      </div>
    </div>
  );
}