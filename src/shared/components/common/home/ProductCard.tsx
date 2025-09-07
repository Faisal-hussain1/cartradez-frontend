'use client';

import Image from 'next/image';
import {BsFuelPump} from 'react-icons/bs';
import {IoSpeedometerOutline} from 'react-icons/io5';
import {TbAutomaticGearboxFilled} from 'react-icons/tb';

import SubmitButton from '@/shared/components/common/buttons/submitButton';
import {Badge} from '@/shared/components/ui/badge';
import {Card, CardContent} from '@/shared/components/ui/card';
import {Separator} from '@/shared/components/ui/separator';
import {truncateWords} from '@/shared/utils/general';
import {ProductCardProps} from '@/shared/interfaces/products';

export default function ProductCard({product}: ProductCardProps) {
  product.badge = 'Good Price';

  return (
    <Card className='overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition p-0'>
      <div className='relative w-full h-48'>
        <Image
          src={product.images[0].url}
          alt={product.title}
          fill
          className='object-cover'
        />
        {product.badge && (
          <Badge className='absolute top-3 left-3 bg-green-500 text-white px-3 py-1'>
            {product.badge}
          </Badge>
        )}
      </div>
      <CardContent className='pt-5 pb-3'>
        <h3 className='text-lg font-semibold'>
          {product.title} – {product.year}
        </h3>
        <p className='text-sm text-gray-500'>
          {truncateWords({text: product.description})}
        </p>

        <Separator className='mt-2' />

        <div className='grid grid-cols-3 gap-2 mt-3 text-sm text-gray-600'>
          <div>
            <p className='flex justify-center'>
              <IoSpeedometerOutline />
            </p>
            <p className='text-center'>{product.mileage}</p>
          </div>
          <div>
            <p className='flex justify-center'>
              <BsFuelPump />
            </p>
            <p className='text-center'>{product.fuelType}</p>
          </div>
          <div>
            <p className='flex justify-center'>
              <TbAutomaticGearboxFilled />
            </p>
            <p className='text-center'>{product.transmission}</p>
          </div>
        </div>

        <Separator className='mt-2' />

        <div className='flex items-center justify-between mt-4'>
          <span className='text-xl font-bold'>
            ${product.price.toLocaleString()}
          </span>
          <SubmitButton buttonText='View Details' />
        </div>
      </CardContent>
    </Card>
  );
}
