import PatientRoute from '@components/middleware/PatientRoute';
import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import DashboardSection from './DashboardSection';

export const metadata = {
  ...metaData,
  title: 'Dashboard ― iHelp',
};

export default function Dashboard({ params: { lang } }) {
  return (
    <PatientRoute>
      <NewMainLayout>
        <DashboardSection locale={lang} />
      </NewMainLayout>
    </PatientRoute>
  );
}

Dashboard.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
