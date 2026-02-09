'use client';

import {LayoutDashboard, List, Shield, Users} from 'lucide-react';
import Image from 'next/image';
import {SidebarItem} from './Sidebaritem';

export default function Leftbar() {
  return (
    <aside
      className='
        fixed
        w-64
        top-0 left-0
        h-screen
        bg-[var(--card)]
        border-r border-[var(--border)]
        z-40
        '
    >
      {/* Logo */}
      <div className='h-[var(--topbar-height)] flex items-center justify-center'>
        <Image
          src='/images/logo-black.png'
          alt='Car Tradez'
          width={80}
          height={25}
          mb-2
          priority
        />
      </div>

      {/* Navigation */}
      <nav className='p-3 space-y-1'>
        <SidebarItem
          href='/dash'
          icon={<LayoutDashboard size={18} />}
          label='Dashboard'
        />
        <SidebarItem
          href='/listings'
          icon={<List size={18} />}
          label='Listings'
        />
        <SidebarItem href='/roles' icon={<Shield size={18} />} label='Roles' />
        <SidebarItem href='/users' icon={<Users size={18} />} label='Users' />
      </nav>
    </aside>
  );
}
