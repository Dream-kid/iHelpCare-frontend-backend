'use client';

import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import { Button, Result } from 'antd';
import { useMediaQuery } from 'mukul-react-hooks';
import Link from 'next/link';

export const metadata = {
  ...metaData,
  title: '404 ― iHelp',
};

export default function NotFound() {
  const isDesktop = useMediaQuery('(min-width: 992px)');

  return (
    <NewMainLayout>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        // prettier-ignore
        extra={(
          <Link href='/'>
            <Button
              className='btn-primary'
              size={isDesktop ? 'large' : 'middle'}
              type='primary'
            >
              Back to Home
            </Button>
          </Link>
        )}
      />
    </NewMainLayout>
  );
}
