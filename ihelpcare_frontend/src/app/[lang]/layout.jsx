import AntProvider from '@components/configs/AntProvider';
import AuthProvider from '@components/configs/AuthProvider';
import LayoutProvider from '@components/configs/LayoutProvider';
import ReduxProvider from '@components/configs/ReduxProvider';
import { metaData } from '@utils/metaData';
import { Montserrat, Roboto } from 'next/font/google';
import Script from 'next/script';
import PropTypes from 'prop-types';

// ant design css
import 'antd/dist/reset.css';

// styles css
import '@app/globals.css';

// next.js google fonts
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  adjustFontFallback: false,
});
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata = {
  ...metaData,
};

export default async function RootLayout({ children, params }) {
  return (
    <html
      className={`${montserrat.variable} ${roboto.variable}`}
      suppressHydrationWarning
      lang={params.lang}
    >
      <head>
        {/* Scroll Reveal CDN */}
        <Script
          src='https://unpkg.com/scrollreveal'
          strategy='beforeInteractive'
          async
        />
      </head>
      <body
        className={montserrat.className}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <AntProvider>
            <AuthProvider>
              <LayoutProvider>{children}</LayoutProvider>
            </AuthProvider>
          </AntProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
  params: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};
