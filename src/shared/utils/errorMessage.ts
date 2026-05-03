type UnknownRecord = Record<string, any>;

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';
const HTTP_STATUS_MESSAGES: Record<number, string> = {
  400: 'Your request could not be processed. Please check your input and try again.',
  401: 'Your session has expired. Please sign in again.',
  403: "You don't have permission to perform this action.",
  404: 'The requested resource was not found.',
  409: 'This action could not be completed due to a conflict. Please refresh and try again.',
  422: 'Some information is invalid. Please review and try again.',
  429: 'Too many requests. Please wait a moment and try again.',
  500: 'Server error occurred. Please try again shortly.',
  502: 'Server is temporarily unavailable. Please try again shortly.',
  503: 'Service is temporarily unavailable. Please try again shortly.',
  504: 'The request timed out. Please try again.',
};

const asRecord = (value: unknown): UnknownRecord | null => {
  if (value && typeof value === 'object') return value as UnknownRecord;
  return null;
};

const pickFirstString = (...values: unknown[]): string | undefined => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return undefined;
};

const isGenericRequestFailure = (message?: string): boolean => {
  if (!message) return false;
  const normalized = message.toLowerCase();
  return (
    normalized.includes('request failed with status code') ||
    normalized === 'network error'
  );
};

export const getErrorMessage = (
  error: unknown,
  fallback = DEFAULT_ERROR_MESSAGE
): string => {
  if (typeof error === 'string' && error.trim()) return error.trim();

  const record = asRecord(error);
  if (!record) return fallback;

  const nestedError = asRecord(record.error);
  const response = asRecord(record.response);
  const data = asRecord(response?.data ?? record.data);
  const status = Number(response?.status ?? record.status);
  const statusMessage = HTTP_STATUS_MESSAGES[status];

  const fromValidationArray = Array.isArray(nestedError)
    ? nestedError.find((item) => typeof item === 'string' && item.trim())
    : undefined;

  const bestMessage =
    pickFirstString(
      data?.message,
      nestedError?.message,
      data?.error?.message,
      fromValidationArray,
      record.message
    ) || fallback;

  if (isGenericRequestFailure(bestMessage) && statusMessage) {
    return statusMessage;
  }

  return bestMessage;
};

export const normalizeError = (
  error: unknown,
  fallback = DEFAULT_ERROR_MESSAGE
): UnknownRecord => {
  const base = asRecord(error) || {};
  return {
    ...base,
    message: getErrorMessage(error, fallback),
  };
};
