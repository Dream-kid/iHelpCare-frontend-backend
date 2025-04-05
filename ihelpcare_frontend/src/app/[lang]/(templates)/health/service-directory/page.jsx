import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import ServiceDirectorySection from './ServiceDirectorySection';

export const metadata = {
  ...metaData,
  title: 'Service Directory ― iHelp',
};

export default function ServiceDirectory({ params: { lang } }) {
  return (
    <NewMainLayout>
      <ServiceDirectorySection locale={lang} />
    </NewMainLayout>
  );
}

ServiceDirectory.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
