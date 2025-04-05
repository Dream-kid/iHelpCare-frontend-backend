import CaregiverRoute from '@components/middleware/CaregiverRoute';
import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import DashboardSection from './DashboardSection';

export const metadata = {
  ...metaData,
  title: 'Caregiver Dashboard ― iHelp',
};

export default function CaregiverDashboard({ params: { lang } }) {
  return (
    <CaregiverRoute>
      <NewMainLayout>
        <DashboardSection locale={lang} />
      </NewMainLayout>
    </CaregiverRoute>
  );
}

CaregiverDashboard.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
