'use client';

import {Eye, Pencil, Trash2} from 'lucide-react';
import ActionButton from '@/shared/components/common/actionbutton/ActionButton';

const roles = [
  {id: 1, name: 'Admin', users: 15, created: 'Feb 08, 2025'},
  {id: 2, name: 'Manager', users: 108, created: 'May 14, 2025'},
  {id: 3, name: 'Dealer', users: 254, created: 'Jul 01, 2025'},
  {id: 4, name: 'User', users: '5,791', created: 'Apr 06, 2025'},
];

export default function RolesTable() {
  return (
    <div
      className='
        bg-[var(--card)]
        border border-[var(--border)]
        rounded-xl
        overflow-hidden
        shadow-sm
      '
    >
      <table className='w-full text-sm'>
        <thead className='bg-[var(--muted)]'>
          <tr className='text-left text-[var(--muted-foreground)]'>
            <th className='px-5 py-3 w-12'>#</th>
            <th className='px-5 py-3'>Role</th>
            <th className='px-5 py-3'>Total Users</th>
            <th className='px-5 py-3'>Created</th>
            <th className='px-5 py-3 text-right'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {roles.map((role) => (
            <tr
              key={role.id}
              className='
                border-t border-[var(--border)]
                hover:bg-[var(--accent)]
                transition
              '
            >
              <td className='px-5 py-4 text-[var(--muted-foreground)]'>
                {role.id}
              </td>

              <td className='px-5 py-4 font-medium text-[var(--foreground)]'>
                {role.name}
              </td>

              <td className='px-5 py-4 text-[var(--foreground)]'>
                {role.users}
              </td>

              <td className='px-5 py-4 text-[var(--muted-foreground)]'>
                {role.created}
              </td>

              <td className='px-5 py-4'>
                <div className='flex justify-end gap-2'>
                  <ActionButton type='view' icon={<Eye size={14} />} />

                  <ActionButton type='edit' icon={<Pencil size={14} />} />

                  <ActionButton type='delete' icon={<Trash2 size={14} />} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
