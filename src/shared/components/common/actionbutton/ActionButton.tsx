'use client';

import React from 'react';

type ActionType = 'view' | 'edit' | 'approve' | 'reject' | 'delete';

export default function ActionButton({
  icon,
  type,
  onClick,
}: {
  icon: React.ReactNode;
  type: ActionType;
  onClick?: () => void;
}) {
  const styles: Record<ActionType, string> = {
    view: 'text-[var(--blue100)] border-[var(--blue100)] hover:bg-[var(--blue10)]',
    edit: 'text-[var(--green100)] border-[var(--green100)] hover:bg-[var(--success-light)]',
    approve:
      'text-[var(--green100)] border-[var(--green100)] hover:bg-[var(--success-light)]',
    reject:
      'text-[var(--red100)] border-[var(--red100)] hover:bg-[var(--error-light)]',
    delete:
      'text-[var(--red100)] border-[var(--red100)] hover:bg-[var(--error-light)]',
  };

  return (
    <button
      onClick={onClick}
      className={`
        h-8 w-8
        flex items-center justify-center
        rounded-md
        border
        transition-colors duration-200
        ${styles[type]}
      `}
    >
      {icon}
    </button>
  );
}
