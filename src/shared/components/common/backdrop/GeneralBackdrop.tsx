import {Fragment, ReactNode} from 'react';
import {Button} from '@/shared/components/ui/button';
import {ButtonProps} from '@/shared/interfaces/dialogs';
import {GeneralBackdropProps} from '@/shared/interfaces/common';

export default function GeneralBackdrop({
  title,
  content,
  buttons,
}: GeneralBackdropProps) {
  return (
    <div className='top-0 absolute w-full h-full backdrop-blur-sm z-[999] flex items-center justify-center'>
      <div className='bg-white rounded-lg p-6 max-w-md mx-auto shadow-lg border'>
        <div className='text-center'>
          <h2 className='text-lg font-semibold text-gray-900 mb-3'>{title}</h2>

          {content?.map((contentItem: ReactNode, index: number) => (
            <Fragment key={index}>{contentItem}</Fragment>
          ))}

          {buttons && (
            <div className='flex gap-[10px] pt-5 w-full items-center justify-center'>
              {buttons.map((button: ButtonProps) => (
                <Button
                  className={button.styles}
                  onClick={button.handleClick}
                  key={button.title}
                  variant={button.variant}
                >
                  {button.title}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
