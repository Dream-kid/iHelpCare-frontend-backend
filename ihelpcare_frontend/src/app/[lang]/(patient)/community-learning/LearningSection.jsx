'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import SharedEmpty from '@components/shared/SharedEmpty';
import SharedError from '@components/shared/SharedError';
import SharedLoadingSkeleton from '@components/shared/SharedLoadingSkeleton';
import useFetchData from '@hooks/useFetchData';
import noImage from '@images/no-image.png';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

export default function LearningSection({ locale }) {
  // fetch learning list API's data
  const [loading, error, learning] = useFetchData('/education/learning-modules');

  return (
    <section className='container min-h-[78vh] py-5 lg:py-10'>
      <div className='mx-auto w-11/12 rounded-rounded-default bg-color-bg-light py-5 drop-shadow-md lg:w-10/12'>
        <h1 className='title__anim pt-5 text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
          Educational Module
        </h1>

        {loading ? (
          <div className='m-5'>
            <SharedLoadingSkeleton />
          </div>
        ) : error ? (
          <SharedError error={error} />
        ) : learning?.data?.length === 0 ? (
          <SharedEmpty />
        ) : (
          learning?.data?.map((data) => (
            <Link
              href={`/${locale}/community-learning/${data?.module_id}`}
              key={uuid()}
            >
              <div className='group m-2 flex flex-row items-center justify-between space-x-5 rounded-rounded-default border-[1px] border-solid border-color-primary p-2 transition-colors duration-200 ease-in-out hover:border-color-secondary lg:m-5 lg:space-x-10 lg:p-5'>
                <Image
                  className='aspect-video h-auto w-[100px] rounded-rounded-default drop-shadow-sm lg:w-[200px]'
                  src={noImage}
                  alt='Community Learning'
                  title='iHelp'
                  placeholder='blur'
                  priority
                />

                <div>
                  <h2 className='font-font-montserrat text-[16px] font-font-semi-bold text-color-primary transition-colors duration-200 ease-in-out group-hover:text-color-secondary lg:text-[21px]'>
                    {data?.title}
                  </h2>

                  <p className='line-clamp-2 text-start font-font-montserrat text-[14px] font-font-medium leading-snug text-color-txt-dark lg:line-clamp-3 lg:text-[16px]'>
                    {data?.description}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}

        <Link href={`/${locale}/dashboard`}>
          <Button
            className='mb-5 font-font-semi-bold text-color-primary transition-colors duration-200 ease-in-out hover:!text-color-secondary'
            icon={<ArrowLeftOutlined />}
            size='large'
            type='link'
            block
          >
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </section>
  );
}

LearningSection.propTypes = {
  locale: PropTypes.string.isRequired,
};
