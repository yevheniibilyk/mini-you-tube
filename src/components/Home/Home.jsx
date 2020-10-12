import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import VideoList from './VideoList';
import PlayerModal from './PlayerModal';

function Home({ location }) {
  const [selectedVideo, setVideo] = useState(null);

  return (
    <div>
      <VideoList
        location={location}
        onClick={setVideo}
      />
      <PlayerModal
        onClose={() => setVideo(null)}
        videoUrl={selectedVideo && selectedVideo.url}
        name={selectedVideo && selectedVideo.name}
      />
    </div>
  );
}

Home.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Home);
