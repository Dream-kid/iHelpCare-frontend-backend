import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import AboutSection from './AboutSection';

export const metadata = {
  ...metaData,
  title: 'About ― iHelp',
};

export default function About() {
  return (
    <NewMainLayout>
      <AboutSection />
    </NewMainLayout>
  );
}
