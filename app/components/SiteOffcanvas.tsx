'use client';

import { usePathname } from 'next/navigation';
import { navForPath, type NavItem } from './nav';

const norm = (p: string) => '/' + p.replace(/^\/+|\/+$/g, '');

export default function SiteOffcanvas() {
  const pathname = usePathname() || '/';
  const items = navForPath(pathname);
  const home = items[0].href;
  const isActive = (item: NavItem) =>
    !item.external && norm(pathname) === norm(item.href);

  return (
    <>
      <div className="offcanvas-overlay" />
      <div className="offcanvas-menu border-menu center-alignment text-center">
        <div className="d-flex align-items-center p-3 pt-4">
          <span className="logo">
            <a href={home}>Viziocum s.r.o.</a>
          </span>
          <a href="#" className="close-offcanvas" aria-label="Close Off-canvas">
            <div className="burger-icon">
              <span />
              <span />
              <span />
            </div>
          </a>
        </div>
        <div className="offcanvas-inner">
          <div className="menu-wrapper">
            <div className="sp-module">
              <div className="sp-module-content">
                <ul className="menu nav-pills">
                  {items.map((item) => (
                    <li
                      key={item.href}
                      className={isActive(item) ? 'current active' : undefined}
                    >
                      <a
                        href={item.href}
                        {...(item.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
