import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Header from './assets/components/Header.jsx';
import NowPlaying from './assets/components/NowPlaying';
import Home from './assets/components/Home';
import { Navbar, Nav, Button } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi()

const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) =>{
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial
    }, {})
}

function App() {
  const [spotifyToken, setSpotifyToken] = useState("")
  const [nowPlaying, setNowPlaying] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState('Home');

  const renderPage = () => {

    if (currentPage === "Home") {
      return <Home/>;
    }

    if (currentPage === "NowPlaying") {
      return <NowPlaying nowPlaying={nowPlaying} getNowPlaying={getNowPlaying}/>;
    }

  };

  useEffect(() => {
    const spotifyToken = getTokenFromUrl().access_token
    window.location.hash = ""
    console.log("This is our spotify Token", spotifyToken)

    if(spotifyToken){
      setSpotifyToken(spotifyToken)
      spotifyApi.setAccessToken(spotifyToken)
      setLoggedIn(true)
    }
  })

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log(response)
      setNowPlaying({
        title: response.item.name,
        albumArt: response.item.album.images[0].url
      })
    })
  }

  return (
    <div className="App">
          <Header loggedIn={loggedIn} setCurrentPage={setCurrentPage}></Header>
          {renderPage()}
    </div>
  )
}

export default App
