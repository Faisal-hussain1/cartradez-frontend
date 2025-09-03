'use client';
import {useMemo, useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {FiChevronDown, FiChevronUp} from 'react-icons/fi';
import {ListItemProps} from '@/shared/interfaces/dashboard';
import {SidebarRoute} from '@/shared/interfaces/utils';
import {NodeChildrenProps} from '@/shared/interfaces/common';
import {useSidebar} from '../../ui/sidebar';

export const List = ({children}: NodeChildrenProps) => {
  return <ul className='flex flex-col gap-1'>{children}</ul>;
};

export const ListItem = ({route}: ListItemProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === route.path || pathname.startsWith(`${route.path}/`);

  const hasChildren = route.children && route.children.length > 0;

  const {isMobile, setOpenMobile} = useSidebar();

  const isAnyChildActive = useMemo(() => {
    if (!hasChildren) return false;

    return route.children!.some((child: SidebarRoute) =>
      pathname.startsWith(child.path)
    );
  }, [pathname, route.children, hasChildren]);

  const [isOpen, setIsOpen] = useState(hasChildren && isAnyChildActive);
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <li className='w-full' key={route.value}>
      {hasChildren ? (
        <>
          <button
            type='button'
            className='flex w-full items-center justify-between px-4 py-3 rounded-[6px] transition-all cursor-pointer text-white hover:bg-white hover:text-gray90'
            onClick={toggleOpen}
          >
            <div className='flex items-center gap-3'>
              {route.icon && <route.icon size={20} />}
              <span>{route.label}</span>
            </div>
            {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
          </button>
          {/* Child items */}
          {isOpen && (
            <div className='transition-all duration-300 ease-in-out'>
              <ul className='ml-6 mt-1 flex flex-col gap-1'>
                {route.children?.map((child: SidebarRoute) => (
                  <ListItem key={child.value} route={child} />
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <Link
          href={route.path}
          className={`flex items-center justify-between px-4 py-3 rounded-[6px] transition-all cursor-pointer ${
            isActive
              ? 'bg-white text-gray90'
              : 'text-white hover:bg-white hover:text-gray90'
          }`}
          onClick={handleMenuClick}
        >
          <div className='flex items-center gap-3'>
            {route.icon && <route.icon size={20} />}
            <span>{route.label}</span>
          </div>
        </Link>
      )}
    </li>
  );
};
