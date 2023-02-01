import React from 'react';
import '../styles/header.css';
import { Navbar, Nav, Button } from 'react-bootstrap';

function Header({loggedIn, setCurrentPage}) {
  return (
    <div>
    <h1>SPOTIFY AUDIO ANALYSIS TOOL</h1>
    {loggedIn &&
          <>
          <Button onClick={() => setCurrentPage("Home")}>HOME</Button>
          <Button onClick={() => setCurrentPage("Analysis")}>AUDIO ANALYSIS</Button>
          <Button onClick={() => setCurrentPage("NowPlaying")}>CURRENT TRACK</Button>
          <Button onClick={() => [setCurrentPage("TopArtist")]}>TOP ARTIST</Button>
          <Button onClick={() => [setCurrentPage("TopTracks")]}>TOP TRACKS</Button>
          </>
    }
      {!loggedIn && <Button href='http://localhost:8888'>LOGIN WITH SPOTIFY</Button>}
    </div>
  );
}

export default Header;