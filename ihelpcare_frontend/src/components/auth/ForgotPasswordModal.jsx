'use client';

import { MailOutlined } from '@ant-design/icons';
import SharedCaptchaCopyrights from '@components/shared/SharedCaptchaCopyrights';
import useGoogleCaptcha from '@hooks/useGoogleCaptcha';
import usePostData from '@hooks/usePostData';
import { setForgotPasswordModalOpen, setResetPasswordModalOpen } from '@redux/slices/modalSlice';
import { getLocale } from '@root/i18n.config';
import { Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ForgotPasswordModal({ openNotificationWithIcon }) {
  const lang = useSelector((state) => state.content.lang);
  const forgotPasswordModalOpen = useSelector((state) => state.modal.forgotPasswordModalOpen);
  const [refreshToken, setRefreshToken] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const locale = getLocale();

  // google reCAPTCHA v3
  const { captchaToken, validToken } = useGoogleCaptcha(refreshToken);

  // forgot password API's implementation
  const [postData, loading, error, success] = usePostData();

  useEffect(() => {
    if (error) {
      openNotificationWithIcon('error', 'ERROR', error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      form.resetFields();
      dispatch(setForgotPasswordModalOpen(false));
      dispatch(setResetPasswordModalOpen(true));
      openNotificationWithIcon(
        'success',
        'SUCCESS',
        success?.message || 'Password reset OTP send to your email. Please check your email!'
      );
    }
  }, [success]);

  // function to handle user forgot password
  const onFinish = (values) => {
    if (captchaToken && validToken) {
      postData('/forgot-password', {
        email: values?.email,
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
    <Modal
      className='relative my-5 lg:my-10'
      // prettier-ignore
      title={(
        <h2 className='font-font-montserrat text-center text-[20px] font-font-semi-bold uppercase lg:text-[24px]'>
          {lang?.forgot_password?.[locale] || 'Forgot Password'}
        </h2>
      )}
      open={forgotPasswordModalOpen}
      closable={false}
      closeIcon={null}
      width={576}
      footer={[
        <Button
          onClick={() => dispatch(setForgotPasswordModalOpen(false))}
          type='default'
          size='large'
          key='close'
        >
          {lang?.close?.[locale] || 'Close'}
        </Button>,
        <Button
          className='btn-primary'
          onClick={form.submit}
          type='primary'
          size='large'
          key='submit'
          disabled={loading}
          loading={loading}
        >
          {lang?.BTN_SUBMIT?.[locale] || 'Submit'}
        </Button>,
      ]}
      centered
    >
      <Form
        form={form}
        className='my-5 w-full'
        name='iHelp-forgot-password-form'
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
      </Form>

      <SharedCaptchaCopyrights />
    </Modal>
  );
}

ForgotPasswordModal.propTypes = {
  openNotificationWithIcon: PropTypes.func.isRequired,
};

export default ForgotPasswordModal;
