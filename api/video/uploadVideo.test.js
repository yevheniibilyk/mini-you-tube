const genThumbnail = require('simple-thumbnail');
const uploadVideo = require('./uploadVideo');

jest.mock('simple-thumbnail');

const FILE = {
  name: 'video.mp4',
  mv: (videoPath, cb) => cb(),
};

const MOCK_SEND = jest.fn();

const mockRes = {
  status: () => ({
    send: MOCK_SEND,
  }),
};

describe('Upload video route', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should send error if file not exist', () => {
    uploadVideo({}, mockRes);

    expect(MOCK_SEND).toHaveBeenCalledWith({ msg: 'Uploading file failed.' });
  });

  test('should send error if file is not video', () => {
    uploadVideo({
      files: {
        file: { ...FILE, name: 'video.png' },
      },
    },
    mockRes);

    expect(MOCK_SEND).toHaveBeenCalledWith({ msg: 'Not a video file.' });
  });

  test('should successfully save file', async () => {
    await uploadVideo({
      files: {
        file: FILE,
      },
    },
    { send: MOCK_SEND });

    expect(MOCK_SEND).toHaveBeenCalledWith({
      name: FILE.name,
      thumbnailUrl: 'http://localhost:3002/media/video.mp4_THUMBNAIL.png',
      url: 'http://localhost:3002/media/video.mp4',
    });
  });

  test('should handle save file error', async () => {
    await uploadVideo({
      files: {
        file: { ...FILE, mv: (path, cb) => cb('ERROR') },
      },
    },
    mockRes);

    expect(MOCK_SEND).toHaveBeenCalledWith({ msg: 'Error occured.' });
  });

  test('should handle save file error', async () => {
    genThumbnail.mockImplementationOnce(() => Promise.reject());

    await uploadVideo({
      files: {
        file: FILE,
      },
    },
    { send: MOCK_SEND });

    expect(MOCK_SEND).toHaveBeenCalledWith({
      name: FILE.name,
      thumbnailUrl: 'http://localhost:3002/media/video.mp4_THUMBNAIL.png',
      url: 'http://localhost:3002/media/video.mp4',
    });
  });
});
