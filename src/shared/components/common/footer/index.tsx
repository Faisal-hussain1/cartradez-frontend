'use client';

import Image from 'next/image';
import {useTranslation} from 'react-i18next';
import {Facebook, Instagram, Linkedin, Twitter} from 'lucide-react';
import BottomBar from '@/shared/components/common/footer/BottomBar';

export default function Footer() {
  const {t} = useTranslation();

  return (
    <footer className='bg-card  pt-12 text-foreground'>
      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-12 lg:grid-cols-4 xl:grid-cols-5 gap-10 pb-10 text-center sm:text-left'>
        {/* Logo */}
        <div className='col-span-1 flex flex-col items-center sm:items-start'>
          <Image
            src='/images/logo-black.png'
            alt='CarTradez Logo'
            width={120}
            height={50}
            className='mb-4'
          />
        </div>

        {/* CarTradez Section */}
        <div>
          <h3 className='font-semibold text-x mb-4'>
            {t('footer.sections.cartradez')}
          </h3>
          <ul className='space-y-2 text-sm text-gray80'>
            <li>
              <a href='#'>{t('footer.links.aboutUs')}</a>
            </li>
            <li>
              <a href='#'>{t('footer.links.faqs')}</a>
            </li>
            <li>
              <a href='#'>{t('footer.links.safety')}</a>
            </li>
            <li>
              <a href='#'>{t('footer.links.contact')}</a>
            </li>
          </ul>
        </div>

        {/* Buy a Car */}
        <div>
          <h3 className='font-semibold text-x mb-4'>
            {t('footer.sections.buyCar')}
          </h3>
          <ul className='space-y-2 text-sm text-gray80'>
            <li>
              <a href='#'>{t('footer.links.browseCars')}</a>
            </li>
            <li>
              <a href='#'>{t('footer.links.featuredCars')}</a>
            </li>
            <li>
              <a href='#'>{t('footer.links.managed')}</a>
            </li>
            <li>
              <a href='#'>{t('footer.links.buyersGuide')}</a>
            </li>
          </ul>
        </div>

        {/* Sell a Car */}
        <div>
          <h3 className='font-semibold text-x mb-4'>
            {t('footer.sections.sellCar')}
          </h3>
          <ul className='space-y-2 text-sm text-gray80'>
            <li>
              <a href='#'>{t('footer.links.postAd')}</a>
            </li>
            <li>
              <a href='#'>{t('footer.links.pricingPlans')}</a>
            </li>
            <li>
              <a href='#'>{t('footer.links.sellersGuide')}</a>
            </li>
            <li>
              <a href='#'>{t('footer.links.verification')}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='font-semibold text-x mb-4'>
            {t('footer.sections.connect')}
          </h3>
          <div className='flex justify-center sm:justify-start space-x-5'>
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href='#'
                className='text-gray80 hover:text-primary transition'
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div>
        <BottomBar />
      </div>
    </footer>
  );
}
