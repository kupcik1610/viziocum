'use client';

import { useEffect } from 'react';

// Original Joomla/Helix scripts, loaded sequentially so dependency order
// (jQuery -> noconflict -> plugins -> template main.js) is preserved.
// Classic scripts only; the Bootstrap ES modules are not required for the
// visual layout (menu/offcanvas/sticky come from template main.js).
const SCRIPTS: string[] = [
  '/media/vendor/jquery/js/jquery.min8a0c.js',
  '/media/legacy/js/jquery-noconflict.min1fec.js',
  '/components/com_sppagebuilder/assets/js/common.js',
  '/components/com_sppagebuilder/assets/js/jquery.parallax3ba3.js',
  '/components/com_sppagebuilder/assets/js/sppagebuilder3ba3.js',
  '/components/com_sppagebuilder/assets/js/addons/text_block.js',
  '/components/com_sppagebuilder/assets/js/jquery.magnific-popup.min.js',
  '/components/com_sppagebuilder/assets/js/addons/image.js',
  '/templates/viziocum/js/main.js',
  '/templates/viziocum/js/lazysizes.min.js',
  '/media/com_wrapper/js/iframe-height.min847a.js',
];

function loadSeq(srcs: string[], i: number) {
  if (i >= srcs.length) return;
  const s = document.createElement('script');
  s.src = srcs[i];
  s.async = false;
  s.onload = () => loadSeq(srcs, i + 1);
  s.onerror = () => loadSeq(srcs, i + 1);
  document.body.appendChild(s);
}

export default function ScriptsLoader() {
  useEffect(() => {
    // Minimal Joomla shim: the template's main.js and SP Page Builder scripts
    // only need Joomla.getOptions()/JText, normally provided by Joomla core.
    // Values mirror the original joomla-script-options payload.
    const w = window as any;
    w.Joomla = w.Joomla || {};
    const opts: Record<string, any> = {
      data: {
        breakpoints: { tablet: 991, mobile: 480 },
        header: { stickyOffset: '5' },
      },
    };
    if (!w.Joomla.getOptions) {
      w.Joomla.getOptions = (key: string, def?: any) =>
        key in opts ? opts[key] : def !== undefined ? def : {};
    }
    if (!w.Joomla.JText) {
      w.Joomla.JText = { _: (k: string, d?: string) => d || k };
    }
    // The footer Google Maps iframe has an inline onload="iFrameHeight(this)".
    // Provide a global so it never throws before the real script loads; the
    // com_wrapper script (loaded below) overrides it where it can apply.
    if (!w.iFrameHeight) {
      w.iFrameHeight = function () {};
    }
    loadSeq(SCRIPTS, 0);
  }, []);
  return null;
}
