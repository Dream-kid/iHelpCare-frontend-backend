import ApiService from '@utils/apiService';
import { useState } from 'react';

/**
 * Custom React hook for handling POST requests to an API using the ApiService.
 *
 * @returns {Array} An array containing:
 *   - postData: function to make POST request
 *   - loading: boolean for loading state
 *   - error: error message string
 *   - success: response data object
 *   - setError: setter for error
 *   - setSuccess: setter for success
 *   - errorObject: raw error object from backend
 *   - setErrorObject: setter for error object
 */
function usePostData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorObject, setErrorObject] = useState({});
  const [success, setSuccess] = useState(null);

  /**
   * Perform POST request to the given API endpoint.
   *
   * @param {string} url - API endpoint
   * @param {object} data - Request payload
   * @param {object} customHeaders - Optional custom headers
   */
  const postData = (url, data, customHeaders) => {
    setLoading(true);
    setError(null);
    setErrorObject({});
    setSuccess(null);

    console.log("📡 POST:", `${ApiService.defaults.baseURL}${url}`);
    console.log("📦 Payload:", data);

    ApiService.post(url, data, customHeaders)
      .then((res) => {
        setLoading(false);

        if (res?.code === 200 || res?.code === 201) {
          setSuccess(res);
        } else {
          console.warn("⚠️ API responded with unexpected status", res?.code, res);
          setErrorObject(res);
          setError(
            res?.data?.error?.message ||
            res?.data?.message ||
            'Sorry! Something went wrong. App server error.'
          );
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("❌ API error:", err);

        if (err.response) {
          console.error("Status:", err.response.status);
          console.error("Data:", err.response.data);

          setErrorObject(err.response.data);
          setError(
            err.response.data?.error?.message ||
            err.response.data?.message ||
            `Server responded with status ${err.response.status}`
          );
        } else if (err.request) {
          console.error("No response received:", err.request);
          setErrorObject({});
          setError("No response from server. Please check your network or API host.");
        } else {
          console.error("Request setup error:", err.message);
          setErrorObject({});
          setError("Request setup failed: " + err.message);
        }
      });
  };

  return [postData, loading, error, success, setError, setSuccess, errorObject, setErrorObject];
}

export default usePostData;
