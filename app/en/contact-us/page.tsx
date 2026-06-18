import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const dir = dirname(fileURLToPath(import.meta.url));

export default function Page() {
  const css = readFileSync(join(dir, 'styles.css'), 'utf8');
  const html = readFileSync(join(dir, 'content.html'), 'utf8');
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
