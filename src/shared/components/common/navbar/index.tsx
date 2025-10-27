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
import {LANDING_MENU_BAR_LINKS, USER_ROUTES} from '@/shared/constants/PATHS';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/shared/redux/slices/users';
import {userMutations} from '@/shared/reactQuery';
import {HoverDropdown} from '../dropdown';

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
          {/* <h2 className='text-black font-semibold text-lg'>Car Tradez</h2> */}
          <Image
            src={'/images/logo-black.png'}
            alt='pic'
            width={80}
            height={60}
            onClick={() => router.push(LANDING_MENU_BAR_LINKS.home.url)}
            className='cursor-pointer'

            // className='mt-[30px] md:mt-[98px] w-[204px] h-[224px] md:w-[318px] md:h-[342px]'
          />

          {/* Desktop Navigation */}
          <NavigationMenu className='hidden md:flex'>
            <NavigationMenuList className='space-x-5'>
              {Object.values(LANDING_MENU_BAR_LINKS).map((item) => (
                <NavigationMenuItem key={item.value}>
                  {item.url ? (
                    <NavigationMenuLink
                      href={item.url}
                      className='text-black hover:text-amber-700 transition'
                    >
                      {item.label}
                    </NavigationMenuLink>
                  ) : (
                    <span className='text-black opacity-50 cursor-not-allowed'>
                      {item.label}
                    </span>
                  )}
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <PrimaryButton
                  buttonText='Post an Ad'
                  onClick={() => router.push(USER_ROUTES.addVehicle)}
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

              {/* <HoverDropdown
                label='Menu'
                items={[
                  {
                    label: 'Profile',
                    onClick: () => console.log('Profile clicked'),
                  },
                  {label: 'Billing'},
                  {label: 'Settings'},
                  {label: 'Logout'},
                ]}
              /> */}
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
                <nav className='flex flex-col gap-4 mt-8 px-5'>
                  {Object.values(LANDING_MENU_BAR_LINKS).map((item) => (
                    <Link
                      key={item.url}
                      href={item.url}
                      className='text-lg text-black hover:text-amber-700 transition'
                    >
                      {item.label}
                    </Link>
                  ))}

                  {/* Extra Actions */}
                  <div className='flex flex-col gap-2 mt-4'>
                    <PrimaryButton
                      buttonText='Post an Ad'
                      onClick={() => router.push(USER_ROUTES.addVehicle)}
                    />
                    {isLoggedIn && (
                      <PrimaryButton
                        buttonText='Logout'
                        onClick={() => executeSignOutMutation({})}
                      />
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
