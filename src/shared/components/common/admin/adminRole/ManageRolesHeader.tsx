'use client';

export default function ManageRolesHeader() {
  return (
    <div className='flex items-center justify-between mb-6'>
      <h1 className='text-xl font-semibold text-[var(--foreground)]'>
        Manage Roles
      </h1>

      <button
        className='
          px-4 py-2 text-sm font-medium
          rounded-lg
          bg-[var(--primary)]
          text-[var(--primary-foreground)]
          hover:opacity-90
          transition
        '
      >
        Create a New Role
      </button>
    </div>
  );
}
