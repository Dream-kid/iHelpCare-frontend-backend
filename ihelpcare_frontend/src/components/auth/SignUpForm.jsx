import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import SharedCaptchaCopyrights from '@components/shared/SharedCaptchaCopyrights';
import useGoogleCaptcha from '@hooks/useGoogleCaptcha';
import usePostData from '@hooks/usePostData';
import { setSignInUpModal } from '@redux/slices/modalSlice';
import { getLocale } from '@root/i18n.config';
import { Button, Form, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SignUpForm({ openNotificationWithIcon }) {
  const lang = useSelector((state) => state.content.lang);
  const [refreshToken, setRefreshToken] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const locale = getLocale();

  // google reCAPTCHA v3
  const { captchaToken, validToken } = useGoogleCaptcha(refreshToken);

  // sign up API's implementation
  const [postData, loading, error, success] = usePostData();

  useEffect(() => {
    if (error) {
      openNotificationWithIcon('error', 'ERROR', error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      form.resetFields();
      openNotificationWithIcon('success', 'SUCCESS', success?.message || 'Sign Up Successful');
      dispatch(setSignInUpModal({ open: true, tab: 'sign-in' }));
    }
  }, [success]);

  // function to handle user sign up
  const onFinish = (values) => {
    if (captchaToken && validToken) {
      postData('/signup', {
        ...values,
        g_token: captchaToken,
      });
    } else {
      openNotificationWithIcon(
        'error',
        'ERROR',
        'Google reCAPTCHA validation failed. Please try again'
      );
      setRefreshToken(!refreshToken);
    }
  };

  return (
    <Form
      form={form}
      className='mt-[80px] w-full'
      name='iHelp-sign-up-form'
      onFinish={onFinish}
      layout='vertical'
    >
      <Form.Item
        label={lang?.first_name?.[locale] || 'First Name'}
        name='first_name'
        rules={[
          {
            type: 'string',
            required: true,
            message: lang?.field_is_required?.[locale] || 'Field is required',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder={lang?.first_name?.[locale] || 'First Name'}
          size='large'
          allowClear
        />
      </Form.Item>

      <Form.Item
        label={lang?.last_name?.[locale] || 'Last Name'}
        name='last_name'
        rules={[
          {
            type: 'string',
            required: true,
            message: lang?.field_is_required?.[locale] || 'Field is required',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder={lang?.last_name?.[locale] || 'Last Name'}
          size='large'
          allowClear
        />
      </Form.Item>

      <Form.Item
        label={lang?.user_type?.[locale] || 'User Type'}
        name='role_id'
        rules={[
          {
            type: 'number',
            required: true,
            message: lang?.field_is_required?.[locale] || 'Field is required',
          },
        ]}
      >
        <Select
          placeholder={` -- ${lang?.user_type?.[locale] || 'User Type'} -- `}
          size='large'
          allowClear
          options={[
            {
              value: 3,
              label: lang?.caregiver?.[locale] || 'Caregiver',
            },
            {
              value: 4,
              label: lang?.patient?.[locale] || 'Patient',
            },
          ]}
        />
      </Form.Item>

      <Form.Item
        label={lang?.email_address?.[locale] || 'Email Address'}
        name='email'
        rules={[
          {
            type: 'email',
            required: true,
            message: lang?.field_is_required?.[locale] || 'Field is required',
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className='site-form-item-icon' />}
          placeholder={lang?.email_address?.[locale] || 'Email Address'}
          size='large'
          allowClear
        />
      </Form.Item>

      <Form.Item
        label={lang?.password?.[locale] || 'Password'}
        name='password'
        rules={[
          {
            type: 'string',
            required: true,
            message: lang?.field_is_required?.[locale] || 'Field is required',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder={lang?.password?.[locale] || 'Password'}
          type='password'
          size='large'
          allowClear
        />
      </Form.Item>

      <Form.Item
        label={lang?.confirm_password?.[locale] || 'Confirm Password'}
        name='confirm_password'
        rules={[
          {
            type: 'string',
            required: true,
            message: lang?.field_is_required?.[locale] || 'Field is required',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className='site-form-item-icon' />}
          placeholder={lang?.confirm_password?.[locale] || 'Confirm Password'}
          type='password'
          size='large'
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
            {lang?.sign_up?.[locale] || 'Sign Up'}
          </Button>
        </Form.Item>

        <Form.Item className='flex-1'>
          <Button
            onClick={() => dispatch(setSignInUpModal({ open: false, tab: 'sign-in' }))}
            type='default'
            size='large'
            block
          >
            {lang?.close?.[locale] || 'Close'}
          </Button>
        </Form.Item>
      </div>

      <SharedCaptchaCopyrights />
    </Form>
  );
}

SignUpForm.propTypes = {
  openNotificationWithIcon: PropTypes.func.isRequired,
};

export default SignUpForm;
