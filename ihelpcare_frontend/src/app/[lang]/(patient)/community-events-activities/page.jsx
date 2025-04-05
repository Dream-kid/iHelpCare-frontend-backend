import PatientRoute from '@components/middleware/PatientRoute';
import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import EventsActivitiesSection from './EventsActivitiesSection';

export const metadata = {
  ...metaData,
  title: 'Events/Activities ― iHelp',
};

export default function EventsActivities({ params: { lang } }) {
  return (
    <PatientRoute>
      <NewMainLayout>
        <EventsActivitiesSection locale={lang} />
      </NewMainLayout>
    </PatientRoute>
  );
}

EventsActivities.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
