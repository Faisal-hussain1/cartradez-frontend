'use client';
import {Menu} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/shared/components/ui/navigation-menu';
import {Sheet, SheetContent, SheetTrigger} from '@/shared/components/ui/sheet';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import useTranslation from '@/shared/hooks/useTranslation';
import Container from '@/shared/components/common/containers';
import {USER_ROUTES} from '@/shared/constants/PATHS';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/shared/redux/slices/users';
import {userMutations} from '@/shared/reactQuery';

export default function Navbar() {
  const {t} = useTranslation();

  const router = useLocaleRouter();

  const currentUser = useSelector(getCurrentUser);
  const isLoggedIn = Boolean(currentUser?._id);

  const {useSignOutMutation} = userMutations();

  const {mutate: executeSignOutMutation} = useSignOutMutation();

  return (
    <header className='w-full flex justify-center bg-white border-b shadow-md sticky top-0 z-50'>
      <Container className='max-w-[1200px] 2xl:max-w-[1440px]'>
        <div className='flex items-center justify-between py-3'>
          {/* Logo */}
          <h2 className='text-black font-semibold text-lg'>Car Tradez</h2>

          {/* Desktop Navigation */}
          <NavigationMenu className='hidden md:flex'>
            <NavigationMenuList className='space-x-10'>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href='/'
                  className='text-black hover:text-amber-700 transition'
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Example more nav items */}
              <NavigationMenuItem>
                <NavigationMenuLink
                  href='/about'
                  className='text-black hover:text-amber-700 transition'
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href='/contact'
                  className='text-black hover:text-amber-700 transition'
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <PrimaryButton
                  buttonText='Post an Ad'
                  onClick={() => router.push(USER_ROUTES.AddProduct)}
                />
              </NavigationMenuItem>

              {isLoggedIn && (
                <NavigationMenuItem>
                  <PrimaryButton
                    buttonText='Logout'
                    onClick={() => executeSignOutMutation({})}
                  />
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Navigation */}
          <div className='md:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <PrimaryButton
                  buttonText={<Menu />}
                  onClick={() => {
                    console.log('ok');
                  }}
                />
              </SheetTrigger>
              <SheetContent side='left' className='w-64'>
                <nav className='flex flex-col gap-4 mt-8'>
                  <Link
                    href='/'
                    className='text-lg text-black hover:text-amber-700'
                  >
                    Home
                  </Link>
                  <Link
                    href='/web'
                    className='text-lg text-black hover:text-amber-700'
                  >
                    Web Development
                  </Link>
                  <Link
                    href='/mobile'
                    className='text-lg text-black hover:text-amber-700'
                  >
                    Mobile Apps
                  </Link>
                  <Link
                    href='/design'
                    className='text-lg text-black hover:text-amber-700'
                  >
                    UI/UX Design
                  </Link>
                  <Link
                    href='/about'
                    className='text-lg text-black hover:text-amber-700'
                  >
                    About
                  </Link>
                  <Link
                    href='/contact'
                    className='text-lg text-black hover:text-amber-700'
                  >
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
