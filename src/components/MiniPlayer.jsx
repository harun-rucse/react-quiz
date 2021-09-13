import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import classes from '../styles/MiniPlayer.module.css';

export default function MiniPlayer({ id, title }) {
  const playerRef = useRef();
  const [open, setOpen] = useState(false);

  function tooglePlayer() {
    if (open) {
      playerRef.current.classList.add(classes.floatingBtn);
      setOpen(false);
    } else {
      playerRef.current.classList.remove(classes.floatingBtn);
      setOpen(true);
    }
  }

  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={playerRef}
      onClick={tooglePlayer}
    >
      <span className={`material-icons-outlined ${classes.open}`}>
        play_circle_filled
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={tooglePlayer}
      >
        close
      </span>
      <ReactPlayer
        className={classes.player}
        playing={open}
        controls
        url={`https://www.youtube.com/watch?v=${id}`}
        width="300px"
        height="180px"
      />
      <p>{title}</p>
    </div>
  );
}
