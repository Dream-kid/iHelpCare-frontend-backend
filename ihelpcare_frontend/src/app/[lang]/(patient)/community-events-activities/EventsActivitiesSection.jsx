'use client';

import {
  ArrowLeftOutlined,
  CalendarFilled,
  EnvironmentOutlined,
  RightOutlined,
} from '@ant-design/icons';
import SharedEmpty from '@components/shared/SharedEmpty';
import SharedError from '@components/shared/SharedError';
import SharedLoadingSkeleton from '@components/shared/SharedLoadingSkeleton';
import useFetchData from '@hooks/useFetchData';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { lib } from 'mukul-react-hooks';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

const { randomColor } = lib;

export default function EventsActivitiesSection({ locale }) {
  // fetch event/activities list API's data
  const [loading, error, events] = useFetchData('/event-list');

  return (
    <section className='container min-h-[78vh] py-5 lg:py-10'>
      <div className='mx-auto w-11/12 rounded-rounded-default bg-color-bg-light py-5 drop-shadow-md lg:w-10/12'>
        <h1 className='title__anim pt-5 text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
          Events/Activities Module
        </h1>

        {loading ? (
          <div className='m-5'>
            <SharedLoadingSkeleton />
          </div>
        ) : error ? (
          <SharedError error={error} />
        ) : events?.data?.data?.length === 0 ? (
          <SharedEmpty description='Sorry! Any events/activities are not available.' />
        ) : (
          events?.data?.data?.map((data) => (
            <Link
              href={`/${locale}/community-events-activities/${data?.id}`}
              key={uuid()}
            >
              <div className='group m-5 grid grid-cols-8 content-stretch items-center space-x-10 rounded-rounded-default border-[1px] border-solid border-color-primary transition-colors duration-200 ease-in-out hover:border-color-secondary'>
                <div
                  className='col-span-1 flex h-full w-[65px] flex-col items-center justify-center md:w-[80px] lg:w-[120px]'
                  style={{
                    backgroundColor: randomColor(),
                  }}
                >
                  <CalendarFilled className='text-[30px] font-font-bold text-color-txt-light lg:text-[40px]' />
                </div>

                <div className='col-span-6 w-full'>
                  <h1 className='my-2 text-start font-font-montserrat text-[14px] font-font-semi-bold leading-normal text-color-primary transition-colors duration-200 ease-in-out group-hover:text-color-secondary md:text-[16px] lg:text-[21px]'>
                    {data?.[`title_${locale}`]}
                  </h1>
                  <p className='text-start font-font-montserrat text-[10px] font-font-medium leading-normal text-color-txt-dark md:text-[14px] lg:text-[16px]'>
                    {`${dayjs(data?.event_time_from, 'hh:mm:ss').format('hh:mm A')} - ${dayjs(
                      data?.event_time_to,
                      'hh:mm:ss'
                    ).format('hh:mm A')} | ${data?.event_date_from} - ${data?.event_date_to}`}
                  </p>
                  <p className='text-start font-font-montserrat text-[10px] font-font-medium leading-normal text-color-txt-dark md:text-[14px] lg:text-[16px]'>
                    <EnvironmentOutlined className='mr-2' />
                    {data?.[`location_${locale}`]}
                  </p>
                </div>

                <RightOutlined className='col-span-1 hidden text-color-txt-dark transition-transform duration-200 ease-in-out group-hover:translate-x-1 group-hover:text-color-secondary md:block lg:text-[20px] lg:group-hover:translate-x-2' />
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

EventsActivitiesSection.propTypes = {
  locale: PropTypes.string.isRequired,
};
