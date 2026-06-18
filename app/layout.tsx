import type { Metadata } from 'next';
import SiteScripts from './SiteScripts';
import SiteHeader from './components/SiteHeader';
import SiteOffcanvas from './components/SiteOffcanvas';
import SiteFooter from './components/SiteFooter';

// Global stylesheets, in the original cascade order. Bootstrap and Font Awesome
// come from npm; the rest are template-specific files (Helix Ultimate / SP Page
// Builder) with no npm equivalent, kept verbatim under styles/. The Joomla/jQuery
// runtime they shipped with has been removed and replaced by SiteScripts.
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/css/animate.css';
import '../styles/css/sppagebuilder.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/css/system.css';
import '../styles/css/template.css';
import '../styles/css/preset5.css';

export const metadata: Metadata = {
  title: 'Glaukómová a neurooftalmologická ambulancia Banská Bystrica',
  description:
    'Oftalmologická glaukómová a neurooftalmologická ambulancia Banská Bystrica — MUDr. Mária Praženicová. Neštátne nezmluvné zdravotnícke zariadenie.',
  icons: { icon: '/images/viziocum_logo2.png' },
};

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
        <style>{`@media(min-width: 1400px) {.sppb-row-container { max-width: 1320px; }}`}</style>
      </head>
      <body className={BODY_CLASS}>
        <div className="body-wrapper">
          <div className="body-innerwrapper">
            <SiteHeader />
            <section id="sp-main-body">
              <div className="row">
                <main id="sp-component" className="col-lg-12">
                  <div className="sp-column">{children}</div>
                </main>
              </div>
            </section>
            <SiteFooter />
          </div>
        </div>
        <SiteOffcanvas />
        <a href="#" className="sp-scroll-up" aria-label="Scroll Up">
          <span className="fas fa-angle-up" aria-hidden="true" />
        </a>
        <SiteScripts />
      </body>
    </html>
  );
}
