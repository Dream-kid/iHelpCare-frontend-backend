import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import HealthSection from './HealthSection';

export const metadata = {
  ...metaData,
  title: 'Health ― iHelp',
};

export default function Health() {
  return (
    <NewMainLayout>
      <HealthSection />
    </NewMainLayout>
  );
}
