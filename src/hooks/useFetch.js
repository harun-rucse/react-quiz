import { useEffect, useState } from 'react';

export default function useFetch(url, method, headers) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  async function fetchRequest() {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(url, {
        method: method || 'GET',
        headers: headers,
      });
      const data = await response.json();
      setResult(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);

      setLoading(false);
      setError('Fetch request failed!');
    }
  }

  useEffect(() => {
    fetchRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, error, result };
}
