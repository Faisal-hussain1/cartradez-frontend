type UnknownRecord = Record<string, any>;

const DEFAULT_ERROR_MESSAGE = 'Something went wrong. Please try again.';

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

  const fromValidationArray = Array.isArray(nestedError)
    ? nestedError.find((item) => typeof item === 'string' && item.trim())
    : undefined;

  return (
    pickFirstString(
      record.message,
      data?.message,
      nestedError?.message,
      data?.error?.message,
      fromValidationArray
    ) || fallback
  );
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

