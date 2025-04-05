import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import HelplineSection from './HelplineSection';

export const metadata = {
  ...metaData,
  title: 'Helpline ― iHelp',
};

export default function HelplineInfo({ params: { lang } }) {
  return (
    <NewMainLayout>
      <HelplineSection locale={lang} />
    </NewMainLayout>
  );
}

HelplineInfo.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
