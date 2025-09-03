import {ReactNode} from 'react';

export interface NewPaymentPayload {
  name: string;
  email: string;
  amount: number;
  description?: string;
}

export interface AddNewPaymentFormProps {
  closeFormModal: () => void;
  defaultValues?: Partial<NewPaymentPayload>;
}

export interface NewContactPayload {
  name: string;
  email: string;
}

export interface AddNewContactFormProps {
  closeFormModal: () => void;
  defaultValues?: Partial<NewContactPayload>;
}

export interface CheckbookPaymentSectionProps {
  title: string;
}

export interface CheckbookContainerProps {
  children: ReactNode;
  paymentSectionTitle: string;
}

export type Request = {
  _id: string;
  fees: {
    amount: number;
  };
  recipient: {
    amount: number;
    name: string;
    email: string;
    description: string;
  };

  amount: number;
  description: string;
  timestamp: number;
  requestedBy: {
    name: string;
    _id: string;
  };
  status: string;
};

export type RequestRowProps = {
  request: Request;
};

export interface StatusOption {
  value: string;
  label: string;
}

export type RequestsStatus = {
  value: string;
  label: string;
};

export type FilterProps = {
  searchValue?: string;
  requestStatus?: RequestsStatus;
  businessId?: string | null;
};

export interface FiltersBarProps {
  setFilters: (filters: FilterProps) => void;
  filters: FilterProps;
  hideSelect?: boolean;
}

export interface ReactSelectProps {
  value: StatusOption;
  onChange: (value: StatusOption | null) => void;
  className?: string;
}

export type Contact = {
  _id: string;
  name: string;
  email: string;
};

export interface ContactRowProps {
  contact: Contact;
  onPayNowButtonClick: (values: {email: string; name: string}) => void;
}

export type Transfer = {
  _id: string;
  recipient: {
    name: string;
    email: string;
  };
  amount: number;
  timestamp: number;
  type: string;
};

export interface TransferRowProps {
  transfer: Transfer;
}

export interface PaymentClaimProps {
  paymentId: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  logoPath: string;
  widgetType: 'card' | 'paypal' | 'venmo';
  buttonText: string;
}

export interface CheckbookWidget {
  render: (element: HTMLElement) => void;
}

export interface CheckbookDeposit {
  Bank: (config: any) => CheckbookWidget;
  Paypal: (config: any) => CheckbookWidget;
  Venmo: (config: any) => CheckbookWidget;
}

export interface PaymentClaimPageProps {
  params: Promise<{paymentId: string}>;
}

export interface PaymentClaimWidgetProps {
  token: string;
  paymentMethod: PaymentMethod;
  paymentMethods: Record<string, PaymentMethod>;
  closeModal: () => void;
  setPaymentCompletedLoading: (loading: boolean) => void;
}

export interface PaymentInfoHeaderProps {
  recipientName: string;
  senderName: string;
  amount: string;
  description: string;
}

export interface PaymentMethodCardProps {
  method: PaymentMethod;
  onSelect: ({method}: {method: PaymentMethod}) => void;
}

export interface PaymentMethodsGridProps {
  paymentMethods: Record<string, PaymentMethod>;
  onMethodSelect: ({method}: {method: PaymentMethod}) => void;
}

export interface PaymentClaimModalProps {
  token: string | null;
  paymentMethods: Record<string, PaymentMethod>;
}

export interface PaymentClaimFailureProps {
  paymentAlreadyProcessed?: boolean;
  scriptLoaded?: boolean;
}

export interface UseCheckbookScriptLoaderProps {
  token?: string;
}

export interface RequestExpandedRowProps {
  amount: number;
  recipientAmount: number;
  platformFee: number;
}
