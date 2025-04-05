import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import Logo from '@images/new-temp/logo.png';
import { getLocale } from '@root/i18n.config';
import { Button } from 'antd';
import { useMediaQuery } from 'mukul-react-hooks';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import MenuLink from './menu-link';
import UserPopover from './user-popover';

function MyNavbar({ openNotificationWithIcon }) {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const locale = getLocale();

  // check if desktop device to hide navbar
  useEffect(() => {
    if (isDesktop) {
      setMobileMenuOpen(false);
    }
  }, [isDesktop]);

  // check if the click occurred outside the mobile menu
  useEffect(() => {
    function handleDocumentClick(event) {
      if (
        mobileMenuOpen &&
        !event.target.closest('.mobile-menu') &&
        !event.target.closest('.btn-menu-toggle-icon')
      ) {
        setMobileMenuOpen(false);
      }
    }

    // attach the event listener to the document
    document.addEventListener('click', handleDocumentClick);

    // clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [mobileMenuOpen]);

  return (
    <nav className='container relative z-z-fixed py-4 lg:py-0'>
      <div className='mx-auto flex items-center justify-between'>
        <Link href={`/${locale}`}>
          <Image
            className='aspect-video h-auto w-[100px] object-contain lg:w-[180px] xl:w-[250px]'
            src={Logo}
            alt='Logo'
            quality={100}
            priority
          />
        </Link>

        {/* desktop menus */}
        <ul className='hidden list-none space-x-0 pt-4 lg:flex lg:space-x-2 xl:space-x-4'>
          <MenuLink
            label='Home'
            path={`/${locale}`}
          />
          <MenuLink
            label='Health'
            path={`/${locale}/health`}
          />
          <MenuLink
            label='Engagement'
            path={`/${locale}/engagement`}
          />
          <MenuLink
            label='Literacy'
            path={`/${locale}/literacy`}
          />
          <MenuLink
            label='About'
            path={`/${locale}/about`}
          />

          <UserPopover openNotificationWithIcon={openNotificationWithIcon} />
        </ul>

        {/* menu toggle button */}
        <div className='flex flex-row items-center justify-end space-x-4 lg:hidden'>
          <UserPopover openNotificationWithIcon={openNotificationWithIcon} />

          <Button
            className='!rounded-full bg-[#f5f5f5] hover:!bg-[#f5f5f5]'
            icon={
              mobileMenuOpen ? (
                <CloseOutlined className='btn-menu-toggle-icon' />
              ) : (
                <MenuOutlined className='btn-menu-toggle-icon' />
              )
            }
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type='primary'
            shape='circle'
            size='large'
          />
        </div>
      </div>

      {/* mobile menus */}
      <div className='mt-4 flex w-full justify-center lg:hidden'>
        <div
          className={twMerge(
            'mobile-menu absolute w-full px-2',
            mobileMenuOpen ? 'active' : 'block'
          )}
        >
          <ul className='mobile-menu-ul bg-color-bg-light dark:bg-color-bg-dark'>
            <li className='py-1 pr-10 leading-10'>
              <MenuLink
                label='Home'
                path={`/${locale}`}
              />
            </li>
            <li className='py-1 pr-10 leading-10'>
              <MenuLink
                label='Health'
                path={`/${locale}/health`}
              />
            </li>
            <li className='py-1 pr-10 leading-10'>
              <MenuLink
                label='Engagement'
                path={`/${locale}/engagement`}
              />
            </li>
            <li className='py-1 pr-10 leading-10'>
              <MenuLink
                label='Literacy'
                path={`/${locale}/literacy`}
              />
            </li>
            <li className='py-1 pr-10 leading-10'>
              <MenuLink
                label='About'
                path={`/${locale}/about`}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

MyNavbar.propTypes = {
  openNotificationWithIcon: PropTypes.func.isRequired,
};

export default MyNavbar;
