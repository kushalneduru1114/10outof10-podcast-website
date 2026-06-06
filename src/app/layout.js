import { Analytics } from '@vercel/analytics/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IntroAnimation from '../components/IntroAnimation';
import SiteBackdrop from '../components/SiteBackdrop';
import './globals.css';

export const metadata = {
  title: 'Ten Out Of Ten',
  description: 'Ten Out Of Ten is a cinema podcast and independent film platform for conversations, short films, and independent cinema.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var theme = window.localStorage.getItem('tot-theme') || 'dark';
                  document.documentElement.dataset.theme = theme;
                } catch (error) {
                  document.documentElement.dataset.theme = 'dark';
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <SiteBackdrop />
        <IntroAnimation />
        <div className="full-page-container">
          <Header />
          <main style={{ flexGrow: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
