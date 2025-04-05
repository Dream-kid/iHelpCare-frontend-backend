import PrivateRoute from '@components/middleware/PrivateRoute';
import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import SurveySection from './SurveySection';

export const metadata = {
  ...metaData,
  title: 'Survey Participate ― iHelp',
};

export default function SurveyParticipant({ params }) {
  return (
    <PrivateRoute>
      <NewMainLayout>
        <SurveySection
          locale={params.lang}
          surveyId={parseInt(params.survey_id, 10)}
        />
      </NewMainLayout>
    </PrivateRoute>
  );
}

SurveyParticipant.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    survey_id: PropTypes.string.isRequired,
  }).isRequired,
};
