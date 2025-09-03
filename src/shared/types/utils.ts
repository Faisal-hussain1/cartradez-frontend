export type BuildDynamicUrlParamsType = {
  search?: string;
  sort?: string;
  pageNo?: number;
  pageLimit?: number;
  pageToken?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  id?: string;
  nextPageStartAfter?: string;
  businessId?: string;
};

export type DecodeTokenResult = {
  data: any;
  hasExpired: boolean;
};

export type CopyLinkParams = {
  link: string;
};

export type HexCodeParams = {
  hexColor: string;
};

export type GetTextColorBasedOnBgParams = {
  desiredTextColor?: string;
  backgroundColor: string;
  fallbackColor?: string;
};

export type DateWithTimeType = {
  date: string;
  time: string;
};

export type TransactionRefType = {
  date: string | null;
  time: string | null;
};

export type TransactionType = {
  transactionTimestamp: number;
};

export type DateWithTimeFromTimestampType = {
  timestamp: number;
  zone?: string;
};

export type IdBasedPaginationOptions = {
  nextPageStartAfter: string | null;
  hasMore: boolean;
};

export type IdBasePaginationResponse = {
  hasMore: boolean;
  data: any[];
};
