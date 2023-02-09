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
          <Button onClick={() => [setCurrentPage("TopArtist")]}>MY TOP ARTIST</Button>
          <Button onClick={() => [setCurrentPage("TopTracks")]}>TOP TRACKS</Button>
          <Button onClick={() => [setCurrentPage("LastFiftySaved")]}>LAST 50 SAVED</Button>
          <Button onClick={() => [setCurrentPage("Top10")]}>SPOTIFY TOP 10</Button>
          </>
    }
      {!loggedIn && <Button href='http://localhost:8888'>LOGIN WITH SPOTIFY</Button>}
    </div>
  );
}

export default Header;