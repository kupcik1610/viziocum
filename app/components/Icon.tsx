// Small inline-SVG icon set, replacing the Font Awesome dependency. Stroke
// icons on a 24×24 grid; size and colour inherit from the surrounding CSS.
import type { SVGProps } from 'react';

const paths: Record<string, React.ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5M9.5 21v-6h5v6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
    </>
  ),
  phone: <path d="M5 3h3.5l1.5 4-2 1.5a13 13 0 0 0 5 5l1.5-2 4 1.5V22a17 17 0 0 1-13.5-13.5z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  up: <path d="m6 14 6-6 6 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  device: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="3" />
      <path d="M10 5.5h4" />
      <circle cx="12" cy="17" r="1.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  droplet: <path d="M12 3s6 6.4 6 11a6 6 0 1 1-12 0c0-4.6 6-11 6-11z" />,
  glasses: (
    <>
      <circle cx="6" cy="15" r="3.2" />
      <circle cx="18" cy="15" r="3.2" />
      <path d="M9.2 14c1-1.3 4.6-1.3 5.6 0M2.8 12 5 7m16.2 5L19 7" />
    </>
  ),
  document: (
    <>
      <path d="M6 2.5h8l4 4V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z" />
      <path d="M13.5 2.5V7H18M8.5 12h7M8.5 16h7" />
    </>
  ),
  hand: <path d="M5 12V7.5a1.5 1.5 0 0 1 3 0V11m0-1V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5V6a1.5 1.5 0 0 1 3 0v5m0-2.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-4.6-2.1L5 16" />,
  pulse: <path d="M2 12h4l2.5-7 5 14L16 12h6" />,
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export default function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
