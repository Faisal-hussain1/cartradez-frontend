import {NodeChildrenProps} from '@/shared/interfaces/common';
import {
  CardFieldProps,
  SellerCardActionsProps,
  SellerCardLinkProps,
  SellerFooterItemProps,
  ThemeColorProps,
} from '@/shared/interfaces/dashboard';
import {CheckMarkIcon, CopyIcon, WarningIcon} from '@/shared/components/icons';
import useTranslation from '@/shared/hooks/useTranslation';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

export const CardField = ({
  name,
  value,
  alignment = 'justify-between',
  isValueOnNewLine = false,
}: CardFieldProps) => {
  return (
    <div
      className={`flex ${alignment} flex ${isValueOnNewLine ? 'flex-col md:flex-row' : 'flex-row'} items-start md:gap-0 gap-3`}
    >
      <div className='text-sm text-secondary font-semibold'>{name}</div>
      <div
        className={`text-sm break-all text-secondary ${isValueOnNewLine ? 'w-full md:w-1/2' : 'w-1/2'}`}
      >
        {value}
      </div>
    </div>
  );
};

export const SellerCardContainer = ({children}: NodeChildrenProps) => {
  return (
    <div className='w-full rounded-2xl border border-gray10 flex flex-col justify-between'>
      {children}
    </div>
  );
};

interface BusinessCardContainerProps extends NodeChildrenProps {
  className?: string;
}

export const BusinessCardContainer = ({
  children,
  className,
}: BusinessCardContainerProps) => {
  return (
    <div
      className={`w-full flex flex-col justify-start items-start gap-[30px] rounded-2xl border border-gray10 p-5 mb-5 ${className}`}
    >
      {children}
    </div>
  );
};

export const ThemeColor = ({color}: ThemeColorProps) => {
  return (
    <div className='flex justify-start items-start gap-2'>
      <span
        className='w-4 h-4 rounded-[3px]'
        style={{backgroundColor: color}}
      ></span>
      <p className='text-sm text-secondary uppercase'>{color}</p>
    </div>
  );
};

export const ThemeColorBusinessCard = ({color}: ThemeColorProps) => {
  return (
    <div
      className='w-[59px] h-[22px] rounded-[4px]'
      style={{backgroundColor: color}}
    ></div>
  );
};

export const SellerCardLink = ({label, link, onClick}: SellerCardLinkProps) => {
  return (
    <div className='mt-4'>
      <span>{label}</span>
      <button
        onClick={onClick}
        className='flex justify-start items-start cursor-pointer gap-2 text-primary mt-1.5 text-left'
      >
        <p className='text-sm text-primary break-all underline'>{link}</p>
        <CopyIcon size={20} className='ml-2' />
      </button>
    </div>
  );
};

export const SellerCardWarningMessage = () => {
  const {t} = useTranslation();

  return (
    <div className='flex justify-start items-start gap-2 text-primary'>
      <WarningIcon size={20} className='text-error' />
      <p className='text-sm text-error'>{t('sellerList.incompleteBoarding')}</p>
    </div>
  );
};

export const SellerVerified = () => {
  const {t} = useTranslation();

  return (
    <div className='flex justify-start items-start gap-2 text-primary mt-7'>
      <CheckMarkIcon size={20} className='text-primary' />
      <p className='text-sm font-bold'>{t('sellerList.sellerVerified')}</p>
    </div>
  );
};

export const SellerFooterItem = ({
  label,
  value,
  color,
}: SellerFooterItemProps) => {
  let spanStyles = '';

  if (color) spanStyles += `w-[60px] h-[22px] rounded-[4px] mx-auto`;

  return (
    <div className='text-center flex-1 border-r-2 border-r-gray-300 last:border-r-0'>
      <strong
        className={`block ${spanStyles}`}
        style={{background: color ?? 'transparent'}}
      >
        {value || (!value && !color && 'N/A')}
      </strong>
      <span className='text-sm'>{label}</span>
    </div>
  );
};

export const SellerCardActions = ({
  Icon,
  onClick,
  tooltip,
}: SellerCardActionsProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Icon
          size={20}
          className='text-primary cursor-pointer'
          onClick={onClick}
        />
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};
