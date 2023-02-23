import topTenArtists from "../../data/topTenArtists.json";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

function Top10() {
  const [artistsData, setArtistsData] = useState([]);
  const [selectedGraph, setSelectedGraph] = useState("followers");

  useEffect(() => {
    setArtistsData(
      topTenArtists.map((artist) => ({
        name: artist.name,
        followers: artist.followers.total,
        genres: artist.genres,
        popularity: artist.popularity
      }))
    );
  }, []);

  const data = {
    genres: {
      labels: artistsData.map((artist) => artist.name),
      datasets: [
        {
          label: "Genre Count:",
          data: artistsData.map((artist) => artist.genres.length),
          backgroundColor: ["rgba(29, 185, 84, .2)"],
          borderColor: ["rgba(29, 185, 84, 1)"],
          borderWidth: 1,
        },
      ],
      tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                const artistIndex = tooltipItem.index;
                const artist = artistsData[artistIndex];
                if (selectedGraph === "genres") {
                  const genresList = artist.genres
                    .map((genre) => `- ${genre}`)
                    .join("\n");
                  return `All Genres:\n${genresList}`;
                } else if (selectedGraph === "followers") {
                  return `${artist.name}: ${artist.followers}`;
                } else {
                  return `${artist.name}: #${artist.popularity}`;
                }
              },
            },
          },
    },
    followers: {
      labels: artistsData.map((artist) => artist.name),
      datasets: [
        {
          label: "Followers",
          data: artistsData.map((artist) => artist.followers),
          backgroundColor: ["rgba(29, 185, 84, .2)"],
          borderColor: ["rgba(29, 185, 84, 1)"],
          borderWidth: 1,
        },
      ],
    },
    rank: {
      labels: artistsData.map((artist) => artist.name),
      datasets: [
        {
          label: "Spotify Popularity Rank",
          data: artistsData.map((artist) => artist.popularity),
          backgroundColor: ["rgba(29, 185, 84, .2)"],
          borderColor: ["rgba(29, 185, 84, 1)"],
          borderWidth: 1,
        },
      ],
    },
  };

  const filteredData = data[selectedGraph];

  return (
    <div className="container">
      <div>
        <label htmlFor="graph-select">Select Graph:</label>
        <select
          id="graph-select"
          onChange={(e) => setSelectedGraph(e.target.value)}
        >
          <option value="followers">Followers</option>
          <option value="genres">All Genres</option>
          <option value="rank">Ranking</option>
        </select>
      </div>
      <p>Spotifys Top 10 Artists by follow count</p>
      <div className="chart">
      <Bar
        data={filteredData}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: true,
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                const artistIndex = tooltipItem.index;
                const artist = artistsData[artistIndex];
                if (selectedGraph === "genres") {
                  const genresList = artist.genres
                    .map((genre) => `- ${genre}`)
                    .join("\n");
                  return `All Genres:\n${genresList}`;
                } else if (selectedGraph === "followers") {
                  return `${artist.name}: ${artist.followers}`;
                } else {
                  return `${artist.name}: #${artist.popularity}`;
                }
              },
            },
          },
        }}
      />
      </div>
    </div>
  );
}

export default Top10;
