export default function PageHero({
  title,
  subtitle,
  crumb,
}: {
  title: string;
  subtitle?: string;
  crumb?: { label: string; href: string };
}) {
  return (
    <header className="page-hero">
      <div className="container">
        {crumb && (
          <div className="breadcrumb">
            <a href={crumb.href}>{crumb.label}</a> / {title}
          </div>
        )}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  );
}
