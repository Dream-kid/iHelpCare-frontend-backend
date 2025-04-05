'use client';

import SharedHomeItemCard from '@components/shared/SharedHomeItemCard';
import Community from '@images/new-temp/community.png';
import Discussion from '@images/new-temp/discussion.png';
import Events from '@images/new-temp/events.png';
import { Col, Row } from 'antd';

export default function EngagementSection() {
  return (
    <section className='container mb-5 mt-5 px-5 lg:mt-10 lg:px-0'>
      <h1 className='title__anim text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
        Engagement
      </h1>
      <p className='description__anim text-center text-[20px] font-font-normal tracking-wide lg:text-[22px]'>
        Description of Engagement
      </p>

      <Row
        className='mt-20'
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
            title='Discussion Forum'
            image={Discussion}
            url='engagement/discussion-forum'
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          md={12}
          lg={8}
        >
          <SharedHomeItemCard
            title='Community Support'
            image={Community}
            url='engagement/community-support'
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          md={12}
          lg={8}
        >
          <SharedHomeItemCard
            title='Events/Activities'
            image={Events}
            url='engagement/events-activities'
          />
        </Col>
      </Row>
    </section>
  );
}
