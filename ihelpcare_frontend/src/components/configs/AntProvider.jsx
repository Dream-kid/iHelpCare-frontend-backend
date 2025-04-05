'use client';

import { setTheme } from '@redux/slices/appSlice';
import { ConfigProvider, theme as andTheme } from 'antd';
import PropTypes from 'prop-types';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AntProvider({ children }) {
  const rootStyles = getComputedStyle(document.documentElement);
  const { theme } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (theme === 'dark') {
      dispatch(setTheme('dark'));
    } else {
      dispatch(setTheme('light'));
    }
  }, [theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? andTheme.darkAlgorithm : andTheme.defaultAlgorithm,
        token: {
          colorPrimary: rootStyles.getPropertyValue('--color-primary'),
          colorSuccess: rootStyles.getPropertyValue('--color-success'),
          colorError: rootStyles.getPropertyValue('--color-error'),
          colorWarning: rootStyles.getPropertyValue('--color-warning'),
          colorLink: rootStyles.getPropertyValue('--color-link'),
          colorLinkHover: rootStyles.getPropertyValue('--color-link-hover'),
          colorLinkActive: rootStyles.getPropertyValue('--color-bg-light'),
          fontFamily: rootStyles.getPropertyValue('--font-roboto'),
          borderRadius: rootStyles.getPropertyValue('--border-radius'),
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

AntProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AntProvider;
