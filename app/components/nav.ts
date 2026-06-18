// Primary navigation, one variant per language. Used by both the desktop
// mega-menu and the off-canvas mobile menu.
export type NavItem = {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
};

const BOOKING =
  'https://www.objednatvysetrenie.sk/objednavka-vysetrenia.html?page_id=84263&zid=145733&druh_vysetrenia_id=85e6ed9d-9667-4f0b-adbc-f07ed53538b9';

export const NAV_SK: NavItem[] = [
  { label: 'Domov', href: '/', icon: 'fas fa-home' },
  { label: 'Cenník', href: '/cennik/' },
  { label: 'Kontakt', href: '/kontakt/' },
  { label: 'O nás', href: '/o-nas/' },
  { label: 'Rezervácie', href: BOOKING, external: true },
];

export const NAV_EN: NavItem[] = [
  { label: 'Home', href: '/en/', icon: 'fas fa-home' },
  { label: 'Price', href: '/en/pricelist/' },
  { label: 'Contact', href: '/en/contact-us/' },
  { label: 'About', href: '/en/about-us/' },
  { label: 'Booking', href: BOOKING, external: true },
];

// English routes live under /en; everything else is Slovak.
export function navForPath(pathname: string): NavItem[] {
  return pathname === '/en' || pathname.startsWith('/en/') ? NAV_EN : NAV_SK;
}
