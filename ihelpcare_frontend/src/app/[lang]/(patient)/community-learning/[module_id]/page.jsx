import PatientRoute from '@components/middleware/PatientRoute';
import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import LearningDetailsSection from './LearningDetailsSection';

export const metadata = {
  ...metaData,
  title: 'Learning Details ― iHelp',
};

export default function CommunityLearningDetails({ params: { lang } }) {
  return (
    <PatientRoute>
      <NewMainLayout>
        <LearningDetailsSection locale={lang} />
      </NewMainLayout>
    </PatientRoute>
  );
}

CommunityLearningDetails.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
