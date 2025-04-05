import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import ArticlesSection from './ArticlesSection';

export const metadata = {
  ...metaData,
  title: 'Articles Publications ― iHelp',
};

export default function ArticlesPublications({ params: { lang } }) {
  return (
    <NewMainLayout>
      <ArticlesSection locale={lang} />
    </NewMainLayout>
  );
}

ArticlesPublications.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
