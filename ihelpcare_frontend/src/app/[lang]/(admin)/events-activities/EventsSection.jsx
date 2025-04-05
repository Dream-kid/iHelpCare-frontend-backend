'use client';

import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import SharedError from '@components/shared/SharedError';
import useFetchData from '@hooks/useFetchData';
import useNotification from '@hooks/useNotification';
import { surveyStatusAsBadge } from '@utils/statusAsBadge';
import { Button, Input, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const CreateEventFormModal = dynamic(() => import('./CreateEventFormModal'), {
  ssr: false,
});
const EventDetailsViewModal = dynamic(() => import('./EventDetailsViewModal'), {
  ssr: false,
});
const EventUpdateStatusModal = dynamic(() => import('./EventUpdateStatusModal'), {
  ssr: false,
});
const EventEditFormModal = dynamic(() => import('./EventEditFormModal'), {
  ssr: false,
});

export default function EventsSection() {
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [eventsFetchAgain, setEventsFetchAgain] = useState(false);
  const [filter, setFilter] = useState({
    search: '',
    page: 1,
    limit: 10,
    sort: 'created_at,desc',
  });
  const [eventDetailsModal, setEventDetailsModal] = useState({
    open: false,
    eventId: null,
  });
  const [statusUpdate, setStatusUpdate] = useState({
    open: false,
    eventId: null,
    status: null,
  });
  const [eventEditModal, setEventEditModal] = useState({
    open: false,
    eventId: null,
  });
  const [value, setValue] = useState('');
  const subject = new Subject();

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

  // fetch events API's data
  const [loadingEvents, errorEvents, dataEvents] = useFetchData(
    `/events?search=${filter?.search}&sort=${filter?.sort}&per_page=${filter?.limit}&current_page=${filter?.page}`,
    eventsFetchAgain
  );

  return (
    <>
      <section>
        <div className='flex flex-col items-end justify-between space-y-5 md:flex-row md:items-center md:space-x-5 md:space-y-0'>
          <Button
            onClick={() => setCreateEventModalOpen(true)}
            type='primary'
            size='large'
          >
            Create New Event
          </Button>

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
          {errorEvents ? (
            <SharedError error={errorEvents} />
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
                  dataIndex: 'event_date_to',
                  render: (_, record) => (
                    <span className='whitespace-nowrap'>
                      {record?.event_date_from
                        ? dayjs(record?.event_date_from).format('YYYY-MM-DD')
                        : 'N/A'}
                      {' to '}
                      {record?.event_date_to
                        ? dayjs(record?.event_date_to).format('YYYY-MM-DD')
                        : 'N/A'}
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
                  render: (data, record) => (
                    <Space size='middle'>
                      <Button
                        onClick={() => setEventDetailsModal({ open: true, eventId: data })}
                        type='primary'
                        size='middle'
                      >
                        Details
                      </Button>
                      <Button
                        onClick={() => setEventEditModal({ open: true, eventId: data })}
                        type='primary'
                        size='middle'
                      >
                        Edit
                      </Button>
                      <Button
                        // prettier-ignore
                        onClick={() => setStatusUpdate({
                          open: true,
                          eventId: data,
                          status: record?.status,
                        })}
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
              dataSource={dataEvents?.data?.data}
              pagination={{
                // pagination
                total: dataEvents?.data?.pagination?.total_items,
                current: dataEvents?.data?.pagination?.current_page,
                hideOnSinglePage: false,
                onChange: (data) => setFilter((prevSate) => ({ ...prevSate, page: data })),
                // limit
                defaultPageSize: filter?.limit,
                pageSize: dataEvents?.data?.pagination?.per_page,
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
              loading={loadingEvents}
              rowKey='id'
              bordered
            />
          )}
        </div>
      </section>

      {/* notification context */}
      {contextHolder}

      {/* create new event modal component */}
      {createEventModalOpen && (
        <CreateEventFormModal
          createEventModalOpen={createEventModalOpen}
          setCreateEventModalOpen={setCreateEventModalOpen}
          openNotificationWithIcon={openNotificationWithIcon}
          setEventsFetchAgain={setEventsFetchAgain}
        />
      )}

      {/* event details modal component */}
      {eventDetailsModal?.open && (
        <EventDetailsViewModal
          eventDetailsModal={eventDetailsModal}
          setEventDetailsModal={setEventDetailsModal}
          openNotificationWithIcon={openNotificationWithIcon}
          setEventsFetchAgain={setEventsFetchAgain}
        />
      )}

      {/* event status update modal component */}
      {statusUpdate?.open && (
        <EventUpdateStatusModal
          statusUpdate={statusUpdate}
          setStatusUpdate={setStatusUpdate}
          openNotificationWithIcon={openNotificationWithIcon}
          setEventsFetchAgain={setEventsFetchAgain}
        />
      )}

      {/* event edit modal component */}
      {eventEditModal?.open && (
        <EventEditFormModal
          eventEditModal={eventEditModal}
          setEventEditModal={setEventEditModal}
          openNotificationWithIcon={openNotificationWithIcon}
          setEventsFetchAgain={setEventsFetchAgain}
        />
      )}
    </>
  );
}
