import '../styles/analysis.css';
function Analysis({handleSearch, searchQuery, setSearchQuery, trackId, audioAnalysis, track}) {

  return (
    <>
      <div>Search for a tracks audio analysis and features</div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/* {trackId && <div>Selected Track Id: {trackId}</div>} */}
      {track && track.name && <h2>Track name: {track.name}</h2>}
      {track && track.artists && track.artists[0] && track.artists[0].name && <h3>Artist: {track.artists[0].name}</h3>}
      {track && track.album && track.album.images && track.album.images[1] && track.album.images[1].url && <img src={track.album.images[1].url} alt="Track Image"></img>}
      {audioAnalysis && (
        <div>
          <p>Audio Features:</p>
          <div className="analysis-container">

            <div className="analysis-feature">
              <p className="feature-name">Danceability:</p>
              <p className="feature-value">{audioAnalysis.danceability}</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Energy:</p>
              <p className="feature-value">{audioAnalysis.energy}</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Key:</p>
              <p className="feature-value">{audioAnalysis.key}</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Loudness:</p>
              <p className="feature-value">{audioAnalysis.loudness}</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Mode:</p>
              <p className="feature-value">{audioAnalysis.mode}</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Speechiness:</p>
              <p className="feature-value">{audioAnalysis.speechiness}</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Acousticness:</p>
              <p className="feature-value">{audioAnalysis.acousticness}</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Instrumentalness:</p>
              <p className="feature-value">{audioAnalysis.instrumentalness}</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Liveness:</p>
              <p className="feature-value">{audioAnalysis.liveness}</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Valence:</p>
              <p className="feature-value">{audioAnalysis.valence}</p>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
}

export default Analysis;