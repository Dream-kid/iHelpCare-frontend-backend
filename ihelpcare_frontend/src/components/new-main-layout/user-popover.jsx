import { DashboardOutlined, KeyOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import usePostData from '@hooks/usePostData';
import { deleteAuthStorage } from '@redux/slices/authSlice';
import { setChangePasswordModalOpen, setSignInUpModal } from '@redux/slices/modalSlice';
import { getLocale } from '@root/i18n.config';
import { Avatar, Button, ConfigProvider, Divider, Popover } from 'antd';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'mukul-react-hooks';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function UserPopover({ openNotificationWithIcon }) {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const lang = useSelector((state) => state.content.lang);
  const { userData, isLoginUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = getLocale();

  // logout API's implementation
  const [postData, loading, error, success] = usePostData();

  // if error show error message
  useEffect(() => {
    if (error) {
      openNotificationWithIcon('success', 'SUCCESS', success?.message || 'Logout Successful');
      dispatch(deleteAuthStorage());
    }
  }, [error]);

  // if success logout user
  useEffect(() => {
    if (success) {
      openNotificationWithIcon('success', 'SUCCESS', success?.message || 'Logout Successful');
      dispatch(deleteAuthStorage());
    }
  }, [success]);

  const title = (
    <span className='font-text-font text-[25px] font-font-semi-bold'>
      {userData?.full_name || 'Unnamed'}
    </span>
  );

  const detectDashboardPath = () => {
    if (userData?.role_id === 2) {
      return `/${locale}/admin-dashboard`;
    }
    if (userData?.role_id === 3) {
      return `/${locale}/caregiver-dashboard`;
    }
    if (userData?.role_id === 4) {
      return `/${locale}/dashboard`;
    }
    return `/${locale}/`;
  };

  const content = (
    <div className='flex w-[200px] flex-col items-start justify-start'>
      <Button
        className='font-text-font !px-0 font-font-medium text-color-txt-dark hover:!text-color-primary-hover'
        onClick={() => router.push(`/${locale}/my-profile`)}
        size={isDesktop ? 'large' : 'middle'}
        icon={<UserOutlined />}
        type='link'
      >
        {lang?.my_profile?.[locale] || 'My Profile'}
      </Button>
      <Divider className='my-0' />

      <Button
        className='font-text-font !px-0 font-font-medium text-color-txt-dark hover:!text-color-primary-hover'
        onClick={() => router.push(detectDashboardPath())}
        size={isDesktop ? 'large' : 'middle'}
        icon={<DashboardOutlined />}
        type='link'
      >
        {lang?.my_dashboard?.[locale] || 'My Dashboard'}
      </Button>
      <Divider className='my-0' />

      <Button
        className='font-text-font !px-0 font-font-medium text-color-txt-dark hover:!text-color-primary-hover'
        onClick={() => dispatch(setChangePasswordModalOpen(true))}
        size={isDesktop ? 'large' : 'middle'}
        icon={<KeyOutlined />}
        type='link'
      >
        Change Password
      </Button>
      <Divider className='my-0' />

      <Button
        className='font-text-font !px-0 font-font-medium text-color-txt-dark hover:!text-color-primary-hover'
        onClick={() => postData('/signout', { id: 101 })}
        size={isDesktop ? 'large' : 'middle'}
        icon={<LogoutOutlined />}
        type='link'
        loading={loading}
        disabled={loading}
      >
        {lang?.sign_out?.[locale] || 'Sign Out'}
      </Button>
    </div>
  );

  return isLoginUser ? (
    <ConfigProvider theme={{ token: { borderRadius: 0 } }}>
      <Popover
        placement='bottomRight'
        content={content}
        trigger='hover'
        title={title}
      >
        <Avatar
          className='cursor-pointer bg-color-primary lg:translate-y-3'
          src={
            userData?.photo
              ? `${process.env.API_BASE_URL}/${userData?.photo}`
              : '/images/user-avatar.png'
          }
          shape='circle'
          size='large'
        />
      </Popover>
    </ConfigProvider>
  ) : (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Button
        className='nav-link'
        onClick={() => {
          dispatch(setSignInUpModal({ open: true, tab: 'sign-in' }));
        }}
        size='large'
        type='link'
      >
        Login
      </Button>
    </motion.div>
  );
}

UserPopover.propTypes = {
  openNotificationWithIcon: PropTypes.func.isRequired,
};

export default UserPopover;
