import React, { useState, useEffect }  from 'react';
import '../styles/now_playing.css';
function NowPlaying({nowPlaying, getNowPlaying}) {
  return (
    <>
            <div>Now Playing: {nowPlaying.title}</div>
            <img src={nowPlaying.albumArt} style={{height: 200}}/>
            <button onClick={() => getNowPlaying()}>Check Now Playing</button>
    </>
  );
}
export default NowPlaying;