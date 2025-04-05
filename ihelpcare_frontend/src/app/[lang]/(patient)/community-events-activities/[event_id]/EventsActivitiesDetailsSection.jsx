'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import SharedError from '@components/shared/SharedError';
import SharedLoader from '@components/shared/SharedLoader';
import useFetchData from '@hooks/useFetchData';
import { Button, Descriptions } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function EventsActivitiesDetailsSection({ locale, eventId }) {
  // fetch event/activities details API's data
  const [loading, error, eventsDetails] = useFetchData(`/events/${eventId}`);

  return (
    <section className='container min-h-[78vh] py-5 lg:py-10'>
      <div className='mx-auto w-11/12 rounded-rounded-default bg-color-bg-light py-5 drop-shadow-md lg:w-10/12'>
        {loading ? (
          <SharedLoader />
        ) : error ? (
          <SharedError error={error} />
        ) : (
          <Descriptions
            // prettier-ignore
            title={(
              <h2 className='title__anim pt-5 text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
                Events/Activities Details
              </h2>
            )}
            labelStyle={{ fontWeight: 'bold' }}
            size='default'
            bordered
            column={{
              xs: 1,
              sm: 1,
              md: 1,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
            items={[
              {
                key: '1',
                label: 'Event Title',
                children: <p>{eventsDetails?.data?.[`title_${locale}`]}</p>,
              },
              {
                key: '2',
                label: 'Event Type',
                children: <p>{eventsDetails?.data?.type}</p>,
              },
              {
                key: '3',
                label: 'Event Time From',
                children: (
                  <p>
                    {eventsDetails?.data?.event_time_from
                      ? dayjs(eventsDetails?.data?.event_time_from, 'HH:mm:ss').format('hh:mm A')
                      : 'N/A'}
                  </p>
                ),
              },
              {
                key: '4',
                label: 'Event Time To',
                children: (
                  <p>
                    {eventsDetails?.data?.event_time_to
                      ? dayjs(eventsDetails?.data?.event_time_to, 'HH:mm:ss').format('hh:mm A')
                      : 'N/A'}
                  </p>
                ),
              },
              {
                key: '5',
                label: 'Event Date From',
                children: <p>{eventsDetails?.data?.event_date_from}</p>,
              },
              {
                key: '6',
                label: 'Event Date To',
                children: <p>{eventsDetails?.data?.event_date_to}</p>,
              },
              {
                key: '7',
                label: 'Location',
                children: <p>{eventsDetails?.data?.[`location_${locale}`]}</p>,
              },
              {
                key: '8',
                label: 'Descriptions',
                children: <p>{eventsDetails?.data?.[`description_${locale}`]}</p>,
              },
            ]}
          />
        )}

        <Link href={`/${locale}/community-events-activities`}>
          <Button
            className='my-5 font-font-semi-bold text-color-primary transition-colors duration-200 ease-in-out hover:!text-color-secondary'
            icon={<ArrowLeftOutlined />}
            size='large'
            type='link'
            block
          >
            Back to Event/Activities
          </Button>
        </Link>
      </div>
    </section>
  );
}

EventsActivitiesDetailsSection.propTypes = {
  locale: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
};
