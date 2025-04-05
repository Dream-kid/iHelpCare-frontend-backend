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
import CreatePatientModal from './CreatePatientModal';
import DetailsPatientModal from './DetailsPatientModal';
import EditPatientModal from './EditPatientModal';

export default function PatientsSection() {
  const subject = new Subject();
  const [modal, contextHolderModal] = Modal.useModal();
  const { contextHolder, openNotificationWithIcon } = useNotification();
  const [createPatientModalOpen, setCreatePatientModalOpen] = useState(false);
  const [detailsPatientModal, setDetailsPatientModal] = useState({
    open: false,
    id: null,
  });
  const [editPatientModal, setEditPatientModal] = useState({
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

  // fetch patients list API's data
  const [loading, error, dataPatients] = useFetchData(
    `/admin/patient/list?search=${filter?.search}&sort=${filter?.sort}&per_page=${filter?.limit}&current_page=${filter?.page}`,
    dataFetchAgain
  );

  // patient delete API's implementation
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
        successDelete?.message || 'Patient deleted successfully!'
      );
      setDataFetchAgain((prevState) => !prevState);
      setDeleteUserId(null);
    }
  }, [successDelete]);

  // function to handle delete caregiver
  const handleDeletePatient = (id) => {
    modal.confirm({
      title: 'Delete Patient?',
      content:
        'Are you sure you want to delete this Patient? It will be deleted permanently. This action cannot be undone.',
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
          onClick={() => setCreatePatientModalOpen(true)}
          type='primary'
          size='large'
        >
          Create Patient
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
                      onClick={() => setDetailsPatientModal({ open: true, id: data })}
                      type='primary'
                      size='middle'
                    >
                      Details
                    </Button>

                    <Button
                      onClick={() => setEditPatientModal({ open: true, id: data })}
                      type='primary'
                      size='middle'
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => handleDeletePatient(record?.info?.user_id)}
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
            dataSource={dataPatients?.data?.data}
            pagination={{
              // pagination
              total: dataPatients?.data?.pagination?.total_items,
              current: dataPatients?.data?.pagination?.current_page,
              hideOnSinglePage: false,
              onChange: (data) => setFilter((prevSate) => ({ ...prevSate, page: data })),
              // limit
              defaultPageSize: filter?.limit,
              pageSize: dataPatients?.data?.pagination?.per_page,
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

      {/* create patient modal component */}
      {createPatientModalOpen && (
        <CreatePatientModal
          createPatientModalOpen={createPatientModalOpen}
          setCreatePatientModalOpen={setCreatePatientModalOpen}
          openNotificationWithIcon={openNotificationWithIcon}
          setDataFetchAgain={setDataFetchAgain}
        />
      )}

      {/* details patient modal component */}
      {detailsPatientModal.open && (
        <DetailsPatientModal
          detailsPatientModal={detailsPatientModal}
          setDetailsPatientModal={setDetailsPatientModal}
        />
      )}

      {/* edit patient modal component */}
      {editPatientModal.open && (
        <EditPatientModal
          editPatientModal={editPatientModal}
          setEditPatientModal={setEditPatientModal}
          openNotificationWithIcon={openNotificationWithIcon}
          setDataFetchAgain={setDataFetchAgain}
        />
      )}

      {contextHolder}
      {contextHolderModal}
    </section>
  );
}
