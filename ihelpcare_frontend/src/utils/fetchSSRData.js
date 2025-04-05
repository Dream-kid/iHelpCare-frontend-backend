/**
 * Fetch server side data from the specified URL.
 *
 * @param {string} url - The relative URL to fetch data from.
 * @returns {Promise} A promise that resolves to the JSON data from the server.
 */
async function fetchServerSideData(url, requestOptions) {
  // Construct the full API URL including the base URL, suffix, and provided URL.
  const apiUrl = `${process.env.API_BASE_URL}${process.env.API_SUFFIX_URL}${url}`;

  // Perform a fetch request with no caching.
  const res = await fetch(apiUrl, {
    ...requestOptions,
    // cache: 'no-store',
    next: { revalidate: 60 },
  });

  if (res?.ok) {
    throw new Error('There was an error fetching data from the server.');
  }

  // Parse and return the JSON response.
  return res.json();
}

export default fetchServerSideData;
