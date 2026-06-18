import PageHero from '../../components/PageHero';
import { DISEASES } from '../../components/diseases';

export default function Page() {
  return (
    <>
      <PageHero
        title="Ochorenia"
        subtitle="Vhodné na liečbu elektrostimuláciou"
        crumb={{ label: 'Domov', href: '/' }}
      />
      <section className="section">
        <div className="container disease-grid">
          {DISEASES.map((d, i) => (
            <a key={d.slug} className="disease-card fade-up" href={`/blog/ochorenia/${d.slug}/`}>
              <div className="disease-card__num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{d.title}</h3>
              <p>{d.excerpt}</p>
              <span className="disease-card__more">Čítať viac →</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
