import PrivateRoute from '@components/middleware/PrivateRoute';
import NewMainLayout from '@components/new-main-layout';
import { metaData } from '@utils/metaData';
import PropTypes from 'prop-types';
import ProfileSection from './ProfileSection';

export const metadata = {
  ...metaData,
  title: 'My Profile ― iHelp',
};

export default function MyProfile({ params: { lang } }) {
  return (
    <PrivateRoute>
      <NewMainLayout>
        <ProfileSection locale={lang} />
      </NewMainLayout>
    </PrivateRoute>
  );
}

MyProfile.propTypes = {
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
