import AdminLayout from '@components/admin-layout';
import AdminRoute from '@components/middleware/AdminRoute';
import { metaData } from '@utils/metaData';
import PatientsSection from './PatientsSection';

export const metadata = {
  ...metaData,
  title: 'Patients ― iHelp',
};

export default function Patients() {
  return (
    <AdminRoute>
      <AdminLayout title='Patients'>
        <PatientsSection />
      </AdminLayout>
    </AdminRoute>
  );
}
