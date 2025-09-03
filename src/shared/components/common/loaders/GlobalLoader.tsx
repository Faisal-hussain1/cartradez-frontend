import {LoaderIcon} from '@/shared/components/icons';

const GlobalLoader = ({height = null}: {height?: string | null}) => {
  return (
    <div className={`flex-center ${height || 'h-screen'} w-full`}>
      <LoaderIcon size={24} className='loader-icon' />
    </div>
  );
};

export default GlobalLoader;
