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

export default function CreateEventFormModal({
  createEventModalOpen,
  setCreateEventModalOpen,
  openNotificationWithIcon,
  setEventsFetchAgain,
}) {
  const lang = useSelector((state) => state.content.lang);
  const [form] = Form.useForm();
  const locale = getLocale();

  // fetch event type API's data
  const [loadingEventType, errorEventType, dataEventType] = useFetchData('/event-type');

  // event create API's implementation
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
        success?.message || 'New event created successfully!'
      );
      setEventsFetchAgain((prevState) => !prevState);
      setCreateEventModalOpen(false);
      form.resetFields();
    }
  }, [success]);

  // function to handel submit form
  const onFinish = (values) => {
    postData('/events', {
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
      open={createEventModalOpen}
      // prettier-ignore
      title={(
        <div>
          <h2 className='text-[20px] font-font-semi-bold lg:text-[24px]'>
            Create New Event
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
        onClick={() => setCreateEventModalOpen(false)}
        icon={<CloseIcon />}
        size='large'
        type='link'
      />

      {loadingEventType ? (
        <SharedLoader />
      ) : errorEventType ? (
        <SharedError error={errorEventType} />
      ) : (
        <Form
          form={form}
          name='iHelp-create-event-form'
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

CreateEventFormModal.propTypes = {
  createEventModalOpen: PropTypes.bool.isRequired,
  setCreateEventModalOpen: PropTypes.func.isRequired,
  openNotificationWithIcon: PropTypes.func.isRequired,
  setEventsFetchAgain: PropTypes.func.isRequired,
};
