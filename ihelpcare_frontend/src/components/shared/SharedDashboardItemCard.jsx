'use client';

import { Card } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

export default function SharedDashboardItemCard({ Icon, title, url }) {
  return (
    <Link
      key={uuid()}
      href={url}
    >
      <Card
        bordered={false}
        hoverable
      >
        <div className='flex flex-col items-center justify-center space-y-2'>
          <Icon className='text-[4rem] text-color-error' />

          <p className='text-center font-font-montserrat text-[14px] font-font-semi-bold leading-normal text-color-txt-dark lg:text-[16px]'>
            {title}
          </p>
        </div>
      </Card>
    </Link>
  );
}

SharedDashboardItemCard.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
