import usePostData from '@hooks/usePostData';
import { Button, DatePicker, Divider, Form, Input, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

dayjs.extend(customParseFormat);

export default function CreatePatientModal({
  createPatientModalOpen,
  setCreatePatientModalOpen,
  openNotificationWithIcon,
  setDataFetchAgain,
}) {
  const [form] = Form.useForm();

  // create API's implementation
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
        success?.message || 'Patient created successfully!'
      );
      setDataFetchAgain((prevState) => !prevState);
      setCreatePatientModalOpen(false);
      form.resetFields();
    }
  }, [success]);

  // function to handel submit form
  const onFinish = (values) => {
    postData('/admin/create/patient', {
      first_name: values?.first_name,
      last_name: values?.last_name,
      email: values?.email,
      phone: values?.phone,
      date_of_birth: dayjs(values?.date_of_birth).format('YYYY-MM-DD'),
      gender: values?.gender,
      blood_group: values?.blood_group,
      street: values?.street,
    });
  };
  return (
    <Modal
      className='relative my-5 lg:my-10'
      open={createPatientModalOpen}
      // prettier-ignore
      title={(
        <div>
          <h2 className='text-[20px] font-font-semi-bold lg:text-[24px]'>
            Create New Patient
          </h2>
          <Divider className='!mt-0 !pt-0' />
        </div>
      )}
      closable={false}
      width={576}
      footer={[]}
      centered
    >
      <Form
        form={form}
        name='create-patient-form'
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
          label='Date of Birth'
          name='date_of_birth'
          rules={[
            {
              type: 'date',
              required: true,
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
              required: true,
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
              required: true,
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
              required: true,
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
              onClick={() => setCreatePatientModalOpen(false)}
              type='default'
              size='large'
              block
            >
              Close
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}

CreatePatientModal.propTypes = {
  createPatientModalOpen: PropTypes.bool.isRequired,
  setCreatePatientModalOpen: PropTypes.func.isRequired,
  openNotificationWithIcon: PropTypes.func.isRequired,
  setDataFetchAgain: PropTypes.func.isRequired,
};
