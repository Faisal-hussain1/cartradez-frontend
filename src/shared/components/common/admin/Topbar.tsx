"use client";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/shared/redux/slices/users";
import { Bell, Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { userMutations } from "@/shared/reactQuery";
import { useUnRead } from "@/shared/hooks/useUnReadMessages";
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';

export default function Topbar() {
  const user = useSelector(getCurrentUser);
  const userId = user?._id;
  const isBlocked = Boolean(user?.isBlocked);
  const router = useRouter();
  const { len, refetch } = useUnRead();

  /* ================= SOCKET ================= */
  useEffect(() => {
    if (!userId || isBlocked) return;

    const timer = setTimeout(() => {
      refetch();
    }, 2000); // Delay of 2 seconds

    return () => clearTimeout(timer);
  }, [userId, isBlocked, len, refetch]);

  /* ================= REDIRECT FIX ================= */
  useEffect(() => {
    if (!userId) {
      router.push("/");
    }
  }, [userId, router]);

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

  const openSidebar = () => {
    window.dispatchEvent(new CustomEvent('open-admin-sidebar'));
  };

  return (
  <header className="sticky top-0 h-14 sm:min-h-16 bg-white border-b z-30 flex items-center justify-between gap-3 px-4 py-2 sm:px-6 rounded-b-lg overflow-visible">
    <button className="md:hidden shrink-0" onClick={openSidebar} aria-label="Open menu">
      <Menu size={22} />
    </button>
    
    {/* Search - Hide on mobile */}
    <input
      type="text"
      placeholder="Search here..."
      className="hidden sm:block flex-1 min-w-0 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#414279]"
    />

    <div className="flex items-center gap-3 sm:gap-5 shrink-0 ml-auto">
      
      {/* NOTIFICATION */}
      <div
        className={`relative shrink-0 ${isBlocked ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}
        onClick={() => {
          if (!isBlocked) router.push("/chat/inbox");
        }}
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
            {user?.profileImage && (
              <AvatarImage
                src={user.profileImage}
                alt="Profile Image"
                className="object-cover"
              />
            )}

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
