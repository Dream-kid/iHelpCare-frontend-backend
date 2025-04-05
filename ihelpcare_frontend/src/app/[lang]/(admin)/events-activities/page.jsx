import AdminLayout from '@components/admin-layout';
import AdminRoute from '@components/middleware/AdminRoute';
import { metaData } from '@utils/metaData';
import EventsSection from './EventsSection';

export const metadata = {
  ...metaData,
  title: 'Admin Events ― iHelp',
};

export default function EventsActivities() {
  return (
    <AdminRoute>
      <AdminLayout title='Events & Activities'>
        <EventsSection />
      </AdminLayout>
    </AdminRoute>
  );
}
