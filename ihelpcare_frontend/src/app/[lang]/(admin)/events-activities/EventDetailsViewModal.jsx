import { ExclamationCircleFilled } from '@ant-design/icons';
import SharedError from '@components/shared/SharedError';
import { CloseIcon } from '@components/shared/SharedIconPack';
import SharedLoader from '@components/shared/SharedLoader';
import useDeleteData from '@hooks/useDeleteData';
import useFetchData from '@hooks/useFetchData';
import { getLocale } from '@root/i18n.config';
import { surveyStatusAsBadge } from '@utils/statusAsBadge';
import { Button, Descriptions, Divider, Modal, Tag } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function EventDetailsViewModal({
  eventDetailsModal,
  setEventDetailsModal,
  openNotificationWithIcon,
  setEventsFetchAgain,
}) {
  const [modal, contextHolder] = Modal.useModal();
  const locale = getLocale();

  // fetch events details API's data
  const [loadingEventDetails, errorEventDetails, dataEventDetails] = useFetchData(
    `/events/${eventDetailsModal?.eventId}`
  );

  // event delete API's implementation
  const [postData, loading, error, success] = useDeleteData();

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
        success?.message || 'Event deleted successfully!'
      );
      setEventDetailsModal((prevState) => ({ ...prevState, open: false, eventId: null }));
      setEventsFetchAgain((prevState) => !prevState);
    }
  }, [success]);

  // function to handle delete event
  const handleDeleteEvent = () => {
    modal.confirm({
      title: 'Do you want to permanently delete these event?',
      icon: <ExclamationCircleFilled />,
      centered: true,
      onOk() {
        postData(`/events/${eventDetailsModal?.eventId}`);
      },
    });
  };

  return (
    <Modal
      className='relative my-5 lg:my-10'
      open={eventDetailsModal?.open}
      // prettier-ignore
      title={(
        <div>
          <h2 className='text-[20px] font-font-semi-bold lg:text-[24px]'>
            Event Details:
          </h2>
          <Divider className='!mt-0 !pt-0' />
        </div>
      )}
      closable={false}
      width={1200}
      footer={[
        setEventsFetchAgain && (
          <Button
            onClick={() => handleDeleteEvent()}
            disabled={loading}
            loading={loading}
            type='primary'
            size='large'
            key='delete'
            danger
          >
            Delete Event
          </Button>
        ),
        <Button
          // prettier-ignore
          onClick={() => setEventDetailsModal((prevState) => (
            { ...prevState, open: false, eventId: null }
          ))}
          type='primary'
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
        onClick={() => setEventDetailsModal((prevState) => (
          { ...prevState, open: false, eventId: null }
        ))}
        icon={<CloseIcon />}
        size='large'
        type='link'
      />

      {loadingEventDetails ? (
        <SharedLoader />
      ) : errorEventDetails ? (
        <SharedError error={errorEventDetails} />
      ) : (
        <Descriptions
          layout='horizontal'
          labelStyle={{ fontWeight: 'bold' }}
          bordered
          items={[
            {
              key: '1',
              span: 4,
              label: <span className='whitespace-nowrap'>Event Title</span>,
              children: dataEventDetails?.data?.[`title_${locale}`] || 'N/A',
            },
            {
              key: '2',
              span: 4,
              label: <span className='whitespace-nowrap'>Event Description</span>,
              children: dataEventDetails?.data?.[`description_${locale}`] || 'N/A',
            },
            {
              key: '3',
              span: 4,
              label: <span className='whitespace-nowrap'>Event Location</span>,
              children: dataEventDetails?.data?.[`location_${locale}`] || 'N/A',
            },
            {
              key: '4',
              span: 4,
              label: <span className='whitespace-nowrap'>Event Date (From - To)</span>,
              children: `${dayjs(dataEventDetails?.data?.event_date_from).format(
                'YYYY-MM-DD'
              )} - ${dayjs(dataEventDetails?.data?.event_date_to).format('YYYY-MM-DD')}`,
            },
            {
              key: '5',
              span: 4,
              label: <span className='whitespace-nowrap'>Event Duration (From - To)</span>,
              children: `${dayjs(dataEventDetails?.data?.event_time_from, 'HH:mm:ss').format(
                'h:mm A'
              )} - ${dayjs(dataEventDetails?.data?.event_time_to, 'HH:mm:ss').format('h:mm A')}`,
            },
            {
              key: '6',
              span: 4,
              label: <span className='whitespace-nowrap'>Event Status</span>,
              children: dataEventDetails?.data?.status ? (
                <Tag color={surveyStatusAsBadge(dataEventDetails?.data?.status)}>
                  {dataEventDetails?.data?.status || 'N/A'}
                </Tag>
              ) : (
                'N/A'
              ),
            },
            {
              key: '7',
              span: 4,
              label: <span className='whitespace-nowrap'>Event Type</span>,
              children: dataEventDetails?.data?.type ? (
                <Tag
                  className='font-font-semi-bold capitalize'
                  color={
                    dataEventDetails?.data?.type === 'hybrid'
                      ? '#05ACF5'
                      : dataEventDetails?.data?.type === 'offline'
                        ? '#23C438'
                        : dataEventDetails?.data?.type === 'online'
                          ? '#E23D13'
                          : '#603F8B'
                  }
                >
                  {dataEventDetails?.data?.type}
                </Tag>
              ) : (
                'N/A'
              ),
            },
          ]}
        />
      )}

      {/* confirm modal context */}
      {contextHolder}
    </Modal>
  );
}

EventDetailsViewModal.propTypes = {
  eventDetailsModal: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.number.isRequired,
  }).isRequired,
  setEventDetailsModal: PropTypes.func.isRequired,
  openNotificationWithIcon: PropTypes.func.isRequired,
  setEventsFetchAgain: PropTypes.func,
};
