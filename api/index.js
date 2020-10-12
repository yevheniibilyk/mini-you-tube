const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { mediaStoragePath } = require('./config');
const { apiPort } = require('../src/config');
const { uploadVideo, getVideos } = require('./video');

const app = express();

app.use(cors());
app.use('/media', express.static(mediaStoragePath));
app.use(fileUpload());

app.get('/api/videos', getVideos);
app.post('/api/upload', uploadVideo);

app.listen(apiPort, () => {
  console.log(`App listening at http://localhost:${apiPort}`);
});
