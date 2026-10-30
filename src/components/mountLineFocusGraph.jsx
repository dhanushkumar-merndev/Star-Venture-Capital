import React from 'react';
import { createRoot } from 'react-dom/client';
import DualLineFocusGraph, { FOCUS_SECTORS } from './DualLineFocusGraph';

/**
 * Standalone mount helper for HTML integration
 * @param {HTMLElement} containerEl - DOM container element
 * @param {Object} props - Optional props passed to DualLineFocusGraph
 */
export function mountLineFocusGraph(containerEl, props = {}) {
  if (!containerEl) return null;

  const root = createRoot(containerEl);

  root.render(
    <React.StrictMode>
      <DualLineFocusGraph sectors={FOCUS_SECTORS} {...props} />
    </React.StrictMode>
  );

  return {
    destroy: () => root.unmount(),
  };
}

export { DualLineFocusGraph, FOCUS_SECTORS };
