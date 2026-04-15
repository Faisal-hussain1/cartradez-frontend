'use client';

import React from 'react';

export default function PolicyModal({
  title,
  content,
  onAccept,
}: {
  title: string;
  content: React.ReactNode;
  onAccept: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto text-sm text-gray-700 space-y-3">
          {content}
        </div>

        {/* Footer */}
        <div className="p-5 border-t">
          <button
            onClick={onAccept}
            className="w-full bg-primary cursor-pointer text-white py-3 rounded-lg font-medium"
          >
            I Agree
          </button>
        </div>
      </div>
    </div>
  );
}