export const TRANSACTIONS_TABLE_HEADERS = (t: any) => ({
  fulfilled: {
    value: 'fulfilled',
    label: t('transactionsTableHeader.fulfilled'),
  },
  id: {value: 'id', label: t('transactionsTableHeader.id')},
  amount: {
    value: 'amount',
    label: t('transactionsTableHeader.amount'),
  },
  date: {
    value: 'date',
    label: t('transactionsTableHeader.date'),
  },
  customerName: {
    value: 'customerName',
    label: t('transactionsTableHeader.customerName'),
  },
  customerEmail: {
    value: 'customerEmail',
    label: t('transactionsTableHeader.customerEmail'),
  },
  paymentMethod: {
    value: 'paymentMethod',
    label: t('transactionsTableHeader.paymentMethod'),
  },
  paymentStatus: {
    value: 'paymentStatus',
    label: t('transactionsTableHeader.paymentStatus'),
  },
  actions: {
    value: 'actions',
    label: '',
  },
});

export const TRANSACTIONS_TABLE_HEADERS_LIST = (t: any) =>
  Object.values(TRANSACTIONS_TABLE_HEADERS(t));

export const DEFAULT_LOGO = '/images/default-seller-logo.png';
