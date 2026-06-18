import Article from '../../components/Article';

export default function Page() {
  return (
    <Article
      file="app/elektrostimulacia/content.html"
      title="Electrostimulation"
      subtitle="Transorbital electrostimulation of the visual pathway"
      crumb={{ label: 'Home', href: '/en/' }}
    />
  );
}
