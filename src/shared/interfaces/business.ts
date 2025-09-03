import {ReactNode} from 'react';

export interface AddBusinessContainerProps {
  children: ReactNode;
  heading: string;
}

export interface DeleteBusinessConfirmationHookProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
  toBeClosedByParent?: boolean;
}

export interface logo {
  url: string;
  key: string;
}

export interface Business {
  _id?: string;
  name: string;
  notificationEmail: string;
  slug: string;
  themeColor: string;
  logo?: logo;
  paymentEmailTemplate: paymentEmailTemplateType;
}

export interface paymentEmailTemplateType {
  subject: string;
  description: string;
}

export interface BusinessDetailsModeProps {
  data: Business | null;
}

export interface OptionalQueryResponse<T> {
  data: T | null;
  isLoading: boolean;
  error?: any;
}
