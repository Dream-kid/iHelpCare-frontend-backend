'use client';

import { deleteAuthStorage } from '@redux/slices/authSlice';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AuthProvider({ children }) {
  const { rememberMe } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // if not user remember me to logout user
  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();
      if (!rememberMe) dispatch(deleteAuthStorage());
    };
    window.addEventListener('unload', handleTabClose);
    return () => {
      window.removeEventListener('unload', handleTabClose);
    };
  }, [rememberMe]);

  return children;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
