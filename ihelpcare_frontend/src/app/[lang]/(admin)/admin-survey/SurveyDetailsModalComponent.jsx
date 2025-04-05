import { ExclamationCircleFilled } from '@ant-design/icons';
import SharedError from '@components/shared/SharedError';
import { CloseIcon } from '@components/shared/SharedIconPack';
import SharedLoader from '@components/shared/SharedLoader';
import useDeleteData from '@hooks/useDeleteData';
import useFetchData from '@hooks/useFetchData';
import { surveyStatusAsBadge } from '@utils/statusAsBadge';
import { Button, Descriptions, Divider, Modal, Tag } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export default function SurveyDetailsModalComponent({
  surveyDetailsModal,
  setSurveyDetailsModal,
  openNotificationWithIcon,
  setSurveyFetchAgain,
}) {
  const [modal, contextHolder] = Modal.useModal();

  // fetch survey details API's data
  const [loadingSurveyDetails, errorSurveyDetails, dataSurveyDetails] = useFetchData(
    `/survey/${surveyDetailsModal?.surveyId}`
  );

  // survey delete API's implementation
  const [postData, loading, error, success] = useDeleteData();

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
        success?.message || 'Survey deleted successfully!'
      );
      setSurveyDetailsModal((prevState) => ({ ...prevState, open: false, surveyId: null }));
      setSurveyFetchAgain((prevState) => !prevState);
    }
  }, [success]);

  // function to handle delete survey
  const handleDeleteSurvey = () => {
    modal.confirm({
      title: 'Do you want to permanently delete these survey?',
      icon: <ExclamationCircleFilled />,
      centered: true,
      onOk() {
        postData(`/survey/${surveyDetailsModal?.surveyId}`);
      },
    });
  };

  return (
    <Modal
      className='relative my-5 lg:my-10'
      open={surveyDetailsModal?.open}
      // prettier-ignore
      title={(
        <div>
          <h2 className='text-[20px] font-font-semi-bold lg:text-[24px]'>
            {`#${surveyDetailsModal?.surveyId}. Survey Details View:`}
          </h2>
          <Divider className='!mt-0 !pt-0' />
        </div>
      )}
      closable={false}
      width={1200}
      footer={[
        <Button
          onClick={() => handleDeleteSurvey()}
          disabled={loading}
          loading={loading}
          type='primary'
          size='large'
          key='delete'
          danger
        >
          Delete Survey
        </Button>,
        <Button
          // prettier-ignore
          onClick={() => setSurveyDetailsModal((prevState) => (
            { ...prevState, open: false, surveyId: null }
          ))}
          type='primary'
          size='large'
          key='close'
        >
          Close
        </Button>,
      ]}
      centered
    >
      <Button
        className='absolute right-5 top-5'
        // prettier-ignore
        onClick={() => setSurveyDetailsModal((prevState) => (
          { ...prevState, open: false, surveyId: null }
        ))}
        icon={<CloseIcon />}
        size='large'
        type='link'
      />

      {loadingSurveyDetails ? (
        <SharedLoader />
      ) : errorSurveyDetails ? (
        <SharedError error={errorSurveyDetails} />
      ) : (
        <Descriptions
          title='Survey Info:'
          layout='horizontal'
          bordered
          column={{
            xs: 1,
            sm: 1,
            md: 1,
            lg: 4,
            xl: 4,
            xxl: 4,
          }}
          items={[
            {
              key: '1',
              span: { xs: 4, sm: 4, md: 4, lg: 2, xl: 2, xxl: 2 },
              label: <span className='whitespace-nowrap'>Survey Title (English)</span>,
              children: dataSurveyDetails?.data?.title_en || 'N/A',
            },
            {
              key: '2',
              span: { xs: 4, sm: 4, md: 4, lg: 2, xl: 2, xxl: 2 },
              label: <span className='whitespace-nowrap'>Survey Title (Filipino)</span>,
              children: dataSurveyDetails?.data?.title_ph || 'N/A',
            },
            {
              key: '3',
              span: { xs: 4, sm: 4, md: 4, lg: 2, xl: 2, xxl: 2 },
              label: <span className='whitespace-nowrap'>Survey Description (English)</span>,
              children: dataSurveyDetails?.data?.description_en || 'N/A',
            },
            {
              key: '4',
              span: { xs: 4, sm: 4, md: 4, lg: 2, xl: 2, xxl: 2 },
              label: <span className='whitespace-nowrap'>Survey Description (Filipino)</span>,
              children: dataSurveyDetails?.data?.description_ph || 'N/A',
            },
            {
              key: '5',
              span: { xs: 4, sm: 4, md: 4, lg: 2, xl: 2, xxl: 2 },
              label: <span className='whitespace-nowrap'>Survey Start Date</span>,
              children: dataSurveyDetails?.data?.start_date
                ? dayjs(dataSurveyDetails?.data?.start_date).format('YYYY-MM-DD')
                : 'N/A',
            },
            {
              key: '6',
              span: { xs: 4, sm: 4, md: 4, lg: 2, xl: 2, xxl: 2 },
              label: <span className='whitespace-nowrap'>Survey End Date</span>,
              children: dataSurveyDetails?.data?.end_date
                ? dayjs(dataSurveyDetails?.data?.end_date).format('YYYY-MM-DD')
                : 'N/A',
            },
            {
              key: '7',
              span: { xs: 4, sm: 4, md: 4, lg: 2, xl: 2, xxl: 2 },
              label: <span className='whitespace-nowrap'>Survey Status</span>,
              children: dataSurveyDetails?.data?.status ? (
                <Tag color={surveyStatusAsBadge(dataSurveyDetails?.data?.status)}>
                  {dataSurveyDetails?.data?.status || 'N/A'}
                </Tag>
              ) : (
                'N/A'
              ),
            },
            {
              key: '8',
              span: { xs: 4, sm: 4, md: 4, lg: 2, xl: 2, xxl: 2 },
              label: <span className='whitespace-nowrap'>Survey Participant</span>,
              children: dataSurveyDetails?.data?.participator_role === 3 ? 'Caregiver' : 'Patient',
            },
            {
              key: '9',
              span: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
              label: dataSurveyDetails?.data?.survey_link ? (
                <span className='whitespace-nowrap'>Survey Link</span>
              ) : (
                <span className='whitespace-nowrap'>Survey Questions</span>
              ),
              children: dataSurveyDetails?.data?.survey_link ? (
                dataSurveyDetails?.data?.survey_link ? (
                  <a
                    href={dataSurveyDetails?.data?.survey_link}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{ color: 'skyblue' }}
                  >
                    <Tag color='blue'>{dataSurveyDetails?.data?.survey_link || 'N/A'}</Tag>
                  </a>
                ) : (
                  'N/A'
                )
              ) : dataSurveyDetails?.data?.questions?.length === 0 ? (
                'N/A'
              ) : (
                <div>
                  {dataSurveyDetails?.data?.questions?.map((question, indexQuestion) => (
                    <div key={uuid()}>
                      <Descriptions
                        className='mb-5'
                        title={`Question ${indexQuestion + 1}:`}
                        layout='horizontal'
                        bordered
                        column={{
                          xs: 4,
                          sm: 4,
                          md: 4,
                          lg: 4,
                          xl: 4,
                          xxl: 4,
                        }}
                        items={[
                          {
                            key: '1',
                            span: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                            label: (
                              <span className='whitespace-nowrap'>Question Title (English)</span>
                            ),
                            children: question?.title_en || 'N/A',
                          },
                          {
                            key: '2',
                            span: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                            label: (
                              <span className='whitespace-nowrap'>Question Title (Filipino)</span>
                            ),
                            children: question?.title_ph || 'N/A',
                          },
                          {
                            key: '3',
                            span: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                            label: <span className='whitespace-nowrap'>Question Type</span>,
                            children: <span className='capitalize'>{question?.type || 'N/A'}</span>,
                          },
                          {
                            key: '4',
                            span: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                            label: <span className='whitespace-nowrap'>Multiple Chose Option</span>,
                            children: question?.multi_select ? (
                              <Tag color='success'>Yes</Tag>
                            ) : (
                              <Tag color='error'>No</Tag>
                            ),
                          },
                          {
                            key: '5',
                            span: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                            label: <span className='whitespace-nowrap'>Options</span>,
                            children:
                              question?.options?.length === 0 ? (
                                'N/A'
                              ) : (
                                <div>
                                  {question?.options?.map((option, indexOption) => (
                                    <div key={uuid()}>
                                      <Descriptions
                                        className='mb-5'
                                        title={`Option ${indexOption + 1}:`}
                                        layout='horizontal'
                                        bordered
                                        column={{
                                          xs: 4,
                                          sm: 4,
                                          md: 4,
                                          lg: 4,
                                          xl: 4,
                                          xxl: 4,
                                        }}
                                        items={[
                                          {
                                            key: '1',
                                            span: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                                            label: (
                                              <span className='whitespace-nowrap'>
                                                Option Title (English)
                                              </span>
                                            ),
                                            children: option?.option_title_en || 'N/A',
                                          },
                                          {
                                            key: '2',
                                            span: { xs: 4, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 },
                                            label: (
                                              <span className='whitespace-nowrap'>
                                                Option Title (Filipino)
                                              </span>
                                            ),
                                            children: option?.option_title_ph || 'N/A',
                                          },
                                        ]}
                                      />
                                    </div>
                                  ))}
                                </div>
                              ),
                          },
                        ]}
                      />
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
        />
      )}

      {/* confirm modal context */}
      {contextHolder}
    </Modal>
  );
}

SurveyDetailsModalComponent.propTypes = {
  surveyDetailsModal: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    surveyId: PropTypes.number.isRequired,
  }).isRequired,
  setSurveyDetailsModal: PropTypes.func.isRequired,
  openNotificationWithIcon: PropTypes.func.isRequired,
  setSurveyFetchAgain: PropTypes.func.isRequired,
};
