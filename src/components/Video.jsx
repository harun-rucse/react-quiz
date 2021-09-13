import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/Video.module.css';

export default function Video({ video }) {
  return (
    <Link
      to={`/quiz/${video.youtubeID}`}
      className={`${video.noq === 0 && 'disabled-link'}`}
    >
      <div className={classes.video}>
        <img
          src={`http://img.youtube.com/vi/${video.youtubeID}/maxresdefault.jpg`}
          alt=""
        />
        <p>{video.title}</p>
        <div className={classes.qmeta}>
          <p>{video.noq} Questions</p>
          <p>Score : Not taken yet</p>
        </div>
      </div>
    </Link>
  );
}
