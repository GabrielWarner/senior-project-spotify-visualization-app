import React, { useState, useEffect }  from 'react';
import '../styles/now_playing.css';

function NowPlaying({nowPlaying, getNowPlaying}) {
  return (
    <>
      <div className="now-playing-container">
        {nowPlaying.title ? (
          <>
            <div className="now-playing-text">Now Playing: {nowPlaying.title}</div>
            <div className="album-art-container">
              <img src={nowPlaying.albumArt} className="album-art"/>
            </div>
          </>
        ) : (
          <div className="album-art-container">
            <div className="album-art-outline">
              <p className="not-playing-text">nothing playing</p>
            </div>
          </div>
        )}
        <button onClick={() => getNowPlaying()} className="check-now-playing-button">Check Now Playing</button>
      </div>
    </>
  );
}

export default NowPlaying;
