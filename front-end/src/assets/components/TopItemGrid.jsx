function TopTracksGrid({ topTracks }) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridGap: "20px" }}>
        {topTracks.items.slice(0, 10).map((track, index) => (
          <div key={track.id} style={{ textAlign: "center", padding: "20px" }}>
            <img src={track.album.images[2].url} alt={track.name} width="64" height="64"/>
            <h3>{index + 1}</h3>
            <p>{track.name}</p>
            <p>{track.artists[0].name}</p>
          </div>
        ))}
      </div>
    );
  }
  export default TopTracksGrid;