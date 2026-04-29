'use client';

import EmptyDataPlaceholder from '@/shared/components/common/EmptyDataPlaceholder';
import { Vehicle } from '@/shared/interfaces/common';
import { CommonCarousel } from '../cardSlider';
import { useResponsiveSlides } from '@/shared/hooks/useResponsiveSlide';
import VehicleCard from '../vehicleCard';
import { useMemo } from 'react';

const normalizeText = (value: any) =>
  String(value || '')
    .toLowerCase()
    .trim();

const getListingType = (vehicle: any) => {
  return normalizeText(
    vehicle?.listingType ||
      vehicle?.listing_type ||
      vehicle?.listing?.type ||
      vehicle?.packageType
  );
};

export default function VehicleListingWithListingType({
  PaginationComponent,
  filteredData = [],
  isPaginationShow = true,
  searchValue = '',
}: any) {
  const slidesToShow = useResponsiveSlides();

  const vehicles = filteredData || [];
  const isSearching = normalizeText(searchValue).length > 0;

  const premiumVehicles = useMemo(() => {
    return vehicles.filter((v: Vehicle) => getListingType(v) === 'premium');
  }, [vehicles]);

  const quickSellVehicles = useMemo(() => {
    return vehicles.filter((v: Vehicle) => {
      const type = getListingType(v);

      return (
        type === 'quick sell' ||
        type === 'quick_sell' ||
        type === 'quicksell'
      );
    });
  }, [vehicles]);

  const standardVehicles = useMemo(() => {
    return vehicles.filter((v: Vehicle) => getListingType(v) === 'standard');
  }, [vehicles]);

  const sections = [
    {
      title: 'Premium Listings',
      emptyTitle: 'premium vehicle',
      items: premiumVehicles,
      slidesToShow: 5,
    },
    {
      title: 'Quick Sell Listings',
      emptyTitle: 'quick sell vehicle',
      items: quickSellVehicles,
      slidesToShow: 5,
    },
    {
      title: 'Standard Listings',
      emptyTitle: 'standard vehicle',
      items: standardVehicles,
      slidesToShow,
    },
  ];

  const visibleSections = isSearching
    ? sections.filter((section) => section.items.length > 0)
    : sections;

  if (isSearching && visibleSections.length === 0) {
    return (
      <div className='flex-1 flex items-center justify-center w-full'>
        <EmptyDataPlaceholder title='vehicle' />
      </div>
    );
  }

  return (
    <div className='w-full'>
      {visibleSections.map((section, index) => (
        <div key={section.title} className={index === 0 ? '' : 'mt-10'}>
          {section.items.length > 0 ? (
            <div>
              <CommonCarousel
                title={section.title}
                items={section.items}
                slidesToShow={section.slidesToShow}
                renderItem={(vehicle) => <VehicleCard vehicle={vehicle} />}
              />

              {isPaginationShow && (
                <div className='w-full flex justify-end my-5'>
                  {PaginationComponent}
                </div>
              )}
            </div>
          ) : (
            <div className='flex-1 flex items-center justify-center w-full'>
              <EmptyDataPlaceholder title={section.emptyTitle} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}