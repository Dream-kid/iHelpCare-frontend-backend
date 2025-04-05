'use client';

import {
  CalendarOutlined,
  HeartOutlined,
  MenuOutlined,
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
    <section className='min-h-[78vh] to-90%'>
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
              Icon={TrophyFilled}
              title='Take the Survey'
              url={`/${locale}/survey`}
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
              url={`/${locale}/caregiver-events`}
            />
          </Col>
          <Col
            className='gutter-row'
            span={12}
            md={8}
            lg={6}
          >
            <SharedDashboardItemCard
              Icon={ReadOutlined}
              title='Education Module'
              url={`/${locale}/literacy/learning-modules`}
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
              title='Services Directory'
              url={`/${locale}/health/service-directory`}
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
