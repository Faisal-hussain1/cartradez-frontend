'use client';

import {Activity, LayoutDashboard, List, Users, X, BadgeDollarSign} from 'lucide-react';
import Image from 'next/image';
import { SidebarItem } from './Sidebaritem';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getCurrentUser, getUserRole } from '@/shared/redux/slices/users';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getRequest } from '@/shared/utils/requests';
import { AppDispatch } from '@/shared/redux/store';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';

export default function Leftbar() {
  const router = useLocaleRouter();
  const dispatch = useDispatch<AppDispatch>();
  const role = useSelector(getUserRole);
  const currentUser: any = useSelector(getCurrentUser);
  const [open, setOpen] = useState(false);
  const syncInFlightRef = useRef(false);
  const lastSyncedAtRef = useRef(0);
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

  const syncDealerUser = useCallback(async () => {
    if (role !== 'dealer') return;
    if (syncInFlightRef.current) return;
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem('accessToken')) return;

    const now = Date.now();
    if (now - lastSyncedAtRef.current < 60000) return;

    syncInFlightRef.current = true;
    try {
      const res: any = await getRequest({endpoint: '/users/me'});
      const latestUser =
        res?.data?.body?.user ||
        res?.data?.body ||
        res?.data?.data?.user ||
        res?.data?.data ||
        res?.data?.user;

      if (latestUser?._id) {
        dispatch(actions.setCurrentUser(latestUser));
        lastSyncedAtRef.current = Date.now();
      }
    } catch (error) {
      // keep existing user state as fallback
    } finally {
      syncInFlightRef.current = false;
    }
  }, [dispatch, role]);

  useEffect(() => {
    syncDealerUser();
  }, [syncDealerUser]);

  useEffect(() => {
    const openSidebar = () => setOpen(true);
    window.addEventListener('open-admin-sidebar', openSidebar);
    return () => window.removeEventListener('open-admin-sidebar', openSidebar);
  }, []);

  return (
    <>
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
          <button
            type='button'
            onClick={() => router.push('/')}
            aria-label='Go to home'
            className='cursor-pointer'
          >
            <Image
              src="/images/logo-black.png"
              alt="Car Tradez"
              width={90}
              height={30}
              // style={{width: 'auto', height: 'auto'}}
              priority
            />
          </button>
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

          {role === 'dealer' && isDealerApproved && <p>Coming Soon</p>}

          {role === 'dealer' && !isDealerApproved && (
            <div className='rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900'>
              {dealerStatusMessage}
            </div>
          )}

          {role === 'admin' && (
            <>
              {/* <SidebarItem
                href="/roles"
                icon={<Shield size={18} />}
                label="Roles"
              /> */}

              {/* <SidebarItem
                href="/users"
                icon={<Users size={18} />}
                label="Users"
              /> */}
              <SidebarItem
                href="/dealers"
                icon={<Users size={18} />}
                label="Dealers"
              />
              <SidebarItem
                href="/user-activity"
                icon={<Activity size={18} />}
                label="User Activity"
              />
              <SidebarItem
                href="/managed-by-cartradez"
                icon={<BadgeDollarSign size={18} />}
                label="Managed by Cartradez"
              />
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
