import Article from './Article';
import { DISEASES } from './diseases';

// Every condition has the same article text across the Slovak, English and blog
// routes, so all of them render from the one canonical source under /ochorenia.
export default function DiseaseArticle({
  slug,
  lang = 'sk',
  crumbHref,
  crumbLabel,
}: {
  slug: string;
  lang?: 'sk' | 'en';
  crumbHref?: string;
  crumbLabel?: string;
}) {
  const me = DISEASES.find((d) => d.slug === slug);
  const others = DISEASES.filter((d) => d.slug !== slug);
  const base = lang === 'en' ? '/en' : '';

  return (
    <Article
      file={`app/ochorenia/${slug}/content.html`}
      title={me?.title ?? slug}
      subtitle={lang === 'en' ? 'Condition' : 'Ochorenie'}
      crumb={{
        label: crumbLabel ?? (lang === 'en' ? 'Home' : 'Domov'),
        href: crumbHref ?? (lang === 'en' ? '/en/' : '/'),
      }}
    >
      <aside style={{ marginTop: '3.5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          {lang === 'en' ? 'Other conditions' : 'Ďalšie ochorenia'}
        </h2>
        <div className="disease-grid">
          {others.map((d, i) => (
            <a key={d.slug} className="disease-card" href={`${base}/ochorenia/${d.slug}/`}>
              <div className="disease-card__num">{String(i + 1).padStart(2, '0')}</div>
              <h3>{d.title}</h3>
              <p>{d.excerpt}</p>
            </a>
          ))}
        </div>
      </aside>
    </Article>
  );
}
