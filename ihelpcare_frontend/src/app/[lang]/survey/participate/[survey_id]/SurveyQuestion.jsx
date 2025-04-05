import { setAnswerAgainstQuestion, setStage, setTakeOfAnswer } from '@redux/slices/surveySlice';
import { Button, Checkbox, Col, Input, Radio, Row, Space } from 'antd';
import { useMediaQuery } from 'mukul-react-hooks';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

export default function SurveyQuestion({ openNotificationWithIcon, locale }) {
  const isDesktop = useMediaQuery('(min-width: 992px)');
  const takeOfAnswer = useSelector((state) => state.survey.takeOfAnswer);
  const question = useSelector((state) => state.survey.question[takeOfAnswer]);
  const allQuestion = useSelector((state) => state.survey.question);
  const dispatch = useDispatch();

  // function to handle go to next question
  const handleNextQuestion = () => {
    if (question?.answer) {
      if (Array.isArray(question?.answer) && question?.answer?.length === 0) {
        openNotificationWithIcon('warning', 'WARNING', 'Please answer the question to continue');
      } else if (takeOfAnswer < allQuestion.length - 1) {
        dispatch(setTakeOfAnswer(takeOfAnswer + 1));
      } else {
        dispatch(setStage('result'));
      }
    } else {
      openNotificationWithIcon('warning', 'WARNING', 'Please answer the question to continue');
    }
  };

  return (
    <div className='mx-5 lg:mx-10'>
      <h1 className='text-start font-font-montserrat text-[24px] font-font-semi-bold lg:text-[28px]'>
        {`${takeOfAnswer + 1}. ${question?.[`title_${locale}`]}`}
      </h1>

      {/* if question `binary` && `mcq` when `multi_select` is false display radio group */}
      {(question?.type === 'binary' || (question?.type === 'mcq' && !question?.multi_select)) && (
        <Radio.Group
          className='ml-5 mt-5'
          // prettier-ignore
          onChange={(e) => dispatch(setAnswerAgainstQuestion(
            { id: takeOfAnswer, answer: e.target.value }
          ))}
          value={question?.answer || undefined}
        >
          <Space direction='vertical'>
            {question?.options?.map((data) => (
              <Radio
                key={uuid()}
                value={data?.id}
              >
                {data?.[`option_title_${locale}`]}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      )}

      {/* if question `mcq` && `multi_select` is true display checkbox */}
      {question?.type === 'mcq' && question?.multi_select && (
        <Checkbox.Group
          className='ml-5 mt-5 w-full'
          // prettier-ignore
          onChange={(value) => dispatch(setAnswerAgainstQuestion({ id: takeOfAnswer, answer: value }))}
          value={question?.answer || undefined}
        >
          <Row gutter={[10, 10]}>
            {question?.options?.map((data) => (
              <Col
                key={uuid()}
                span={24}
                lg={12}
              >
                <Checkbox value={data?.id}>{data?.[`option_title_${locale}`]}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      )}

      {/* if question `input` display input */}
      {question?.type === 'input' && (
        <Input
          className='ml-5 mt-5 w-full'
          placeholder={question?.tag || 'Enter your answer'}
          // prettier-ignore
          onChange={(e) => dispatch(setAnswerAgainstQuestion({ id: takeOfAnswer, answer: e.target.value }))}
          value={question?.answer || undefined}
          size='large'
        />
      )}

      {/* if question `scale` display radio group */}
      {question?.type === 'scale' && (
        <Radio.Group
          className='ml-5 mt-5'
          // prettier-ignore
          onChange={(e) => dispatch(setAnswerAgainstQuestion(
            { id: takeOfAnswer, answer: e.target.value }
          ))}
          value={question?.answer || undefined}
        >
          <Space direction='vertical'>
            {question?.options?.map((data) => (
              <Radio
                key={uuid()}
                value={data?.id}
              >
                {data?.[`option_title_${locale}`]}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      )}

      {/* if question `essay` display textarea */}
      {question?.type === 'essay' && (
        <Input.TextArea
          className='ml-5 mt-5 w-full'
          placeholder={question?.tag || 'Enter your answer'}
          // prettier-ignore
          onChange={(e) => dispatch(setAnswerAgainstQuestion(
            { id: takeOfAnswer, answer: e.target.value }
          ))}
          value={question?.answer || undefined}
          maxLength={1000}
          size='large'
          showCount
          rows={4}
        />
      )}

      <div className='flow-row flex items-center justify-between space-x-5 py-5 lg:space-x-10 lg:py-10'>
        {takeOfAnswer !== 0 && (
          <Button
            onClick={() => dispatch(setTakeOfAnswer(takeOfAnswer - 1))}
            size={isDesktop ? 'large' : 'middle'}
            type='primary'
            block
          >
            Previous
          </Button>
        )}

        <Button
          onClick={handleNextQuestion}
          size={isDesktop ? 'large' : 'middle'}
          type='primary'
          block
        >
          {takeOfAnswer < allQuestion?.length - 1 ? 'Next' : 'Finish'}
        </Button>
      </div>
    </div>
  );
}

SurveyQuestion.propTypes = {
  openNotificationWithIcon: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};
