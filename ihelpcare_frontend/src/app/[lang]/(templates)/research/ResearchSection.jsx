'use client';

import SharedHomeItemCard from '@components/shared/SharedHomeItemCard';
import FocusGroup from '@images/new-temp/focus-group.png';
import ScheduleMeeting from '@images/new-temp/schedule-meeting.png';
import Survey from '@images/new-temp/survey.png';
import { Col, Row } from 'antd';

export default function ResearchSection() {
  return (
    <section className='container mb-5 mt-5 px-5 lg:mt-10 lg:px-0'>
      <h1 className='title__anim text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
        Participate in Research
      </h1>
      <p className='description__anim text-center text-[20px] font-font-normal uppercase tracking-wide lg:text-[22px]'>
        Research Description
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
            title='Survey'
            image={Survey}
            url='survey'
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          md={12}
          lg={8}
        >
          <SharedHomeItemCard
            title='Focus Group'
            image={FocusGroup}
            url='focus-group'
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          md={12}
          lg={8}
        >
          <SharedHomeItemCard
            title='Schedule a Meeting'
            image={ScheduleMeeting}
            url='schedule-meeting'
          />
        </Col>
      </Row>
    </section>
  );
}
