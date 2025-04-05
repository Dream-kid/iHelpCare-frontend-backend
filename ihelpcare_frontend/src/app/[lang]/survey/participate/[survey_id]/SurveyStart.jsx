import { AntCloudOutlined } from '@ant-design/icons';
import SharedError from '@components/shared/SharedError';
import SharedLoader from '@components/shared/SharedLoader';
import useFetchData from '@hooks/useFetchData';
import usePostData from '@hooks/usePostData';
import { setStage } from '@redux/slices/surveySlice';
import { Button } from 'antd';
import { useMediaQuery } from 'mukul-react-hooks';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

export default function SurveyStart({ locale, surveyId, openNotificationWithIcon }) {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const dispatch = useDispatch();

  // fetch survey-list API's data
  const [surveyLoading, surveyError, totalSurveyList] = useFetchData(`/survey/${surveyId}`);

  // i did know why call this API's on click button
  const [postData] = usePostData();

  const createResponseValue = () => {
    postData(`/survey-response/${totalSurveyList?.data?.id}`, {});
  };

  return (
    <div className='mx-10 flex flex-col items-center justify-between lg:mx-20'>
      {surveyLoading ? (
        <SharedLoader />
      ) : surveyError ? (
        <SharedError error={surveyError} />
      ) : (
        <>
          <AntCloudOutlined className='text-[80px] lg:text-[100px]' />

          <h2 className='mt-5 text-center font-font-montserrat text-[24px] font-font-semi-bold lg:text-[28px]'>
            Put Your Opinion
          </h2>
          <p className='text-center font-font-montserrat text-[18px] font-font-normal lg:text-[21px]'>
            By answering a few questions, you help us understand your child&apos;s need and improve
            our service for an even better experience
          </p>

          <div className='flow-row flex items-center justify-between space-x-5 lg:space-x-10'>
            <Button
              className='flex-1'
              // prettier-ignore
              onClick={() => openNotificationWithIcon(
                'info',
                'INFO',
                'Thanks for your response. We will remind you later!'
              )}
              size={isDesktop ? 'large' : 'middle'}
              type='primary'
              danger
              block
            >
              Remind Me Later
            </Button>

            {totalSurveyList?.data?.survey_link ? (
              <Link
                href={totalSurveyList?.data?.survey_link}
                target='_blank'
              >
                <Button
                  onClick={createResponseValue}
                  className='flex-1'
                  size={isDesktop ? 'large' : 'middle'}
                  type='primary'
                  block
                >
                  Take the Survey
                </Button>
              </Link>
            ) : (
              <Button
                className='flex-1'
                onClick={() => dispatch(setStage('question'))}
                size={isDesktop ? 'large' : 'middle'}
                type='primary'
                block
              >
                Take the Survey
              </Button>
            )}
          </div>

          <Link
            className='my-5 lg:my-10'
            href={`/${locale}/survey`}
          >
            <Button
              size={isDesktop ? 'large' : 'middle'}
              type='link'
              block
            >
              No thanks. I&apos;m good
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

SurveyStart.propTypes = {
  locale: PropTypes.string.isRequired,
  surveyId: PropTypes.number.isRequired,
  openNotificationWithIcon: PropTypes.func.isRequired,
};
