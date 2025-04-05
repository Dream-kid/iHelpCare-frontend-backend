'use client';

import { getLocale } from '@root/i18n.config';
import { redirect } from 'next/navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const isLoginUser = useSelector((state) => state.auth.isLoginUser);
  const locale = getLocale();

  return isLoginUser ? children : redirect(`/${locale}/`);
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
