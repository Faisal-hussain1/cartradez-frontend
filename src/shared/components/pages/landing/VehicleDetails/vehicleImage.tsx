'use client';
import * as React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VehicleImage {
  id: string;
  url: string;
  alt?: string;
  isFeatured?: boolean;
}

interface VehicleImagesProps {
  images: VehicleImage[];
  maxThumbnailsToShow?: number;
}

export default function VehicleImages({
  images,
  maxThumbnailsToShow = 3,
}: VehicleImagesProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [showAllThumbnails, setShowAllThumbnails] = React.useState(false);

  const featuredImageIndex = images.findIndex((img) => img.isFeatured);
  const initialActiveIndex = featuredImageIndex !== -1 ? featuredImageIndex : 0;

  React.useEffect(() => {
    setActiveIndex(initialActiveIndex);
  }, [initialActiveIndex]);

  const initialThumbsToShow = images.slice(0, maxThumbnailsToShow);
  const extraCount = images.length - maxThumbnailsToShow;
  const displayedThumbnails = showAllThumbnails ? images : initialThumbsToShow;

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleShowAllThumbnails = () => {
    setShowAllThumbnails(!showAllThumbnails);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Main Image */}
      <div className="relative w-full aspect-[16/9] md:aspect-[16/10] lg:aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">

        <Image
          src={images[activeIndex].url}
          alt={images[activeIndex].alt || `Vehicle image ${activeIndex + 1}`}
          fill
          className="object-cover transition-all duration-500 ease-in-out"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />

        {/* Featured badge */}
        {images[activeIndex].isFeatured && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-xs px-2 py-1 rounded-md font-semibold">
            Featured
          </span>
        )}

        {/* Navigation buttons */}
        <button
          onClick={prevImage}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-md transition z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-md transition z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
        </button>

        {/* Indicator dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                index === activeIndex
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Thumbnails */}
      <div className="w-full">

        <div
          className={`grid gap-3 ${
            showAllThumbnails
              ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'
              : 'grid-cols-4 sm:grid-cols-5 md:grid-cols-6'
          }`}
        >

          {displayedThumbnails.map((image) => {
            const actualIndex = images.findIndex((img) => img.id === image.id);

            return (
              <div
                key={image.id}
                className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  actualIndex === activeIndex
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => setActiveIndex(actualIndex)}
              >
                <Image
                  src={image.url}
                  alt={image.alt || `Thumbnail ${actualIndex + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-200"
                  sizes="(max-width: 768px) 25vw, (max-width: 1024px) 20vw, 15vw"
                />

                {image.isFeatured && !showAllThumbnails && (
                  <span className="absolute top-1 left-1 bg-yellow-400 text-[10px] px-1 py-0.5 rounded font-semibold">
                    Featured
                  </span>
                )}
              </div>
            );
          })}

          {/* View All */}
          {!showAllThumbnails && extraCount > 0 && (
            <button
              onClick={toggleShowAllThumbnails}
              className="relative aspect-video rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 flex flex-col items-center justify-center transition group"
            >
              <span className="text-xl md:text-2xl font-bold text-gray-600 group-hover:text-gray-800">
                +{extraCount}
              </span>
              <span className="text-xs md:text-sm text-gray-500 group-hover:text-gray-700">
                View All
              </span>
            </button>
          )}

          {/* Show Less */}
          {showAllThumbnails && (
            <button
              onClick={toggleShowAllThumbnails}
              className="relative aspect-video rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-xs md:text-sm font-semibold text-gray-600"
            >
              Show Less
            </button>
          )}

        </div>
      </div>

    </div>
  );
}