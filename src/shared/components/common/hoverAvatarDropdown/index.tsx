'use client';

import {useState, useRef} from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {userMutations} from '@/shared/reactQuery';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';

import { useSelector } from 'react-redux';
import { getCurrentUser } from '@/shared/redux/slices/users';

export default function HoverAvatarDropdown({
  profileImageUrl,
}: {
  profileImageUrl?: string;
}) {
  const currentUser = useSelector(getCurrentUser);

  // Helper to get initials from first and last name
  function getInitials() {
    if (currentUser) {
      const first = currentUser.firstName?.[0] || '';
      const last = currentUser.lastName?.[0] || '';
      return (first + last).toUpperCase() || currentUser.username?.[0]?.toUpperCase() || '?';
    }
    return '?';
  }
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  };
  const router=useLocaleRouter();

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setOpen(false), 200);
  };
  const {useSignOutMutation} = userMutations();

  const {mutate: executeSignOutMutation} = useSignOutMutation();

  return (
    <div
      className='relative inline-block'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownMenu open={open} modal={false}>
        <DropdownMenuTrigger asChild>
          <div>
            <Avatar className='h-10 w-10 cursor-pointer rounded-full border border-gray-300 transition-transform hover:scale-105'>
              <AvatarImage
                src={profileImageUrl}
                alt='User Profile Image'
                className='object-cover'
              />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={`w-48 mt-2 transition-all duration-150 ease-out transform ${
            open
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-1 pointer-events-none'
          }`}
          align='end'
          sideOffset={8}
          forceMount
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => router.push('/dash')}
          >
            Dashboard
          </DropdownMenuItem>
          
          {/* <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem> */}
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => executeSignOutMutation({})}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
