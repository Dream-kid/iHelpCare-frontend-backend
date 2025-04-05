'use client';

import { TrophyOutlined } from '@ant-design/icons';
import SharedEmpty from '@components/shared/SharedEmpty';
import SharedError from '@components/shared/SharedError';
import SharedLoader from '@components/shared/SharedLoader';
import useFetchData from '@hooks/useFetchData';
import useNotification from '@hooks/useNotification';
import { Avatar, Button, List, Skeleton, Tag } from 'antd';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ReportDetailsViewModal = dynamic(() => import('./ReportDetailsViewModal'), {
  ssr: false,
});

export default function SurveyList({ locale }) {
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const isLoginUser = useSelector((state) => state.auth.isLoginUser);
  const userData = useSelector((state) => state.auth.userData);
  const [filter, setFilter] = useState({ page: 1, rows: 10 });
  const router = useRouter();

  const [detailsViewModal, setDetailsViewModal] = useState({
    open: false,
    responseId: null,
  });

  // fetch survey API's data
  const [loadingSurvey, error, questionnaire, loadingPagination] = useFetchData(
    `/survey-list?per_page=${filter?.rows}&current_page=${filter?.page}`,
    undefined,
    true
  );

  // function to handle user participated survey
  const handleParticipatedSurvey = (id) => {
    if (!isLoginUser) {
      openNotificationWithIcon(
        'warning',
        'WARNING',
        'Sorry! Please Sign In as patient or caregiver to participate survey'
      );
    } else if (userData?.role_id === 3 || userData?.role_id === 4) {
      router.push(`/${locale}/survey/participate/${id}`);
    } else {
      openNotificationWithIcon(
        'warning',
        'WARNING',
        'Sorry! Only patient and caregiver can participate survey'
      );
    }
  };

  return (
    <section className='container min-h-[78vh] py-5 lg:py-10'>
      <div className='mx-auto w-11/12 rounded-rounded-default bg-color-bg-light py-5 drop-shadow-md lg:w-10/12'>
        <h1 className='title__anim pt-5 text-center text-[30px] font-font-bold uppercase tracking-wider text-color-primary lg:text-[40px]'>
          Surveys
        </h1>

        {loadingSurvey ? (
          <SharedLoader />
        ) : error ? (
          <SharedError error={error} />
        ) : questionnaire?.data?.data?.length === 0 ? (
          <SharedEmpty description='Sorry! No survey found.' />
        ) : (
          <List
            className='m-5'
            loading={loadingSurvey}
            itemLayout='horizontal'
            loadMore={
              questionnaire?.data?.pagination?.total_items > questionnaire?.data?.data?.length && (
                <div className='flex flex-row items-center justify-center py-5'>
                  <Button
                    loading={loadingPagination}
                    disabled={loadingPagination}
                    // prettier-ignore
                    onClick={() => setFilter((prevState) => ({
                      ...prevState,
                      rows: filter?.rows + 10,
                    }))}
                    type='default'
                    size='middle'
                  >
                    Load more...
                  </Button>
                </div>
              )
            }
            dataSource={questionnaire?.data?.data}
            // prettier-ignore
            renderItem={(item) => item?.participator_role === userData?.role?.id && (
            <List.Item
              actions={[
                <Tag
                  key='end-date'
                  color='warning'
                >
                  {`Survey Ends: ${dayjs(item?.end_date).format('DD MMM YYYY')}`}
                </Tag>,
                dayjs(item?.end_date).isBefore(dayjs().format('YYYY-MM-DD')) ? (
                  <Button
                    className='disabled:text-color-txt-dark'
                    key='participate'
                    type='primary'
                    size='middle'
                    disabled
                  >
                    Survey Ended
                  </Button>
                ) : item?.survey_link && item?.hasResponse ? (
                  <Button
                    className='disabled:text-color-txt-dark'
                    key='participate'
                    type='primary'
                    size='middle'
                    disabled
                  >
                    Already Participated
                  </Button>
                ) : item?.hasResponse ? (
                  <Button
                    // prettier-ignore
                    onClick={() => setDetailsViewModal(
                      { open: true, responseId: item?.surveyResoponseId }
                    )}
                    key='participate'
                    type='primary'
                    size='middle'
                  >
                    View Response
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleParticipatedSurvey(item?.id)}
                    key='participate'
                    type='primary'
                    size='middle'
                  >
                    Participate
                  </Button>
                ),
              ]}
            >
              <Skeleton
                loading={loadingSurvey}
                title={false}
                avatar
                active
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<TrophyOutlined />} />}
                  title={item?.[`title_${locale}`] || 'N/A'}
                  description={item?.[`description_${locale}`] || 'N/A'}
                />
              </Skeleton>
            </List.Item>
            )}
          />
        )}
      </div>

      {contextHolder}

      {/* survey response details view modal */}
      {detailsViewModal?.open && (
        <ReportDetailsViewModal
          detailsViewModal={detailsViewModal}
          setDetailsViewModal={setDetailsViewModal}
        />
      )}
    </section>
  );
}

SurveyList.propTypes = {
  locale: PropTypes.string.isRequired,
};
