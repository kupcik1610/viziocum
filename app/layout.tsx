import type { Metadata } from 'next';
import ScriptsLoader from './ScriptsLoader';

export const metadata: Metadata = {
  title: 'Glaukómová a neurooftalmologická ambulancia Banská Bystrica',
  description:
    'Oftalmologická glaukómová a neurooftalmologická ambulancia Banská Bystrica — MUDr. Mária Praženicová. Neštátne nezmluvné zdravotnícke zariadenie.',
  icons: { icon: '/images/viziocum_logo2.png' },
};

// Global stylesheets from the original Joomla template, in original order.
const STYLES = [
  '/media/vendor/joomla-custom-elements/css/joomla-alert.mineeda.css',
  '/components/com_sppagebuilder/assets/css/font-awesome-6.min3ba3.css',
  '/components/com_sppagebuilder/assets/css/font-awesome-v4-shims3ba3.css',
  '/components/com_sppagebuilder/assets/css/animate.min3ba3.css',
  '/components/com_sppagebuilder/assets/css/sppagebuilder3ba3.css',
  '/components/com_sppagebuilder/assets/css/dynamic-content3ba3.css',
  '/components/com_sppagebuilder/assets/css/magnific-popup.css',
  '/templates/viziocum/css/bootstrap.min.css',
  '/plugins/system/helixultimate/assets/css/system-j4.min.css',
  '/templates/viziocum/css/template.css',
  '/templates/viziocum/css/presets/preset5.css',
];

const BODY_CLASS =
  'site helix-ultimate hu com_sppagebuilder com-sppagebuilder view-page layout-default task-none sk-sk ltr sticky-header layout-fluid offcanvas-init offcanvs-position-right';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk-sk" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {STYLES.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <style>{`@media(min-width: 1400px) {.sppb-row-container { max-width: 1320px; }}`}</style>
      </head>
      <body className={BODY_CLASS}>
        {children}
        <ScriptsLoader />
      </body>
    </html>
  );
}
