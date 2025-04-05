import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import SharedError from '@components/shared/SharedError';
import { CloseIcon } from '@components/shared/SharedIconPack';
import useFetchData from '@hooks/useFetchData';
import { surveyStatusAsBadge } from '@utils/statusAsBadge';
import { Button, Divider, Modal, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ReportDetailsViewModal from './ReportDetailsViewModal';

export default function SurveyViewReportModal({ surveyReportModal, setSurveyReportModal }) {
  const [detailsViewModal, setDetailsViewModal] = useState({
    open: false,
    responseId: null,
  });
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    sort: 'created_at,desc',
  });

  // fetch survey reports API's data
  const [loadingReports, errorReports, dataReports] = useFetchData(
    `/survey-report/${surveyReportModal?.surveyId}?sort=${filter?.sort}&per_page=${filter?.limit}&current_page=${filter?.page}`
  );

  return (
    <>
      <Modal
        className='relative my-5 lg:my-10'
        open={surveyReportModal?.open}
        // prettier-ignore
        title={(
          <div>
            <h2 className='text-[20px] font-font-semi-bold lg:text-[24px]'>
              {`#${surveyReportModal?.surveyId}. Survey Report View:`}
            </h2>
            <Divider className='!mt-0 !pt-0' />
          </div>
        )}
        closable={false}
        width={1200}
        footer={[]}
        centered
      >
        <Button
          className='absolute right-5 top-5'
          // prettier-ignore
          onClick={() => setSurveyReportModal((prevState) => (
            { ...prevState, open: false, surveyId: null }
          ))}
          icon={<CloseIcon />}
          size='large'
          type='link'
        />

        {errorReports ? (
          <SharedError error={errorReports} />
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
                dataIndex: 'survey_title_en',
                render: (data) => data || 'N/A',
              },
              {
                key: 3,
                title: <div className='whitespace-nowrap'>Title (Filipino)</div>,
                dataIndex: 'survey_title_ph',
                render: (data) => data || 'N/A',
              },
              {
                key: 4,
                title: 'Survey Status',
                dataIndex: 'survey_status',
                // prettier-ignore
                render: (data) => <Tag color={surveyStatusAsBadge(data)}>{data || 'N/A'}</Tag>,
                align: 'center',
              },
              {
                key: 5,
                title: 'Participated',
                dataIndex: 'first_name',
                // prettier-ignore
                render: (data, record) => `${data} ${record.last_name}`,
              },
              {
                key: 6,
                title: 'Participation Date',
                dataIndex: 'created_at',
                render: (data) => (data ? dayjs(data).format('DD-MM-YYYY') : 'N/A'),
              },
              {
                key: 6,
                title: 'Actions',
                dataIndex: 'id',
                render: (data) => (
                  <Space size='middle'>
                    <Button
                      // prettier-ignore
                      onClick={() => setDetailsViewModal((prevState) => (
                        { ...prevState, open: true, responseId: data }
                      ))}
                      type='primary'
                      size='middle'
                    >
                      Details
                    </Button>
                  </Space>
                ),
                align: 'center',
              },
            ]}
            dataSource={dataReports?.data?.data}
            pagination={{
              // pagination
              total: dataReports?.data?.pagination?.total_items,
              current: dataReports?.data?.pagination?.current_page,
              hideOnSinglePage: false,
              onChange: (data) => setFilter((prevSate) => ({ ...prevSate, page: data })),
              // limit
              defaultPageSize: filter?.limit,
              pageSize: dataReports?.data?.pagination?.per_page,
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
            loading={loadingReports}
            rowKey='id'
            bordered
          />
        )}
      </Modal>

      {/* details view modal */}
      {detailsViewModal?.open && (
        <ReportDetailsViewModal
          detailsViewModal={detailsViewModal}
          setDetailsViewModal={setDetailsViewModal}
        />
      )}
    </>
  );
}

SurveyViewReportModal.propTypes = {
  surveyReportModal: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    surveyId: PropTypes.number.isRequired,
  }),
  setSurveyReportModal: PropTypes.func.isRequired,
};
