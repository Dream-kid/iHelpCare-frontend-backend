import { CloseIcon } from '@components/shared/SharedIconPack';
import usePostData from '@hooks/usePostData';
import { Button, Divider, Modal, Select } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function EventUpdateStatusModal({
  statusUpdate,
  setStatusUpdate,
  openNotificationWithIcon,
  setEventsFetchAgain,
}) {
  const [status, setStatus] = useState(statusUpdate?.status);

  // event status update API's implementation
  const [postData, loading, error, success] = usePostData();

  useEffect(() => {
    if (error) {
      openNotificationWithIcon('error', 'ERROR', error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      openNotificationWithIcon(
        'success',
        'SUCCESS',
        success?.message || 'Event status updated successfully!'
      );
      setStatusUpdate((prevState) => ({ ...prevState, open: false, surveyId: null }));
      setEventsFetchAgain((prevState) => !prevState);
    }
  }, [success]);

  // function to handle update event status
  const handleUpdateStatus = () => {
    if (!status) {
      openNotificationWithIcon('error', 'ERROR', 'Please select survey status!');
    } else if (status === statusUpdate?.status) {
      openNotificationWithIcon(
        'error',
        'ERROR',
        'Please select different survey status to update!'
      );
    } else {
      postData('/events-status-update', {
        id: statusUpdate?.eventId,
        status,
      });
    }
  };

  return (
    <Modal
      className='relative my-5 lg:my-10'
      open={statusUpdate?.open}
      // prettier-ignore
      title={(
        <div>
          <h2 className='text-[20px] font-font-semi-bold lg:text-[24px]'>
            {`#${statusUpdate?.eventId}. Event Status Update:`}
          </h2>
          <Divider className='!mt-0 !pt-0' />
        </div>
      )}
      closable={false}
      width={576}
      footer={[
        <Button
          onClick={handleUpdateStatus}
          disabled={loading}
          loading={loading}
          type='primary'
          size='large'
          key='update'
        >
          Update Status
        </Button>,
        <Button
          // prettier-ignore
          onClick={() => setStatusUpdate((prevState) => (
            { ...prevState, open: false, surveyId: null }
          ))}
          type='default'
          size='large'
          key='close'
        >
          Close
        </Button>,
      ]}
      centered
    >
      <Button
        className='absolute right-5 top-5'
        // prettier-ignore
        onClick={() => setStatusUpdate((prevState) => (
          { ...prevState, open: false, surveyId: null }
        ))}
        icon={<CloseIcon />}
        size='large'
        type='link'
      />

      <div className='my-10'>
        <Select
          className='w-full'
          placeholder='-- Select status --'
          onChange={(value) => setStatus(value)}
          value={status}
          size='large'
          allowClear
          options={[
            // { value: 'Draft', label: 'Draft' },
            { value: 'Active', label: 'Active' },
            { value: 'Disabled', label: 'Disabled' },
            { value: 'Completed', label: 'Completed' },
          ]}
        />
      </div>
    </Modal>
  );
}

EventUpdateStatusModal.propTypes = {
  statusUpdate: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  setStatusUpdate: PropTypes.func.isRequired,
  openNotificationWithIcon: PropTypes.func.isRequired,
  setEventsFetchAgain: PropTypes.func.isRequired,
};
