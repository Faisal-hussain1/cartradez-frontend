import {CardFieldProps, ThemeColorProps} from '@/shared/interfaces/dashboard';

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
