const fs = require('fs');
const { promisify } = require('util');
const { isVideoFile, formVideoResponse } = require('./utils');
const { mediaStoragePath } = require('../config');

const readdirAsync = promisify(fs.readdir);

/**
 * Returns a list of videos with their names and thumbnails
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function getVideos(req, res) {
  try {
    const searchString = req.query.search;

    const filesList = await readdirAsync(mediaStoragePath);

    const videosList = filesList
      .filter(isVideoFile)
      .filter((fileName) => !searchString || fileName.includes(searchString))
      .map(formVideoResponse);

    return res.send(videosList);
  } catch (e) {
    return res.status(500).send(e);
  }
}

module.exports = getVideos;
