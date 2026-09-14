import { useEffect } from 'react';

interface JsonLdProps {
  id: string;
  schema: object;
}

/**
 * Injects a JSON-LD <script> tag into <head> and removes it on unmount.
 * Using useEffect so each page manages its own schema lifecycle.
 */
export default function JsonLd({ id, schema }: JsonLdProps) {
  useEffect(() => {
    // Remove any existing script with this id first (hot-reload safety)
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [id, schema]);

  return null;
}
