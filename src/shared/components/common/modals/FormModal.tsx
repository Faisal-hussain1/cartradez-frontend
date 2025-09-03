import {GeneralModal} from './GeneralModal';
import {FormModalProps} from '@/shared/interfaces/dialogs';

export const FormModal = ({
  title,
  setIsOpen,
  isOpen,
  content,
  isModalCloseWhenClickedOutside,
}: FormModalProps) => {
  return (
    <GeneralModal
      title={title}
      content={content}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width='w-[747px]'
      isModalCloseWhenClickedOutside={isModalCloseWhenClickedOutside}
    />
  );
};
