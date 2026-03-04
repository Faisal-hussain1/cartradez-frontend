'use client';

import Link from 'next/link';
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/shared/redux/slices/users';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {AUTH_ROUTES, USER_ROUTES} from '@/shared/constants/PATHS';

export default function SellCarChoice() {
  const router = useLocaleRouter();
  const currentUser = useSelector(getCurrentUser);
  const isLoggedIn = Boolean(currentUser?._id);

  const handlePostAd = () => {
    if (!isLoggedIn) {
      router.push(AUTH_ROUTES.login);

      return;
    }

    router.push(USER_ROUTES.addVehicle);
  };

  return (
    <section className='flex-center px-4 py-16 bg-background font-sans'>
      <div className='w-full max-w-5xl rounded-lg bg-card shadow-sm border'>
        {/* Heading */}
        <div className='text-center py-8 px-6 border-b'>
          <h2 className='text-2xl font-semibold text-primary'>
            Sell Your Car on CarTradez and Get the Best Price
          </h2>
        </div>

        {/* Options */}
        <div className='relative grid grid-cols-1 md:grid-cols-2'>
          {/* OR divider — SAME AS OLD */}
          <div className='hidden md:flex absolute inset-y-0 left-1/2 -translate-x-1/2 items-center'>
            <div className='flex flex-col items-center'>
              <span className='bg-card border px-4 py-1 rounded-full text-sm font-semibold text-muted-foreground shadow-sm'>
                OR
              </span>
              <div className='absolute h-full w-px bg-border -z-10' />
            </div>
          </div>

          {/* ================= INDIVIDUAL USER ================= */}
          <div className='p-8 flex flex-col items-center text-center space-y-6'>
            <h3 className='text-xl font-semibold text-primary'>
              Individual User
            </h3>

            <ul className='flex flex-col items-start gap-2 text-sm text-muted-foreground'>
              <li className='flex items-center gap-2'>
                <span className='text-green100'>✔</span>
                Post an ad in 2 minutes
              </li>

              <li className='flex items-center gap-2'>
                <span className='text-green100'>✔</span>
                Reach thousands of buyers
              </li>

              <li className='flex items-center gap-2'>
                <span className='text-green100'>✔</span>
                Connect directly with buyers
              </li>
            </ul>

            {/* 🔥 ONLY THIS PART IS LOGIC AWARE */}
            <button
              onClick={handlePostAd}
              className='mt-4 inline-flex items-center justify-center cursor-pointer rounded-md bg-primary2 px-6 py-3 text-white font-medium hover:opacity-90 transition'
            >
              Post Your Ad
            </button>
          </div>

          {/* ================= DEALER SECTION — 100% SAME ================= */}
          <div className='p-8 flex flex-col items-center text-center space-y-6 border-t md:border-t-0 md:border-l'>
            <h3 className='text-xl font-semibold text-primary'>
              Become a Dealer
            </h3>

            <ul className='flex flex-col items-start gap-2 text-sm text-muted-foreground'>
              <li className='flex items-center gap-2'>
                <span className='text-green100'>✔</span>
                Sell cars professionally
              </li>

              <li className='flex items-center gap-2'>
                <span className='text-green100'>✔</span>
                Verified dealer profile
              </li>

              <li className='flex items-center gap-2'>
                <span className='text-green100'>✔</span>
                Premium listing exposure
              </li>
            </ul>

            <Link
              href='/dealer-requestform'
              className='mt-4 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-white font-medium hover:opacity-90 transition'
            >
              Become a Dealer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
