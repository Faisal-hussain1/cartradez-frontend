import {AuthFormContainerProps} from '@/shared/interfaces/common';
import {
  AuthFormHeading,
  AuthFormSubHeading,
} from '@/shared/components/common/auth';

const AuthFormContainer = ({
  children,
  handleSubmit,
  heading,
  subHeading = '',
  formStyles = '',
}: AuthFormContainerProps) => {
  return (
    <div className='w-full max-w-[1000px] md:mt-16 mt-20 p-[14px] md:p-[30px] rounded-[14px] shadow-2xl'>
      <AuthFormHeading heading={heading} />
      {subHeading && <AuthFormSubHeading heading={subHeading} />}
      <form
        className={`flex flex-col gap-5 mt-5 ${formStyles}`}
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </div>
  );
};

export default AuthFormContainer;
