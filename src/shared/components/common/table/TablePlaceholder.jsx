import Image from 'next/image';
import {usePathname} from 'next/navigation';
import {tablePlaceHolderTitle} from '@/shared/constants/checkbook';
import useTranslation from '@/shared/hooks/useTranslation';

export default function TablePlaceholder() {
  const pathname = usePathname();
  const {t} = useTranslation();

  const titleKey = tablePlaceHolderTitle[pathname];
  const title = t(titleKey);
  const lowerCaseTitle = title.toLowerCase();

  return (
    <div className='flex flex-col items-center justify-center min-h-[400px]'>
      <div className='w-full max-w-md mx-auto text-center'>
        {/* Illustration */}
        <div className='mb-6 flex justify-center'>
          <div className='relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64'>
            <Image
              src='/images/table-fallback.png'
              alt={t('tablePlaceholder.imageAlt', {title})}
              fill
              className='object-contain'
              priority
            />
          </div>
        </div>

        {/* Heading */}
        <h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-3'>
          {t('tablePlaceholder.heading', {title})}
        </h2>

        {/* Description */}
        <div className='space-y-2 text-sm sm:text-base text-gray-600 leading-relaxed'>
          <p>{t('tablePlaceholder.description1', {title: lowerCaseTitle})}</p>
          <p>{t('tablePlaceholder.description2', {title: lowerCaseTitle})}</p>
        </div>
      </div>
    </div>
  );
}
