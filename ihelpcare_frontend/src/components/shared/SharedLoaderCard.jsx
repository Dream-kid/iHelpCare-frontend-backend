'use client';

import { Skeleton } from 'antd';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function SharedLoaderCard({ loading }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className='rounded-rounded-default bg-color-bg-light'
      style={{ boxShadow: '0px 0px 30px 0px rgba(0, 0, 0, 0.10)' }}
    >
      <Skeleton.Image
        className='!aspect-video !h-auto !w-full !rounded-b-none !rounded-t-rounded-default !object-cover'
        active={loading}
      />

      <div className='space-y-6 p-6'>
        <Skeleton.Button
          active={loading}
          shape='default'
          size='large'
          block
        />
        <Skeleton
          paragraph={{ rows: 2 }}
          active={loading}
        />
      </div>
    </motion.div>
  );
}

SharedLoaderCard.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default SharedLoaderCard;
