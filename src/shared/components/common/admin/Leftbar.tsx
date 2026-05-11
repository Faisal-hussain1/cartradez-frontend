'use client';

import { LayoutDashboard, List, Shield, Users, Menu, X, BadgeDollarSign } from 'lucide-react';
import Image from 'next/image';
import { SidebarItem } from './Sidebaritem';
import { useSelector } from 'react-redux';
import { getCurrentUser, getUserRole } from '@/shared/redux/slices/users';
import { useState } from 'react';

export default function Leftbar() {
  const role = useSelector(getUserRole);
  const currentUser: any = useSelector(getCurrentUser);
  const [open, setOpen] = useState(false);
  const history = Array.isArray(currentUser?.dealerStatusHistory)
    ? currentUser.dealerStatusHistory
    : [];
  const latestHistoryStatus =
    history.length > 0 ? history[history.length - 1]?.status : null;
  const effectiveDealerStatus = latestHistoryStatus || currentUser?.dealerStatus;
  const isDealerApproved = effectiveDealerStatus === 'approved';
  const isDealerRejected = effectiveDealerStatus === 'rejected';
  const dealerStatusMessage = isDealerRejected
    ? 'Your dealer request was rejected. Please update your details and apply again.'
    : 'Your dealer account is pending approval. Plans will be available once approved.';

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 flex items-center justify-between px-4 bg-card border-b border-border z-50">
        <button onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>

        <Image
          src="/images/logo-black.png"
          alt="Car Tradez"
          width={90}
          height={30}
          priority
        />
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed
        top-0 left-0
        h-screen
        w-64
        bg-card
        border-r border-border
        z-50
        transform
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
      >
        {/* Close button mobile */}
        <div className="md:hidden flex justify-end p-3">
          <button onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Logo */}
        <div className="h-[var(--topbar-height)] flex items-center justify-center">
          <Image
            src="/images/logo-black.png"
            alt="Car Tradez"
            width={90}
            height={30}
            priority
          />
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          <SidebarItem
            href="/dash"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />

          <SidebarItem
            href="/listings"
            icon={<List size={18} />}
            label="Listings"
          />

          {role === 'dealer' && isDealerApproved && (
            <SidebarItem
              href="/listingplans"
              icon={<BadgeDollarSign size={18} />}
              label="Plans"
            />
          )}

          {role === 'dealer' && !isDealerApproved && (
            <div className='rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900'>
              {dealerStatusMessage}
            </div>
          )}

          {role === 'admin' && (
            <>
              <SidebarItem
                href="/roles"
                icon={<Shield size={18} />}
                label="Roles"
              />

              <SidebarItem
                href="/users"
                icon={<Users size={18} />}
                label="Users"
              />
              <SidebarItem
                href="/dealers"
                icon={<Users size={18} />}
                label="Dealers"
              />
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
