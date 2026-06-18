import Article from '../components/Article';

export default function Page() {
  return (
    <Article
      file="app/elektrostimulacia/content.html"
      title="Elektrostimulácia"
      subtitle="Transorbitálna elektrostimulácia zrakovej dráhy"
      crumb={{ label: 'Domov', href: '/' }}
    />
  );
}
