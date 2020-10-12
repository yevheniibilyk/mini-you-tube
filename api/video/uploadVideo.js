const genThumbnail = require('simple-thumbnail');
const { isVideoFile, formVideoResponse } = require('./utils');
const { mediaStoragePath } = require('../config');

async function uploadVideo(req, res) {
  if (!req.files || !req.files.file) {
    return res.status(500).send({ msg: 'Uploading file failed.' });
  }

  const { file } = req.files;

  if (!isVideoFile(file.name)) {
    return res.status(403).send({ msg: 'Not a video file.' });
  }

  const videoPath = `${mediaStoragePath}/${file.name}`;
  const thumbnailPath = `${videoPath}_THUMBNAIL.png`;

  // Allow user to replace video and thumbnail for file with same name
  file.mv(videoPath, async (err) => {
    if (err) {
      return res.status(500).send({ msg: 'Error occured.' });
    }

    try {
      await genThumbnail(videoPath, thumbnailPath, '350x200');
    } catch (e) {
      console.log(`Thumbnail generation failed for ${file.name}`);
    }

    return res.send(formVideoResponse(file.name));
  });
}

module.exports = uploadVideo;
