import topTenArtists from "../../data/topTenArtists.json";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

function Top10() {
  const [artistsData, setArtistsData] = useState([]);

  useEffect(() => {
    setArtistsData(topTenArtists.map(artist => ({ name: artist.name, followers: artist.followers.total })));
  }, []);

  const data = {
    labels: artistsData.map(artist => artist.name),
    datasets: [
      {
        label: 'Followers',
        data: artistsData.map(artist => artist.followers),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <Bar
        data={data}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: true
        }}
      />
    </div>
  );
}

export default Top10;