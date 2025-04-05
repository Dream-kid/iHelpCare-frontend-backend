'use client';

import { Button } from 'antd';
import { useMediaQuery } from 'mukul-react-hooks';
import PropTypes from 'prop-types';

function SocialLink({ socialIcon, url }) {
  const isDesktop = useMediaQuery('(min-width: 992px)');

  return (
    <Button
      className='!rounded-full border-none bg-[#f2f2f2] outline-none hover:!border-none hover:!outline-none'
      size={isDesktop ? 'large' : 'middle'}
      icon={socialIcon}
      shape='circle'
      href={url}
      target='_blank'
    />
  );
}

SocialLink.propTypes = {
  socialIcon: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
};

export default SocialLink;
