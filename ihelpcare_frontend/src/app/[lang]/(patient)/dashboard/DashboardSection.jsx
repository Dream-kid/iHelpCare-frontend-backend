'use client';

import {
  BlockOutlined,
  CalendarOutlined,
  HeartOutlined,
  MenuOutlined,
  MessageOutlined,
  PhoneOutlined,
  PlusOutlined,
  ReadOutlined,
  TrophyFilled,
} from '@ant-design/icons';
import SharedDashboardItemCard from '@components/shared/SharedDashboardItemCard';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';

export default function DashboardSection({ locale }) {
  return (
    <section className='min-h-[78vh]'>
      <div className='container py-5 lg:py-10'>
        <h1 className='text-start font-font-montserrat text-[30px] font-font-bold text-color-primary lg:text-[40px]'>
          Community
        </h1>

        <Row
          gutter={[
            {
              xs: 4,
              sm: 8,
              md: 16,
              lg: 24,
            },
            {
              xs: 4,
              sm: 8,
              md: 16,
              lg: 24,
            },
          ]}
        >
          <Col
            className='gutter-row'
            span={12}
            md={8}
            lg={6}
          >
            <SharedDashboardItemCard
              Icon={ReadOutlined}
              title='Learning'
              url={`/${locale}/community-learning`}
            />
          </Col>
          <Col
            className='gutter-row'
            span={12}
            md={8}
            lg={6}
          >
            <SharedDashboardItemCard
              Icon={MenuOutlined}
              title='Service Directory'
              url={`/${locale}/health/service-directory`}
            />
          </Col>
          <Col
            className='gutter-row'
            span={12}
            md={8}
            lg={6}
          >
            <SharedDashboardItemCard
              Icon={CalendarOutlined}
              title='Events/Activities'
              url={`/${locale}/community-events-activities`}
            />
          </Col>
          <Col
            className='gutter-row'
            span={12}
            md={8}
            lg={6}
          >
            <SharedDashboardItemCard
              Icon={MessageOutlined}
              title='Support Community'
              url={`/${locale}/engagement/community-support`}
            />
          </Col>
          <Col
            className='gutter-row'
            span={12}
            md={8}
            lg={6}
          >
            <SharedDashboardItemCard
              Icon={BlockOutlined}
              title='Blog'
              url={`/${locale}/community-blog`}
            />
          </Col>
          <Col
            className='gutter-row'
            span={12}
            md={8}
            lg={6}
          >
            <SharedDashboardItemCard
              Icon={TrophyFilled}
              title='Take the Survey'
              url={`/${locale}/survey`}
            />
          </Col>
        </Row>
      </div>

      <div className='container py-5 lg:py-10'>
        <h1 className='text-start font-font-montserrat text-[30px] font-font-bold text-color-primary lg:text-[40px]'>
          Emergency
        </h1>

        <Row
          gutter={[
            {
              xs: 4,
              sm: 8,
              md: 16,
              lg: 24,
            },
            {
              xs: 4,
              sm: 8,
              md: 16,
              lg: 24,
            },
          ]}
        >
          <Col
            className='gutter-row'
            span={12}
            md={8}
            lg={6}
          >
            <SharedDashboardItemCard
              Icon={PlusOutlined}
              title='Emergency Visit'
              url={`/${locale}/health/emergency-visit`}
            />
          </Col>
          <Col
            className='gutter-row'
            span={12}
            md={8}
            lg={6}
          >
            <SharedDashboardItemCard
              Icon={HeartOutlined}
              title='Emergency Support'
              url={`/${locale}/health/emergency-support`}
            />
          </Col>
          <Col
            className='gutter-row'
            span={12}
            md={8}
            lg={6}
          >
            <SharedDashboardItemCard
              Icon={PhoneOutlined}
              title='Helpline Info'
              url={`/${locale}/helpline`}
            />
          </Col>
        </Row>
      </div>
    </section>
  );
}

DashboardSection.propTypes = {
  locale: PropTypes.string.isRequired,
};
