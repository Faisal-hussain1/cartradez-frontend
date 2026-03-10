"use client";

import { getCurrentUser } from "@/shared/redux/slices/users";
import { Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { userMutations } from "@/shared/reactQuery";

export default function Topbar() {
  const user = useSelector(getCurrentUser);
  const router = useRouter();

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

    if(!user) router.push('/')

  return (
    <header className="sticky top-0 h-16 bg-white border-b z-20 flex items-center justify-between px-6 rounded-b-lg">

      {/* Search */}
      <input
        type="text"
        placeholder="Search here..."
        className="border rounded-lg px-3 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-[#414279]"
      />

      <div className="flex items-center gap-5">

        {/* Notification */}
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-[#414279]" />

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg transition"
          >
            <span className="text-sm font-medium text-gray-700">
              {user?.firstName}
            </span>

            <img
              src={user?.profileImage || "/images/avatar-default.jpeg"}
              alt="User Avatar"
              className="w-9 h-8 rounded-full border cursor-pointer"
            />
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border z-50 overflow-hidden">

              <button
                onClick={() => {
                  router.push("/");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition cursor-pointer"
              >
                 Go to Home
              </button>

              <button
                onClick={() => {
                  router.push("/dash/edit-profile");
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition cursor-pointer"
              >
                 Edit Profile
              </button>

              <button
                onClick={() => {
                  executeSignOutMutation();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition cursor-pointer"
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