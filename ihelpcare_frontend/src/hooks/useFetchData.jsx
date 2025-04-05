import ApiService from '@utils/apiService';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * Custom React hook to fetch data from an API endpoint.
 *
 * @param {string} url - The URL of the API endpoint to fetch data from.
 * @param {boolean} fetchAgain - Flag to indicate if the data should be fetched again.
 * @param {boolean} paginateLoading - Flag to indicate if the data is being fetched for pagination.
 * @returns {Array} An array containing the following elements in order:
 *   - {boolean} loading - A boolean indicating whether the request is in progress.
 *   - {string|null} error - A string describing any errors that occurred during the request.
 *   - {object|null} data - The data fetched from the API.
 *   - {boolean} loadingPagination - A boolean indicating whether the pagination request is in progress.
 *   - {object} errorObject - An object containing the error response.
 */
function useFetchData(url, fetchAgain, paginateLoading) {
  const reFetchData = useSelector((state) => state.app.reFetchData);
  const [loadingPagination, setLoadingPagination] = useState(false);
  const [errorObject, setErrorObject] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Set the loading state based on the paginateLoading prop
    if (paginateLoading) {
      setLoadingPagination(true);
    } else {
      setLoading(true);
    }

    // Perform the API request using the ApiService
    ApiService.get(url)
      .then((res) => {
        setLoading(false);
        setLoadingPagination(false);

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
        setLoadingPagination(false);
      });
  }, [url, fetchAgain, reFetchData]);

  return [loading, error, data, loadingPagination, errorObject];
}

useFetchData.propTypes = {
  url: PropTypes.string.isRequired,
  fetchAgain: PropTypes.bool,
  paginateLoading: PropTypes.bool,
};

export default useFetchData;
