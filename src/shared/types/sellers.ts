import {PaymentStatusType} from './payment';

export type TransactionType = {
  id: string;
  isOrderFulfilled: boolean;
  amount: string;
  transactionTimestamp: number;
  customerEmail: string;
  customerName: string;
  paymentMethod: string;
  paymentStatus: PaymentStatusType;
  businessId: string;
};

type SellerPaginationType = {
  limit: number;
  nextPage: string | null;
};

export type TransactionsResponseType = {
  data: {
    transactions: TransactionType[];
    pagination: SellerPaginationType;
    type: string;
  };
};
