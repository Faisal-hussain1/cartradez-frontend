'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card';
import useTranslation from '@/shared/hooks/useTranslation';
import {formatDate} from '@/shared/utils/dateUtils';
import {
  CheckCircle,
  BadgeCheck,
  UserCheck,
  Car,
  Phone,
  Calendar,
} from 'lucide-react';

interface SellerDetailsType {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profileImage?: string;
  totalActiveVehicles: number;
  createdAt: string;
}

export default function SellerDetailsCard({
  sellerDetails,
}: {
  sellerDetails: SellerDetailsType;
}) {
  const {t} = useTranslation();

  return (
    <Card className='w-full rounded-2xl shadow-sm border border-gray-200'>
      <CardHeader className='pb-4 px-6'>
        <CardTitle className='text-lg font-semibold text-gray-900'>
          Seller Details
        </CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-4 px-6 pb-6'>
        {/* Seller Info */}
        <div className='flex items-start gap-3'>
          <img
            src={sellerDetails?.profileImage || '/images/default-user.PNG'}
            alt={'image'}
            className='w-14 h-14 rounded-full object-cover border border-gray-300'
          />
          <div className='flex flex-col'>
            <p className='font-semibold text-gray-900 text-base mb-1'>
              {`${sellerDetails?.firstName} ${sellerDetails?.lastName}`}
            </p>
            <div className='flex items-center gap-2 flex-wrap'>
              {/* {(sellerType === 'verified' || sellerType === 'both') && ( */}
              <div className='flex items-center gap-1.5 border border-green100 bg-green-50 text-green100 px-3 py-1 rounded-full text-[13px] font-medium leading-[100%]'>
                <CheckCircle className='w-4 h-4' />
                <span>Verified Seller</span>
              </div>
              {/* )} */}

              {/* {(sellerType === 'certified' || sellerType === 'both') && (
                <div className='flex items-center gap-1.5 border border-blue-500 bg-blue-50 text-blue-600 px-3 py-1 rounded-xl text-[13px] font-medium leading-[100%]'>
                  <UserCheck className='w-4 h-4' />
                  <span>Certified Dealer</span>
                </div>
              )} */}
            </div>
          </div>
        </div>

        <div className='space-y-3 text-sm text-gray-700 border-t border-gray-100 pt-4'>
          <div className='flex items-center gap-3'>
            <Car className='w-4 h-4 text-gray-500 flex-shrink-0' />
            <div className='flex items-center gap-1'>
              <span className='text-blue-600 hover:underline cursor-pointer font-medium'>
                {sellerDetails.totalActiveVehicles} Cars
              </span>
              <span className='text-gray-700'>
                currently listed on {t('mainPageTitle.appName')}
              </span>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <Phone className='w-4 h-4 text-gray-500 flex-shrink-0' />
            <a
              href={`tel:${sellerDetails.phoneNumber.replace(/\s/g, '')}`}
              className='text-blue-600 hover:underline font-medium'
            >
              {sellerDetails.phoneNumber}
            </a>
          </div>

          <div className='flex items-center gap-3'>
            <Calendar className='w-4 h-4 text-gray-500 flex-shrink-0' />
            <span>
              Member since{' '}
              {formatDate({date: sellerDetails.createdAt, format: 'LLL yyyy'})}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
