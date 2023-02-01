function TopArtistsGrid({ topArtists }) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridGap: "20px" }}>
        {topArtists.items.slice(0, 10).map((artist, index) => (
          <div key={artist.id} style={{ textAlign: "center", padding: "20px" }}>
            <h3>{index + 1}</h3>
            <img src={artist.images[2].url} alt={artist.name} />
            <p>{artist.name}</p>
            <p>Followers: {artist.followers.total.toLocaleString()}</p>
          </div>
        ))}
      </div>
    );
  }
  export default TopArtistsGrid;