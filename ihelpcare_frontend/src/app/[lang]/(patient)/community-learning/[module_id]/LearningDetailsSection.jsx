'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import SharedError from '@components/shared/SharedError';
import SharedLoader from '@components/shared/SharedLoader';
import useFetchData from '@hooks/useFetchData';
import noImage from '@images/no-image.png';
import { Button } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

export default function LearningDetailsSection({ locale }) {
  // fetch learning details API's data
  const [loading, error, learningDetails] = useFetchData('/education/learning-modules/1');

  return (
    <section className='container min-h-[78vh] py-5 lg:py-10'>
      <div className='mx-auto w-11/12 rounded-rounded-default bg-color-bg-light py-5 drop-shadow-md lg:w-10/12'>
        <h1 className='title__anim pt-5 text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
          Educational Module Details
        </h1>

        {loading ? (
          <SharedLoader />
        ) : error ? (
          <SharedError error={error} />
        ) : (
          <div className='m-5 lg:m-10'>
            <iframe
              className='aspect-video h-auto w-full rounded-md border-[2px] border-solid border-color-gray'
              src='https://www.youtube.com/embed/GRf5m2zgNp0?si=vI_2QS6caLpLl4RC'
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            />

            {Array.from({ length: 1 }).map(() => (
              <div
                className='mt-5 lg:mt-10'
                key={uuid()}
              >
                <h2 className='mb-0 text-start font-font-montserrat text-[24px] font-font-semi-bold uppercase leading-normal lg:text-[28px]'>
                  {learningDetails?.data?.title}
                </h2>
                <p className='text-start font-font-montserrat text-[16px] font-font-medium leading-normal lg:text-[21px]'>
                  Title description, Dec 7, 2020
                </p>

                <Image
                  className='aspect-video h-auto w-full rounded-md'
                  src={noImage}
                  alt='Learning Image'
                  title='iHelp'
                  placeholder='blur'
                  priority
                />

                <p className='mt-2 text-justify font-font-montserrat text-[14px] font-font-normal leading-normal lg:mt-5 lg:text-[16px]'>
                  Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                </p>
              </div>
            ))}
          </div>
        )}

        <Link href={`/${locale}/community-learning`}>
          <Button
            className='mb-5 font-font-semi-bold text-color-primary transition-colors duration-200 ease-in-out hover:!text-color-secondary'
            icon={<ArrowLeftOutlined />}
            size='large'
            type='link'
            block
          >
            Back to Learning
          </Button>
        </Link>
      </div>
    </section>
  );
}

LearningDetailsSection.propTypes = {
  locale: PropTypes.string.isRequired,
};
