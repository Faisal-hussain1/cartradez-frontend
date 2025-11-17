import {AuthFormHeadingProps} from '@/shared/interfaces/auth';

export const AuthFormHeading = ({heading}: AuthFormHeadingProps) => {
  return (
    <h1 className='text-[24px] md:text-[30px] font-bold text-primary mb-2'>
      {heading}
    </h1>
  );
};

export const AuthFormSubHeading = ({heading}: AuthFormHeadingProps) => {
  return <p className='text-sm text-gray90'>{heading}</p>;
};
