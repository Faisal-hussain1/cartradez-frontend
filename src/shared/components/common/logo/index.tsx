import Image from 'next/image';
import {LogoProps} from '@/shared/interfaces/common';
import {LOGO_VARIATIONS} from '@/shared/constants/general';

const sizeMap = {
  auth: 'w-[111px] h-[59px] md:w-[204px] md:h-[109px]',
  sidebar: 'w-[186px] h-[102px] md:w-[186px] md:h-[102px]',
} as const;

type SizeVariations = keyof typeof sizeMap;

interface ExtendedLogoProps extends LogoProps {
  sizeVariation?: SizeVariations;
}

const Logo = ({
  width = 168,
  height = 90,
  variation = LOGO_VARIATIONS.black.value,
  styles = '',
  sizeVariation = 'auth',
}: ExtendedLogoProps) => {
  return (
    <Image
      src={`/images/logo-${variation}.png`}
      alt='logo'
      width={width}
      height={height}

      // className={`${sizeMap[sizeVariation]} ${styles}`}
    />
  );
};

export default Logo;
