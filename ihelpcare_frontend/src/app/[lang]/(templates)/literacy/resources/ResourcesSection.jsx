'use client';

import SharedCustomBackButton from '@components/shared/SharedCustomBackButton';
import SharedHomeItemCard from '@components/shared/SharedHomeItemCard';
import AdditionalResources from '@images/new-temp/additional-resources.png';
import ArticlesPublications from '@images/new-temp/articles-publications.png';
import ResourceLibrary from '@images/new-temp/resource-library.png';
import { getLocale } from '@root/i18n.config';
import { Col, Row } from 'antd';

export default function ResourcesSection() {
  const locale = getLocale();

  return (
    <section className='container mb-5 mt-5 px-5 lg:mt-10 lg:px-0'>
      <h1 className='title__anim text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
        Literacy
      </h1>
      <p className='description__anim text-center text-[20px] font-font-normal uppercase tracking-wide lg:text-[22px]'>
        Resources
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
            title='Articles & Publications'
            image={ArticlesPublications}
            url='literacy/resources/articles-publications'
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          md={12}
          lg={8}
        >
          <SharedHomeItemCard
            title='Resource Library'
            image={ResourceLibrary}
            url='literacy/resources/resource-library'
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          md={12}
          lg={8}
        >
          <SharedHomeItemCard
            title='Additional Resources'
            image={AdditionalResources}
            url='literacy/resources/additional-resources'
          />
        </Col>
      </Row>

      <SharedCustomBackButton
        title='Back to Literacy'
        link={`/${locale}/literacy`}
      />
    </section>
  );
}
