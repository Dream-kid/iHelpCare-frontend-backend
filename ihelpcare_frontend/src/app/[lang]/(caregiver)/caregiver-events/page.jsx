import CaregiverRoute from '@components/middleware/CaregiverRoute';
import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import EventSection from './EventSection';

export const metadata = {
  ...metaData,
  title: 'Caregiver Events ― iHelp',
};

export default function CaregiverEvents() {
  return (
    <CaregiverRoute>
      <NewMainLayout>
        <EventSection />
      </NewMainLayout>
    </CaregiverRoute>
  );
}
