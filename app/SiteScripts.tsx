'use client';

import { useEffect } from 'react';

// Replaces the original jQuery + Joomla/SP Page Builder runtime. It reimplements
// in plain DOM APIs the only behaviours this site actually uses: a sticky
// header, the off-canvas mobile menu, the scroll-to-top button, the on-scroll
// fade-in (SP Page Builder "wow") and the image lightbox.
export default function SiteScripts() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const on = (
      target: EventTarget,
      type: string,
      handler: EventListener,
      opts?: AddEventListenerOptions
    ) => {
      target.addEventListener(type, handler, opts);
      cleanups.push(() => target.removeEventListener(type, handler, opts));
    };

    // Sticky header — add .header-sticky once scrolled past the header.
    const header = document.getElementById('sp-header');
    const placeholder = document.querySelector<HTMLElement>(
      '.sticky-header-placeholder'
    );
    if (header && document.body.classList.contains('sticky-header')) {
      const offsetTop = header.getBoundingClientRect().top + window.scrollY;
      const stickyOffset = 5; // original Helix stickyOffset value
      const onScroll = () => {
        if (window.scrollY >= offsetTop + stickyOffset) {
          header.classList.add('header-sticky');
          if (placeholder) placeholder.style.height = `${header.offsetHeight}px`;
        } else if (header.classList.contains('header-sticky')) {
          header.classList.remove('header-sticky');
          if (placeholder) placeholder.style.height = '';
        }
      };
      on(window, 'scroll', onScroll, { passive: true });
      onScroll();
    }

    // Off-canvas mobile menu.
    const body = document.body;
    const open = (e: Event) => {
      e.preventDefault();
      body.classList.add('offcanvas-active');
    };
    const close = (e: Event) => {
      e.preventDefault();
      body.classList.remove('offcanvas-active', 'full-offcanvas');
    };
    document
      .querySelectorAll('#offcanvas-toggler')
      .forEach((el) => on(el, 'click', open));
    document
      .querySelectorAll('.close-offcanvas, .offcanvas-overlay')
      .forEach((el) => on(el, 'click', close));

    // Scroll-to-top button.
    const scrollUp = document.querySelector<HTMLElement>('.sp-scroll-up');
    if (scrollUp) {
      const toggle = () => {
        scrollUp.style.display = window.scrollY > 100 ? 'block' : 'none';
      };
      on(window, 'scroll', toggle, { passive: true });
      on(scrollUp, 'click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      toggle();
    }

    // On-scroll fade-in. The CSS hides .sppb-wow until it enters the viewport,
    // at which point adding .sppb-animated runs the (already-present) animation.
    const wow = document.querySelectorAll<HTMLElement>('.sppb-wow');
    if (wow.length) {
      const io = new IntersectionObserver(
        (entries, observer) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            el.style.visibility = 'visible';
            el.classList.add('sppb-animated');
            observer.unobserve(el);
          }
        },
        { threshold: 0.15 }
      );
      wow.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // Image lightbox — the original magnific-popup links point at the full-size
    // image, so we show it in a simple overlay (and degrade to a plain link).
    const lightboxLinks = document.querySelectorAll<HTMLAnchorElement>(
      'a.sppb-magnific-popup, a.sppb-image-lightbox'
    );
    if (lightboxLinks.length) {
      const overlay = document.createElement('div');
      overlay.className = 'site-lightbox';
      overlay.style.cssText =
        'position:fixed;inset:0;z-index:2000;display:none;align-items:center;' +
        'justify-content:center;background:rgba(11,11,11,.85);cursor:zoom-out';
      const img = document.createElement('img');
      img.style.cssText =
        'max-width:90vw;max-height:90vh;box-shadow:0 0 24px rgba(0,0,0,.6)';
      overlay.appendChild(img);
      document.body.appendChild(overlay);
      cleanups.push(() => overlay.remove());

      const hide = () => {
        overlay.style.display = 'none';
      };
      lightboxLinks.forEach((link) =>
        on(link, 'click', (e) => {
          e.preventDefault();
          img.src = link.href;
          overlay.style.display = 'flex';
        })
      );
      on(overlay, 'click', hide);
      on(document, 'keyup', (e) => {
        if ((e as KeyboardEvent).key === 'Escape') hide();
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
