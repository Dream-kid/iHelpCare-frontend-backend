'use client';

import { LockOutlined, MailOutlined } from '@ant-design/icons';
import SharedCaptchaCopyrights from '@components/shared/SharedCaptchaCopyrights';
import useGoogleCaptcha from '@hooks/useGoogleCaptcha';
import usePostData from '@hooks/usePostData';
import { setAccessToken, setRememberMe, setUserData } from '@redux/slices/authSlice';
import { setForgotPasswordModalOpen, setSignInUpModal } from '@redux/slices/modalSlice';
import { getLocale } from '@root/i18n.config';
import { Button, Checkbox, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SignInForm({ openNotificationWithIcon }) {
  const lang = useSelector((state) => state.content.lang);
  const [refreshToken, setRefreshToken] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const locale = getLocale();
  const router = useRouter();

  // google reCAPTCHA v3
  const { captchaToken, validToken } = useGoogleCaptcha(refreshToken);

  // sign in API's implementation
  const [postData, loading, error, success] = usePostData();

  useEffect(() => {
    if (error) {
      openNotificationWithIcon('error', 'ERROR', error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      openNotificationWithIcon('success', 'SUCCESS', success?.message || 'Sign In Successful');
      dispatch(setAccessToken(success?.token));
      dispatch(setUserData(success?.data));
      dispatch(setSignInUpModal({ open: false, tab: 'sign-in' }));
      form.resetFields();

      // redirect user as per roles
      if (success?.data?.role_id === 2) {
        router.push(`/${locale}/admin-dashboard`);
      } else if (success?.data?.role_id === 3) {
        router.push(`/${locale}/caregiver-dashboard`);
      } else if (success?.data?.role_id === 4) {
        router.push(`/${locale}/dashboard`);
      } else {
        router.push(`/${locale}/`);
      }
    }
  }, [success]);

  // function to handle user sign in
  const onFinish = (values) => {
    if (captchaToken && validToken) {
      dispatch(setRememberMe(values?.remember));
      postData('/signin', {
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
      name='iHelp-sign-in-form'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout='vertical'
    >
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

      <div className='flex flex-row items-center justify-between'>
        <Form.Item>
          <Form.Item
            name='remember'
            valuePropName='checked'
            noStyle
          >
            <Checkbox>{lang?.remember_me?.[locale] || 'Remember Me?'}</Checkbox>
          </Form.Item>
        </Form.Item>

        <Button
          className='font-text-font mb-8 font-font-medium text-color-primary hover:!text-color-primary-hover'
          onClick={() => {
            dispatch(setSignInUpModal({ open: false, tab: 'sign-in' }));
            dispatch(setForgotPasswordModalOpen(true));
          }}
          type='link'
          size='large'
        >
          {lang?.forgot_password?.[locale] || 'Forgot Password'}
        </Button>
      </div>

      <div className='flex flex-row items-center justify-between space-x-5'>
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
            {lang?.sign_in?.[locale] || 'Sign In'}
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

SignInForm.propTypes = {
  openNotificationWithIcon: PropTypes.func.isRequired,
};

export default SignInForm;
