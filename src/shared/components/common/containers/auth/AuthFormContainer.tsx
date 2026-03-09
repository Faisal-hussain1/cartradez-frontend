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
  fromContainerStyles = '',
}: AuthFormContainerProps) => {
  return (
    <div
      className={`w-full md:mt-2 mt-10 p-[14px] md:p-[20px] rounded-[14px] shadow-2xl ${fromContainerStyles}`}
    >
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
