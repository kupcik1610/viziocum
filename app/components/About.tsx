import PageHero from './PageHero';

export default function About({ lang = 'sk' }: { lang?: 'sk' | 'en' }) {
  const en = lang === 'en';
  return (
    <>
      <PageHero
        title={en ? 'About us' : 'O nás'}
        subtitle={en ? 'Our team' : 'Náš tím'}
        crumb={{ label: en ? 'Home' : 'Domov', href: en ? '/en/' : '/' }}
      />

      <section className="section">
        <div className="container two-col">
          <img
            src="/images/2024/01/15/img_8940-1.jpg"
            alt="MUDr. Mária Praženicová – Viziocum"
            style={{ borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}
          />
          <div className="prose" style={{ margin: 0 }}>
            <h2>MUDr. Mária Praženicová</h2>
            <p>Absolventka III. LF Univerzity Karlovej v Prahe.</p>
            <p>
              Atestácia v špecializovanom odbore oftalmológia, špecializácia: glaukóm —
              diagnostika, konzervatívna i chirurgická liečba.
            </p>

            <h3>Doterajšie pracoviská</h3>
            <ul>
              <li>Očná klinika FNsP F. D. Roosevelta, Banská Bystrica</li>
              <li>iClinic, Banská Bystrica</li>
              <li>Viziocum, Banská Bystrica</li>
            </ul>

            <h3>Absolvované študijné programy</h3>
            <ul>
              <li>European Leadership Development Program — SOE 2007–2009, Stockholm, San Francisco, Amsterdam</li>
            </ul>

            <h3>Účasť na študijných pobytoch</h3>
            <ul>
              <li>Glaucoma Unit of Harkness Eye Institute, Columbia University, New York</li>
              <li>Massachusetts Eye and Ear Infirmary, Boston</li>
              <li>Wills Eye Hospital, Philadelphia</li>
              <li>Landspítalinn, Reykjavík — kardiológia, gynekológia</li>
            </ul>

            <h3>Prednášková a publikačná činnosť</h3>
            <ul>
              <li>Členstvo: SOS, SGlS, EGS</li>
              <li>Prezidentka Slovenskej glaukómovej spoločnosti v rokoch 2013–2017 a 2021–2025</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container" style={{ textAlign: 'center' }}>
          <img
            src="/images/2023/08/21/dsc_5750.jpg"
            alt="Viziocum"
            style={{ borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', marginInline: 'auto' }}
          />
        </div>
      </section>
    </>
  );
}
