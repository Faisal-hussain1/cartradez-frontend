export const REQUESTS_TABLE_HEADERS = (t: any) => ({
  name: {
    value: 'name',
    label: t('checkbook.requests.name'),
  },
  email: {
    value: 'email',
    label: t('checkbook.requests.emailAddress'),
  },
  amount: {
    value: 'amount',
    label: t('checkbook.requests.amount'),
  },
  description: {
    value: 'description',
    label: t('checkbook.requests.description'),
  },
  requestedBy: {
    value: 'requestedBy',
    label: t('checkbook.requests.requestedBy'),
  },
  date: {
    value: 'date',
    label: t('checkbook.requests.date'),
  },
  status: {
    value: 'status',
    label: t('checkbook.requests.status'),
  },
  actions: {
    value: 'actions',
    label: t('checkbook.requests.actions'),
  },
});

export const REQUESTS_TABLE_HEADERS_LIST = (t: any) =>
  Object.values(REQUESTS_TABLE_HEADERS(t));

export const STATUS_OPTIONS = (t: any) => ({
  all: {
    value: 'all',
    label: t('checkbook.requests.statuses.all'),
    cssClasses: '',
  },
});

export const STATUS_OPTIONS_LIST = (t: any) => Object.values(STATUS_OPTIONS(t));

export const CONTACTS_TABLE_HEADERS = (t: any) => ({
  name: {
    value: 'name',
    label: t('checkbook.contacts.name'),
  },
  email: {
    value: 'email',
    label: t('checkbook.contacts.emailAddress'),
  },
  actions: {
    value: 'actions',
    label: t('checkbook.contacts.actions'),
  },
});

export const CONTACTS_TABLE_HEADERS_LIST = (t: any) =>
  Object.values(CONTACTS_TABLE_HEADERS(t));

export const TRANSFERS_TABLE_HEADERS = (t: any) => ({
  name: {
    value: 'name',
    label: t('checkbook.transfers.name'),
  },
  email: {
    value: 'email',
    label: t('checkbook.transfers.emailAddress'),
  },
  amount: {
    value: 'amount',
    label: t('checkbook.transfers.amount'),
  },
  date: {
    value: 'date',
    label: t('checkbook.transfers.date'),
  },
  type: {
    value: 'type',
    label: t('checkbook.transfers.type'),
  },
});

export const TRANSFERS_TABLE_HEADERS_LIST = (t: any) =>
  Object.values(TRANSFERS_TABLE_HEADERS(t));

export const TRANSFERS_TYPES = (t: any) => ({
  debit: {
    value: 'debit',
    label: t('checkbook.transfers.types.debit'),
    cssClasses: 'bg-green-100 text-green-800',
  },
  credit: {
    value: 'credit',
    label: t('checkbook.transfers.types.credit'),
    cssClasses: 'bg-red-100 text-red-800',
  },
  refunded: {
    value: 'refunded',
    label: t('checkbook.transfers.types.refunded'),
    cssClasses: 'bg-blue-200 text-blue-800',
  },
});

export const CHECKBOOK_PAYMENT_REQUEST_API_DECISIONS = {
  approve: {
    value: 'approve',
  },
  reject: {
    value: 'reject',
  },
};

export const CHECKBOOK_PAYMENT_METHODS = (t: any) => ({
  paypal: {
    id: 'paypal',
    name: t('checkbook.paymentClaim.paypal.name'),
    description: t('checkbook.paymentClaim.paypal.description'),
    logoPath: '/images/checkbook/PayPal.svg',
    widgetType: 'Paypal',
    buttonText: 'Paypal',
  },
  venmo: {
    id: 'venmo',
    name: t('checkbook.paymentClaim.venmo.name'),
    description: t('checkbook.paymentClaim.venmo.description'),
    logoPath: '/images/checkbook/Venmo.svg',
    widgetType: 'Venmo',
    buttonText: 'Venmo',
  },
  card: {
    id: 'card',
    name: t('checkbook.paymentClaim.card.name'),
    description: t('checkbook.paymentClaim.card.description'),
    logoPath: '/images/checkbook/card.svg',
    widgetType: 'Instant',
    buttonText: 'Deposit',
  },
});

export const CHECKBOOK_PAYMENT_COMMISSION_RATE_IN_PERCENTAGE =
  process.env.NEXT_PUBLIC_CHECKBOOK_PAYMENT_COMMISSION_RATE;
