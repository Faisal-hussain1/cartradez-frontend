import {ReactNode} from 'react';
import {buttonVariants} from '@/shared/components/ui/button';
import {VariantProps} from 'class-variance-authority';

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

export interface PrimaryButtonProps {
  buttonText: string | ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  styles?: string;
  variant?: ButtonVariant;
  style?: React.CSSProperties;
}

export interface SubmitButtonProps {
  buttonText: string;
  loading?: boolean;
  styles?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  variant?: ButtonVariant;
}
