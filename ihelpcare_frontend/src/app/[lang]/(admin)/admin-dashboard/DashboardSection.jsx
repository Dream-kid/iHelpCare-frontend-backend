'use client';

import {
  ArrowDownOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  NumberOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Row, Statistic } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

export default function DashboardSection({ locale }) {
  return (
    <section>
      <Row gutter={[20, 20]}>
        <Col
          span={24}
          md={12}
          lg={8}
        >
          <Card
            hoverable
            bordered
          >
            <Statistic
              title='Total Caregivers'
              value={10000}
              prefix={<NumberOutlined />}
              formatter={(value) => (
                <CountUp
                  end={value}
                  separator=','
                />
              )}
            />
            <Link href={`/${locale}/caregivers`}>
              <Button
                style={{ marginTop: 16 }}
                type='primary'
                size='middle'
              >
                View Details
              </Button>
            </Link>
          </Card>
        </Col>

        <Col
          span={24}
          md={12}
          lg={8}
        >
          <Card
            hoverable
            bordered
          >
            <Statistic
              title='Total Patients'
              value={99999}
              prefix={<NumberOutlined />}
              formatter={(value) => (
                <CountUp
                  end={value}
                  separator=','
                />
              )}
            />
            <Link href={`/${locale}/patients`}>
              <Button
                style={{ marginTop: 16 }}
                type='primary'
                size='middle'
              >
                View Details
              </Button>
            </Link>
          </Card>
        </Col>

        <Col
          span={24}
          md={16}
        >
          <Row gutter={[20, 20]}>
            <Col
              span={24}
              md={12}
              lg={8}
            >
              <Card
                hoverable
                bordered
              >
                <Statistic
                  title='Draft Surveys'
                  value={678}
                  valueStyle={{ color: 'var(--color-warning)' }}
                  prefix={<ArrowRightOutlined />}
                  formatter={(value) => (
                    <CountUp
                      end={value}
                      separator=','
                    />
                  )}
                />
              </Card>
            </Col>

            <Col
              span={24}
              md={12}
              lg={8}
            >
              <Card
                hoverable
                bordered
              >
                <Statistic
                  title='Active Surveys'
                  value={353}
                  valueStyle={{ color: 'var(--color-success)' }}
                  prefix={<ArrowUpOutlined />}
                  formatter={(value) => (
                    <CountUp
                      end={value}
                      separator=','
                    />
                  )}
                />
              </Card>
            </Col>

            <Col
              span={24}
              md={12}
              lg={8}
            >
              <Card
                hoverable
                bordered
              >
                <Statistic
                  title='Closed Surveys'
                  value={565}
                  valueStyle={{ color: 'var(--color-error)' }}
                  prefix={<ArrowDownOutlined />}
                  formatter={(value) => (
                    <CountUp
                      end={value}
                      separator=','
                    />
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}

DashboardSection.propTypes = {
  locale: PropTypes.string.isRequired,
};
