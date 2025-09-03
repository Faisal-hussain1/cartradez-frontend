import Image from 'next/image';
import Container from '@/shared/components/common/containers';
import Logo from '@/shared/components/common/logo';
import {
  MessageProps,
  NodeChildrenProps,
  NodeChildrenWithStyleProps,
} from '@/shared/interfaces/common';

const Title = ({children}: NodeChildrenProps) => (
  <h3 className='text-[20px] mt-[39px] md:text-[30px] text-center font-semibold md:font-bold text-secondary'>
    {children}
  </h3>
);

const Description = ({children, className}: NodeChildrenWithStyleProps) => (
  <p
    className={`${className} text-sm mt-[14px] md:text-base text-center text-secondary`}
  >
    {children}
  </p>
);

const MessageWithImage = ({
  imgSrc,
  title,
  description = '',
  descriptionStyle,
  containerStyle = 'h-screen',
}: MessageProps) => {
  return (
    <div
      className={`flex justify-center items-center w-full ${containerStyle}`}
    >
      <Container>
        <div className='flex-col-center'>
          <Logo styles='md:mt-0 mt-5 object-contain' />
          <div className='flex-col-center'>
            {imgSrc && (
              <Image
                src={imgSrc}
                alt='pic'
                width={318}
                height={342}
                className='mt-[30px] md:mt-[98px] w-[204px] h-[224px] md:w-[318px] md:h-[342px]'
              />
            )}
            <Title>{title}</Title>
            {Boolean(description) && (
              <Description className={descriptionStyle}>
                {description}
              </Description>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MessageWithImage;
