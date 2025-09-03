import Image from 'next/image';
import {useSelector} from 'react-redux';
import useTranslation from '@/shared/hooks/useTranslation';
import {getCurrentUser} from '@/shared/redux/slices/users';
import {ROLES_LABELS} from '@/shared/constants/users';

const UserInfo = () => {
  const user = useSelector(getCurrentUser);
  const {ct} = useTranslation();

  const roleLabels = ct(ROLES_LABELS);

  return (
    <div className='flex-col-center'>
      <Image
        src='/images/user.png'
        alt='user'
        width={144}
        height={144}
        className='rounded-full border-[3px] border-white'
      />
      <div className='pt-5 pb-[30px] flex-col-center gap-[6px]'>
        <p className='text-white text-[10px]'>
          {roleLabels[user?.currentActiveOrganization.role as string]?.label}
        </p>
        <p className='text-xl text-white font-semibold'>{user?.name}</p>
        <p className='text-sm text-white'>{user?.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
