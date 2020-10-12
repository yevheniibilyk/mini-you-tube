const mime = require('mime-types');
const { apiUrl } = require('../../../src/config');

const mediaStaticUrl = `${apiUrl}/media`;

const isVideoFile = (filePath) => {
  const mimeType = mime.lookup(filePath);

  return mimeType.startsWith('video/');
};

const formVideoResponse = (fileName) => ({
  name: fileName,
  url: `${mediaStaticUrl}/${fileName}`,
  thumbnailUrl: `${mediaStaticUrl}/${fileName}_THUMBNAIL.png`,
});

module.exports = {
  isVideoFile,
  formVideoResponse,
};
