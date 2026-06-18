import PageHero from './PageHero';
import Icon from './Icon';
import { BOOKING_URL } from './nav';

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2631.091938864761!2d19.15676317707685!3d48.74194050889354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4715170e73e5076d%3A0x2624ce1a7cc30050!2sMedic%C3%ADnske%20centrum%20ZDRAVOMED%202!5e0!3m2!1sen!2ssk!4v1695687106959!5m2!1sen!2ssk';

export default function Contact({ lang = 'sk' }: { lang?: 'sk' | 'en' }) {
  const en = lang === 'en';
  return (
    <>
      <PageHero
        title={en ? 'Contact' : 'Kontakt'}
        crumb={{ label: en ? 'Home' : 'Domov', href: en ? '/en/' : '/' }}
      />
      <section className="section">
        <div className="container two-col">
          <div>
            <h2>{en ? 'Contact details' : 'Kontaktné informácie'}</h2>
            <p style={{ color: 'var(--muted)', marginTop: '.75rem' }}>
              MUDr. Mária Praženicová<br />
              Zdravomed 2, ambulancia č. 3.1<br />
              Cesta k nemocnici 1<br />
              974 01 Banská Bystrica
            </p>

            <h3 style={{ marginTop: '2rem' }}>{en ? 'Appointments' : 'Objednávky'}</h3>
            <ul className="contact-list" style={{ marginTop: '.5rem' }}>
              <li><Icon name="phone" /><a href="tel:+421907406373">+421 907 406 373</a></li>
              <li><Icon name="mail" /><a href="mailto:viziocum@viziocum.sk">viziocum@viziocum.sk</a></li>
            </ul>

            <a className="btn btn--primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{ marginTop: '1.5rem' }}>
              <Icon name="calendar" /> {en ? 'Online booking' : 'Online rezervácie'}
            </a>
          </div>

          <div>
            <iframe
              src={MAP_SRC}
              width="100%"
              height={280}
              loading="lazy"
              title={en ? 'Find us' : 'Nájdete nás'}
              style={{ borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
            />
            <img
              src="/images/2023/10/12/zdravomed-bb-1024x576.jpg"
              alt="Zdravomed 2, Banská Bystrica"
              style={{ borderRadius: 'var(--radius)', marginTop: '1.25rem', boxShadow: 'var(--shadow-sm)' }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
