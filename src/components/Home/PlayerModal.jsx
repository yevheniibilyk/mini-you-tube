import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Typography } from '@material-ui/core';
import './styles/player-modal.scss';

function PlayerModal({ videoUrl, name, onClose }) {
  return (
    <Modal
      open={Boolean(videoUrl)}
      onClose={onClose}
    >
      <div className="player-modal">
        <video
          controls
          src={videoUrl}
        />
        <Typography variant="body2" color="textSecondary" component="p">
          {name}
        </Typography>
      </div>
    </Modal>
  );
}

PlayerModal.propTypes = {
  videoUrl: PropTypes.string,
  name: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default PlayerModal;
