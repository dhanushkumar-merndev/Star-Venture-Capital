import React from 'react';
import { createRoot } from 'react-dom/client';
import SlicedWaveMatrix, { MATRIX_ITEMS } from './SlicedWaveMatrix';

export function mountWaveMatrix(containerEl, props = {}) {
  if (!containerEl) return null;

  const root = createRoot(containerEl);

  root.render(
    <React.StrictMode>
      <SlicedWaveMatrix items={MATRIX_ITEMS} {...props} />
    </React.StrictMode>
  );

  return {
    destroy: () => root.unmount()
  };
}
