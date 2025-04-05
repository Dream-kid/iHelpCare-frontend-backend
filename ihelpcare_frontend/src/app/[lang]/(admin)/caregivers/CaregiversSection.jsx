'use client';

import {
  ExclamationCircleFilled,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import SharedError from '@components/shared/SharedError';
import useDeleteData from '@hooks/useDeleteData';
import useFetchData from '@hooks/useFetchData';
import useNotification from '@hooks/useNotification';
import { Button, Input, Modal, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import CreateCaregiverModal from './CreateCaregiverModal';
import DetailsCaregiverModal from './DetailsCaregiverModal';
import EditCaregiverModal from './EditCaregiverModal';

export default function CaregiversSection() {
  const subject = new Subject();
  const [modal, contextHolderModal] = Modal.useModal();
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const [createCaregiverModalOpen, setCreateCaregiverModalOpen] = useState(false);
  const [detailsCaregiverModal, setDetailsCaregiverModal] = useState({
    open: false,
    id: null,
  });
  const [editCaregiverModal, setEditCaregiverModal] = useState({
    open: false,
    id: null,
  });
  const [dataFetchAgain, setDataFetchAgain] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [value, setValue] = useState('');
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

  // fetch caregivers list API's data
  const [loading, error, dataCaregivers] = useFetchData(
    `/admin/care-giver/list?search=${filter?.search}&sort=${filter?.sort}&per_page=${filter?.limit}&current_page=${filter?.page}`,
    dataFetchAgain
  );

  // caregiver delete API's implementation
  const [deleteData, loadingDelete, errorDelete, successDelete] = useDeleteData();

  useEffect(() => {
    if (errorDelete) {
      openNotificationWithIcon('error', 'ERROR', errorDelete);
      setDeleteUserId(null);
    }
  }, [errorDelete]);

  useEffect(() => {
    if (successDelete) {
      openNotificationWithIcon(
        'success',
        'SUCCESS',
        successDelete?.message || 'Caregiver deleted successfully!'
      );
      setDataFetchAgain((prevState) => !prevState);
      setDeleteUserId(null);
    }
  }, [successDelete]);

  // function to handle delete caregiver
  const handleDeleteCaregiver = (id) => {
    modal.confirm({
      title: 'Delete Caregiver?',
      content:
        'Are you sure you want to delete this Caregiver? It will be deleted permanently. This action cannot be undone.',
      icon: <ExclamationCircleFilled />,
      centered: true,
      onOk() {
        setDeleteUserId(id);
        deleteData('/admin/user/delete', { user_id: id });
      },
    });
  };

  return (
    <section>
      <div className='flex flex-col items-end justify-between space-y-5 md:flex-row md:items-center md:space-x-5 md:space-y-0'>
        <Button
          onClick={() => setCreateCaregiverModalOpen(true)}
          type='primary'
          size='large'
        >
          Create Caregiver
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
        {error ? (
          <SharedError error={error} />
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
                title: <div className='whitespace-nowrap'>Name</div>,
                dataIndex: 'name',
                render: (data) => data || 'N/A',
              },
              {
                key: 3,
                title: <div className='whitespace-nowrap'>Email</div>,
                dataIndex: 'email',
                render: (data) => data || 'N/A',
              },
              {
                key: 4,
                title: 'Status',
                dataIndex: 'status',
                render: (data) => (
                  <Tag color={data === 1 ? 'success' : 'error'}>
                    {data === 1 ? 'Active' : 'Inactive'}
                  </Tag>
                ),
                align: 'center',
              },
              {
                key: 5,
                title: 'Actions',
                dataIndex: 'id',
                render: (data, record) => (
                  <Space size='middle'>
                    <Button
                      onClick={() => setDetailsCaregiverModal({ open: true, id: data })}
                      type='primary'
                      size='middle'
                    >
                      Details
                    </Button>

                    <Button
                      onClick={() => setEditCaregiverModal({ open: true, id: data })}
                      type='primary'
                      size='middle'
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => handleDeleteCaregiver(record?.info?.user_id)}
                      type='primary'
                      size='middle'
                      danger
                      disabled={record?.info?.user_id === deleteUserId && loadingDelete}
                      loading={record?.info?.user_id === deleteUserId && loadingDelete}
                    >
                      Delete
                    </Button>
                  </Space>
                ),
                align: 'center',
              },
            ]}
            dataSource={dataCaregivers?.data?.data}
            pagination={{
              // pagination
              total: dataCaregivers?.data?.pagination?.total_items,
              current: dataCaregivers?.data?.pagination?.current_page,
              hideOnSinglePage: false,
              onChange: (data) => setFilter((prevSate) => ({ ...prevSate, page: data })),
              // limit
              defaultPageSize: filter?.limit,
              pageSize: dataCaregivers?.data?.pagination?.per_page,
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
            loading={loading}
            rowKey='id'
            bordered
          />
        )}
      </div>

      {/* create caregiver modal component */}
      {createCaregiverModalOpen && (
        <CreateCaregiverModal
          createCaregiverModalOpen={createCaregiverModalOpen}
          setCreateCaregiverModalOpen={setCreateCaregiverModalOpen}
          openNotificationWithIcon={openNotificationWithIcon}
          setDataFetchAgain={setDataFetchAgain}
        />
      )}

      {/* details caregiver modal component */}
      {detailsCaregiverModal.open && (
        <DetailsCaregiverModal
          detailsCaregiverModal={detailsCaregiverModal}
          setDetailsCaregiverModal={setDetailsCaregiverModal}
        />
      )}

      {/* edit caregiver modal component */}
      {editCaregiverModal.open && (
        <EditCaregiverModal
          editCaregiverModal={editCaregiverModal}
          setEditCaregiverModal={setEditCaregiverModal}
          openNotificationWithIcon={openNotificationWithIcon}
          setDataFetchAgain={setDataFetchAgain}
        />
      )}

      {contextHolder}
      {contextHolderModal}
    </section>
  );
}
