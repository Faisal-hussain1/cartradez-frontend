import {ErrorMessageProps} from '@/shared/interfaces/inputs';

function ErrorMessage({errorMsg}: ErrorMessageProps) {
  return <div className='text-error text-[13px]'>{errorMsg}</div>;
}

export default ErrorMessage;
