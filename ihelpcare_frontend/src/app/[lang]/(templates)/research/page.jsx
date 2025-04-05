import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import ResearchSection from './ResearchSection';

export const metadata = {
  ...metaData,
  title: 'Research ― iHelp',
};

export default function Research() {
  return (
    <NewMainLayout>
      <ResearchSection />
    </NewMainLayout>
  );
}
