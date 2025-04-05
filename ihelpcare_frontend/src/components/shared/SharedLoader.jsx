'use client';

import PropTypes from 'prop-types';
import { HashLoader } from 'react-spinners';
import { twMerge } from 'tailwind-merge';

function SharedLoader({ className, color }) {
  const rootStyles = getComputedStyle(document.documentElement);

  return (
    <section
      className={twMerge(
        className || 'flex h-[40vh] w-full flex-col items-center justify-center lg:h-[50vh]'
      )}
    >
      <HashLoader
        color={color || rootStyles.getPropertyValue('--color-primary')}
        size={100}
      />
    </section>
  );
}

SharedLoader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export default SharedLoader;
