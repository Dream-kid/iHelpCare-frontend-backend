'use client';

import { Empty } from 'antd';
import { useMediaQuery } from 'mukul-react-hooks';
import PropTypes from 'prop-types';

function SharedEmpty({ description }) {
  const isDesktop = useMediaQuery('(min-width: 992px)');

  return (
    <Empty
      className='font-font-semi-bold'
      imageStyle={{ height: isDesktop ? 200 : 150 }}
      description={description || "Sorry, we couldn't find the data you're looking for."}
    />
  );
}

SharedEmpty.propTypes = {
  description: PropTypes.string,
};

export default SharedEmpty;
