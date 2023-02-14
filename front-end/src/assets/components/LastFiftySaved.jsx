import React, { useState, useEffect } from "react";
import "../styles/lastfiftysaved.css";
import { Bar } from 'react-chartjs-2'
const LastFiftySaved = ({ savedTracks }) => {
  const [graphType, setGraphType] = useState("total");
  const songCountByMonth = {};
  
  savedTracks.forEach(track => {
    const month = new Date(track.added_at).toLocaleString('default', { month: 'short' });
    const year = new Date(track.added_at).getFullYear();
    if (!songCountByMonth[`${month} ${year}`]) {
      songCountByMonth[`${month} ${year}`] = 1;
    } else {
      songCountByMonth[`${month} ${year}`]++;
    }
  });
  
  const chartData = {
    labels: Object.keys(songCountByMonth),
    datasets: [
      {
        label: 'Songs Added',
        backgroundColor: 'rgba(29, 185, 84, 0.2)',
        borderColor: 'rgba(29, 185, 84, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(29, 185, 84, 0.4)',
        hoverBorderColor: 'rgba(29, 185, 84, 0.2)',
        data: Object.values(songCountByMonth)
      }
    ]
  };

  const songCountByMonthExplicitFilter = {};

  savedTracks.forEach(track => {
    const month = new Date(track.added_at).toLocaleString('default', { month: 'short' });
    const year = new Date(track.added_at).getFullYear();
    if (!songCountByMonthExplicitFilter[`${month} ${year}`]) {
      songCountByMonthExplicitFilter[`${month} ${year}`] = { explicit: 0, notExplicit: 0 };
    }
    if (track.track.explicit) {
      songCountByMonthExplicitFilter[`${month} ${year}`].explicit++;
    } else {
      songCountByMonthExplicitFilter[`${month} ${year}`].notExplicit++;
    }
  });
  
  const chartDataExplcit = {
    labels: Object.keys(songCountByMonthExplicitFilter),
    datasets: [
      {
        label: 'Explicit',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
        hoverBorderColor: 'rgba(255, 99, 132, 0.2)',
        data: Object.keys(songCountByMonthExplicitFilter).map(key => songCountByMonthExplicitFilter[key].explicit)
      },
      {
        label: 'Clean',
        backgroundColor: 'rgba(29, 185, 84, 0.2)',
        borderColor: 'rgba(29, 185, 84, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(29, 185, 84, 0.4)',
        hoverBorderColor: 'rgba(29, 185, 84, 0.2)',
        data: Object.keys(songCountByMonthExplicitFilter).map(key => songCountByMonthExplicitFilter[key].notExplicit)
      }
    ]
  };

  const options = {
    maintainAspectRatio: true,
    indexAxis: "x",
    scales: {
      x: {
        ticks: {
          font: {
            size: 16
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: 16
          }
        }
      },
    }
  };
  

  return (
    <>
    <p>Here is last 50 songs you saved:</p>
    <div style={{ display: 'flex', overflowX: 'scroll', width: '100%' }}>
      {savedTracks.map((track, index) => {
        return (
          <div className='card' key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px', }}>
            <img src={track.track.album.images[0].url} alt={track.name} style={{ width: 150, height: 150 }} />
            <p className='card_text' style={{ marginTop: 10 }}>{track.track.name} by: {track.track.artists[0].name}</p>
            <p className='card_text' style={{ marginTop: 5, fontSize: '0.8em' }}>Added: {new Date(track.added_at).toDateString()}</p>
          </div>
        )
      })}
    </div>
    <p>The amount of songs you have added each month:</p>
    <select onChange={e => setGraphType(e.target.value)}>
      <option value="total">Total</option>
      <option value="explicit">Explicit vs Clean</option>
    </select>
    {graphType === 'total' ? (
      <Bar
        data={chartData}
        width={100}
        height={50}
        options={options}
      />
    ) : (
      <Bar
        data={chartDataExplcit}
        width={100}
        height={50}
        options={options}
      />
    )}
    </>
  )
}

export default LastFiftySaved
