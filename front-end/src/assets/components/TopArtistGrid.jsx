import { motion } from "framer-motion";
import styled from "styled-components";

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #242424;
`;

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: #1DB954;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  border-radius: 50%;
  margin-bottom: 0px;
`;

const Name = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 0px;
`;

const Followers = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: white;
`;

function TopArtistsGrid({ topArtists }) {
  return (
    <Grid>
      {topArtists.items.slice(0, 10).map((artist, index) => (
        <Card
          key={artist.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3>#{index + 1}</h3>
          <Image src={artist.images[0].url} alt={artist.name} width="125" height="125"/>
          <Name>{artist.name}</Name>
          <Followers>Followers: {artist.followers.total.toLocaleString()}</Followers>
        </Card>
      ))}
    </Grid>
  );
}

export default TopArtistsGrid;
