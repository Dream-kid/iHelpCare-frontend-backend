'use client';

import SharedCustomBackButton from '@components/shared/SharedCustomBackButton';
import { getLocale } from '@root/i18n.config';
import { Col, Divider, Row } from 'antd';
import { useMediaQuery } from 'mukul-react-hooks';
import LearningModuleCard from './LearningModuleCard';

export default function LearningSection() {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const locale = getLocale();

  return (
    <section className='container mb-5 mt-5 px-5 lg:mt-10 lg:px-0'>
      <h1 className='title__anim text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
        Literacy
      </h1>
      <p className='description__anim text-center text-[20px] font-font-normal uppercase tracking-wide lg:text-[22px]'>
        Learning Modules
      </p>

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
          sm={12}
          md={8}
          lg={6}
        >
          <LearningModuleCard
            title='Alzheimer’s Facts and Figures'
            moduleId='1'
            moduleName='Module 1'
            redirectUrl='https://www.alz.org/alzheimers-dementia/facts-figures'
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          sm={12}
          md={8}
          lg={6}
        >
          <LearningModuleCard
            title="Causes and Risk Factors for Alzheimer's Disease"
            moduleId='2'
            moduleName='Module 2'
            redirectUrl='https://www.alz.org/alzheimers-dementia/what-is-alzheimers/causes-and-risk-factors'
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          sm={12}
          md={8}
          lg={6}
        >
          <LearningModuleCard
            title='What is Dementia?'
            moduleId='3'
            moduleName='Module 3'
            redirectUrl='https://www.alz.org/alzheimers-dementia/what-is-dementia'
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          sm={12}
          md={8}
          lg={6}
        >
          <LearningModuleCard
            title='What is Alzheimer’s Disease'
            moduleId='4'
            moduleName='Module 4'
            redirectUrl='https://www.alz.org/alzheimers-dementia/what-is-alzheimers'
          />
        </Col>

        {isDesktop && (
          <Col span={24}>
            <Divider className='bg-color-gray' />
          </Col>
        )}

        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          sm={12}
          md={8}
          lg={6}
        >
          <LearningModuleCard
            title='How is Alzheimer’s Disease Diagnosed?'
            moduleId='5'
            moduleName='Module 5'
            redirectUrl='https://www.alz.org/alzheimers-dementia/diagnosis/medical_tests'
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          sm={12}
          md={8}
          lg={6}
        >
          <LearningModuleCard
            title="Stages of Alzheimer's Disease"
            moduleId='6'
            moduleName='Module 6'
            redirectUrl='https://www.alz.org/alzheimers-dementia/stages'
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          sm={12}
          md={8}
          lg={6}
        >
          <LearningModuleCard
            title='Why Get Checked?'
            moduleId='7'
            moduleName='Module 7'
            redirectUrl='https://www.alz.org/alzheimers-dementia/diagnosis/why-get-checked'
          />
        </Col>
        <Col
          className='py-5 transition-all duration-300 ease-in hover:bg-white hover:drop-shadow-xl'
          span={24}
          sm={12}
          md={8}
          lg={6}
        >
          <LearningModuleCard
            title="Treatments for Alzheimer's Disease"
            moduleId='8'
            moduleName='Module 8'
            redirectUrl='https://www.alz.org/alzheimers-dementia/treatments'
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
