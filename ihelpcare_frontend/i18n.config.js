/**
 * Object containing internationalization settings.
 * @typedef {Object} I18nSettings
 * @property {string[]} locales - An array of supported locales.
 * @property {Object.<string, string>} localesName - Object with locale codes as keys and corresponding names as values.
 * @property {string} defaultLocale - The default locale.
 * @property {boolean} localeDetection - Flag indicating whether locale detection is enabled.
 */
export const i18n = {
  locales: ['en', 'ph'],
  localesName: { en: 'English', ph: 'Filipino' },
  defaultLocale: 'en',
  localeDetection: false,
};

/**
 * Function to get the current locale from the URL pathname or default to the default locale.
 * @returns {string} The current locale.
 */
export const getLocale = () => window?.location?.pathname?.split('/')[1] || i18n?.defaultLocale;
