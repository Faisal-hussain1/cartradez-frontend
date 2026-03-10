'use client';

import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import PrimaryButton from '@/shared/components/common/buttons/PrimaryButton';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/shared/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/components/ui/sheet';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import Container from '@/shared/components/common/containers';
import {
  AUTH_ROUTES,
  LANDING_MENU_BAR_LINKS,
} from '@/shared/constants/PATHS';
import { useSelector } from 'react-redux';
import { getCurrentUser, getUserRole } from '@/shared/redux/slices/users';
import { userMutations } from '@/shared/reactQuery';
import HoverAvatarDropdown from '../hoverAvatarDropdown';

export default function Navbar() {

  const router = useLocaleRouter();

  const currentUser = useSelector(getCurrentUser);
  const userRole = useSelector(getUserRole);

  const isLoggedIn = Boolean(currentUser?._id);

  function routeBasedOnRole(role: any) {
    if (role === 'dealer' || role === 'admin') {
      router.push('/vehicles/add');
    } else {
      router.push('/selectRole');
    }
  }

  const { useSignOutMutation } = userMutations();
  const { mutate: executeSignOutMutation } = useSignOutMutation();

  return (
    <header className="w-full bg-white border-b shadow-md sticky top-0 z-50">
      <Container className="max-w-[1200px] 2xl:max-w-[1440px]">

        <div className="flex items-center justify-between py-2">

          {/* Logo */}
          <Image
            src={'/images/logo-black.png'}
            alt="logo"
            width={70}
            height={70}
            onClick={() => router.push('/')}
            className="cursor-pointer w-[50px] sm:w-[60px] h-auto"
          />

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex items-center gap-6">

              {Object.values(LANDING_MENU_BAR_LINKS).map((item) => (
                <NavigationMenuItem key={item.value}>
                  {item.url ? (
                    <NavigationMenuLink
                      href={item.url}
                      className="text-sm font-semibold text-black hover:text-primary transition whitespace-nowrap"
                    >
                      {item.label}
                    </NavigationMenuLink>
                  ) : (
                    <span className="text-sm font-semibold text-black opacity-50 cursor-not-allowed">
                      {item.label}
                    </span>
                  )}
                </NavigationMenuItem>
              ))}

              {/* Post Ad */}
              <NavigationMenuItem>
                <PrimaryButton
                  buttonText="Post an Ad"
                  onClick={() => routeBasedOnRole(userRole)}
                />
              </NavigationMenuItem>

              {/* Auth */}
              {isLoggedIn ? (
                <NavigationMenuItem>
                  <HoverAvatarDropdown />
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <PrimaryButton
                    buttonText="SignUp/Login"
                    onClick={() => router.push('/auth/login')}
                  />
                </NavigationMenuItem>
              )}

            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2">
                  <Menu size={26} />
                </button>
              </SheetTrigger>

              <SheetContent side="left" className="w-64">

                <nav className="flex flex-col gap-5 mt-8 px-4">

                  {Object.values(LANDING_MENU_BAR_LINKS).map((item) => (
                    <Link
                      key={item.url}
                      href={item.url}
                      className="text-base font-medium text-black hover:text-primary transition"
                    >
                      {item.label}
                    </Link>
                  ))}

                  <div className="mt-4 flex gap-3">

                    <PrimaryButton
                      buttonText="Post an Ad"
                      onClick={() => routeBasedOnRole(userRole)}
                    />

                    {isLoggedIn ? (
                      <HoverAvatarDropdown />
                    ) : (
                      <PrimaryButton
                        buttonText="SignUp/Login"
                        onClick={() => router.push(AUTH_ROUTES.login)}
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