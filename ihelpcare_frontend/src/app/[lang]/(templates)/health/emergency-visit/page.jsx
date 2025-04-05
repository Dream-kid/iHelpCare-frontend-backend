import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import EmergencyVisitSection from './EmergencyVisitSection';

export const metadata = {
  ...metaData,
  title: 'Emergency Visit ― iHelp',
};

export default function EmergencyVisit({ params: { lang } }) {
  return (
    <NewMainLayout>
      <EmergencyVisitSection locale={lang} />
    </NewMainLayout>
  );
}

EmergencyVisit.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
