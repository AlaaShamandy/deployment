import buildUrl from '../../node_modules/build-url';

const NEWS_API_KEY = 'bc4fce38eb4e4c5ab4bf4a827321c8ce';
const NEWS_API_HOST_NAME = 'https://newsapi.org';


/* Returns a promise through which top headlines of
 * the country with specified key word can we accessed
 * as json.
 */
export default function getTopHeadlines(query, country) {
  query = query || '';
  country = country || '';

  const apiUrl = buildUrl(NEWS_API_HOST_NAME, {
    path: 'v2/top-headlines',
    queryParams: {
      country,
      q: query,
      apiKey: NEWS_API_KEY,
    },
  });

  return fetch(apiUrl)
    .then(response => response.json())
    .catch((error) => {
      console.log(error);
    });
}
