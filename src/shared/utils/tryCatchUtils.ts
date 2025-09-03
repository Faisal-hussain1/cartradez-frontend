export const tryCatch = <T>(
  fn: () => T
): {success: boolean; response?: T; error?: any} => {
  try {
    const response = fn();

    return {success: true, response};
  } catch (error) {
    return {success: false, error};
  }
};

export const asyncTryCatch = async <T>(
  fn: () => Promise<T>
): Promise<{success: boolean; response?: T; error?: any}> => {
  try {
    const response = await fn();

    return {success: true, response};
  } catch (error) {
    return {success: false, error};
  }
};
