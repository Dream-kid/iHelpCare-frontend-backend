import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import LiteracySection from './LiteracySection';

export const metadata = {
  ...metaData,
  title: 'Literacy ― iHelp',
};

export default function Literacy() {
  return (
    <NewMainLayout>
      <LiteracySection />
    </NewMainLayout>
  );
}
