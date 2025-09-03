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

interface ProductCardProps {
  name: string;
  year: string;
  engine: string;
  miles: string;
  fuel: string;
  transmission: string;
  price: string;
  badge?: string | null;
  image: string;
}

export default function ProductCard({
  name,
  year,
  engine,
  miles,
  fuel,
  transmission,
  price,
  badge,
  image,
}: ProductCardProps) {
  return (
    <Card className='overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition p-0'>
      <div className='relative w-full h-48'>
        <Image src={image} alt={name} fill className='object-cover' />
        {badge && (
          <Badge className='absolute top-3 left-3 bg-green-500 text-white px-3 py-1'>
            {badge}
          </Badge>
        )}
      </div>
      <CardContent className='pt-5 pb-3'>
        <h3 className='text-lg font-semibold'>
          {name} – {year}
        </h3>
        <p className='text-sm text-gray-500'>{truncateWords({text: engine})}</p>

        <Separator className='mt-2' />

        <div className='grid grid-cols-3 gap-2 mt-3 text-sm text-gray-600'>
          <div>
            <p className='flex justify-center'>
              <IoSpeedometerOutline />
            </p>
            <p className='text-center'>{miles}</p>
          </div>
          <div>
            <p className='flex justify-center'>
              <BsFuelPump />
            </p>
            <p className='text-center'>{fuel}</p>
          </div>
          <div>
            <p className='flex justify-center'>
              <TbAutomaticGearboxFilled />
            </p>
            <p className='text-center'>{transmission}</p>
          </div>
        </div>

        <Separator className='mt-2' />

        <div className='flex items-center justify-between mt-4'>
          <span className='text-xl font-bold'>{price}</span>
          <SubmitButton buttonText='View Details' />
        </div>
      </CardContent>
    </Card>
  );
}
