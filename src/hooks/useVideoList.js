import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';

export default function useVideoList(page = 0) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchVideos = useCallback(async () => {
    const db = getDatabase();
    const videoRef = ref(db, 'videos');
    const videoQuery = query(
      videoRef,
      orderByKey(),
      startAt(page.toString()),
      limitToFirst(8)
    );

    try {
      setError('');
      setLoading(true);
      const snapshot = await get(videoQuery);
      setLoading(false);

      if (snapshot.exists()) {
        setVideos((prevVideos) => {
          return [...prevVideos, ...Object.values(snapshot.val())];
        });
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
      setError('Data fetch error');
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { loading, error, videos, hasMore };
}
