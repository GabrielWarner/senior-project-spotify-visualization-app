import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "./assets/components/Header.jsx";
import NowPlaying from "./assets/components/NowPlaying";
import Home from "./assets/components/Home";
import Analysis from "./assets/components/Analysis";
import TopArtist from "./assets/components/TopArtist";
import TopTracks from "./assets/components/TopTracks";
import LastFiftySaved from "./assets/components/LastFiftySaved";
import Top10 from "./assets/components/Top10";
// import SavedTracks from "./assets/components/SavedTracks";
import { Navbar, Nav, Button } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-js";
import topTenArtists from "./data/topTenArtists.json";

const spotifyApi = new SpotifyWebApi();

const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("Home");
  //ANALYSIS page states
  const [searchQuery, setSearchQuery] = useState("");
  const [trackId, setTrackId] = useState("");
  const [audioAnalysis, setAudioAnalysis] = useState({});
  const [audioFeatures, setAudioFeatures] = useState({});
  const [track, setTrack] = useState({});
  //CURRENT TRACK states
  const [nowPlaying, setNowPlaying] = useState({});
  //TOP ARTISTS states
  const [topArtists, setTopArtists] = useState({});
  //TOP TRACKS states
  const [topTracks, setTopTracks] = useState({});
  //LAST 50 SAVED TRACKS
  const [savedTracks, setSavedTracks] = useState({});
  //TOP 10 PAGE

  useEffect(() => {
    const spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = "";
    if (spotifyToken) {
      async function getSavedTracks() {
        const result = await spotifyApi.getMySavedTracks({ limit: 50 });
        setSavedTracks(result.items);
        console.log(result.items);
      }
      setSpotifyToken(spotifyToken);
      spotifyApi.setAccessToken(spotifyToken);
      setLoggedIn(true);
      spotifyApi
        .getMyTopArtists({ limit: 10, time_range: "long_term" })
        .then((data) => {
          setTopArtists(data);
        })
        .catch((error) => console.error(error));
      spotifyApi
        .getMyTopTracks({ limit: 10, time_range: "long_term" })
        .then((data) => {
          setTopTracks(data);
        });

      getSavedTracks();
      saveData();
    }
  });

  async function saveData() {
    // Make a request to the Spotify API
    const response = await spotifyApi.getAlbum("7ycBtnsMtyVbbwTfJwRjSP");

    // Save the data to the local storage
    localStorage.setItem("albumData", JSON.stringify(response));
  }

  useEffect(() => {
    spotifyApi
      .getAudioFeaturesForTrack(trackId)
      .then((data) => (setAudioFeatures(data), console.log(data)))
      .catch((error) => console.error(error));
    spotifyApi
      .getAudioAnalysisForTrack(trackId)
      .then((data) => (setAudioAnalysis(data), console.log(data)))
      .catch((error) => console.error(error));
  }, [trackId]);

  async function handleSearch(event) {
    event.preventDefault();
    try {
      const searchResults = await spotifyApi.searchTracks(searchQuery);
      const firstTrackId = searchResults.tracks.items[0].id;
      setTrackId(firstTrackId);
      const track = searchResults.tracks.items[0];
      setTrack(track);
      // const getAudioFeaturesForTrack = await spotifyApi.getAudioFeaturesForTrack(trackId)
      // setAudioAnalysis(getAudioFeaturesForTrack)
    } catch (error) {
      console.error(error);
    }
  }

  const getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState().then((response) => {
      console.log(response);
      setNowPlaying({
        title: response.item.name,
        albumArt: response.item.album.images[0].url,
      });
    });
  };

  const renderPage = () => {
    if (currentPage === "Home") {
      return <Home />;
    }

    if (currentPage === "NowPlaying") {
      return (
        <NowPlaying nowPlaying={nowPlaying} getNowPlaying={getNowPlaying} />
      );
    }

    if (currentPage === "Analysis") {
      return (
        <Analysis
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          trackId={trackId}
          audioAnalysis={audioAnalysis}
          track={track}
          audioFeatures={audioFeatures}
        />
      );
    }

    if (currentPage === "TopArtist") {
      return <TopArtist topArtists={topArtists} />;
    }

    if (currentPage === "TopTracks") {
      return <TopTracks topTracks={topTracks} />;
    }

    if (currentPage === "LastFiftySaved") {
      return <LastFiftySaved savedTracks={savedTracks} />;
    }

    if (currentPage === "Top10") {
      return <Top10 />;
    }
  };

  return (
    <div className="App">
      <Header
        loggedIn={loggedIn}
        setCurrentPage={setCurrentPage}
        topArtists={topArtists}
      ></Header>
      {renderPage()}
    </div>
  );
}

export default App;
