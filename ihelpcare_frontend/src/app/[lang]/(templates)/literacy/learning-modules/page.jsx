import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import LearningSection from './LearningSection';

export const metadata = {
  ...metaData,
  title: 'Learning Modules ― iHelp',
};

export default function LearningModules() {
  return (
    <NewMainLayout>
      <LearningSection />
    </NewMainLayout>
  );
}
