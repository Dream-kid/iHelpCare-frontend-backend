import AdminLayout from '@components/admin-layout';
import AdminRoute from '@components/middleware/AdminRoute';
import { metaData } from '@utils/metaData';
import CaregiversSection from './CaregiversSection';

export const metadata = {
  ...metaData,
  title: 'Caregivers ― iHelp',
};

export default function Caregivers() {
  return (
    <AdminRoute>
      <AdminLayout title='Caregivers'>
        <CaregiversSection />
      </AdminLayout>
    </AdminRoute>
  );
}
