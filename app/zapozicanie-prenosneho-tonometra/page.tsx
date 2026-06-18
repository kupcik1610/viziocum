import Article from '../components/Article';

export default function Page() {
  return (
    <Article
      file="app/zapozicanie-prenosneho-tonometra/content.html"
      title="Zapožičanie prenosného tonometra"
      subtitle="iCare HOME 2 — domáce meranie vnútroočného tlaku"
      crumb={{ label: 'Domov', href: '/' }}
    />
  );
}
