'use client';

import SharedCustomBackButton from '@components/shared/SharedCustomBackButton';
import SharedHomeItemCard from '@components/shared/SharedHomeItemCard';
import noImage from '@images/no-image.png';
import { Col, Divider, Row } from 'antd';
import PropTypes from 'prop-types';

export default function EventsSection({ locale }) {
  return (
    <section className='container mb-5 mt-5 px-5 lg:mt-10 lg:px-0'>
      <h1 className='title__anim text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
        Events/Activities
      </h1>
      <p className='description__anim text-center text-[20px] font-font-normal tracking-wide lg:text-[22px]'>
        Description of Events/Activities
      </p>

      <Divider className='bg-color-gray' />

      <Row
        className='mt-10'
        justify='center'
        gutter={{
          xs: 10,
          sm: 20,
          md: 30,
          lg: 40,
        }}
      >
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          md={12}
          lg={8}
        >
          <SharedHomeItemCard
            title='Our Events calendar'
            image={noImage}
            url='/engagement/events-activities/calendar'
          />
        </Col>

        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          md={12}
          lg={8}
        >
          <SharedHomeItemCard
            title='Events calendar'
            image={noImage}
            url='https://www.dementiamap.com/events/#!calendar'
            target='_blank'
            fullURL
          />
        </Col>
      </Row>

      <SharedCustomBackButton
        title='Back to Engagement'
        link={`/${locale}/engagement`}
      />
    </section>
  );
}

EventsSection.propTypes = {
  locale: PropTypes.string.isRequired,
};
