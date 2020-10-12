import React from 'react';
import renderer from 'react-test-renderer';
import { axios } from '../../utils';
import Upload from './Upload';

jest.mock('../../utils/axios');
jest.mock('notistack', () => ({
  withSnackbar(component) {
    component.defaultProps = {
      ...component.defaultProps,
      enqueueSnackbar: jest.fn(),
    };
    return component;
  },
}));

const renderComponent = () => renderer.create(<Upload />);

describe('Upload page', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  test('render Upload page', () => {
    const component = renderComponent();

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should call enqueueSnackbar on dropzone error and info alert', () => {
    const component = renderComponent();
    const instance = component.getInstance();

    instance.onDropRejected('Success', 'success');
    expect(instance.props.enqueueSnackbar).not.toHaveBeenCalled();

    instance.onDropRejected('Info msg', 'info');
    expect(instance.props.enqueueSnackbar).toHaveBeenCalledWith('Info msg', { variant: 'info' });

    instance.onDropRejected('Error msg', 'error');
    expect(instance.props.enqueueSnackbar).toHaveBeenCalledWith('Error msg', { variant: 'error' });
  });

  test('should not start files uploading if files list empty', () => {
    const component = renderComponent();
    const instance = component.getInstance();

    instance.uploadFiles();

    expect(instance.props.enqueueSnackbar).not.toHaveBeenCalled();
  });

  test('should upload files', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({}));

    const component = renderComponent();

    const instance = component.getInstance();
    const filename = 'video.mp4';

    await instance.uploadFiles([{ name: filename }]);

    expect(instance.props.enqueueSnackbar)
      .toHaveBeenCalledWith(`File ${filename} uploaded`, { variant: 'success' });
  });

  test('should handle failed file upload', async () => {
    axios.post.mockImplementationOnce(() => Promise.reject());

    const component = renderComponent();
    const instance = component.getInstance();

    const filename = 'video.mp4';

    await instance.uploadFiles([{ name: filename, withError: true }]);

    expect(instance.props.enqueueSnackbar)
      .toHaveBeenCalledWith(`Upload failed for ${filename}`, { variant: 'error' });
  });
});
