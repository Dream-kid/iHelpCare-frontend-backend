'use client';

import { Button } from 'antd';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

function SharedLinkOpenCard({ title, link }) {
  return (
    <div
      key={uuid()}
      className='button__card-anim mb-2 lg:mb-4'
    >
      <Button
        className='block cursor-pointer truncate whitespace-pre-line font-font-semi-bold uppercase tracking-normal lg:!h-[60px] lg:!text-[20px] lg:font-font-bold lg:tracking-widest'
        onClick={() => window.open(link, '_blank')}
        type='default'
        size='large'
        block
      >
        {title || link}
      </Button>
    </div>
  );
}

SharedLinkOpenCard.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string.isRequired,
};

export default SharedLinkOpenCard;
