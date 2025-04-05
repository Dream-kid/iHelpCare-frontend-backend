import ApiService from '@utils/apiService';
import { useState } from 'react';

/**
 * Custom React hook for making API requests using the ApiService utility.
 *
 * @returns {Array} An array containing the following elements in order:
 *   - fetchData: A function to fetch data from an API endpoint.
 *   - loading: A boolean indicating whether the request is in progress.
 *   - error: A string describing any errors that occurred during the request.
 *   - data: The data fetched from the API.
 *   - errorObject: An object containing the error response.
 */
function useApiRequest() {
  const [errorObject, setErrorObject] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  /**
   * Fetch data from a specified API endpoint.
   *
   * @param {string} url - The URL of the API endpoint to request data from.
   * @param {object} customHeaders - Optional custom headers to include in the request.
   */
  const fetchData = (url, customHeaders) => {
    // Set the loading state
    setLoading(true);

    // Perform the API request using the ApiService
    ApiService.get(url, customHeaders)
      .then((res) => {
        setLoading(false);

        if (res?.code === 200 || res?.code === 201) {
          // Set the fetched data in the state
          setData(res);
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
        // Handle API error or network error
        setErrorObject(err?.response?.data);
        setError(
          err?.response?.data?.error?.message ||
            err?.response?.data?.message ||
            err?.message ||
            'Sorry! Something went wrong. App server error'
        );

        setLoading(false);
      });
  };

  return [fetchData, loading, error, data, errorObject];
}

export default useApiRequest;
