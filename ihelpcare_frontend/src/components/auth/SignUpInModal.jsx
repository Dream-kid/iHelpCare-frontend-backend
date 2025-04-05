'use client';

import { setSignInUpModal } from '@redux/slices/modalSlice';
import { getLocale } from '@root/i18n.config';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

function SignUpInModal({ openNotificationWithIcon }) {
  const lang = useSelector((state) => state.content.lang);
  const signInUpModal = useSelector((state) => state.modal.signInUpModal);
  const dispatch = useDispatch();
  const locale = getLocale();

  return (
    <Modal
      className='relative my-5 lg:my-10'
      open={signInUpModal?.open}
      onCancel={() => dispatch(setSignInUpModal({ open: false, tab: 'sign-in' }))}
      onOk={() => dispatch(setSignInUpModal({ open: false, tab: 'sign-in' }))}
      closeIcon={null}
      width={576}
      footer={[]}
      centered
    >
      <div className='absolute right-0 top-0 h-[60px] w-full rounded-t-rounded-default bg-color-primary'>
        <button
          className={twMerge(
            'h-full w-1/2 cursor-pointer !rounded-b-none !rounded-t-rounded-default border-none font-font-montserrat text-[21px] font-font-semi-bold uppercase transition-colors duration-300 ease-in-out hover:bg-color-primary-hover hover:text-color-txt-light',
            signInUpModal?.tab === 'sign-in'
              ? 'bg-color-secondary text-color-primary'
              : 'bg-transparent text-color-txt-light'
          )}
          onClick={() => dispatch(setSignInUpModal({ open: true, tab: 'sign-in' }))}
          type='button'
        >
          {lang?.sign_in?.[locale] || 'Sign In'}
        </button>
        <button
          className={twMerge(
            'h-full w-1/2 cursor-pointer !rounded-b-none !rounded-t-rounded-default border-none font-font-montserrat text-[21px] font-font-semi-bold uppercase transition-colors duration-300 ease-in-out hover:bg-color-primary-hover hover:text-color-txt-light',
            signInUpModal?.tab === 'sign-up'
              ? 'bg-color-secondary text-color-primary'
              : 'bg-transparent text-color-txt-light'
          )}
          onClick={() => dispatch(setSignInUpModal({ open: true, tab: 'sign-up' }))}
          type='button'
        >
          {lang?.sign_up?.[locale] || 'Sign Up'}
        </button>
      </div>

      {signInUpModal?.tab === 'sign-in' && (
        <SignInForm openNotificationWithIcon={openNotificationWithIcon} />
      )}
      {signInUpModal?.tab === 'sign-up' && (
        <SignUpForm openNotificationWithIcon={openNotificationWithIcon} />
      )}
    </Modal>
  );
}

SignUpInModal.propTypes = {
  openNotificationWithIcon: PropTypes.func.isRequired,
};

export default SignUpInModal;
