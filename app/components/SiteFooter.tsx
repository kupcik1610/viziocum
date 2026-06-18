'use client';

import { usePathname } from 'next/navigation';
import { isEnglish } from './nav';
import Icon from './Icon';

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2631.091938864761!2d19.15676317707685!3d48.74194050889354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4715170e73e5076d%3A0x2624ce1a7cc30050!2sMedic%C3%ADnske%20centrum%20ZDRAVOMED%202!5e0!3m2!1sen!2ssk!4v1695687106959!5m2!1sen!2ssk';

export default function SiteFooter() {
  const pathname = usePathname() || '/';
  const en = isEnglish(pathname);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <h3>{en ? 'Provider' : 'Informácie'}</h3>
          <p>
            <strong>{en ? 'Healthcare provider:' : 'Poskytovateľ zdravotnej starostlivosti:'}</strong>
            <br />Viziocum, s.r.o.
            <br />Zelená 4453/2C
            <br />Banská Bystrica 974 04
            <br />IČO: 55 206 832
          </p>
          <p style={{ marginTop: '1rem' }}>
            <strong>{en ? 'Speciality:' : 'Ambulancia v obore:'}</strong> Oftalmológia
            <br />
            <strong>IDZZ / IČO:</strong> 55 206 832
          </p>
        </div>

        <div className="footer-col">
          <h3>{en ? 'Contact' : 'Kontakt'}</h3>
          <p>
            MUDr. Mária Praženicová<br />
            Zdravomed 2, ambulancia č. 3.1<br />
            Cesta k nemocnici 1<br />
            974 01 Banská Bystrica
          </p>
          <div className="footer-contact-row">
            <Icon name="phone" /><a href="tel:+421907406373">+421 907 406 373</a>
          </div>
          <div className="footer-contact-row">
            <Icon name="mail" /><a href="mailto:viziocum@viziocum.sk">viziocum@viziocum.sk</a>
          </div>
        </div>

        <div className="footer-col">
          <h3>{en ? 'Find us' : 'Nájdete nás'}</h3>
          <iframe src={MAP_SRC} width="100%" height={170} loading="lazy" title={en ? 'Find us' : 'Nájdete nás'} />
        </div>

        <div className="footer-col">
          <h3>{en ? 'Links' : 'Odkazy'}</h3>
          <ul>
            <li><a href="https://www.ocnytlak.sk/" target="_blank" rel="noopener noreferrer">www.ocnytlak.sk</a></li>
            <li><a href="https://eyetronic-therapie.de/en/" target="_blank" rel="noopener noreferrer">eyetronic-therapie.de</a></li>
          </ul>
          <h3 style={{ marginTop: '1.5rem' }}>Blog</h3>
          <ul className="news-list">
            <li><a href="/blog/ochorenia/glaukom/">Glaukóm <span>29. september 2023</span></a></li>
            <li><a href="/blog/ochorenia/retinitis-pigmentosa/">Retinitis pigmentosa <span>29. september 2023</span></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bar">© {new Date().getFullYear()} Viziocum s.r.o.</div>
    </footer>
  );
}
