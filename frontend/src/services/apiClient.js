import axios from 'axios';

// ✅ Vite environment variable support
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // ⏱ prevents hanging requests
});

// ✅ Attach token automatically
apiClient.interceptors.request.use(
  (config) => {
    try {
      const stored = localStorage.getItem('ws_user');
      if (stored) {
        const user = JSON.parse(stored);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch (err) {
      console.warn('Invalid user data in localStorage');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Global response handling (optional but recommended)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token expired / invalid
      localStorage.removeItem('ws_user');

      // avoid infinite loop
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
