'use client';

import { usePathname } from 'next/navigation';
import { navForPath, type NavItem } from './nav';

const norm = (p: string) => '/' + p.replace(/^\/+|\/+$/g, '');

function MenuLink({ item, active }: { item: NavItem; active: boolean }) {
  const external = item.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
  return (
    <li className={`sp-menu-item${active ? ' current-item active' : ''}`}>
      <a href={item.href} {...(active ? { 'aria-current': 'page' } : {})} {...external}>
        {item.icon && <span className={item.icon} />} {item.label}
      </a>
    </li>
  );
}

const Burger = () => (
  <div className="burger-icon" aria-hidden="true">
    <span />
    <span />
    <span />
  </div>
);

export default function SiteHeader() {
  const pathname = usePathname() || '/';
  const items = navForPath(pathname);
  const home = items[0].href;
  const isActive = (item: NavItem) =>
    !item.external && norm(pathname) === norm(item.href);

  return (
    <>
      <div className="sticky-header-placeholder" />
      <header id="sp-header">
        <div className="container">
          <div className="container-inner">
            <div className="row">
              <div id="sp-logo" className="col-auto">
                <div className="sp-column">
                  <span className="logo">
                    <a href={home}>Viziocum s.r.o.</a>
                  </span>
                </div>
              </div>

              <div id="sp-menu" className="col-auto flex-auto">
                <div className="sp-column d-flex justify-content-end align-items-center">
                  <nav className="sp-megamenu-wrapper d-flex" role="navigation">
                    <ul className="sp-megamenu-parent menu-animation-none d-none d-lg-block">
                      {items.map((item) => (
                        <MenuLink key={item.href} item={item} active={isActive(item)} />
                      ))}
                    </ul>
                  </nav>

                  {/* Single burger: shown only below the lg breakpoint where
                      the mega-menu is hidden. */}
                  <a
                    id="offcanvas-toggler"
                    aria-label="Menu"
                    title="Menu"
                    className="d-lg-none align-items-center"
                    href="#"
                  >
                    <Burger />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
