import AdminLayout from '@components/admin-layout';
import AdminRoute from '@components/middleware/AdminRoute';
import { metaData } from '@utils/metaData';
import SurveySection from './SurveySection';

export const metadata = {
  ...metaData,
  title: 'Admin Survey ― iHelp',
};

export default function AdminSurvey() {
  return (
    <AdminRoute>
      <AdminLayout title='Surveys'>
        <SurveySection />
      </AdminLayout>
    </AdminRoute>
  );
}
