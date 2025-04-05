import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import ResourcesSection from './ResourcesSection';

export const metadata = {
  ...metaData,
  title: 'Resources ― iHelp',
};

export default function Resources() {
  return (
    <NewMainLayout>
      <ResourcesSection />
    </NewMainLayout>
  );
}
