import {ReactNode} from 'react';
import {type VariantProps} from 'class-variance-authority';
import {buttonVariants} from '@/shared/components/ui/button';

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

export interface ButtonProps {
  title: string;
  handleClick?: () => void;
  variant: ButtonVariant;
  styles?: string;
  loading?: boolean;
  loaderColor?: string;
}

export interface GeneralModalProps {
  title?: string;
  content?: ReactNode[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  width?: string;
  buttons?: ButtonProps[];
  buttonsAlignment?: string;
  titleAlignment?: string;
  isModalCloseWhenClickedOutside?: boolean;
}

export interface ConfirmationModalProps {
  title: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dismissLabel?: string;
  confirmLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmLoading?: boolean;
  buttons?: ButtonProps[];
  content?: ReactNode[];
}

export interface DeleteConfirmationModalProps {
  title: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dismissLabel?: string;
  deleteLabel?: string;
  onCancel: () => void;
  onDelete: () => void;
  deleteLoading: boolean;
}

export interface ErrorModalProps {
  title: string;
  setIsOpen: (open: boolean) => void;
  onConfirm: () => void;
  isOpen: boolean;
  label?: string;
  content: ReactNode[];
}

export interface InformModalProps {
  title: string;
  setIsOpen: (open: boolean) => void;
  onConfirm: () => void;
  isOpen: boolean;
  label?: string;
  content: ReactNode[];
  width?: string;
}

export interface FormModalProps {
  title: string;
  setIsOpen: (open: boolean) => void;
  isOpen: boolean;
  content: ReactNode[];
  isModalCloseWhenClickedOutside?: boolean;
}

export interface UseConfirmationModalProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
  toBeClosedByParent?: boolean;
  title: string;
  confirmLabel: string;
  description: string;
}
