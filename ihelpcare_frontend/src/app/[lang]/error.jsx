'use client';

import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import { Button, Result } from 'antd';
import { useMediaQuery } from 'mukul-react-hooks';
import PropTypes from 'prop-types';

export const metadata = {
  ...metaData,
  title: '500 ― iHelp',
};

export default function ErrorBoundary({ error, reset }) {
  const isDesktop = useMediaQuery('(min-width: 992px)');

  return (
    <NewMainLayout>
      <Result
        status='500'
        title='500'
        subTitle={
          error?.message !== undefined
            ? `Error: ${error.message}!`
            : "Don't worry, Refresh the page to get back on track."
        }
        // prettier-ignore
        extra={(
          <Button
            className='btn-primary'
            size={isDesktop ? 'large' : 'middle'}
            onClick={() => reset()}
            type='primary'
          >
            Try Again
          </Button>
        )}
      />
    </NewMainLayout>
  );
}

ErrorBoundary.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  reset: PropTypes.func.isRequired,
};
