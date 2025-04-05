'use client';

import { Button, Result } from 'antd';
import { useMediaQuery } from 'mukul-react-hooks';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';

function SharedError({ title, error }) {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const pathname = usePathname();

  return (
    <Result
      status='500'
      title={title || 'Error'}
      subTitle={error || 'Sorry! Something went wrong. Please reload page and try again. Thanks'}
      // prettier-ignore
      extra={(
        <Button
          className='btn-primary'
          size={isDesktop ? 'large' : 'middle'}
          href={pathname}
          type='primary'
        >
          Reload Page
        </Button>
      )}
    />
  );
}

SharedError.propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
};

export default SharedError;
