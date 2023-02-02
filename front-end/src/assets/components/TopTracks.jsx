import TopItemGrid from "./TopItemGrid";
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import "../styles/topArtist.css";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  zoomPlugin
);

function TopTrack({ topTracks }) {
    const data = {
      labels: topTracks.items.map(
        (track, index) => `${index + 1}: ${track.name} by ${track.artists[0].name} (${track.popularity})`
      ),
      datasets: [
        {
          label: "Spotify Popularity Rating (0-100)",
          data: topTracks.items.map((track) => track.popularity),
          backgroundColor: "rgba(29, 185, 84, 0.2)",
          borderColor: "rgba(29, 185, 84, 1)",
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      indexAxis: "y",
      plugins: {
      zoom: {
          zoom: {
              wheel: {
                enabled: false,
              },
              pinch: {
                enabled: false,
              },
              mode: "x",
              drag: {
                enabled: false,
              },
            },
            limits: {
              x: {min: 'original', max: 'original', minRange: 100000},
            },
            pan: {
              enabled: true,
            }
      }
      },
    };
  
    return (
      <div>
        <TopItemGrid topTracks={topTracks}/>
        <Bar data={data} options={options} />
        <p>Spotify's popularity rating is a score that reflects the popularity of an artist, album, or track on the platform. The rating is calculated using a proprietary algorithm that takes into account several factors, such as the number of plays, saves, and shares, as well as the velocity of these activities. The popularity rating ranges from 0 to 100, with 100 being the highest and most popular. The score is updated in real-time and can change frequently based on user behavior.</p>

      </div>
    );
  }
  export default TopTrack;