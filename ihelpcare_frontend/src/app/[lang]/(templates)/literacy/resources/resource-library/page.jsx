import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import LibrarySection from './LibrarySection';

export const metadata = {
  ...metaData,
  title: 'Resource Library ― iHelp',
};

export default function ResourceLibrary({ params: { lang } }) {
  return (
    <NewMainLayout>
      <LibrarySection locale={lang} />
    </NewMainLayout>
  );
}

ResourceLibrary.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
