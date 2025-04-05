import SharedError from '@components/shared/SharedError';
import SharedLoader from '@components/shared/SharedLoader';
import useFetchData from '@hooks/useFetchData';
import { Descriptions, Divider, Modal } from 'antd';
import PropTypes from 'prop-types';

export default function DetailsPatientModal({ detailsPatientModal, setDetailsPatientModal }) {
  // fetch details API's data
  const [loadingDetails, errorDetails, dataDetails] = useFetchData(
    `/admin/patient/details?id=${detailsPatientModal?.id}`
  );

  // function to handel close modal
  const handleCloseModal = () => {
    setDetailsPatientModal((prevState) => ({ ...prevState, open: false, id: null }));
  };

  return (
    <Modal
      className='relative my-5 lg:my-10'
      open={detailsPatientModal?.open}
      // prettier-ignore
      title={(
        <div>
          <h2 className='text-[20px] font-font-semi-bold lg:text-[24px]'>
            Patient Details:
          </h2>
          <Divider className='!mt-0 !pt-0' />
        </div>
      )}
      onCancel={handleCloseModal}
      onOk={handleCloseModal}
      width={768}
      footer={[]}
      centered
    >
      {loadingDetails ? (
        <SharedLoader />
      ) : errorDetails ? (
        <SharedError error={errorDetails} />
      ) : (
        <Descriptions
          layout='horizontal'
          labelStyle={{ fontWeight: 'bold' }}
          bordered
          items={[
            {
              key: '1',
              span: 4,
              label: <span className='whitespace-nowrap'>First Name</span>,
              children: dataDetails?.data?.first_name || 'N/A',
            },
            {
              key: '2',
              span: 4,
              label: <span className='whitespace-nowrap'>Last Name</span>,
              children: dataDetails?.data?.last_name || 'N/A',
            },
            {
              key: '3',
              span: 4,
              label: <span className='whitespace-nowrap'>Email</span>,
              children: dataDetails?.data?.email || 'N/A',
            },
            {
              key: '4',
              span: 4,
              label: <span className='whitespace-nowrap'>Phone</span>,
              children: dataDetails?.data?.email || 'N/A',
            },
            {
              key: '5',
              span: 4,
              label: <span className='whitespace-nowrap'>Gender</span>,
              children: dataDetails?.data?.info?.gender || 'N/A',
            },
            {
              key: '6',
              span: 4,
              label: <span className='whitespace-nowrap'>Date Of Birth</span>,
              children: dataDetails?.data?.info?.date_of_birth || 'N/A',
            },
            {
              key: '7',
              span: 4,
              label: <span className='whitespace-nowrap'>Blood Group</span>,
              children: dataDetails?.data?.info?.blood_group || 'N/A',
            },
            {
              key: '8',
              span: 4,
              label: <span className='whitespace-nowrap'>Blood Group</span>,
              children: dataDetails?.data?.info?.street || 'N/A',
            },
          ]}
        />
      )}
    </Modal>
  );
}

DetailsPatientModal.propTypes = {
  detailsPatientModal: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  setDetailsPatientModal: PropTypes.func.isRequired,
};
