// services/api.ts

import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
// services/api.ts

let isRefreshing = false;

let queue: Array<() => void> = [];

const processQueue = () => {
  queue.forEach((cb) => cb());
  queue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          queue.push(() => {
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        await api.post('/auth/refresh');

        processQueue();

        return api(originalRequest);
      } catch {
        window.location.href = '/login';
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
