import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import ArSection from './ArSection';

export const metadata = {
  ...metaData,
  title: 'Additional Resources ― iHelp',
};

export default function AdditionalResources({ params: { lang } }) {
  return (
    <NewMainLayout>
      <ArSection locale={lang} />
    </NewMainLayout>
  );
}

AdditionalResources.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
