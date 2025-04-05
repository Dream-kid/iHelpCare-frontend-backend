import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import SurveyList from './SurveyList';

export const metadata = {
  ...metaData,
  title: 'Survey ― iHelp',
};

export default function Survey({ params: { lang } }) {
  return (
    <NewMainLayout>
      <SurveyList locale={lang} />
    </NewMainLayout>
  );
}

Survey.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
