'use client';

import SharedHomeItemCard from '@components/shared/SharedHomeItemCard';
import Engagement from '@images/new-temp/engagement.png';
import Health from '@images/new-temp/health.png';
import Literacy from '@images/new-temp/literacy.png';
import Partners from '@images/new-temp/partners.png';
import Research from '@images/new-temp/research.png';
import { Col, Row } from 'antd';

export default function HeroSection() {
  return (
    <section className='container mb-5 px-5 lg:px-0'>
      <Row
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
            title='Health'
            image={Health}
            url='health'
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          md={12}
          lg={8}
        >
          <SharedHomeItemCard
            title='Engagement'
            image={Engagement}
            url='engagement'
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          md={12}
          lg={8}
        >
          <SharedHomeItemCard
            title='Literacy'
            image={Literacy}
            url='literacy'
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          md={12}
          lg={8}
        >
          <SharedHomeItemCard
            title='Participate in Research'
            image={Research}
            imageClassName='w-full h-auto object-contain'
            url='research'
            noTitle
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          md={24}
          lg={16}
        >
          <SharedHomeItemCard
            title='Partners'
            image={Partners}
            imageClassName='w-full h-auto object-contain'
            url='partners'
            noTitle
          />
        </Col>
      </Row>
    </section>
  );
}
