import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import EngagementSection from './EngagementSection';

export const metadata = {
  ...metaData,
  title: 'Engagement ― iHelp',
};

export default function Engagement() {
  return (
    <NewMainLayout>
      <EngagementSection />
    </NewMainLayout>
  );
}
