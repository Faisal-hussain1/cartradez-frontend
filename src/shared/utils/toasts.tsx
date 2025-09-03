import {toast, ToastPosition} from 'react-toastify';
import {TOASTS_POSITION} from '@/shared/constants/toasts';
import {ToasterComponent} from '@/shared/components/common/toasts';
import {ShowToastProps} from '@/shared/interfaces/utils';

export const showToast = ({
  type = 'info', // Set the default type as 'info'
  message,
  id,
  position = TOASTS_POSITION.TOP_RIGHT as ToastPosition,
}: ShowToastProps) => {
  const toastId = id || message;

  if (toast.isActive(toastId)) {
    toast.update(toastId, {
      render: (
        <ToasterComponent
          type={type}
          title={type.toUpperCase()}
          message={message}
        />
      ),
      position,
    });
  } else {
    toast(
      <ToasterComponent
        type={type}
        title={type.toUpperCase()}
        message={message}
      />,
      {
        toastId,
        position: position as ToastPosition | undefined,
      }
    );
  }
};

// Dismiss a specific toast
export const dismissToast = (id: string | number) => {
  toast.dismiss(id);
};

// Dismiss all toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};
