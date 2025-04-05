import SharedError from '@components/shared/SharedError';
import { CloseIcon } from '@components/shared/SharedIconPack';
import SharedLoader from '@components/shared/SharedLoader';
import useFetchData from '@hooks/useFetchData';
import usePostData from '@hooks/usePostData';
import { getLocale } from '@root/i18n.config';
import {
  Button,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  TimePicker,
} from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function EventEditFormModal({
  eventEditModal,
  setEventEditModal,
  openNotificationWithIcon,
  setEventsFetchAgain,
}) {
  const lang = useSelector((state) => state.content.lang);
  const [form] = Form.useForm();
  const locale = getLocale();

  // fetch event type API's data
  const [loadingEventType, errorEventType, dataEventType] = useFetchData('/event-type');

  // fetch events details API's data
  const [loadingEventDetails, errorEventDetails, dataEventDetails] = useFetchData(
    `/events/${eventEditModal?.eventId}`
  );

  // if available event data to set form
  useEffect(() => {
    if (dataEventDetails) {
      form.setFieldsValue({
        title_en: dataEventDetails?.data?.title_en,
        title_ph: dataEventDetails?.data?.title_ph,
        description_en: dataEventDetails?.data?.description_en,
        description_ph: dataEventDetails?.data?.description_ph,
        location_en: dataEventDetails?.data?.location_en,
        location_ph: dataEventDetails?.data?.location_ph,
        event_date: [
          dayjs(dataEventDetails?.data?.event_date_from, 'YYYY-MM-DD'),
          dayjs(dataEventDetails?.data?.event_date_to, 'YYYY-MM-DD'),
        ],
        event_time: [
          dayjs(dataEventDetails?.data?.event_time_from, 'HH:mm:ss'),
          dayjs(dataEventDetails?.data?.event_time_to, 'HH:mm:ss'),
        ],
        event_type_id: dataEventDetails?.data?.event_type_id,
      });
    }
  }, [dataEventDetails]);

  // event update API's implementation
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
        success?.message || 'Event updated successfully!'
      );
      setEventsFetchAgain((prevState) => !prevState);
      setEventEditModal((prevState) => ({ ...prevState, open: false, eventId: null }));
      form.resetFields();
    }
  }, [success]);

  // function to handel submit form
  const onFinish = (values) => {
    postData(`/events/${eventEditModal?.eventId}`, {
      title_en: values?.title_en,
      title_ph: values?.title_ph,
      description_en: values?.description_en,
      description_ph: values?.description_ph,
      location_en: values?.location_en,
      location_ph: values?.location_ph,
      event_time_from: dayjs(values?.event_time?.[0]).format('h:mm a'),
      event_time_to: dayjs(values?.event_time?.[1]).format('h:mm a'),
      event_date_from: dayjs(values?.event_date?.[0]).format('YYYY-MM-DD'),
      event_date_to: dayjs(values?.event_date?.[1]).format('YYYY-MM-DD'),
      event_type_id: values?.event_type_id,
    });
  };

  return (
    <Modal
      className='relative my-5 lg:my-10'
      open={eventEditModal?.open}
      // prettier-ignore
      title={(
        <div>
          <h2 className='text-[20px] font-font-semi-bold lg:text-[24px]'>
            Update Event Information
          </h2>
          <Divider className='!mt-0 !pt-0' />
        </div>
      )}
      closable={false}
      width={992}
      footer={[]}
      centered
    >
      <Button
        className='absolute right-5 top-5'
        onClick={() => setEventEditModal({ open: false, eventId: null })}
        icon={<CloseIcon />}
        size='large'
        type='link'
      />

      {loadingEventType || loadingEventDetails ? (
        <SharedLoader />
      ) : errorEventType || errorEventDetails ? (
        <SharedError error={errorEventType || errorEventDetails} />
      ) : (
        <Form
          form={form}
          name='iHelp-edit-event-form'
          onFinish={onFinish}
          scrollToFirstError
          layout='vertical'
        >
          <Row gutter={[20, 5]}>
            <Col
              span={24}
              lg={12}
            >
              <Form.Item
                label='Title (English)'
                name='title_en'
                rules={[
                  {
                    type: 'string',
                    required: true,
                    message: lang?.field_is_required?.[locale] || 'Field is required',
                  },
                ]}
              >
                <Input
                  placeholder='Title (English)'
                  size='large'
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col
              span={24}
              lg={12}
            >
              <Form.Item
                label='Title (Filipino)'
                name='title_ph'
                rules={[
                  {
                    type: 'string',
                    required: true,
                    message: lang?.field_is_required?.[locale] || 'Field is required',
                  },
                ]}
              >
                <Input
                  placeholder='Title (Filipino)'
                  size='large'
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col
              span={24}
              lg={12}
            >
              <Form.Item
                label='Description (English)'
                name='description_en'
                rules={[
                  {
                    type: 'string',
                    required: true,
                    message: lang?.field_is_required?.[locale] || 'Field is required',
                  },
                ]}
              >
                <Input.TextArea
                  placeholder='Description (English)'
                  size='large'
                  allowClear
                  rows={2}
                />
              </Form.Item>
            </Col>
            <Col
              span={24}
              lg={12}
            >
              <Form.Item
                label='Description (Filipino)'
                name='description_ph'
                rules={[
                  {
                    type: 'string',
                    required: true,
                    message: lang?.field_is_required?.[locale] || 'Field is required',
                  },
                ]}
              >
                <Input.TextArea
                  placeholder='Description (Filipino)'
                  size='large'
                  allowClear
                  rows={2}
                />
              </Form.Item>
            </Col>

            <Col
              span={24}
              lg={12}
            >
              <Form.Item
                label='Location (English)'
                name='location_en'
                rules={[
                  {
                    type: 'string',
                    required: true,
                    message: lang?.field_is_required?.[locale] || 'Field is required',
                  },
                ]}
              >
                <Input
                  placeholder='Location (English)'
                  size='large'
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col
              span={24}
              lg={12}
            >
              <Form.Item
                label='Location (Filipino)'
                name='location_ph'
                rules={[
                  {
                    type: 'string',
                    required: true,
                    message: lang?.field_is_required?.[locale] || 'Field is required',
                  },
                ]}
              >
                <Input
                  placeholder='Location (Filipino)'
                  size='large'
                  allowClear
                />
              </Form.Item>
            </Col>

            <ConfigProvider
              direction='ltr'
              theme={{ token: { borderRadius: 0 } }}
            >
              <Col span={24}>
                <Form.Item
                  label='Event (Start Time to End Time)'
                  labelAlign='left'
                  name='event_time'
                  rules={[
                    {
                      required: true,
                      message: lang?.field_is_required?.[locale] || 'Field is required',
                    },
                  ]}
                >
                  <TimePicker.RangePicker
                    className='w-full'
                    placeholder={['Start Time', 'End Time']}
                    format='h:mm a'
                    size='large'
                    allowClear
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label='Event (Start Date to End Date)'
                  labelAlign='left'
                  name='event_date'
                  rules={[
                    {
                      required: true,
                      message: lang?.field_is_required?.[locale] || 'Field is required',
                    },
                  ]}
                >
                  <DatePicker.RangePicker
                    className='w-full'
                    placeholder={['Start Date', 'End Date']}
                    size='large'
                    allowClear
                  />
                </Form.Item>
              </Col>
            </ConfigProvider>

            <Col span={24}>
              <Form.Item
                label='Event Type'
                name='event_type_id'
                rules={[
                  {
                    type: 'number',
                    required: true,
                    message: lang?.field_is_required?.[locale] || 'Field is required',
                  },
                ]}
              >
                <Select
                  placeholder='-- Event Type --'
                  options={dataEventType?.data?.data?.map((data) => ({
                    value: data?.id,
                    label: data?.[`event_type_${locale}`],
                  }))}
                  size='large'
                  allowClear
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button
                  className='btn-primary'
                  htmlType='submit'
                  type='primary'
                  size='large'
                  block
                  loading={loading}
                  disabled={loading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
}

EventEditFormModal.propTypes = {
  eventEditModal: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    eventId: PropTypes.number.isRequired,
  }).isRequired,
  setEventEditModal: PropTypes.func.isRequired,
  openNotificationWithIcon: PropTypes.func.isRequired,
  setEventsFetchAgain: PropTypes.func.isRequired,
};
