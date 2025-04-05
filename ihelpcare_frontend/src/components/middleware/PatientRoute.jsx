'use client';

import { getLocale } from '@root/i18n.config';
import { redirect } from 'next/navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function PatientRoute({ children }) {
  const userData = useSelector((state) => state.auth.userData);
  const locale = getLocale();

  return userData?.role_id === 4 ? children : redirect(`/${locale}/`);
}

PatientRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PatientRoute;
