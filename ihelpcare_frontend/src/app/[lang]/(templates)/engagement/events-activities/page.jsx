import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import EventsSection from './EventsSection';

export const metadata = {
  ...metaData,
  title: 'Events/Activities ― iHelp',
};

export default function EventsOrActivities({ params: { lang } }) {
  return (
    <NewMainLayout>
      <EventsSection locale={lang} />
    </NewMainLayout>
  );
}

EventsOrActivities.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
