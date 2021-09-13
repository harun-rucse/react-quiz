import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';

export default function useQuestions(id) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = useCallback(async () => {
    const db = getDatabase();
    const questionRef = ref(db, `quiz/${id}/questions`);
    const questionQuery = query(questionRef, orderByKey());

    try {
      setError('');
      setLoading(true);
      const snapshot = await get(questionQuery);
      setLoading(false);

      if (snapshot.exists()) {
        setQuestions((prevQuestion) => {
          return [...prevQuestion, ...Object.values(snapshot.val())];
        });
      }
    } catch (err) {
      console.log(err);
      setError('Data fetch error');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return { loading, error, questions };
}
