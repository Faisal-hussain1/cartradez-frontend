'use client';

import {Ban, LogOut} from 'lucide-react';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/shared/redux/slices/users';
import {userMutations} from '@/shared/reactQuery';

export default function BlockedAccountGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector(getCurrentUser);
  const {useSignOutMutation} = userMutations();
  const {mutate: signOut, isPending} = useSignOutMutation();

  if (!user?.isBlocked) return <>{children}</>;

  return (
    <div className='mx-auto flex min-h-[65vh] max-w-2xl items-center px-3 py-8'>
      <div className='w-full rounded-2xl border border-red-200 bg-white p-6 shadow-sm sm:p-8'>
        <div className='flex items-start gap-4'>
          <div className='rounded-full bg-red-50 p-3 text-red-600'>
            <Ban size={24} />
          </div>
          <div>
            <h1 className='text-xl font-semibold text-gray-900'>
              Your account is blocked
            </h1>
            <p className='mt-1 text-sm text-gray-600'>
              You cannot add or manage vehicles, use chat, or perform account
              actions while this restriction is active.
            </p>
          </div>
        </div>

        <div className='mt-6 rounded-xl border border-red-100 bg-red-50 p-4'>
          <p className='text-xs font-semibold uppercase tracking-wide text-red-700'>
            Block reason
          </p>
          <p className='mt-1 whitespace-pre-wrap text-sm text-red-900'>
            {user.blockReason || 'No reason was provided.'}
          </p>
        </div>

        <button
          type='button'
          disabled={isPending}
          onClick={() => signOut()}
          className='mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50'
        >
          <LogOut size={16} />
          {isPending ? 'Signing out...' : 'Sign out'}
        </button>
      </div>
    </div>
  );
}
