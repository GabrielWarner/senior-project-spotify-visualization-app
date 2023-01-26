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

function TopArtist({ topArtists }) {
  const data = {
    labels: topArtists.items.map(
      (artist, index) => `${index + 1}:${artist.name} (${artist.popularity})`
    ),
    datasets: [
      {
        label: "Followers",
        data: topArtists.items.map((artist) => artist.followers.total),
        backgroundColor: "rgba(29, 185, 84, 0.2)",
        borderColor: "rgba(29, 185, 84, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    x: {

    },
    plugins: {
    zoom: {
        zoom: {
            wheel: {
              enabled: true,
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
      <Bar data={data} options={options} />
    </div>
  );
}
export default TopArtist;
