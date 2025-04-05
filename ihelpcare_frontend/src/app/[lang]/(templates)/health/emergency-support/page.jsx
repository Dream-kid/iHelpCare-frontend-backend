import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import EmergencySupportSection from './EmergencySupportSection';

export const metadata = {
  ...metaData,
  title: 'Emergency Support ― iHelp',
};

export default function EmergencySupport({ params: { lang } }) {
  return (
    <NewMainLayout>
      <EmergencySupportSection locale={lang} />
    </NewMainLayout>
  );
}

EmergencySupport.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
