import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import DiscussionForumSection from './DiscussionForumSection';

export const metadata = {
  ...metaData,
  title: 'Discussion Forum ― iHelp',
};

export default function DiscussionForum({ params: { lang } }) {
  return (
    <NewMainLayout>
      <DiscussionForumSection locale={lang} />
    </NewMainLayout>
  );
}

DiscussionForum.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
