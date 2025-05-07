export const retryRequest = async <T>(
  fn: () => Promise<T>,
  retries: number = 5,
  delay: number = 2000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryRequest(fn, retries - 1, delay);
  }
};
