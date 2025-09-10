import {ReactNode} from 'react';

export interface SettingsContainerProps {
  children: ReactNode;
  heading: string;
}

export interface PersonalDetailsPayload {
  name: string;
  email: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface EmailTemplatePayload {
  description: string;
  subject: string;
  type: string;
}

export interface EmailTemplateProps {
  subject?: string;
  description?: string;
  onSubmit: (payload: EmailTemplatePayload) => void;
  isPending: boolean;
}

export interface BankDetailsProps {
  isSellerOnboarded: boolean;
  userId: string;
}

export interface PersonalDetailsFormProps {
  name: string;
  email: string;
}
