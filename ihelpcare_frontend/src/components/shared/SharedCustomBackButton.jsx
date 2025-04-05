'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import PropTypes from 'prop-types';

function SharedCustomBackButton({ title, link }) {
  return (
    <div className='my-10 flex flex-row items-center justify-center lg:my-20'>
      <Link
        className='nav-link mx-auto text-[14px] font-font-medium !capitalize text-color-txt-dark transition-all duration-500 ease-in-out lg:text-[18px]'
        href={link}
      >
        <ArrowLeftOutlined className='mr-4' />
        {title || link}
      </Link>
    </div>
  );
}

SharedCustomBackButton.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string.isRequired,
};

export default SharedCustomBackButton;
