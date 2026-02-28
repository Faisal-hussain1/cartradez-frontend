'use client';

import {Eye, Pencil, Trash2, Calendar} from 'lucide-react';
import {useState} from 'react';
import ActionButton from '@/shared/components/common/actionbutton/ActionButton';

const users = [
  {
    id: 1,
    name: 'Eleanor Pena',
    email: 'bill.sanders@example.com',
    role: 'Admin',
    created: '2025-02-08',
  },
  {
    id: 2,
    name: 'Brooklyn Simmons',
    email: 'sara.cruz@example.com',
    role: 'Manager',
    created: '2025-05-14',
  },
  {
    id: 3,
    name: 'Devon Lane',
    email: 'alma.lawson@example.com',
    role: 'Dealer',
    created: '2025-07-01',
  },
];

export default function ManageUsers() {
  const [role, setRole] = useState('All');
  const [date, setDate] = useState('');

  const filteredUsers = users.filter((user) => {
    const roleMatch = role === 'All' || user.role === role;
    const dateMatch = !date || user.created === date;

    return roleMatch && dateMatch;
  });

  /* ---------------- ACTION HANDLERS ---------------- */

  const handleView = (id: number) => {
    console.log('View user:', id);

    // router.push(`/admin/users/${id}`)
  };

  const handleEdit = (id: number) => {
    console.log('Edit user:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete user:', id);
  };

  return (
    <div className='space-y-6'>
      {/* HEADER */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-[var(--foreground)]'>
          Manage Users
        </h1>

        <button className='bg-[var(--primary)] text-[var(--primary-foreground)] px-4 py-2 rounded-md text-sm'>
          Create a New User
        </button>
      </div>

      {/* FILTERS */}
      <div className='flex gap-6'>
        {/* Role Filter */}
        <div className='flex flex-col gap-1'>
          <label className='text-sm text-[var(--muted-foreground)]'>
            User role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='
              h-10 w-56
              rounded-md
              border border-[var(--border)]
              bg-[var(--background)]
              px-3 text-sm
            '
          >
            <option>All</option>
            <option>Admin</option>
            <option>Manager</option>
            <option>Dealer</option>
            <option>User</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className='flex flex-col gap-1'>
          <label className='text-sm text-[var(--muted-foreground)]'>
            Created On
          </label>
          <div className='relative'>
            <input
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='
                h-10 w-72
                rounded-md
                border border-[var(--border)]
                bg-[var(--background)]
                px-3 pr-10 text-sm
              '
            />
            <Calendar
              size={16}
              className='absolute right-3 top-3 text-[var(--muted-foreground)]'
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className='bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden'>
        <table className='w-full text-sm'>
          <thead className='bg-[var(--muted)]'>
            <tr className='text-left text-[var(--muted-foreground)]'>
              <th className='px-5 py-3 w-12'>#</th>
              <th className='px-5 py-3'>User Name</th>
              <th className='px-5 py-3'>User Email</th>
              <th className='px-5 py-3'>User Role</th>
              <th className='px-5 py-3'>Created</th>
              <th className='px-5 py-3 text-right'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className='border-t border-[var(--border)] hover:bg-[var(--accent)]'
              >
                <td className='px-5 py-4'>{user.id}</td>
                <td className='px-5 py-4 font-medium'>{user.name}</td>
                <td className='px-5 py-4'>{user.email}</td>
                <td className='px-5 py-4'>{user.role}</td>
                <td className='px-5 py-4'>
                  {new Date(user.created).toDateString()}
                </td>

                {/* ACTIONS */}
                <td className='px-5 py-4'>
                  <div className='flex justify-end gap-2'>
                    <ActionButton
                      type='view'
                      icon={<Eye size={16} />}
                      onClick={() => handleView(user.id)}
                    />

                    <ActionButton
                      type='edit'
                      icon={<Pencil size={16} />}
                      onClick={() => handleEdit(user.id)}
                    />

                    <ActionButton
                      type='delete'
                      icon={<Trash2 size={16} />}
                      onClick={() => handleDelete(user.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
