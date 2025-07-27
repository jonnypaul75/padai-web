// import axios, { AxiosError, type AxiosRequestConfig, type Method } from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
// });

// export async function apiRequest<TResponse, TBody>(
//   method: Method,
//   url: string,
//   data?: TBody,
//   config?: AxiosRequestConfig
// ): Promise<TResponse> {
//   try {
//     const response = await api.request<TResponse>({
//       method,
//       url,
//       ...(data && { data }),
//       ...config,
//     });

//     return response.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       const axiosError = error as AxiosError<{ message?: string }>;
//       console.error(`[API ERROR]: ${axiosError.response?.status} - ${axiosError.message}`);
//       throw {
//         status: axiosError.response?.status,
//         data: axiosError.response?.data,
//         message: axiosError.response?.data?.message || axiosError.message,
//       };
//     }
//     console.error('[UNEXPECTED ERROR]:', error);
//     throw error;
//   }
// }
