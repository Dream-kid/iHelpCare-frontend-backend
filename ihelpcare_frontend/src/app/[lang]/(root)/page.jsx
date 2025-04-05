import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import HeroSection from './HeroSection';

export const metadata = {
  ...metaData,
  title: 'Home ― iHelp',
};

export default function Home() {
  return (
    <NewMainLayout>
      <HeroSection />
    </NewMainLayout>
  );
}
