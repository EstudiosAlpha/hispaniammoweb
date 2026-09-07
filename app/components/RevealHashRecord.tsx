'use client';
import { useEffect } from 'react';

/** Preserve search/deep links when a catalog record starts collapsed. */
export default function RevealHashRecord() {
  useEffect(() => {
    function reveal() {
      const record = document.getElementById(window.location.hash.slice(1));
      if (!record?.classList.contains('codex-record')) return;
      const details = record.querySelector('details');
      if (details) details.open = true;
      record.scrollIntoView({ block: 'start' });
    }
    reveal();
    window.addEventListener('hashchange', reveal);
    return () => window.removeEventListener('hashchange', reveal);
  }, []);
  return null;
}
