import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropzoneArea } from 'material-ui-dropzone';
import { CircularProgress } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import { axios } from '../../utils';
import './styles/upload-page.scss';

// 10MB
const MAX_FILE_SIZE = 20 * 1048576;

class Upload extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: false
    };
  }

  onDropRejected = (alertText, variant) => {
    const { enqueueSnackbar } = this.props;

    if (!["error", "info"].includes(variant)) {
      return;
    }

    enqueueSnackbar(alertText,  { variant });
  }

  uploadFiles = async (files) => {
    if (!files || !files.length) {
      return;
    }

    this.setState({ loading: true });

    await Promise.all(
      files.map(this.uploadFile)
    );

    this.setState({ loading: false });
  }

  uploadFile = async (file) => {
    const { enqueueSnackbar } = this.props;

    const data = new FormData();

    data.append('file', file);

    try {
      await axios.post('/api/upload', data);
      enqueueSnackbar(`File ${file.name} uploaded`, { variant: 'success' });
    } catch (e) {
      enqueueSnackbar(`Upload failed for ${file.name}`,  { variant: 'error' })
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="upload-page">
        <div className="upload-page__dropzone">
          {!loading ? (
            <DropzoneArea
              onChange={this.uploadFiles}
              onAlert={this.onDropRejected}
              acceptedFiles={['video/*']}
              maxFileSize={MAX_FILE_SIZE}
              filesLimit={10}
              disabled={loading}
              showAlerts={false}
              showPreviews={false}
              showPreviewsInDropzone={false}
            />
          ) : (<CircularProgress className="upload-page--loading" size={100}/>)}
        </div>
      </div>
    )
  }
}

Upload.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired
}

export default withSnackbar(Upload);