import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'
import "../styles/topArtist.css";
import { Bar } from 'react-chartjs-2'
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

function TopArtist({topArtists}) {

    const data = {
        labels: topArtists.items.map((artist, index) => `${index+1}:${artist.name} (${artist.popularity})`),
        datasets: [
          {
            label: 'Followers',
            data: topArtists.items.map(artist => artist.followers.total),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
        ]
      };
    
    const options = {

    }

    return (
        <div>
        <Bar data={data} options={options}/>
      </div>
  );
}
export default TopArtist;