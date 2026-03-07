"use client";
import { getCurrentUser } from '@/shared/redux/slices/users';
import { Bell } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Topbar() {
  const user=useSelector(getCurrentUser);


  return (
    <header className='sticky top-0 h-16 bg-white border-b z-20 flex items-center justify-between px-6 rounded-b-lg'>
      
      <input
        type='text'
        placeholder='Search here...'
        className='border rounded px-3 py-2 w-80'
      />

      <div className='flex items-center gap-4'>
        <Bell className='w-5 h-5 text-gray-600' />

        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium text-gray-700'>
            {user?.firstName}
          </span>
          <img
            src='/images/avatar-default.jpeg'
            alt='User Avatar'
            className='w-8 h-8 rounded-full border'
          />
        </div>
      </div>

    </header>
  );
}