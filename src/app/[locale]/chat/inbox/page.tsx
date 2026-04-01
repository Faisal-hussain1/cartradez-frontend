"use client";

import { useRouter } from "next/navigation";
import { useInbox } from "@/shared/hooks/useInbox";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/shared/redux/slices/users";

export default function InboxPage() {
  const router = useRouter();
  const user=useSelector(getCurrentUser)
  const { users, isLoading,refetch } = useInbox();

  useEffect(() => {
    refetch()
  }, [user?._id]);


  return (
    <div className="h-screen bg-gray-50">

      {/* HEADER */}
      <div className="p-4 border-b bg-white font-semibold text-gray-800">
        Messages
      </div>

      {/* USERS LIST */}
      <div className="divide-y">
        
        {/* Loading */}
        {isLoading && <p className="p-4 text-gray-500">Loading...</p>}

        {/* Empty State */}
        {!isLoading && users.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
            <img
              src="/images/empty-chat.png"
              alt="No Messages"
              className="w-40 mb-4 opacity-80"
            />
            <p className="text-gray-600 font-semibold text-lg">
              No messages yet
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Start a conversation to see messages here
            </p>
          </div>
        )}

        {/* Users */}
        {!isLoading && users.length > 0 && users.map((user: any) => (
          <div
            key={user._id}
            onClick={() => router.push(`/chat/${user._id}`)}
            className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 transition"
          >
            <img
              src={user.profileImage || "/images/avatar-default.jpeg"}
              className="w-12 h-12 rounded-full"
            />

            <div className="flex-1">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">
                {user.lastMessage || "No messages yet"}
              </p>
            </div>

            <span className="text-xs text-gray-400">
              {user.time
                ? new Date(user.time).toLocaleTimeString()
                : ""}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}