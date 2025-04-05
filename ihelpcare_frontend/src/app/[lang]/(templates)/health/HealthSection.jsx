'use client';

import SharedHomeItemCard from '@components/shared/SharedHomeItemCard';
import EmergencySupport from '@images/new-temp/emergency-support.png';
import EmergencyVisit from '@images/new-temp/emergency-visit.png';
import Helpline from '@images/new-temp/helpline.png';
import ServiceDirectory from '@images/new-temp/service-directory.png';
import { Col, Divider, Row } from 'antd';

export default function HealthSection() {
  return (
    <section className='container mb-5 mt-5 px-5 lg:mt-10 lg:px-0'>
      <h1 className='title__anim text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
        Health
      </h1>
      <p className='description__anim text-center text-[20px] font-font-normal tracking-wide lg:text-[22px]'>
        Description of Health
      </p>

      <Divider className='bg-color-gray' />

      <Row gutter={[20, 20]}>
        <Col
          span={24}
          md={12}
          lg={6}
        >
          <div className='bg-white py-5 drop-shadow-md transition-all duration-300 ease-in hover:drop-shadow-2xl'>
            <SharedHomeItemCard
              title='Emergency Visit'
              image={EmergencyVisit}
              imageClassName='aspect-square h-auto w-full object-contain'
              url='health/emergency-visit'
              isBottomTitle
            />
          </div>
        </Col>
        <Col
          span={24}
          md={12}
          lg={6}
        >
          <div className='bg-white py-5 drop-shadow-md transition-all duration-300 ease-in hover:drop-shadow-2xl'>
            <SharedHomeItemCard
              title='Emergency Support'
              image={EmergencySupport}
              imageClassName='aspect-square h-auto w-full object-contain'
              url='health/emergency-support'
              isBottomTitle
            />
          </div>
        </Col>
        <Col
          span={24}
          md={12}
          lg={6}
        >
          <div className='bg-white py-5 drop-shadow-md transition-all duration-300 ease-in hover:drop-shadow-2xl'>
            <SharedHomeItemCard
              title='Service Directory'
              image={ServiceDirectory}
              imageClassName='aspect-square h-auto w-full object-contain'
              url='health/service-directory'
              isBottomTitle
            />
          </div>
        </Col>
        <Col
          span={24}
          md={12}
          lg={6}
        >
          <div className='bg-white py-5 drop-shadow-md transition-all duration-300 ease-in hover:drop-shadow-2xl'>
            <SharedHomeItemCard
              title='Helpline'
              image={Helpline}
              imageClassName='aspect-square h-auto w-full object-contain'
              url='helpline'
              isBottomTitle
            />
          </div>
        </Col>
      </Row>

      <Divider className='bg-color-gray' />
    </section>
  );
}
