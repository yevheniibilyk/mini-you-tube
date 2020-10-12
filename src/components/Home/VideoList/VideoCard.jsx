import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import './styles/video-card.scss';

function VideoCard({ imageUrl, title, onClick }) {
  return (
    <Card
      className="video-card"
      onClick={onClick}
    >
      <CardActionArea>
        <CardMedia
          className="video-card__thumbnail"
          image={imageUrl}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

VideoCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default VideoCard;
