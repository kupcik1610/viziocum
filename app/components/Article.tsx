import { readFileSync } from 'fs';
import { join } from 'path';
import PageHero from './PageHero';

// Renders a pre-cleaned content.html (see scripts/clean-content.mjs) inside the
// shared prose container.
export default function Article({
  file,
  title,
  subtitle,
  crumb,
  children,
}: {
  file: string;
  title: string;
  subtitle?: string;
  crumb?: { label: string; href: string };
  children?: React.ReactNode;
}) {
  let html = readFileSync(join(process.cwd(), file), 'utf8');

  // The page title already appears in the hero, so drop a leading in-body
  // heading that just repeats it.
  const norm = (s: string) => s.replace(/<[^>]+>|&nbsp;|\s+/g, ' ').trim().toLowerCase();
  html = html
    .replace(/^\s*<h([2-4])>([\s\S]*?)<\/h\1>/, (m, _l, inner) =>
      norm(inner) === norm(title) ? '' : m
    )
    .trim();

  return (
    <>
      <PageHero title={title} subtitle={subtitle} crumb={crumb} />
      <section className="section">
        <div className="container">
          <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          {children}
        </div>
      </section>
    </>
  );
}
