import { AUTH_ROUTES } from '@/shared/constants/PATHS';
import useTranslation from '@/shared/hooks/useTranslation';
import useLocaleRouter from '@/shared/hooks/useLocaleRouter';
import { userMutations } from '@/shared/reactQuery';
import { VerificationMessageProps } from '@/shared/interfaces/auth';
import { useParams } from 'next/navigation';

const VerificationMessage = ({
  message,
  unsuccessful,
  successful,
  email,
}: VerificationMessageProps) => {
  const router = useLocaleRouter();
  const { t } = useTranslation();
  const { useResendVerificationMutation } = userMutations();
  const API_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

  const { mutate: executeResendPasswordMutation, isPending } =
    useResendVerificationMutation();

  const resendLink = async () => {
    executeResendPasswordMutation({ payload: email });
  };

  const params = useParams();

  async function verifyUser() {
    const res = await fetch(`${API_URL}/users/verify/${params.token}`);
    const result = await res.json();
    if (result.success === true) {
      router.push(AUTH_ROUTES.login);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 text-center space-y-6">
        
        <h2 className="text-2xl font-semibold text-gray-800">
          Account Verified
        </h2>

        {message && (
          <div className="space-y-4">
            <p className="text-gray-600">{message}</p>

            <button
              disabled={isPending}
              onClick={resendLink}
              className="bg-[#414279] cursor-pointer w-full py-3 rounded-lg bg-[#414279] text-white font-medium hover:bg-blue-700 transition disabled:opacity-60"
            >
              {!isPending ? t('auth.newlink') : t('auth.loader')}
            </button>
          </div>
        )}

        {successful && (
          <div className="space-y-4">
            <p className="text-green-600 font-medium">{successful}</p>

            <button
              onClick={() => verifyUser()}
              className="w-full py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
            >
              {t('auth.clickLogin')}
            </button>
          </div>
        )}

        {unsuccessful && (
          <div className="space-y-4">
            <p className="text-red-600 font-medium">{unsuccessful}</p>

            <button
              onClick={resendLink}
              className="w-full py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
            >
              {t('auth.getNewlink')}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default VerificationMessage;