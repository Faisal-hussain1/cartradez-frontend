import {SettingsContainerProps} from '@/shared/interfaces/settings';

export default function SettingsContainer({
  children,
  heading,
}: SettingsContainerProps) {
  return (
    <div className='shadow-glow my-6 p-6 rounded-[14px]'>
      <h3 className='font-semibold text-lg leading-7 text-gray90'>{heading}</h3>
      <div className='mt-4'>{children}</div>
    </div>
  );
}
