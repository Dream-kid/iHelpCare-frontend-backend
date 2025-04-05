'use client';

import { getLocale } from '@root/i18n.config';
import { redirect } from 'next/navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function AdminRoute({ children }) {
  const userData = useSelector((state) => state.auth.userData);
  const locale = getLocale();

  return userData?.role_id === 2 ? children : redirect(`/${locale}/`);
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
