import AdminLayout from '@components/admin-layout';
import AdminRoute from '@components/middleware/AdminRoute';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import DashboardSection from './DashboardSection';

export const metadata = {
  ...metaData,
  title: 'Admin Dashboard ― iHelp',
};

export default function AdminDashboard({ params: { lang } }) {
  return (
    <AdminRoute>
      <AdminLayout title='Dashboard'>
        <DashboardSection locale={lang} />
      </AdminLayout>
    </AdminRoute>
  );
}

AdminDashboard.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
