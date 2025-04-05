'use client';

import SharedCustomBackButton from '@components/shared/SharedCustomBackButton';
import SharedHomeItemCard from '@components/shared/SharedHomeItemCard';
import noImage from '@images/no-image.png';
import { Col, Divider, Row } from 'antd';
import PropTypes from 'prop-types';

export default function ArSection({ locale }) {
  return (
    <section className='container mb-5 mt-5 px-5 lg:mt-10 lg:px-0'>
      <h1 className='title__anim text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
        Additional Resources
      </h1>
      <p className='description__anim text-center text-[20px] font-font-normal tracking-wide lg:text-[22px]'>
        Description of Additional Resources
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
            title='Research About Dementia'
            image={noImage}
            url='https://www.alzheimers.net/alzheimers-dementia-research-centers-organizations'
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
            title='Georgia Division of Again Services'
            image={noImage}
            url='https://aging.georgia.gov/tools-resources/dementia-resources'
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
            title='Resources for Persons with Dementia'
            image={noImage}
            url='https://www.alzheimers.gov/life-with-dementia/resources-dementia'
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
            title='Caregivers Supports'
            image={noImage}
            url='https://www.usaging.org/caregivers'
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
            title='Centers for Disease Control and Prevention'
            image={noImage}
            url='https://www.cdc.gov/aging/publications/features/alzheimers_caregivers.html'
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
            title='Alzheimer’s Foundation of America'
            image={noImage}
            url='https://alzfdn.org/caregiving-resources'
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
            title='U.S. Department of Veterans Affairs'
            image={noImage}
            url='https://www.caregiver.va.gov/Tips_by_Diagnosis/Dementia.asp'
            target='_blank'
            fullURL
            isBottomTitle
          />
        </Col>
      </Row>

      <SharedCustomBackButton
        title='Back to Resource'
        link={`/${locale}/literacy/resources`}
      />
    </section>
  );
}

ArSection.propTypes = {
  locale: PropTypes.string.isRequired,
};
