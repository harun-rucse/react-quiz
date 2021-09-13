import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useVideoList from '../hooks/useVideoList';
import classes from '../styles/Videos.module.css';
import Video from './Video';

export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, videos, error, hasMore } = useVideoList(page);

  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          className={classes.videos}
          dataLength={videos.length}
          hasMore={hasMore}
          next={() => setPage((prevPage) => prevPage + 8)}
          loader={<div>Fetching...</div>}
        >
          {videos.map((video, index) => (
            <Video key={index} video={video} />
          ))}
        </InfiniteScroll>
      )}
      {!loading && videos.length === 0 && (
        <p className="error">No data found!</p>
      )}
      {error && <p className="error">There was an error!</p>}
      {loading && <div>Loading...</div>}
    </div>
  );
}
