// The conditions treatable with electrostimulation, in the order shown on the
// home page grid. Slugs match the /ochorenia/<slug>/ routes.
export type Disease = { slug: string; title: string; excerpt: string };

export const DISEASES: Disease[] = [
  {
    slug: 'glaukom',
    title: 'Glaukóm',
    excerpt:
      'Skupina progresívnych ochorení zrakovej dráhy včetne mozgovej kôry, s kontinuálnou stratou zorného poľa v priebehu času.',
  },
  {
    slug: 'retinitis-pigmentosa',
    title: 'Retinitis pigmentosa',
    excerpt:
      'Pigmentová dystrofia sietnice — skupina dedičných zhoršujúcich sa ochorení, ktoré sa vyznačujú degeneráciou svetlocitlivých buniek.',
  },
  {
    slug: 'poskodenie-zrakoveho-nervu-z-nedokrvenia',
    title: 'Poškodenie zrakového nervu z nedokrvenia',
    excerpt:
      'Spôsobené zníženým prietokom krvi. Je častým náhlym ochorením zrakového nervu.',
  },
  {
    slug: 'poskodenie-zraku-po-poraneni-mozgu',
    title: 'Poškodenie zraku po poranení mozgu',
    excerpt:
      'Poškodenie zrakovej dráhy či mozgovej kôry po úraze, operácii alebo cievnej mozgovej príhode môže ohroziť videnie.',
  },
  {
    slug: 'hypoplazia-zrakoveho-nervu',
    title: 'Hypoplázia zrakového nervu',
    excerpt:
      'Vrodená malformácia pozostávajúca z malých, nedostatočne vyvinutých zrakových nervov, ktoré spôsobujú poškodenie zraku.',
  },
  {
    slug: 'tupozrakost-cize-amblyopia',
    title: 'Tupozrakosť čiže amblyopia',
    excerpt:
      'Vývojový problém v prepojení oka a mozgu — mozog ignoruje informácie z jedného oka. Najčastejšou príčinou je strabizmus a refrakčná vada.',
  },
  {
    slug: 'leberova-dedicna-opticka-neuropatia',
    title: 'Leberova dedičná optická neuropatia',
    excerpt: 'Dedičné ochorenie, ktoré môže viesť k závažnej strate centrálneho videnia.',
  },
  {
    slug: 'poruchy-zraku-a-opticka-neuritida',
    title: 'Poruchy zraku a optická neuritída',
    excerpt:
      'Optická neuritída z autoimunitných zápalových procesov je najčastejšou príčinou straty zraku u pacientov so sklerózou multiplex.',
  },
];
