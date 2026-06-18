// Primary navigation, one variant per language. Used by the header and the
// mobile drawer.
import type { IconName } from './Icon';

export type NavItem = {
  label: string;
  href: string;
  icon?: IconName;
  external?: boolean;
  cta?: boolean;
};

const BOOKING =
  'https://www.objednatvysetrenie.sk/objednavka-vysetrenia.html?page_id=84263&zid=145733&druh_vysetrenia_id=85e6ed9d-9667-4f0b-adbc-f07ed53538b9';

export const NAV_SK: NavItem[] = [
  { label: 'Domov', href: '/', icon: 'home' },
  { label: 'Cenník', href: '/cennik/' },
  { label: 'O nás', href: '/o-nas/' },
  { label: 'Kontakt', href: '/kontakt/' },
  { label: 'Rezervácia', href: BOOKING, external: true, cta: true },
];

export const NAV_EN: NavItem[] = [
  { label: 'Home', href: '/en/', icon: 'home' },
  { label: 'Price', href: '/en/pricelist/' },
  { label: 'About', href: '/en/about-us/' },
  { label: 'Contact', href: '/en/contact-us/' },
  { label: 'Booking', href: BOOKING, external: true, cta: true },
];

export const BOOKING_URL = BOOKING;

// English routes live under /en; everything else is Slovak.
export function navForPath(pathname: string): NavItem[] {
  return pathname === '/en' || pathname.startsWith('/en/') ? NAV_EN : NAV_SK;
}

export function isEnglish(pathname: string): boolean {
  return pathname === '/en' || pathname.startsWith('/en/');
}
