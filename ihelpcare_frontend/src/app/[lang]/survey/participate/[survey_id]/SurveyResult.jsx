import { LikeFilled } from '@ant-design/icons';
import usePostData from '@hooks/usePostData';
import { questionsAnswer, setReStart, setStage, setTakeOfAnswer } from '@redux/slices/surveySlice';
import { getLocale } from '@root/i18n.config';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SurveyResult({ openNotificationWithIcon, surveyId }) {
  const answer = useSelector(questionsAnswer);
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = getLocale();

  // survey submission API's implementation
  const [postData, loading, error, success] = usePostData();

  useEffect(() => {
    if (error) {
      openNotificationWithIcon('error', 'ERROR', error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      openNotificationWithIcon(
        'success',
        'SUCCESS',
        success?.message || 'Thanks for your survey submission!'
      );
      dispatch(setTakeOfAnswer(0));
      dispatch(setStage('start'));
      dispatch(setReStart());
      router.push(`/${locale}/survey`);
    }
  }, [success]);

  return (
    <div className='mx-10 flex flex-col items-center justify-between lg:mx-20'>
      <LikeFilled className='text-[80px] lg:text-[100px]' />

      <h2 className='mt-5 text-center font-font-montserrat text-[24px] font-font-semi-bold lg:text-[28px]'>
        Thanks!
      </h2>
      <p className='text-center font-font-montserrat text-[18px] font-font-normal lg:text-[21px]'>
        We really appreciate your feedback!
      </p>

      <div className='flow-row flex items-center justify-between space-x-5 py-5 lg:space-x-10 lg:py-10'>
        <Button
          onClick={() => postData(`/survey-response/${surveyId}`, answer)}
          disabled={loading}
          loading={loading}
          type='primary'
          size='large'
          danger
          block
        >
          Submit Survey
        </Button>

        <Button
          onClick={() => {
            dispatch(setTakeOfAnswer(0));
            dispatch(setStage('question'));
          }}
          type='primary'
          size='large'
          block
        >
          Retake Survey
        </Button>
      </div>
    </div>
  );
}

SurveyResult.propTypes = {
  openNotificationWithIcon: PropTypes.func.isRequired,
  surveyId: PropTypes.number.isRequired,
};
