import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { load } from 'recaptcha-v3';

/**
 * A custom React hook for using Google reCAPTCHA v3.
 *
 * @param {string} refreshToken - An optional boolean value triggers refresh a reCAPTCHA token.
 * @returns {Object} An object containing the reCAPTCHA token and its validity status.
 */
function useGoogleCaptcha(refreshToken) {
  const [captchaToken, setCaptchaToken] = useState('');
  const [validToken, setValidToken] = useState(false);

  // Generate Google reCAPTCHA v3 token
  useEffect(() => {
    load(process.env.CAPTCHA_SITE_KEY, {
      autoHideBadge: true, // Hide/Show captcha v3 badge
    }).then((recaptcha) => {
      recaptcha.execute().then((token) => {
        setCaptchaToken(token); // Will print the token
      });
    });
  }, [refreshToken]);

  // Verify Google reCAPTCHA v3 token
  useEffect(() => {
    if (captchaToken) {
      axios
        .post('/api/google-captcha', { token: captchaToken })
        .then((res) => {
          if (res?.data?.title === 'SUCCESS') {
            setValidToken(true);
          } else {
            setValidToken(false);
          }
        })
        .catch((err) => {
          if (err) {
            setValidToken(false);
          }
        });
    }
  }, [captchaToken]);

  return { captchaToken, validToken };
}

useGoogleCaptcha.propTypes = {
  refreshToken: PropTypes.bool,
};

export default useGoogleCaptcha;
