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

export default function HoverAvatarDropdown({
  profileImageUrl,
}: {
  profileImageUrl?: string;
}) {
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
            <Avatar className='h-9 w-10 cursor-pointer border border-gray-300 transition-transform hover:scale-105'>
              <AvatarImage
                src={profileImageUrl || '/images/avatar-default.jpeg'}
                alt='User Profile Image'
              />
              <AvatarFallback>KA</AvatarFallback>
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
