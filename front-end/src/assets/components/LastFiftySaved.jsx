import React from 'react'
import "../styles/lastfiftysaved.css";
import { Bar } from 'react-chartjs-2'
const LastFiftySaved = ({ savedTracks }) => {
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
    <Bar
      data={chartData}
      width={100}
      height={50}
      options={{ maintainAspectRatio: true }}
    />
    </>
  )
}

export default LastFiftySaved
