import PatientRoute from '@components/middleware/PatientRoute';
import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import LearningSection from './LearningSection';

export const metadata = {
  ...metaData,
  title: 'Learning ― iHelp',
};

export default function CommunityLearning({ params: { lang } }) {
  return (
    <PatientRoute>
      <NewMainLayout>
        <LearningSection locale={lang} />
      </NewMainLayout>
    </PatientRoute>
  );
}

CommunityLearning.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
