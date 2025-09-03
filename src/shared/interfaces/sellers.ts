import {TransactionType} from '@/shared/types/sellers';
import {PaymentStatusType} from '@/shared/types/payment';

export interface TransactionRowProps {
  transaction: TransactionType;
  onRefundClick: () => void;
}

export interface PaymentStatusProps {
  status: PaymentStatusType;
}

export interface PaymentIdProps {
  id: string;
}
