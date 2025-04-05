import SharedError from '@components/shared/SharedError';
import SharedLoader from '@components/shared/SharedLoader';
import useFetchData from '@hooks/useFetchData';
import usePutData from '@hooks/usePutData';
import { Button, DatePicker, Divider, Form, Input, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

dayjs.extend(customParseFormat);

export default function EditCaregiverModal({
  editCaregiverModal,
  setEditCaregiverModal,
  openNotificationWithIcon,
  setDataFetchAgain,
}) {
  const [form] = Form.useForm();

  // fetch details API's data
  const [loadingDetails, errorDetails, dataDetails] = useFetchData(
    `/admin/care-giver/details?id=${editCaregiverModal?.id}`
  );

  // if details data available to set form
  useEffect(() => {
    if (dataDetails) {
      form.setFieldsValue({
        first_name: dataDetails?.data?.first_name || undefined,
        last_name: dataDetails?.data?.last_name || undefined,
        email: dataDetails?.data?.email || undefined,
        gender: dataDetails?.data?.info?.gender || undefined,
        status: dataDetails?.data?.status,
        date_of_birth: dataDetails?.data?.info?.date_of_birth
          ? dayjs(dataDetails?.data?.info?.date_of_birth)
          : undefined,
        phone: dataDetails?.data?.info?.phone,
        blood_group: dataDetails?.data?.info?.blood_group,
        street: dataDetails?.data?.info?.street,
      });
    }
  }, [dataDetails]);

  // function to handle close modal
  const handleCloseModal = () => {
    setEditCaregiverModal((prevState) => ({ ...prevState, open: false, id: null }));
  };

  // update API's implementation
  const [putData, loading, error, success] = usePutData();

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
        success?.message || 'Caregiver updated successfully!'
      );
      setDataFetchAgain((prevState) => !prevState);
      handleCloseModal();
      form.resetFields();
    }
  }, [success]);

  // function to handel submit form
  const onFinish = (values) => {
    putData('/admin/update/care-giver', {
      care_giver_id: editCaregiverModal?.id,
      first_name: values?.first_name,
      last_name: values?.last_name,
      phone: values?.phone,
      date_of_birth: dayjs(values?.date_of_birth).format('YYYY-MM-DD'),
      gender: values?.gender,
      status: values?.status,
      blood_group: values?.blood_group,
      street: values?.street,
    });
  };

  return (
    <Modal
      className='relative my-5 lg:my-10'
      open={editCaregiverModal?.open}
      // prettier-ignore
      title={(
        <div>
          <h2 className='text-[20px] font-font-semi-bold lg:text-[24px]'>
            Edit Caregiver
          </h2>
          <Divider className='!mt-0 !pt-0' />
        </div>
      )}
      closable={false}
      width={576}
      footer={[]}
      centered
    >
      {loadingDetails ? (
        <SharedLoader />
      ) : errorDetails ? (
        <SharedError error={errorDetails} />
      ) : (
        <Form
          form={form}
          name='edit-caregiver-form'
          onFinish={onFinish}
          layout='vertical'
        >
          <Form.Item
            label='First Name'
            name='first_name'
            rules={[
              {
                type: 'string',
                required: true,
                message: 'Field is required!',
              },
            ]}
          >
            <Input
              placeholder='First Name'
              size='large'
              allowClear
            />
          </Form.Item>

          <Form.Item
            label='Last Name'
            name='last_name'
            rules={[
              {
                type: 'string',
                required: true,
                message: 'Field is required!',
              },
            ]}
          >
            <Input
              placeholder='Last Name'
              size='large'
              allowClear
            />
          </Form.Item>

          <Form.Item
            label='Email Address'
            name='email'
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Field is required!',
              },
            ]}
          >
            <Input
              placeholder='Email Address'
              size='large'
              allowClear
              disabled
            />
          </Form.Item>

          <Form.Item
            label='Gender'
            name='gender'
            rules={[
              {
                type: 'string',
                required: true,
                message: 'Field is required!',
              },
            ]}
          >
            <Select
              placeholder='-- Select Gender --'
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
              ]}
              size='large'
              allowClear
            />
          </Form.Item>

          <Form.Item
            label='Caregiver Status'
            name='status'
            rules={[
              {
                type: 'number',
                required: true,
                message: 'Field is required!',
              },
            ]}
          >
            <Select
              placeholder='-- Select Status --'
              options={[
                { label: 'Active', value: 1 },
                { label: 'Inactive', value: 0 },
              ]}
              size='large'
              allowClear
            />
          </Form.Item>

          <Form.Item
            label='Date of Birth'
            name='date_of_birth'
            rules={[
              {
                type: 'date',
                required: false,
                message: 'Field is required!',
              },
            ]}
          >
            <DatePicker
              className='w-full'
              placeholder='Date of Birth'
              variant='filled'
              size='large'
              allowClear
              disabledDate={(current) => current && current > dayjs().endOf('day')}
            />
          </Form.Item>

          <Form.Item
            label='Phone'
            name='phone'
            rules={[
              {
                type: 'string',
                required: false,
                message: 'Field is required!',
              },
            ]}
          >
            <Input
              placeholder='Phone Number'
              variant='filled'
              size='large'
              type='tel'
              allowClear
            />
          </Form.Item>

          <Form.Item
            label='Blood Group'
            name='blood_group'
            rules={[
              {
                type: 'string',
                required: false,
                message: 'Field is required!',
              },
            ]}
          >
            <Select
              placeholder='-- Select Blood Group --'
              options={[
                { label: 'A+', value: 'a+' },
                { label: 'A-', value: 'a-' },
                { label: 'B+', value: 'b+' },
                { label: 'B-', value: 'b-' },
                { label: 'AB+', value: 'ab+' },
                { label: 'AB-', value: 'ab-' },
                { label: 'O+', value: 'o+' },
                { label: 'O-', value: 'o-' },
              ]}
              size='large'
              allowClear
            />
          </Form.Item>

          <Form.Item
            label='Street'
            name='street'
            rules={[
              {
                type: 'string',
                required: false,
                message: 'Field is required!',
              },
            ]}
          >
            <Input
              placeholder='Type here your Street'
              variant='filled'
              size='large'
              type='text'
              allowClear
            />
          </Form.Item>

          <div className='mt-10 flex flex-row items-center justify-between space-x-5'>
            <Form.Item className='flex-1'>
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

            <Form.Item className='flex-1'>
              <Button
                onClick={handleCloseModal}
                type='default'
                size='large'
                block
              >
                Close
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
    </Modal>
  );
}

EditCaregiverModal.propTypes = {
  editCaregiverModal: PropTypes.func.isRequired,
  setEditCaregiverModal: PropTypes.func.isRequired,
  openNotificationWithIcon: PropTypes.func.isRequired,
  setDataFetchAgain: PropTypes.func.isRequired,
};
