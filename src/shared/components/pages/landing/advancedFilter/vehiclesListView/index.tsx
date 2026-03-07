'use client';

import {Card, CardContent} from '@/shared/components/ui/card';
import {Button} from '@/shared/components/ui/button';
import {Calendar, Heart} from 'lucide-react';
import Image from 'next/image';
import {stringToTitleCase} from '@/shared/utils/general';
import EmptyDataPlaceholder from '@/shared/components/common/EmptyDataPlaceholder';

interface VehiclesListViewProps {
  vehicles: any[];
  title: string;
}

export default function VehiclesListView({
  vehicles,
  title,
}: VehiclesListViewProps) {
  return (
    <div className='w-full space-y-4'>
      <h2 className='text-xl font-semibold text-black mb-3'>{title}</h2>

      {vehicles?.length > 0 ? (
        vehicles?.map((vehicle) => (
          <Card
            key={vehicle.id}
            className='border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white'
          >
            <CardContent className='p-0'>
              <div className='flex flex-row gap-3'>
                <div className='w-[220px] h-[150px] relative flex-shrink-0 overflow-hidden'>
                  <Image
                    src={vehicle.coverImage.url}
                    alt={vehicle.make}
                    fill
                    className='object-cover'
                  />
                </div>

                {/* Right Section */}
                <div className='flex flex-col justify-between w-full p-3'>
                  <div className='flex justify-between items-start'>
                    <p className='text-lg font-semibold text-gray-900'>
                      {`${stringToTitleCase({str: vehicle.make})} ${stringToTitleCase(
                        {
                          str: vehicle.model,
                        }
                      )}`}
                    </p>

                    <p className='text-lg font-bold text-primary whitespace-nowrap'>
                      {`${vehicle.currency === 'usd' ? '$' : 'ZMW'} ${vehicle.price.toLocaleString()}`}
                    </p>
                  </div>
                  {/* 
                  <div className='flex items-start gap-10'>
                    <div className='flex'>
                      <Calendar className='h-5 w-5 text-gray90' />
                      <p>{vehicle.year}</p>
                    </div>

                    <div className='flex'>
                      <Calendar className='h-5 w-5 text-gray90' />
                      <p>{vehicle.year}</p>
                    </div>

                    <div className='flex'>
                      <Calendar className='h-5 w-5 text-gray90' />
                      <p>{vehicle.year}</p>
                    </div>

                    <div className='flex'>
                      <Calendar className='h-5 w-5 text-gray90' />
                      <p>{vehicle.year}</p>
                    </div>
                  </div> */}

                  {/* Bottom Row */}
                  <div className='flex justify-between items-center mt-3'>
                    <p className='text-primary text-sm'>3 Days Ago</p>

                    {/* Buttons */}
                    <div className='flex items-center gap-3'>
                      <Heart className='w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer' />

                      <Button
                        variant='default'
                        className='bg-primary text-white px-4 py-2 rounded-md'
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className='flex-1 flex items-center justify-center w-full'>
          <EmptyDataPlaceholder title='premium vehicle' />
        </div>
      )}
    </div>
  );
}
