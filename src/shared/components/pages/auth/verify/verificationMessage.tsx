import {AUTH_ROUTES} from '@/shared/constants/PATHS';
import useTranslation from '@/shared/hooks/useTranslation';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import {userMutations} from '@/shared/reactQuery';
import {VerificationMessageProps} from '@/shared/interfaces/auth';
import { useParams } from 'next/navigation';
import { string } from 'yup';

const VerificationMessage = ({
  message,
  unsuccessful,
  successful,
  email,
}: VerificationMessageProps) => {
  const router = useLocaleRouter();
  const {t} = useTranslation();
  const {useResendVerificationMutation} = userMutations();
  const API_URL=`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1` as string;

  const {mutate: executeResendPasswordMutation, isPending} =
    useResendVerificationMutation();

  const resendLink = async () => {
    executeResendPasswordMutation({payload: email});
  };
  const params=useParams();


  async function verifyUser(){
    const res=await fetch(`${API_URL}/users/verify/${params.token}`);
    const result=await res.json();
    if(result.success==true){
      router.push(AUTH_ROUTES.login);
    }
  }

  return (
    <div>
      {message && (
        <>
          <p>{message}</p>
          <button disabled={isPending} onClick={resendLink}>
            {!isPending ? t('auth.newlink') : t('auth.loader')}
          </button>
        </>
      )}
      {successful && (
        <>
          {successful}
          <button className='cursor-pointer bg-primary' onClick={() => verifyUser() }>
            {t('auth.clickLogin')}
          </button>
        </>
      )}
      {unsuccessful && (
        <>
          {unsuccessful}
          <button onClick={resendLink}>{t('auth.getNewlink')}</button>
        </>
      )}
    </div>
  );
};

export default VerificationMessage;
