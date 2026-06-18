import Icon from './Icon';
import { DISEASES } from './diseases';
import { BOOKING_URL } from './nav';

const HOURS: [string, string[]][] = [
  ['Pondelok', ['16:00 – 18:00']],
  ['Utorok', ['09:00 – 13:00', '14:00 – 17:00']],
  ['Streda', ['16:00 – 18:00']],
  ['Štvrtok', ['16:00 – 18:00']],
  ['Piatok', ['16:00 – 18:00']],
];

const FORBES_ARTICLE =
  'https://www.forbes.sk/kedysi-sa-suche-oko-tykalo-najma-zien-v-pri-menopauze-dnes-trapi-uz-aj-deti-vravi-oftalmologicka/';
const FORBES_PROFILE = 'https://www.forbes.sk/lists/top-osobnosti-mediciny-2024/maria-prazenicova/';

export default function Home({ lang = 'sk' }: { lang?: 'sk' | 'en' }) {
  const base = lang === 'en' ? '/en' : '';
  const t =
    lang === 'en'
      ? {
          sub: 'Banská Bystrica',
          tag: 'Private, non-contractual healthcare facility',
          booking: 'Online booking',
          moreStim: 'More about electrostimulation',
          stimEyebrow: 'First of its kind in Slovakia',
          stimTitle: 'Treatment giving hope to the visually impaired',
          hours: 'Office hours',
          tonometer: 'Portable tonometer rental',
          readMore: 'Read more',
          diseasesEyebrow: 'Conditions',
          diseasesTitle: 'Treatable with electrostimulation',
          detail: 'Detail',
        }
      : {
          sub: 'Banská Bystrica',
          tag: 'Neštátne nezmluvné zdravotnícke zariadenie',
          booking: 'Online rezervácia',
          moreStim: 'Viac o elektrostimulácii',
          stimEyebrow: 'Prvá svojho druhu na Slovensku',
          stimTitle: 'Liečba, ktorá dáva nádej slabozrakým pacientom',
          hours: 'Ordinačné hodiny',
          tonometer: 'Zapožičanie prenosného tonometra',
          readMore: 'Čítajte viac',
          diseasesEyebrow: 'Ochorenia',
          diseasesTitle: 'Vhodné na liečbu elektrostimuláciou',
          detail: 'Detail',
        };

  return (
    <>
      {/* hero */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <h1>Glaukómová a&nbsp;neurooftalmologická ambulancia</h1>
            <div className="hero__sub">{t.sub}</div>
            <h2 className="hero__name">MUDr. Mária Praženicová</h2>
            <p className="hero__tag">{t.tag}</p>
            <div className="hero__cta">
              <a className="btn btn--primary" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Icon name="calendar" /> {t.booking}
              </a>
              <a className="btn btn--ghost" href={`${base}/elektrostimulacia/`}>
                {t.moreStim}
              </a>
            </div>
          </div>

          <aside className="award fade-up">
            <div className="award__banner">TOP OSOBNOSŤ MEDICÍNY 2024</div>
            <img
              src="/images/2024/04/03/oftalmologia_ocny_lekar_maria_prazenicova_najlepsi_lekari.webp"
              alt="MUDr. Mária Praženicová"
            />
            <div className="award__body">
              <p>
                MUDr. Mária Praženicová sa umiestnila v rebríčku TOP osobnosti medicíny 2024 a patrí
                medzi najlepších lekárov vo svojom odbore. Ako jediná na Slovensku sa venuje aj
                transorbitálnej elektrostimulácii zrakovej dráhy.
              </p>
              <p className="award__src">
                <a href={FORBES_PROFILE} target="_blank" rel="noopener noreferrer">Zdroj: Forbes</a>
              </p>
              <a className="btn btn--primary" href={FORBES_ARTICLE} target="_blank" rel="noopener noreferrer" style={{ marginTop: '.5rem' }}>
                {t.readMore}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* electrostimulation feature */}
      <section className="section">
        <div className="container split">
          <img src="/images/2024/01/10/elektrostimulacia.jpg" alt="Elektrostimulácia" className="fade-up" />
          <div>
            <span className="eyebrow">{t.stimEyebrow}</span>
            <h2>{t.stimTitle}</h2>
            <p>
              Naša ambulancia v Banskej Bystrici poskytuje liečbu prvú svojho druhu na Slovensku. Je to
              elektrostimulácia, ktorá dáva nádej slabozrakým pacientom s&nbsp;glaukómom či iným
              postihnutím zrakového nervu, pacientom s&nbsp;pigmentovou degeneráciou sietnice,
              s&nbsp;traumatickým poškodením zrakovej dráhy či oslabením zrakových funkcií po Covide.
            </p>
            <a className="btn btn--primary" href={`${base}/elektrostimulacia/`}>{t.moreStim}</a>
          </div>
        </div>
      </section>

      {/* info cards */}
      <section className="section section--tint">
        <div className="container info-row">
          <div className="info-card fade-up">
            <span className="icon-circle"><Icon name="device" /></span>
            <h3>{t.tonometer}</h3>
            <a className="cover-link" href={`${base === '/en' ? '' : base}/zapozicanie-prenosneho-tonometra/`}>
              <img src="/images/i-care-home/iCareHome2.png" alt={t.tonometer} />
            </a>
          </div>

          <div className="info-card fade-up">
            <span className="icon-circle"><Icon name="clock" /></span>
            <h3>{t.hours}</h3>
            <table className="hours">
              <tbody>
                {HOURS.map(([d, times]) => (
                  <tr key={d}>
                    <td>{d}</td>
                    <td>{times.map((t) => <div key={t}>{t}</div>)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="info-card fade-up">
            <span className="icon-circle"><Icon name="calendar" /></span>
            <h3>{t.booking}</h3>
            <p style={{ color: 'var(--muted)' }}>
              {lang === 'en'
                ? 'Book your examination quickly and easily online.'
                : 'Objednajte sa na vyšetrenie rýchlo a jednoducho online.'}
            </p>
            <a className="btn btn--primary btn--block" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              {t.booking}
            </a>
          </div>
        </div>
      </section>

      {/* conditions grid */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">{t.diseasesEyebrow}</span>
            <h2>{t.diseasesTitle}</h2>
          </div>
          <div className="disease-grid">
            {DISEASES.map((d, i) => (
              <a key={d.slug} className="disease-card fade-up" href={`${base}/ochorenia/${d.slug}/`}>
                <div className="disease-card__num">{String(i + 1).padStart(2, '0')}</div>
                <h3>{d.title}</h3>
                <p>{d.excerpt}</p>
                <span className="disease-card__more">{t.detail} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
