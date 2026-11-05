import React from 'react';
import { createRoot } from 'react-dom/client';
import VentureCapitalApp from './VentureCapitalApp';

/**
 * Mount the Venture Capital Dark Canvas Application into the specified DOM container.
 * @param {HTMLElement} containerEl 
 * @param {Object} props 
 * @returns {{ destroy: () => void } | null}
 */
export function mountVentureApp(containerEl, props = {}) {
  if (!containerEl) return null;

  const root = createRoot(containerEl);

  root.render(
    <React.StrictMode>
      <VentureCapitalApp {...props} />
    </React.StrictMode>
  );

  return {
    destroy: () => root.unmount(),
  };
}

