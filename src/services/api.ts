// services/apiClient.ts

import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// ─── 401 Interceptor — auto-refresh on token expiry ───────────────────────────

let isRefreshing = false;
let queue: Array<() => void> = [];

const processQueue = () => {
  queue.forEach((cb) => cb());
  queue = [];
};

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Only attempt a refresh once per request, and only on 401s.
    // Skip if this is already the refresh request itself to avoid loops.
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      // If a refresh is already in flight, queue this request until it settles.
      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push(() => resolve(apiClient(originalRequest)));
        });
      }

      isRefreshing = true;

      try {
        await apiClient.post('/auth/refresh');
        processQueue();
        return apiClient(originalRequest);
      } catch {
        // Refresh failed — send the user to login.
        queue = [];
        window.location.href = '/login';
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);