'use client';

import {
  CalendarOutlined,
  DashboardOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  TeamOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import UserPopover from '@components/new-main-layout/user-popover';
import useNotification from '@hooks/useNotification';
import Logo from '@images/new-temp/logo.png';
import { getLocale } from '@root/i18n.config';
import { Breadcrumb, Button, ConfigProvider, Layout, Menu, Tooltip, Typography, theme } from 'antd';
import { useFullScreen, useMediaQuery } from 'mukul-react-hooks';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const { Header, Sider, Content, Footer } = Layout;

function AdminLayout({ children, title }) {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const { isFullscreen, toggleFullScreen } = useFullScreen();
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocale();

  const { contextHolder, openNotificationWithIcon } = useNotification();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // if mobile device to collapse sidebar
  useEffect(() => {
    if (isDesktop) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  }, [isDesktop]);

  return (
    <Layout className='h-screen'>
      <Sider
        trigger={null}
        collapsed={collapsed}
        collapsible
        width={250}
      >
        <Link
          className='flex flex-row items-center justify-center pt-2'
          href={`/${locale}`}
        >
          <Image
            className={twMerge(
              'aspect-video h-auto object-contain',
              collapsed ? 'w-[70px]' : 'w-[160px]'
            )}
            src={Logo}
            alt='Logo'
            quality={100}
            priority
          />
        </Link>

        <ConfigProvider theme={{ token: { borderRadius: 0 } }}>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={[pathname]}
            onSelect={({ key }) => router.push(key)}
            items={[
              {
                key: `/${locale}/admin-dashboard`,
                icon: <DashboardOutlined />,
                label: 'Dashboard',
              },
              {
                key: `/${locale}/admin-survey`,
                icon: <TrophyOutlined />,
                label: 'Surveys',
              },
              {
                key: `/${locale}/events-activities`,
                icon: <CalendarOutlined />,
                label: 'Events & Activities',
              },
              {
                key: `/${locale}/caregivers`,
                icon: <TeamOutlined />,
                label: 'Caregivers',
              },
              {
                key: `/${locale}/patients`,
                icon: <TeamOutlined />,
                label: 'Patients',
              },
              {
                key: `/${locale}/settings`,
                icon: <SettingOutlined />,
                label: 'Settings',
              },
            ]}
          />
        </ConfigProvider>
      </Sider>

      <Layout>
        <Header
          className='flex flex-row items-center justify-between p-0'
          style={{
            background: colorBgContainer,
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.75)',
          }}
        >
          <ConfigProvider theme={{ token: { borderRadius: 0 } }}>
            <Tooltip
              title='Click to toggle Sidebar'
              placement='right'
            >
              <Button
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                type='text'
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Tooltip>
          </ConfigProvider>

          {title && (
            <Typography.Title
              className='mt-3 font-font-montserrat font-font-semi-bold lg:mt-4'
              level={isDesktop ? 3 : 4}
            >
              {title}
            </Typography.Title>
          )}

          <div className='mr-6 -translate-y-2'>
            <UserPopover openNotificationWithIcon={openNotificationWithIcon} />
          </div>
        </Header>

        <Breadcrumb
          className='ml-5 mt-5 font-font-montserrat font-font-medium capitalize lg:text-[16px]'
          separator='>'
          items={[
            { title: <Link href={`/${locale}`}>Home</Link> },
            ...pathname
              .split('/')
              .slice(2)
              .map((route) => ({
                title: <Link href={`/${locale}/${route}`}>{route.replace(/-/g, ' ')}</Link>,
              })),
          ]}
        />

        <Content
          style={{
            margin: '16px 16px',
            padding: 20,
            minHeight: 280,
            overflow: 'auto',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>

        {/* prettier-ignore */}
        <Footer
          className='flex flex-row items-center justify-between p-0'
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <p className='mb-0 ml-4'>
            &copy;
            {' '}
            {new Date().getFullYear()}
            {' '}
            iHelp all rights reserved.
          </p>

          <ConfigProvider theme={{ token: { borderRadius: 0 } }}>
            <Tooltip
              title='Click to toggle Full Screen'
              placement='left'
            >
              <Button
                icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                onClick={toggleFullScreen}
                shape='circle'
                type='text'
                size='large'
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Tooltip>
          </ConfigProvider>
        </Footer>
      </Layout>

      {contextHolder}
    </Layout>
  );
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default AdminLayout;
