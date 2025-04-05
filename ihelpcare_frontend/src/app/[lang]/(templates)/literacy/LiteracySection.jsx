'use client';

import SharedHomeItemCard from '@components/shared/SharedHomeItemCard';
import LearningModule from '@images/new-temp/learning-module.png';
import Resources from '@images/new-temp/resources.png';
import { Col, Row } from 'antd';

export default function LiteracySection() {
  return (
    <section className='container mb-5 mt-5 px-5 lg:mt-10 lg:px-0'>
      <h1 className='title__anim text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
        Literacy
      </h1>
      <p className='description__anim text-center text-[20px] font-font-normal tracking-wide lg:text-[22px]'>
        Description of Literacy
      </p>

      <Row
        className='mt-10'
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
        >
          <SharedHomeItemCard
            title='Learning Modules'
            image={LearningModule}
            imageClassName='aspect-video h-auto w-full object-cover'
            url='literacy/learning-modules'
            isBottomTitle
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          md={12}
        >
          <SharedHomeItemCard
            title='Resources'
            image={Resources}
            imageClassName='aspect-video h-auto w-full object-cover'
            url='literacy/resources'
            isBottomTitle
          />
        </Col>
      </Row>
    </section>
  );
}
