'use client';

import SharedCustomBackButton from '@components/shared/SharedCustomBackButton';
import SharedHomeItemCard from '@components/shared/SharedHomeItemCard';
import noImage from '@images/no-image.png';
import { Col, Divider, Row } from 'antd';
import PropTypes from 'prop-types';

export default function EmergencySupportSection({ locale }) {
  return (
    <section className='container mb-5 mt-5 px-5 lg:mt-10 lg:px-0'>
      <h1 className='title__anim text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
        Emergency Support
      </h1>
      <p className='description__anim text-center text-[20px] font-font-normal tracking-wide lg:text-[22px]'>
        Description of Emergency Support
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
            title='Ready'
            image={noImage}
            url='https://www.ready.gov'
            target='_blank'
            fullURL
            isBottomTitle
          />
        </Col>

        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          md={12}
          lg={8}
        >
          <SharedHomeItemCard
            title='National Hurricane center and central pacific Hurricane center'
            image={noImage}
            url='https://www.nhc.noaa.gov'
            target='_blank'
            fullURL
            isBottomTitle
          />
        </Col>

        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          md={12}
          lg={8}
        >
          <SharedHomeItemCard
            title='Pet disaster preparedness'
            image={noImage}
            url='https://www.humanesociety.org/resources/pet-disaster-preparedness'
            target='_blank'
            fullURL
            isBottomTitle
          />
        </Col>
      </Row>

      <SharedCustomBackButton
        title='Back to Health'
        link={`/${locale}/health`}
      />
    </section>
  );
}

EmergencySupportSection.propTypes = {
  locale: PropTypes.string.isRequired,
};
