import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';

export default function useAnswers(id) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [answers, setAnswers] = useState([]);

  const fetchAnswers = useCallback(async () => {
    const db = getDatabase();
    const answerRef = ref(db, `answers/${id}/questions`);
    const answerQuery = query(answerRef, orderByKey());

    try {
      setError('');
      setLoading(true);
      const snapshot = await get(answerQuery);
      setLoading(false);

      if (snapshot.exists()) {
        setAnswers((prevAnswers) => {
          return [...prevAnswers, ...Object.values(snapshot.val())];
        });
      }
    } catch (err) {
      console.log(err);
      setError('Data fetch error');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAnswers();
  }, [fetchAnswers]);

  return { loading, error, answers };
}
