"use client";


import { useSelector } from "react-redux";
import { getCurrentUser } from "@/shared/redux/slices/users";
import { Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { userMutations } from "@/shared/reactQuery";
import { connectSocket } from "@/shared/socket";
import { useInbox } from "@/shared/hooks/useInbox";
import { useUnRead } from "@/shared/hooks/useUnReadMessages";
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';

export default function Topbar() {
  const user = useSelector(getCurrentUser);
  const router = useRouter();
  const { len, refetch } = useUnRead();

  const socketRef = useRef<any>(null);

  /* ================= SOCKET ================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();  // Adding delay to avoid over-fetching
    }, 2000); // Delay of 2 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [len]); // Depend on the unread messages count

  /* ================= REDIRECT FIX ================= */
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  /* ================= DROPDOWN ================= */
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const { useSignOutMutation } = userMutations();
  const { mutate: executeSignOutMutation } = useSignOutMutation();

  return (
  <header className="sticky top-14 md:top-0 mt-14 md:mt-0 h-16 bg-white border-b z-30 flex items-center justify-between gap-3 px-3 sm:px-6 rounded-b-lg overflow-visible">
    
    {/* Search - Hide on mobile */}
    <input
      type="text"
      placeholder="Search here..."
      className="hidden sm:block flex-1 min-w-0 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#414279]"
    />

    <div className="flex items-center gap-3 sm:gap-5 shrink-0 ml-auto">
      
      {/* NOTIFICATION */}
      <div
        className="relative cursor-pointer shrink-0"
        onClick={() => router.push("/chat/inbox")}
      >
        <Bell className="w-5 h-5 text-gray-600 hover:text-[#414279]" />

        {len > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-[2px] rounded-full min-w-[16px] text-center">
            {len > 9 ? "9+" : len}
          </span>
        )}
      </div>

      {/* PROFILE */}
      <div className="relative shrink-0" ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-1 sm:px-2 py-1 rounded-lg transition"
        >
          <span className="hidden sm:block text-sm font-medium text-gray-700">
            {user?.firstName}
          </span>

          <Avatar className="w-9 h-9 border shrink-0">
            <AvatarImage
              src={user?.profileImage || ""}
              alt="Profile Image"
              className="object-cover"
            />

            <AvatarFallback>
              {user?.firstName?.[0]?.toUpperCase() || "U"}
              {user?.lastName?.[0]?.toUpperCase() || ""}
            </AvatarFallback>
          </Avatar>
        </div>

        {open && (
          <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border z-50 overflow-hidden">
            <button
              onClick={() => {
                router.push("/");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
            >
              Go to Home
            </button>

            <button
              onClick={() => {
                router.push("/dash/edit-profile");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
            >
              Edit Profile
            </button>

            <button
              onClick={() => {
                executeSignOutMutation();
                setOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </header>
);
}