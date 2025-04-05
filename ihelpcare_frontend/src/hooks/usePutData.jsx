import ApiService from '@utils/apiService';
import { useState } from 'react';

/**
 * Custom React hook for handling PUT requests to an API using the ApiService.
 *
 * @returns {Array} An array containing the following elements in order:
 *   - {function} putData: A function for making a PUT request to the specified URL with data.
 *   - {boolean} loading: A boolean representing whether the request is in progress.
 *   - {string|null} error: A string containing the message if the request fails, or null if no error.
 *   - {object|null} success: An object containing the successful response or null if no success data.
 *   - {function} setError: A function for manually setting the error message in the hook's state.
 *   - {function} setSuccess: A function for manually setting the success data in the hook's state.
 *   - {object} errorObject: An object containing the error response.
 *   - {function} setErrorObject: A function for manually setting the error object in the hook's state.
 */
function usePutData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorObject, setErrorObject] = useState({});
  const [success, setSuccess] = useState(null);

  /**
   * Fetch data from a specified API endpoint.
   *
   * @param {string} url - The URL of the API endpoint to request data from.
   * @param {object} data - The DATA of the API endpoint to request from data.
   * @param {object} customHeaders - Optional custom headers to include in the request.
   */
  const putData = (url, data, customHeaders) => {
    // Set the loading state
    setLoading(true);
    setError(null);
    setErrorObject({});
    setSuccess(null);

    // Perform the API request using the ApiService
    ApiService.put(url, data, customHeaders)
      .then((res) => {
        setLoading(false);

        if (res?.code === 200 || res?.code === 201) {
          // Set the fetched data in the state
          setSuccess(res);
        } else {
          // Handle API error response
          setErrorObject(res);
          setError(
            res?.data?.error.message ||
              res?.data.message ||
              'Sorry! Something went wrong. App server error'
          );
        }
      })
      .catch((err) => {
        setLoading(false);

        // Handle API error or network error
        setErrorObject(err?.response?.data);
        setError(
          err?.response?.data?.error?.message ||
            err?.response?.data?.message ||
            err?.message ||
            'Sorry! Something went wrong. App server error'
        );
      });
  };

  return [putData, loading, error, success, setError, setSuccess, errorObject, setErrorObject];
}

export default usePutData;
