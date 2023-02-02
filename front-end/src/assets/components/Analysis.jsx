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
        <button type="submit" className='submit'>Search</button>
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
              <p>A value from 0.0 to 1.0 that describes how suitable a track is for dancing, based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Energy:</p>
              <p className="feature-value">{audioAnalysis.energy}</p>
              <p>A value from 0.0 to 1.0 that represents a perceptual measure of intensity and activity, from relaxed and calm to energetic and loud.</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Key:</p>
              <p className="feature-value">{audioAnalysis.key}</p>
              <p>The estimated overall key of the track. Integers map to pitches using standard Pitch Class notation.</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Loudness:</p>
              <p className="feature-value">{audioAnalysis.loudness}</p>
              <p>The overall loudness of a track in decibels (dB).</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Mode:</p>
              <p className="feature-value">{audioAnalysis.mode}</p>
              <p>The modality (major or minor) of a track, the type of scale from which its melodic content is derived.</p>

            </div>

            <div className="analysis-feature">
              <p className="feature-name">Speechiness:</p>
              <p className="feature-value">{audioAnalysis.speechiness}</p>
              <p>A value from 0.0 to 1.0 that represents the presence of spoken words in a track.</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Acousticness:</p>
              <p className="feature-value">{audioAnalysis.acousticness}</p>
              <p>A value from 0.0 to 1.0 that describes how acoustic a track is, with 1.0 being the most acoustic.</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Instrumentalness:</p>
              <p className="feature-value">{audioAnalysis.instrumentalness}</p>
              <p>A value from 0.0 to 1.0 that describes the likelihood that the track contains no vocals.</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Liveness:</p>
              <p className="feature-value">{audioAnalysis.liveness}</p>
              <p>A value from 0.0 to 1.0 that represents the likelihood that the track was performed live.</p>
            </div>

            <div className="analysis-feature">
              <p className="feature-name">Valence:</p>
              <p className="feature-value">{audioAnalysis.valence}</p>
              <p>A value from 0.0 to 1.0 that represents the musical positiveness conveyed by a track, with 1.0 being the most positive.</p>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
}

export default Analysis;