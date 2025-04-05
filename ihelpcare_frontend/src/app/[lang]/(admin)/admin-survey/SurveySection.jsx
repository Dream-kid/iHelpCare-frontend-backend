'use client';

import { DownOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import SharedError from '@components/shared/SharedError';
import useFetchData from '@hooks/useFetchData';
import useNotification from '@hooks/useNotification';
import { surveyStatusAsBadge } from '@utils/statusAsBadge';
import { Button, Dropdown, Input, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const CreateSurveyFormModal = dynamic(() => import('./CreateSurveyFormModal'), {
  ssr: false,
});
const CreateSurveyFromOtherProvider = dynamic(() => import('./CreateSurveyFromOtherProvider'), {
  ssr: false,
});
const SurveyViewReportModal = dynamic(() => import('./SurveyViewReportModal'), {
  ssr: false,
});
const SurveyDetailsModalComponent = dynamic(() => import('./SurveyDetailsModalComponent'), {
  ssr: false,
});
const SurveyEditModalComponent = dynamic(() => import('./SurveyEditModalComponent'), {
  ssr: false,
});
const SurveyUpdateStatusModal = dynamic(() => import('./SurveyUpdateStatusModal'), {
  ssr: false,
});

export default function SurveySection() {
  const subject = new Subject();
  const [value, setValue] = useState('');
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const [createSurveyModalOpen, setCreateSurveyModalOpen] = useState(false);
  const [createOtherSurveyModalOpen, setCreateOtherSurveyModalOpen] = useState(false);
  const [surveyFetchAgain, setSurveyFetchAgain] = useState(false);
  const [surveyReportModal, setSurveyReportModal] = useState({
    open: false,
    surveyId: null,
  });
  const [surveyDetailsModal, setSurveyDetailsModal] = useState({
    open: false,
    surveyId: null,
  });
  const [surveyEditModal, setSurveyEditModal] = useState({
    open: false,
    surveyId: null,
  });
  const [statusUpdate, setStatusUpdate] = useState({
    open: false,
    surveyId: null,
    status: null,
  });
  const [filter, setFilter] = useState({
    search: '',
    page: 1,
    limit: 10,
    sort: 'created_at,desc',
  });

  const handleEventSearch = () => {
    setFilter((prevState) => ({ ...prevState, page: 1, search: value }));
  };

  const onKeyUp = (e) => {
    subject.next(e.target.value);
  };

  subject
    .asObservable()
    .pipe(debounceTime(1000))
    .subscribe((data) => {
      setFilter((prevState) => ({ ...prevState, page: 1, search: data }));
    });

  // fetch survey API's data
  const [loadingSurvey, errorSurvey, dataSurvey] = useFetchData(
    `/survey?search=${filter?.search}&sort=${filter?.sort}&per_page=${filter?.limit}&current_page=${filter?.page}`,
    surveyFetchAgain
  );

  // fetch survey provider API's data
  const [, , dataSurveyProvider] = useFetchData('/survey-provider', surveyFetchAgain);

  const { data: providerData } = dataSurveyProvider?.data || {};
  const [providerTypeId, setProviderTypeId] = useState();

  // Function to handle menu item click
  const handleMenuClick = ({ key }) => {
    setProviderTypeId(key);
    if (key === '1') {
      setCreateSurveyModalOpen(true);
    } else {
      setCreateOtherSurveyModalOpen(true);
    }
  };

  const items = providerData?.map((item) => {
    if (item.status === 1) {
      return {
        label: item.btn_text_en,
        key: item.id,
      };
    }
    return null;
  });

  return (
    <>
      <section>
        <div className='flex flex-col items-end justify-between space-y-5 md:flex-row md:items-center md:space-x-5 md:space-y-0'>
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            trigger={['click']}
          >
            <Button
              type='primary'
              size='large'
            >
              Create New Survey
              <DownOutlined />
            </Button>
          </Dropdown>

          <Input.Search
            className='w-full md:w-1/2 lg:w-1/3'
            placeholder='Type here to search...'
            enterButton='Search'
            onChange={(e) => setValue(e.target.value)}
            onPressEnter={handleEventSearch}
            onSearch={handleEventSearch}
            onKeyUp={onKeyUp}
            value={value}
            size='large'
          />
        </div>

        <div className='mt-5'>
          {errorSurvey ? (
            <SharedError error={errorSurvey} />
          ) : (
            <Table
              columns={[
                {
                  key: 1,
                  title: (
                    <div className='flow-row flex items-center justify-between whitespace-nowrap'>
                      Serial No.
                      {filter.sort === 'created_at,asc' ? (
                        <SortAscendingOutlined />
                      ) : (
                        <SortDescendingOutlined />
                      )}
                    </div>
                  ),
                  dataIndex: 'id',
                  render: (_, __, index) => `# ${index + 1}`,
                  sorter: true,
                  sortOrder: filter.sort,
                  align: 'center',
                  width: '10%',
                },
                {
                  key: 2,
                  title: <div className='whitespace-nowrap'>Title (English)</div>,
                  dataIndex: 'title_en',
                  render: (data) => data || 'N/A',
                },
                {
                  key: 3,
                  title: <div className='whitespace-nowrap'>Title (Filipino)</div>,
                  dataIndex: 'title_ph',
                  render: (data) => data || 'N/A',
                },
                {
                  key: 4,
                  title: <div className='whitespace-nowrap'>Start Data to End Date</div>,
                  dataIndex: 'start_date',
                  render: (_, record) => (
                    <span className='whitespace-nowrap'>
                      {record?.start_date ? dayjs(record?.start_date).format('YYYY-MM-DD') : 'N/A'}
                      {' to '}
                      {record?.end_date ? dayjs(record?.end_date).format('YYYY-MM-DD') : 'N/A'}
                    </span>
                  ),
                },
                {
                  key: 5,
                  title: 'Status',
                  dataIndex: 'status',
                  // prettier-ignore
                  render: (data) => <Tag color={surveyStatusAsBadge(data)}>{data || 'N/A'}</Tag>,
                  align: 'center',
                },
                {
                  key: 6,
                  title: 'Actions',
                  dataIndex: 'id',
                  render: (_, record) => (
                    <Space size='middle'>
                      <Button
                        // prettier-ignore
                        onClick={() => setSurveyReportModal((prevState) => ({
                          ...prevState,
                          open: true,
                          surveyId: record?.id,
                        }))}
                        type='primary'
                        size='middle'
                      >
                        Reports
                      </Button>
                      <Button
                        // prettier-ignore
                        onClick={() => setSurveyDetailsModal((prevState) => ({
                          ...prevState,
                          open: true,
                          surveyId: record?.id,
                        }))}
                        type='primary'
                        size='middle'
                      >
                        Details
                      </Button>
                      <Button
                        // prettier-ignore
                        onClick={() => setSurveyEditModal((prevState) => ({
                          ...prevState,
                          open: true,
                          surveyId: record?.id,
                        }))}
                        type='primary'
                        size='middle'
                      >
                        Edit
                      </Button>
                      <Button
                        // prettier-ignore
                        onClick={() => setStatusUpdate((prevState) => ({
                          ...prevState,
                          open: true,
                          surveyId: record?.id,
                          status: record?.status,
                        }))}
                        type='primary'
                        size='middle'
                      >
                        Update Status
                      </Button>
                    </Space>
                  ),
                  align: 'center',
                },
              ]}
              dataSource={dataSurvey?.data?.data}
              pagination={{
                // pagination
                total: dataSurvey?.data?.pagination?.total_items,
                current: dataSurvey?.data?.pagination?.current_page,
                hideOnSinglePage: false,
                onChange: (data) => setFilter((prevSate) => ({ ...prevSate, page: data })),
                // limit
                defaultPageSize: filter?.limit,
                pageSize: dataSurvey?.data?.pagination?.per_page,
                pageSizeOptions: [5, 10, 20, 30, 40, 50, 100],
                showSizeChanger: true,
                // prettier-ignore
                onShowSizeChange: (_, num) => setFilter((prevSate) => ({ ...prevSate, limit: num })),
                // settings
                position: ['bottomRight'],
              }}
              // sort
              sortDirections={['created_at,asc', 'created_at,desc']}
              // prettier-ignore
              onChange={(_, __, sorter) => setFilter((prevSate) => (
                { ...prevSate, sort: sorter?.order || 'created_at,asc' }
              ))}
              showSorterTooltip={false}
              loading={loadingSurvey}
              rowKey='id'
              bordered
            />
          )}
        </div>
      </section>

      {/* notification context */}
      {contextHolder}

      {/* other provider survey create form modal */}
      {createOtherSurveyModalOpen && (
        <CreateSurveyFromOtherProvider
          createOtherSurveyModalOpen={createOtherSurveyModalOpen}
          setCreateOtherSurveyModalOpen={setCreateOtherSurveyModalOpen}
          openNotificationWithIcon={openNotificationWithIcon}
          setSurveyFetchAgain={setSurveyFetchAgain}
          providerTypeId={providerTypeId}
        />
      )}

      {/* native survey create form modal */}
      {createSurveyModalOpen && (
        <CreateSurveyFormModal
          createSurveyModalOpen={createSurveyModalOpen}
          setCreateSurveyModalOpen={setCreateSurveyModalOpen}
          openNotificationWithIcon={openNotificationWithIcon}
          setSurveyFetchAgain={setSurveyFetchAgain}
          providerTypeId={providerTypeId}
        />
      )}

      {/* survey report view modal */}
      {surveyReportModal?.open && (
        <SurveyViewReportModal
          surveyReportModal={surveyReportModal}
          setSurveyReportModal={setSurveyReportModal}
        />
      )}

      {/* survey details view modal */}
      {surveyDetailsModal?.open && (
        <SurveyDetailsModalComponent
          surveyDetailsModal={surveyDetailsModal}
          setSurveyDetailsModal={setSurveyDetailsModal}
          openNotificationWithIcon={openNotificationWithIcon}
          setSurveyFetchAgain={setSurveyFetchAgain}
        />
      )}

      {/* survey edit form modal */}
      {surveyEditModal?.open && (
        <SurveyEditModalComponent
          surveyEditModal={surveyEditModal}
          setSurveyEditModal={setSurveyEditModal}
          openNotificationWithIcon={openNotificationWithIcon}
          setSurveyFetchAgain={setSurveyFetchAgain}
          providerTypeId={providerTypeId}
        />
      )}

      {/* survey update status modal */}
      {statusUpdate?.open && (
        <SurveyUpdateStatusModal
          statusUpdate={statusUpdate}
          setStatusUpdate={setStatusUpdate}
          openNotificationWithIcon={openNotificationWithIcon}
          setSurveyFetchAgain={setSurveyFetchAgain}
        />
      )}
    </>
  );
}
