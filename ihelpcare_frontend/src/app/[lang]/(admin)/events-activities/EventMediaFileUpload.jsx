import { CloseCircleFilled, CloudUploadOutlined } from '@ant-design/icons';
import { Button, Modal, Upload } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const { Dragger } = Upload;

export default function EventMediaFileUpload({
  eventAttachFileModal,
  setEventAttachFileModal,
  openNotificationWithIcon,
  setFetchAgain,
}) {
  const accessToken = useSelector((state) => state.auth.accessToken);

  // and file upload functionality
  const props = {
    name: 'file',
    method: 'post',
    multiple: false,
    accept: '.jpg,.jpeg,.png,.pdf',
    headers: { authorization: `Bearer ${accessToken}` },
    action: `${process.env.API_BASE_URL}${process.env.API_SUFFIX_URL}/event-attach-file/${eventAttachFileModal?.eventId}`,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        openNotificationWithIcon('success', 'SUCCESS', 'Event media file attached successfully!');
        setEventAttachFileModal((prevState) => ({ ...prevState, open: false }));
        setFetchAgain((prevState) => !prevState);
      } else if (status === 'error') {
        openNotificationWithIcon('error', 'ERROR', 'Event media file attachment failed!');
      }
    },
  };

  return (
    <Modal
      className='my-10'
      title='Event Attach PDF or Image media File'
      centered
      open={eventAttachFileModal?.open}
      onOk={() => setEventAttachFileModal((prevState) => ({ ...prevState, open: false }))}
      onCancel={() => setEventAttachFileModal((prevState) => ({ ...prevState, open: false }))}
      closeIcon={<CloseCircleFilled className='hover:text-color-error' />}
      footer={[
        <Button
          key='event-attach-file'
          // prettier-ignore
          onClick={() => setEventAttachFileModal((prevState) => ({
            ...prevState,
            open: false,
          }))}
          type='default'
          size='middle'
        >
          Cancel
        </Button>,
      ]}
    >
      <Dragger {...props}>
        <p className='ant-upload-drag-icon'>
          <CloudUploadOutlined />
        </p>
        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
        <p className='ant-upload-hint'>
          Support for a single or bulk upload. Strictly prohibited from uploading company data or
          other banned files.
        </p>
      </Dragger>
    </Modal>
  );
}

EventMediaFileUpload.propTypes = {
  eventAttachFileModal: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.number.isRequired,
  }),
  setEventAttachFileModal: PropTypes.func.isRequired,
  openNotificationWithIcon: PropTypes.func.isRequired,
  setFetchAgain: PropTypes.func.isRequired,
};
