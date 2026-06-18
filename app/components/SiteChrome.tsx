'use client';

import { useEffect, useRef } from 'react';
import Icon from './Icon';

// Page-level behaviours that used to come from the jQuery/SP Page Builder
// runtime: a scroll-to-top button, on-scroll fade-ins, and an image lightbox.
export default function SiteChrome() {
  const upRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const up = upRef.current;
    const onScroll = () => up?.classList.toggle('is-visible', window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Reveal elements tagged .fade-up as they enter the viewport.
    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          obs.unobserve(e.target);
        }
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => io.observe(el));

    // Lightbox for any image inside .prose (article figures).
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    const big = document.createElement('img');
    overlay.appendChild(big);
    document.body.appendChild(overlay);
    const close = () => overlay.classList.remove('is-open');
    overlay.addEventListener('click', close);

    const onImgClick = (e: Event) => {
      const img = e.currentTarget as HTMLImageElement;
      big.src = img.currentSrc || img.src;
      overlay.classList.add('is-open');
    };
    const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('.prose img'));
    imgs.forEach((img) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', onImgClick);
    });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keyup', onKey);

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
      imgs.forEach((img) => img.removeEventListener('click', onImgClick));
      document.removeEventListener('keyup', onKey);
      overlay.remove();
    };
  }, []);

  return (
    <button
      ref={upRef}
      className="scroll-up"
      aria-label="Hore"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Icon name="up" />
    </button>
  );
}
