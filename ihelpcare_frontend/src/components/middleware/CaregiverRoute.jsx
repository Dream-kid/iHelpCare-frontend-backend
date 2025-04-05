'use client';

import { getLocale } from '@root/i18n.config';
import { redirect } from 'next/navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function CaregiverRoute({ children }) {
  const userData = useSelector((state) => state.auth.userData);
  const locale = getLocale();

  return userData?.role_id === 3 ? children : redirect(`/${locale}/`);
}

CaregiverRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CaregiverRoute;
