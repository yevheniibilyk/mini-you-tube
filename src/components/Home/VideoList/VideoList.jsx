import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoize from 'lodash.memoize';
import debounce from 'lodash.debounce';
import VideoCard from './VideoCard';
import { axios } from '../../../utils';
import './styles/video-list.scss';

class VideoList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      videos: []
    };
  }

  componentDidMount () {
    this.fetchVideos();
  }

  componentDidUpdate (prevProps) {
    const { location } = this.props;

    if (prevProps.location.search === location.search) {
      return;
    }

    this.fetchVideos();
  }

  onVideoClick = memoize((video) => () => {
    const { onClick } = this.props;

    onClick(video);
  })

  fetchVideos = debounce(async () => {
    const { location } = this.props;

    try {
      const { data: videos } = await axios.get(`/api/videos${location.search}`);

      this.setState({ videos });
    } catch (e) {
      console.log(e);
      this.setState({ videos: [] });
    }
  }, 400, { leading: true })

  render () {
    const { videos } = this.state;

    return (
      <div className="video-list">
        {videos.map((video) => (
          <VideoCard
            key={video.name}
            title={video.name}
            imageUrl={video.thumbnailUrl}
            onClick={this.onVideoClick(video)}
          />
          )
        )}
      </div>
    )
  }
}

VideoList.propTypes = {
  location: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default VideoList;
