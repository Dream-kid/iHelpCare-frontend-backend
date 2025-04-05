'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import SharedError from '@components/shared/SharedError';
import SharedLoader from '@components/shared/SharedLoader';
import useFetchData from '@hooks/useFetchData';
import userAvatar from '@images/user-avatar.png';
import { Button, Descriptions } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function ProfileSection({ locale }) {
  const userData = useSelector((state) => state.auth.userData);
  const router = useRouter();

  // fetch profile API's data
  const [loading, error, profile] = useFetchData('/user-profile');

  const detectDashboardPath = () => {
    if (userData?.role_id === 2) {
      return `/${locale}/admin-dashboard`;
    }
    if (userData?.role_id === 3) {
      return `/${locale}/caregiver-dashboard`;
    }
    if (userData?.role_id === 4) {
      return `/${locale}/dashboard`;
    }
    return `/${locale}/`;
  };

  return (
    <section className='min-h-[78vh] py-5 lg:py-10'>
      <div className='mx-auto w-[95%] rounded-rounded-default bg-color-bg-light drop-shadow-md lg:w-[60%]'>
        {loading ? (
          <SharedLoader />
        ) : error ? (
          <SharedError error={error} />
        ) : (
          <div className='flex flex-col items-center justify-between pt-5 lg:pt-10'>
            <Image
              className='h-[100px] w-[100px] rounded-full border-[2px] border-solid border-color-gray lg:h-[150px] lg:w-[150px]'
              src={userAvatar}
              alt='Hero Image'
              title='iHelp'
              placeholder='blur'
              priority
            />

            <h1 className='mb-5 pt-5 text-center font-font-montserrat text-[16px] font-font-semi-bold lg:mb-10 lg:pt-10 lg:text-[21px]'>
              {`${profile?.data?.first_name} ${profile?.data?.last_name}`}
            </h1>

            <div className='w-full space-y-5 px-5 lg:space-y-10 lg:px-10'>
              <Descriptions
                className='w-full rounded-md border-[1px] border-solid border-color-gray'
                // prettier-ignore
                title={(
                  <h2 className='mb-0 ml-6 mt-6 text-start font-font-montserrat text-[16px] font-font-semi-bold uppercase lg:text-[21px]'>
                    Personal Information
                  </h2>
                )}
                labelStyle={{ fontWeight: 'bold' }}
                size='default'
                bordered
                column={{
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                  xxl: 1,
                }}
                items={[
                  {
                    key: '1',
                    label: 'User Name',
                    children: <p>{`${profile?.data?.first_name} ${profile?.data?.last_name}`}</p>,
                  },
                  {
                    key: '2',
                    label: 'User Type',
                    children: <p>{profile?.data?.user_type || 'N/A'}</p>,
                  },
                  {
                    key: '3',
                    label: 'Email',
                    children: <p>{profile?.data?.email || 'N/A'}</p>,
                  },
                  {
                    key: '4',
                    label: 'Phone',
                    children: <p>{profile?.data?.phone || 'N/A'}</p>,
                  },
                ]}
              />

              <Descriptions
                className='w-full rounded-md border-[1px] border-solid border-color-gray'
                // prettier-ignore
                title={(
                  <h2 className='mb-0 ml-6 mt-6 text-start font-font-montserrat text-[16px] font-font-semi-bold uppercase lg:text-[21px]'>
                    Address
                  </h2>
                )}
                labelStyle={{ fontWeight: 'bold' }}
                size='default'
                bordered
                column={{
                  xs: 1,
                  sm: 1,
                  md: 1,
                  lg: 1,
                  xl: 1,
                  xxl: 1,
                }}
                items={[
                  {
                    key: '1',
                    label: 'Street',
                    children: <p>{profile?.data?.address || 'N/A'}</p>,
                  },
                  {
                    key: '2',
                    label: 'City/State',
                    children: <p>{profile?.data?.city || 'N/A'}</p>,
                  },
                  {
                    key: '3',
                    label: 'Postal Code',
                    children: <p>{profile?.data?.postal_code || 'N/A'}</p>,
                  },
                  {
                    key: '4',
                    label: 'Country',
                    children: <p>{profile?.data?.country || 'N/A'}</p>,
                  },
                ]}
              />
            </div>
          </div>
        )}

        <Button
          className='my-5 font-font-semi-bold text-color-primary transition-colors duration-200 ease-in-out hover:!text-color-secondary'
          onClick={() => router.push(detectDashboardPath())}
          icon={<ArrowLeftOutlined />}
          size='large'
          type='link'
          block
        >
          Back to Dashboard
        </Button>
      </div>
    </section>
  );
}

ProfileSection.propTypes = {
  locale: PropTypes.string.isRequired,
};
