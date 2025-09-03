import {Seller} from './dashboard';
import {UseFormHandleSubmit} from 'react-hook-form';

export interface PaymentPageProps {
  params: Promise<{paymentURL: string[]}>;
}

export interface PaymentProps {
  username: string;
  businessSlug: string;
}

export interface KeysPurchasePayload {
  numberOfKeys: number;
}

export interface OrderSummaryProps {
  numberOfKeys: number;
  pricePerKey: number;
}

export interface StripeCheckoutPayload {
  seller: Seller;
  onBack: () => void;
  paymentIntentId: string;
  buttonTextColor: string;
  whiteBackgroundButtonTextColor: string;
  themeColor: string;
}

export interface KeyPurchaseProps {
  handleSubmit: UseFormHandleSubmit<KeysPurchasePayload>;
  onSubmit: (data: KeysPurchasePayload) => void;
  control: any;
  paymentIntentLoading: boolean;
  updatePaymentIntentAmountLoading: boolean;
  seller?: Seller;
  buttonTextColor: string;
  themeColor: string;
}

export interface CustomerDetailsPayload {
  sellerConnectedAccountId: string;
  customerEmail: string;
  customerName: string;
  customerPhoneNo: string;
}

export interface CustomerDetailsFormProps {
  customerHandleSubmit: UseFormHandleSubmit<CustomerDetailsPayload>;
  control: any;
  disabled?: boolean;
  onSubmit: (data: CustomerDetailsPayload) => void;
  onEditClick: () => void;
  isLoading?: boolean;
  seller?: Seller;
  onBack: () => void;
  buttonTextColor: string;
  whiteBackgroundButtonTextColor: string;
  themeColor: string;
}

export interface PaymentDetailRowProps {
  label: string;
  value: string;
}
