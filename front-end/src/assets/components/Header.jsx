import React from 'react';
import '../styles/header.css';
import { Navbar, Nav, Button } from 'react-bootstrap';

function Header({loggedIn, setCurrentPage}) {
  return (
    <div>
    <h1>SPOTIFY AUDIO ANALYSIS TOOL</h1>
      <Button onClick={() => setCurrentPage("Home")}>HOME</Button>
      <Button>AUDIO ANALYSIS</Button>
      <Button onClick={() => setCurrentPage("NowPlaying")}>CURRENT TRACK</Button>
      <Button>TOP ARTIST</Button>
      {!loggedIn && <Button href='http://localhost:8888'>LOGIN WITH SPOTIFY</Button>}
    </div>
  );
}

export default Header;