'use client';

import Image from 'next/image';
import Link from 'next/link';
import useTranslation from '@/shared/hooks/useTranslation';
import BottomBar from './BottomBar';
import {LANDING_FOOTER_LINKS} from '@/shared/constants/PATHS';

export default function Footer() {
  const {t} = useTranslation();

  return (
    <footer className='bg-card text-foreground pt-12'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-10 text-center sm:text-left'>
          {/* Logo */}
          <div className='col-span-2 sm:col-span-1 flex flex-col items-center sm:items-start'>
            <Image
              src='/images/logo-black.png'
              alt='CarTradez Logo'
              width={140}
              height={50}
              className='mb-4'
            />
          </div>

          {/* CarTradez Section */}
          <div>
            <h3 className='font-semibold text-base mb-4'>
              {t('footer.sections.cartradez')}
            </h3>
            <ul className='space-y-2 text-sm text-gray80'>
              {LANDING_FOOTER_LINKS.cartradez.map((link) => (
                <li key={link.value}>
                  <Link
                    href={link.url}
                    className='hover:text-primary font-semibold'
                  >
                    {t(`footer.links.${link.value}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Buy a Car */}
          <div>
            <h3 className='font-semibold text-base mb-4'>
              {t('footer.sections.buyCar')}
            </h3>
            <ul className='space-y-2 text-sm text-gray80'>
              {LANDING_FOOTER_LINKS.buyACar.map((link) => (
                <li key={link.value}>
                  <Link
                    href={link.url}
                    className='hover:text-primary font-semibold'
                  >
                    {t(`footer.links.${link.value}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sell a Car */}
          <div>
            <h3 className='font-semibold text-base mb-4'>
              {t('footer.sections.sellCar')}
            </h3>
            <ul className='space-y-2 text-sm text-gray80'>
              {LANDING_FOOTER_LINKS.SellACar.map((link) => (
                <li key={link.value}>
                  <Link
                    href={link.url}
                    className='hover:text-primary font-semibold'
                  >
                    {t(`footer.links.${link.value}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className='font-semibold text-base mb-4'>
              {t('footer.sections.connect')}
            </h3>
            <div className='flex justify-center sm:justify-start space-x-5'>
              {LANDING_FOOTER_LINKS.socials.map((link) => (
                <a
                  key={link.value}
                  href={link.url}
                  aria-label={link.value}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray80 hover:text-primary transition'
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <BottomBar />
      </div>
    </footer>
  );
}
