import PageHero from './PageHero';
import Icon, { type IconName } from './Icon';

type Item = { title: string; desc: string; price: string; icon: IconName };

const ITEMS: Item[] = [
  {
    title: 'Prvé komplexné očné vyšetrenie pri glaukóme',
    desc: 'Prvé komplexné očné vyšetrenie pri glaukóme alebo podozrení na glaukóm. Následná konzultácia a navrhnutie liečebného postupu.',
    price: '70 €',
    icon: 'hand',
  },
  {
    title: 'Komplexné očné vyšetrenie pred elektrostimuláciou',
    desc: 'Komplexné očné vyšetrenie kandidáta na liečbu transorbitálnou elektrostimuláciou.',
    price: '100 €',
    icon: 'pulse',
  },
  {
    title: 'Následné očné vyšetrenie',
    desc: 'Následné očné vyšetrenie po prvovyšetrení.',
    price: '30 €',
    icon: 'eye',
  },
  {
    title: 'Gonioskopia',
    desc: 'Gonioskopia samostatne.',
    price: '20 €',
    icon: 'glasses',
  },
  {
    title: 'Zmeranie očného tlaku',
    desc: 'Zmeranie očného tlaku bezkontaktným tonometrom (samostatne).',
    price: '10 €',
    icon: 'target',
  },
  {
    title: 'Vyšetrenie zorného poľa',
    desc: 'Vyšetrenie zorného poľa počítačovým perimetrom (samostatne).',
    price: '20 €',
    icon: 'droplet',
  },
  {
    title: 'Nález pre komerčné poisťovne',
    desc: 'Nález pre komerčné poisťovne, vyšetrenie na vodičský preukaz, zbrojný pas.',
    price: '50 €',
    icon: 'document',
  },
  {
    title: 'Zapožičanie prenosného tonometra',
    desc: 'Zapožičanie prenosného tonometra iCare HOME 2.',
    price: 'Cena na základe dotazu',
    icon: 'device',
  },
];

export default function Pricelist({ lang = 'sk' }: { lang?: 'sk' | 'en' }) {
  return (
    <>
      <PageHero
        title={lang === 'en' ? 'Price list' : 'Cenník výkonov'}
        subtitle="Platný od 1. 6. 2023"
        crumb={{ label: lang === 'en' ? 'Home' : 'Domov', href: lang === 'en' ? '/en/' : '/' }}
      />
      <section className="section">
        <div className="container price-grid">
          {ITEMS.map((it) => (
            <article key={it.title} className="price-card fade-up">
              <span className="icon-circle"><Icon name={it.icon} /></span>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
              <div className="price">{it.price}</div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
