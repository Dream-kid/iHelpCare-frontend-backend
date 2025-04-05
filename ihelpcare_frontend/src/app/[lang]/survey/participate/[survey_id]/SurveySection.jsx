'use client';

import SharedError from '@components/shared/SharedError';
import SharedLoader from '@components/shared/SharedLoader';
import useFetchData from '@hooks/useFetchData';
import useNotification from '@hooks/useNotification';
import { setQuestion } from '@redux/slices/surveySlice';
import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SurveyQuestion from './SurveyQuestion';
import SurveyResult from './SurveyResult';
import SurveyStart from './SurveyStart';

export default function SurveySection({ locale, surveyId }) {
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const { stage, reStart } = useSelector((state) => state.survey);
  const dispatch = useDispatch();

  // fetch questionnaire API's data
  const [loading, error, questionnaire, , errorDetails] = useFetchData(
    `/survey/${surveyId}`,
    reStart
  );

  // if data not found to redirect to 404 page
  useEffect(() => {
    if (errorDetails?.code === 404) {
      notFound();
    }
  }, [errorDetails]);

  // if found questionnaire data to add redux store
  useEffect(() => {
    if (questionnaire) {
      dispatch(setQuestion(questionnaire?.data?.questions || []));
    }
  }, [questionnaire]);

  return (
    <section className='container min-h-[78vh] py-5 lg:py-10'>
      <div className='mx-auto w-11/12 rounded-rounded-default bg-color-bg-light py-5 drop-shadow-md lg:w-10/12'>
        <h1 className='title__anim pt-5 text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
          {stage === 'question'
            ? questionnaire?.data?.[`title_${locale}`] || 'Questions'
            : 'Survey'}
        </h1>

        {loading ? (
          <SharedLoader />
        ) : error ? (
          <SharedError error={error} />
        ) : (
          <div>
            {stage === 'start' && (
              <SurveyStart
                locale={locale}
                surveyId={surveyId}
                openNotificationWithIcon={openNotificationWithIcon}
              />
            )}

            {stage === 'question' && (
              <SurveyQuestion
                locale={locale}
                openNotificationWithIcon={openNotificationWithIcon}
              />
            )}

            {stage === 'result' && (
              <SurveyResult
                openNotificationWithIcon={openNotificationWithIcon}
                surveyId={surveyId}
              />
            )}
          </div>
        )}
      </div>

      {contextHolder}
    </section>
  );
}

SurveySection.propTypes = {
  locale: PropTypes.string.isRequired,
  surveyId: PropTypes.number.isRequired,
};
