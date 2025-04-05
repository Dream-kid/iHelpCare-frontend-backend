import PatientRoute from '@components/middleware/PatientRoute';
import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import EventsActivitiesDetailsSection from './EventsActivitiesDetailsSection';

export const metadata = {
  ...metaData,
  title: 'Events/Activities Details ― iHelp',
};

export default function CommunityLearningDetails({ params }) {
  return (
    <PatientRoute>
      <NewMainLayout>
        <EventsActivitiesDetailsSection
          locale={params.lang}
          eventId={parseInt(params.event_id, 10)}
        />
      </NewMainLayout>
    </PatientRoute>
  );
}

CommunityLearningDetails.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
    event_id: PropTypes.string.isRequired,
  }).isRequired,
};
