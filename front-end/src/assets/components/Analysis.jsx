import { motion } from "framer-motion";
import styled from "styled-components";
import '../styles/analysis.css';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const AnalysisContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const AnalysisFeature = styled.div`
  width: 33%;
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  background-color: #1DB954;
  border-radius: 8px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
`;

const FeatureName = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const FeatureValue = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  font-size: 0.8rem;
`;
function Analysis({handleSearch, searchQuery, setSearchQuery, trackId, audioAnalysis, audioFeatures, track}) {
  const data = {
    labels: ['Energy', 'Danceability', 'Acousticness', 'Valence', 'Speechiness', 'Liveness', 'Instrumentalness'],
    datasets: [
      {
        label: 'Track Audio Features',
        data: [
          audioFeatures.energy,
          audioFeatures.danceability,
          audioFeatures.acousticness,
          audioFeatures.valence,
          audioFeatures.speechiness,
          audioFeatures.liveness,
          audioFeatures.instrumentalness
        ],
        backgroundColor: 'rgba(29, 185, 84, 0.2)',
        borderColor: 'rgba(29, 185, 84, 1)',
        borderWidth: 1
      }
    ]
  }
  const options ={
    responsive: true,
    maintainAspectRatio: true,
    scale: {
      ticks: {
        min: 0,
        max: 1,
        display: false,
      },
      pointLabels: {
        fontSize: 14,
      }
    },
    plugins: {
      legend: {
          labels: {
              // This more specific font property overrides the global property
              font: {
                  size: 15
              }
          }
      }
  },
  scales: {
    r: {
      ticks:{
        color: 'black'
      },
      angleLines: {
        display: true,
        color: 'black'
      },
      suggestedMin: 0,
      suggestedMax: 1,
      pointLabels: {
        font:{
          size: 20
        }
      },
      grid:{
        color:'black'
      }
    },
  }
  }
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
      {audioFeatures && (
        <div className='analysis-page'>
          <p>Audio Features:</p>
          <AnalysisContainer className="analysis-container">

            <AnalysisFeature className="analysis-feature">
              <FeatureName className="feature-name">Danceability:</FeatureName>
              <FeatureValue className="feature-value">{audioFeatures.danceability}</FeatureValue>
              <FeatureDescription>A value from 0.0 to 1.0 that describes how suitable a track is for dancing, based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.</FeatureDescription>
            </AnalysisFeature>

            <AnalysisFeature className="analysis-feature">
              <FeatureName className="feature-name">Energy:</FeatureName>
              <FeatureValue className="feature-value">{audioFeatures.energy}</FeatureValue>
              <FeatureDescription>A value from 0.0 to 1.0 that represents a perceptual measure of intensity and activity, from relaxed and calm to energetic and loud.</FeatureDescription>
            </AnalysisFeature>

            <AnalysisFeature className="analysis-feature">
              <FeatureName className="feature-name">Key:</FeatureName>
              <FeatureValue className="feature-value">{audioFeatures.key}</FeatureValue>
              <FeatureDescription>The estimated overall key of the track. Integers map to pitches using standard Pitch Class notation.</FeatureDescription>
            </AnalysisFeature>

            <AnalysisFeature className="analysis-feature">
              <FeatureName className="feature-name">Loudness:</FeatureName>
              <FeatureValue className="feature-value">{audioFeatures.loudness}</FeatureValue>
              <FeatureDescription>The overall loudness of a track in decibels (dB).</FeatureDescription>
            </AnalysisFeature>

            <AnalysisFeature className="analysis-feature">
              <FeatureName className="feature-name">Mode:</FeatureName>
              <FeatureValue className="feature-value">{audioFeatures.mode}</FeatureValue>
              <FeatureDescription>The modality (major or minor) of a track, the type of scale from which its melodic content is derived.</FeatureDescription>
            </AnalysisFeature>

            <AnalysisFeature className="analysis-feature">
              <FeatureName className="feature-name">Speechiness:</FeatureName>
              <FeatureValue className="feature-value">{audioFeatures.speechiness}</FeatureValue>
              <FeatureDescription>A value from 0.0 to 1.0 that represents the presence of spoken words in a track.</FeatureDescription>
            </AnalysisFeature>

            <AnalysisFeature className="analysis-feature">
              <FeatureName className="feature-name">Acousticness:</FeatureName>
              <FeatureValue className="feature-value">{audioFeatures.acousticness}</FeatureValue>
              <FeatureDescription>A value from 0.0 to 1.0 that describes how acoustic a track is, with 1.0 being the most acoustic.</FeatureDescription>
            </AnalysisFeature>

            <AnalysisFeature className="analysis-feature">
              <FeatureName className="feature-name">Instrumentalness:</FeatureName>
              <FeatureValue className="feature-value">{audioFeatures.instrumentalness}</FeatureValue>
              <FeatureDescription>A value from 0.0 to 1.0 that describes the likelihood that the track contains no vocals.</FeatureDescription>
            </AnalysisFeature>

            <AnalysisFeature className="analysis-feature">
              <FeatureName className="feature-name">Liveness:</FeatureName>
              <FeatureValue className="feature-value">{audioFeatures.liveness}</FeatureValue>
              <FeatureDescription>A value from 0.0 to 1.0 that represents the likelihood that the track was performed live.</FeatureDescription>
            </AnalysisFeature>

            <AnalysisFeature className="analysis-feature">
              <FeatureName className="feature-name">Valence:</FeatureName>
              <FeatureValue className="feature-value">{audioFeatures.valence}</FeatureValue>
              <FeatureDescription>A value from 0.0 to 1.0 that represents the musical positiveness conveyed by a track, with 1.0 being the most positive.</FeatureDescription>
            </AnalysisFeature>
          </AnalysisContainer>
          <div className='radar_container'>
            <Radar data={data} options={options}/>
          </div>
        </div>
        
      )}
    </>
  );
}

export default Analysis;