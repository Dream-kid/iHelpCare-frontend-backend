'use client';

import SharedCaptchaCopyrights from '@components/shared/SharedCaptchaCopyrights';
import useGoogleCaptcha from '@hooks/useGoogleCaptcha';
import usePostData from '@hooks/usePostData';
import { setChangePasswordModalOpen } from '@redux/slices/modalSlice';
import { getLocale } from '@root/i18n.config';
import { Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ChangePasswordModal({ openNotificationWithIcon }) {
  const lang = useSelector((state) => state.content.lang);
  const changePasswordModalOpen = useSelector((state) => state.modal.changePasswordModalOpen);
  const [refreshToken, setRefreshToken] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const locale = getLocale();

  // google reCAPTCHA v3
  const { captchaToken, validToken } = useGoogleCaptcha(refreshToken);

  // change password API's implementation
  const [postData, loading, error, success] = usePostData();

  useEffect(() => {
    if (error) {
      openNotificationWithIcon('error', 'ERROR', error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      form.resetFields();
      dispatch(setChangePasswordModalOpen(false));
      openNotificationWithIcon(
        'success',
        'SUCCESS',
        success?.message || 'Password changed successfully.'
      );
    }
  }, [success]);

  // function to handle user change password
  const onFinish = (values) => {
    if (captchaToken && validToken) {
      postData('/change-password', {
        old_password: values?.old_password,
        new_password: values?.new_password,
        new_password_confirmation: values?.new_password_confirmation,
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
          Change Password
        </h2>
      )}
      open={changePasswordModalOpen}
      closable={false}
      closeIcon={null}
      width={576}
      footer={[
        <Button
          onClick={() => dispatch(setChangePasswordModalOpen(false))}
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
        name='iHelp-change-password-form'
        onFinish={onFinish}
        layout='vertical'
      >
        <Form.Item
          label='Old Password'
          name='old_password'
          rules={[
            {
              type: 'string',
              required: true,
              message: lang?.field_is_required?.[locale] || 'Field is required',
            },
          ]}
        >
          <Input.Password
            placeholder='Old Password'
            type='old_password'
            size='large'
            allowClear
          />
        </Form.Item>

        <Form.Item
          label={lang?.password?.[locale] || 'Password'}
          name='new_password'
          rules={[
            {
              type: 'string',
              required: true,
              message: lang?.field_is_required?.[locale] || 'Field is required',
            },
          ]}
        >
          <Input.Password
            placeholder={lang?.password?.[locale] || 'Password'}
            type='password'
            size='large'
            allowClear
          />
        </Form.Item>

        <Form.Item
          label={lang?.confirm_password?.[locale] || 'Confirm Password'}
          name='new_password_confirmation'
          rules={[
            {
              type: 'string',
              required: true,
              message: lang?.field_is_required?.[locale] || 'Field is required',
            },
          ]}
        >
          <Input.Password
            placeholder={lang?.confirm_password?.[locale] || 'Confirm Password'}
            type='password'
            size='large'
            allowClear
          />
        </Form.Item>
      </Form>

      <SharedCaptchaCopyrights />
    </Modal>
  );
}

ChangePasswordModal.propTypes = {
  openNotificationWithIcon: PropTypes.func.isRequired,
};

export default ChangePasswordModal;
