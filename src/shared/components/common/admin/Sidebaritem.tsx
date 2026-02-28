'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';

interface Props {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export const SidebarItem = ({href, icon, label}: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        `
        flex items-center gap-3
        px-3 py-2.5
        rounded-lg
        text-sm font-medium
        transition-colors
        `,
        isActive
          ? `
            bg-[var(--primary)]
            text-[var(--primary-foreground)]
          `
          : `
            text-[var(--foreground)]
            hover:bg-[var(--blue10)]
            hover:text-[var(--primary)]
          `
      )}
    >
      <span
        className={clsx(
          isActive
            ? 'text-[var(--primary-foreground)]'
            : 'text-[var(--foreground)]'
        )}
      >
        {icon}
      </span>

      <span>{label}</span>
    </Link>
  );
};
