import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import SupportSection from './SupportSection';

export const metadata = {
  ...metaData,
  title: 'Community Support ― iHelp',
};

export default function CommunitySupport({ params: { lang } }) {
  return (
    <NewMainLayout>
      <SupportSection locale={lang} />
    </NewMainLayout>
  );
}

CommunitySupport.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
