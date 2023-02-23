import { motion } from "framer-motion";
import styled from "styled-components";
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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
  margin-top: 0rem;
`;

const AnalysisFeature = styled.div`
  margin-bottom: 0;
  padding: 0.5rem;
  background-color: #1DB954;
  border-radius: 8px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);

  .circular-progressbar {
    margin: auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .label {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .description {
    font-size: 0.8rem;
    width: 100%;
  }
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

const Container = styled(motion.div)`
  width: 30%;
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 0.5rem;
  justify-content: center;
  background-color: #1DB954;
  margin:auto;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  margin-right: 1rem;
  border-radius: 0.25rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const SubHeading = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const Text = styled.p`
  font-size: 0.875rem;
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
        color: 'white',
        backdropColor: 'transparent',
        font: {
          size:15,
        }
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
  

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

  return (
    
    <>
    <div className="analysis-page">
      <div>Search for a tracks audio analysis and features</div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
        <button type="submit" className='submit'>Search</button>
      </form>
      {trackId && <Container>
      {track && track.album && track.album.images && track.album.images[1] && (
        <Image src={track.album.images[1].url} alt="Track Image" />
      )}
      <TextContainer>
        {track && track.name && <Heading>Track name: {track.name}</Heading>}
        {track &&
          track.artists &&
          track.artists[0] &&
          track.artists[0].name && (
            <SubHeading>Artist: {track.artists[0].name}</SubHeading>
          )}
        {track.duration_ms && <Text>Duration: {millisToMinutesAndSeconds(track.duration_ms)}</Text>}
        {track.explicit && <Text>EXPLICIT</Text>}
      </TextContainer>
    </Container>}
      {trackId && (
        <>
        <h2>Audio Features:</h2>
        <div className='analysis-page-data'>
          <AnalysisContainer className="analysis-container">
            <AnalysisFeature className="analysis-feature" title="A value from 0.0 to 1.0 that describes how suitable a track is for dancing, based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.">
            <div className="circular-progressbar">
              <CircularProgressbar
                value={audioFeatures.danceability * 100}
                text={`${audioFeatures.danceability}`}
                styles={buildStyles({
                  pathColor: "#fff",
                  textColor: "#fff",
                  trailColor: "rgba(255, 255, 255, 0.5)",
                  textSize: "1.5rem",
                })}
              />
              <div className="label">Danceability</div>
            </div>
            </AnalysisFeature>

            <AnalysisFeature className="analysis-feature" title="A value from 0.0 to 1.0 that represents the musical positiveness conveyed by a track, with 1.0 being the most positive.">
            <div className="circular-progressbar">
              <CircularProgressbar
                value={audioFeatures.valence * 100}
                text={`${audioFeatures.valence}`}
                styles={buildStyles({
                  pathColor: "#fff",
                  textColor: "#fff",
                  trailColor: "rgba(255, 255, 255, 0.5)",
                  textSize: "1.5rem",
                })}
              />
              <div className="label">Valence</div>
            </div>
            </AnalysisFeature>

            <AnalysisFeature className="analysis-feature" title="A value from 0.0 to 1.0 that represents a perceptual measure of intensity and activity, from relaxed and calm to energetic and loud.">
            <div className="circular-progressbar">
              <CircularProgressbar
                value={audioFeatures.energy * 100}
                text={`${audioFeatures.energy}`}
                styles={buildStyles({
                  pathColor: "#fff",
                  textColor: "#fff",
                  trailColor: "rgba(255, 255, 255, 0.5)",
                  textSize: "1.5rem",
                })}
              />
              <div className="label">Energy</div>
            </div>
            </AnalysisFeature>

            <AnalysisFeature className="analysis-feature" title="A value from 0.0 to 1.0 that represents the presence of spoken words in a track.">
            <div className="circular-progressbar">
              <CircularProgressbar
                value={audioFeatures.speechiness * 100}
                text={`${audioFeatures.speechiness}`}
                styles={buildStyles({
                  pathColor: "#fff",
                  textColor: "#fff",
                  trailColor: "rgba(255, 255, 255, 0.5)",
                  textSize: "1.5rem",
                })}
              />
              <div className="label">Speechiness</div>
            </div>
            </AnalysisFeature>

            <AnalysisFeature className="analysis-feature" title="A value from 0.0 to 1.0 that describes how acoustic a track is, with 1.0 being the most acoustic.">
            <div className="circular-progressbar">
              <CircularProgressbar
                value={audioFeatures.acousticness * 100}
                text={`${audioFeatures.acousticness}`}
                styles={buildStyles({
                  pathColor: "#fff",
                  textColor: "#fff",
                  trailColor: "rgba(255, 255, 255, 0.5)",
                  textSize: "1.5rem",
                })}
              />
              <div className="label">Acousticness</div>
            </div>
            </AnalysisFeature>

            <AnalysisFeature className="analysis-feature" title="A value from 0.0 to 1.0 that represents the likelihood that the track was performed live.">
            <div className="circular-progressbar">
              <CircularProgressbar
                value={audioFeatures.liveness * 100}
                text={`${audioFeatures.liveness}`}
                styles={buildStyles({
                  pathColor: "#fff",
                  textColor: "#fff",
                  trailColor: "rgba(255, 255, 255, 0.5)",
                  textSize: "1.5rem",
                })}
              />
              <div className="label">Liveness</div>
            </div>
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
              <FeatureName className="feature-name">Instrumentalness:</FeatureName>
              <FeatureValue className="feature-value">{audioFeatures.instrumentalness}</FeatureValue>
              <FeatureDescription>A value from 0.0 to 1.0 that describes the likelihood that the track contains no vocals.</FeatureDescription>
            </AnalysisFeature>

          </AnalysisContainer>
          <div className='radar_container'>
            <Radar data={data} options={options}/>
          </div>
        </div>
        </>
      )}
      </div>
    </>
  );
}

export default Analysis;