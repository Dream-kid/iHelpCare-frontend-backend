'use client';

import { getLocale } from '@root/i18n.config';
import { redirect } from 'next/navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function PublicRoute({ children }) {
  const isLoginUser = useSelector((state) => state.auth.isLoginUser);
  const locale = getLocale();

  return isLoginUser ? redirect(`/${locale}/`) : children;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
