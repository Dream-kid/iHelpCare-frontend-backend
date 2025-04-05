import { deleteAuthStorage } from '@redux/slices/authSlice';
import { store } from '@redux/store';
import { i18n } from '@root/i18n.config';
import axios from 'axios';

/**
 * Create an instance of Axios with custom configuration.
 */
const ApiService = axios.create({
  baseURL: process.env.API_BASE_URL + process.env.API_SUFFIX_URL,
});

console.log("📡 API Base URL:", ApiService.defaults.baseURL);

/**
 * Intercept the request before it is sent.
 *
 * @param {Object} config - The request configuration.
 * @returns {Object} The modified request configuration.
 */
ApiService.interceptors.request.use(
  (config) => {
    // Set the 'Content-Type' header to 'application/json'.
    config.headers['Content-Type'] = 'application/json';

    if (!config?.noAuth) {
      // Retrieve the access token from redux store.
      const token = store?.getState()?.auth?.accessToken || null;

      if (token) {
        // Set the 'Authorization' header with the access token.
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Add the common query parameter 'lang' to the request.
    const locale = window?.location?.pathname?.split('/')[1] || i18n?.defaultLocale;
    config.params = { ...config.params, lang: locale };

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Intercept the response before it is returned.
 *
 * @param {Object} response - The response object.
 * @returns {Object} The modified response object or an empty object.
 */
ApiService.interceptors.response.use(
  /**
   * Add logic for successful response.
   */
  (response) => response?.data || {},

  /**
   * Add logic for any error from backend.
   */
  async (error) => {
    const originalRequest = error.config;

    // eslint-disable-next-line no-underscore-dangle
    if (error.response.status === 401 && !originalRequest._retry) {
      // if authorized to logout user and redirect login page.
      store.dispatch(deleteAuthStorage());
      window.location.href = '/';
    }

    // Handle other error cases.
    return Promise.reject(error);
  }
);

export default ApiService;
