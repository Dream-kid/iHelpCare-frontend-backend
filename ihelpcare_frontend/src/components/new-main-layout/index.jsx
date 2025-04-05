'use client';

import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import useNotification from '@hooks/useNotification';
import { FloatButton, Layout } from 'antd';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MyNavbar from './my-navbar';
import SocialLink from './social-link';

const { Content, Footer, Header } = Layout;

const SignUpInModal = dynamic(() => import('@components/auth/SignUpInModal'), { ssr: false });
const ForgotPasswordModal = dynamic(() => import('@components/auth/ForgotPasswordModal'), {
  ssr: false,
});
const ResetPasswordModal = dynamic(() => import('@components/auth/ResetPasswordModal'), {
  ssr: false,
});
const ChangePasswordModal = dynamic(() => import('@components/auth/ChangePasswordModal'), {
  ssr: false,
});

function NewMainLayout({ children }) {
  const {
    signInUpModal,
    forgotPasswordModalOpen,
    resetPasswordModalOpen,
    changePasswordModalOpen,
  } = useSelector((state) => state.modal);
  const { contextHolder, openNotificationWithIcon } = useNotification();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2000,
      delay: 200,
      reset: false, // Animations repeat
    });

    sr.reveal('.title__anim', { origin: 'right' });
    sr.reveal('.description__anim', { origin: 'left' });
    sr.reveal('.home__card-anim, .learning__card-anim, .button__card-anim', { interval: 100 });
  }, []);

  return (
    <Layout>
      <Header className='sticky top-0 z-z-fixed h-[100px] !bg-color-bg-light px-0 lg:h-[140px]'>
        <MyNavbar openNotificationWithIcon={openNotificationWithIcon} />
      </Header>

      <Content className='min-h-[calc(100vh-178px)]'>{children}</Content>

      <Footer className='bg-color-secondary'>
        <div className='container flex flex-col items-center justify-center space-y-4 bg-color-secondary lg:flex-row-reverse lg:justify-between lg:space-y-0'>
          <div className='space-x-4 lg:space-x-6'>
            <SocialLink
              socialIcon={<TwitterOutlined className='text-[20px]' />}
              url='https://twitter.com'
            />
            <SocialLink
              socialIcon={<LinkedinOutlined className='text-[20px]' />}
              url='https://www.linkedin.com'
            />
            <SocialLink
              socialIcon={<FacebookOutlined className='text-[20px]' />}
              url='https://www.facebook.com'
            />
            <SocialLink
              socialIcon={<YoutubeOutlined className='text-[20px]' />}
              url='https://www.youtube.com'
            />
          </div>

          <p className='mb-0 text-center font-font-medium'>
            &copy;
            {new Date().getFullYear()}
            <span className='mx-1'>-</span>
            iHelp all rights reserved.
          </p>
        </div>
      </Footer>

      {process.env.NODE_ENV === 'production' && <FloatButton.BackTop />}

      {signInUpModal?.open && <SignUpInModal openNotificationWithIcon={openNotificationWithIcon} />}
      {forgotPasswordModalOpen && (
        <ForgotPasswordModal openNotificationWithIcon={openNotificationWithIcon} />
      )}
      {resetPasswordModalOpen && (
        <ResetPasswordModal openNotificationWithIcon={openNotificationWithIcon} />
      )}
      {changePasswordModalOpen && (
        <ChangePasswordModal openNotificationWithIcon={openNotificationWithIcon} />
      )}

      {contextHolder}
    </Layout>
  );
}

NewMainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NewMainLayout;
