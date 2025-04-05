import AdminLayout from '@components/admin-layout';
import AdminRoute from '@components/middleware/AdminRoute';
import { metaData } from '@utils/metaData';

export const metadata = {
  ...metaData,
  title: 'Admin Settings ― iHelp',
};

export default function Settings() {
  return (
    <AdminRoute>
      <AdminLayout title='Settings'>
        <h1 className='under-dev-heading'>Under Development!</h1>
      </AdminLayout>
    </AdminRoute>
  );
}
