'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { navForPath, type NavItem } from './nav';
import Icon from './Icon';

const norm = (p: string) => '/' + p.replace(/^\/+|\/+$/g, '');

export default function SiteHeader() {
  const pathname = usePathname() || '/';
  const items = navForPath(pathname);
  const home = items[0].href;
  const [open, setOpen] = useState(false);

  const isActive = (item: NavItem) =>
    !item.external && norm(pathname) === norm(item.href);

  // Lock scroll while the drawer is open and close it on route change.
  useEffect(() => {
    document.body.classList.toggle('drawer-open', open);
    return () => document.body.classList.remove('drawer-open');
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);

  const linkProps = (item: NavItem) => ({
    href: item.href,
    className: item.cta ? 'nav__cta' : undefined,
    ...(isActive(item) ? { 'aria-current': 'page' as const } : {}),
    ...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
  });

  return (
    <>
      <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href={home}>
          Viziocum s.r.o.
        </a>

        <nav className="nav" aria-label="Hlavné menu">
          {items.map((item) => (
            <a key={item.href} {...linkProps(item)}>
              {item.icon && <Icon name={item.icon} />}
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span /><span /><span />
        </button>
      </div>
      </header>

      <div className="drawer-backdrop" onClick={() => setOpen(false)} />
      <aside className="drawer" aria-hidden={!open}>
        <div className="drawer__head">
          <a className="brand" href={home}>Viziocum s.r.o.</a>
          <button className="drawer__close" aria-label="Zavrieť" onClick={() => setOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Mobilné menu">
          {items.map((item) => (
            <a key={item.href} {...linkProps(item)}>{item.label}</a>
          ))}
        </nav>
      </aside>
    </>
  );
}
