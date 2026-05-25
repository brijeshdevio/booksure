export interface ApiResponse<T> {
  message?: string;
  data?: T | null;
  meta?: Record<string, unknown>;
}

export const apiResponse = <T>({
  message,
  data = null,
  meta,
}: ApiResponse<T>) => {
  return { success: true, message, data, ...(meta && { meta }) };
};
