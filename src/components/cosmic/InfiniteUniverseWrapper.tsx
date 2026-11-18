'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const InfiniteScrollUniverseComponent = dynamic(
  () => import('./InfiniteScrollUniverse').then((mod) => mod.InfiniteScrollUniverse),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 pointer-events-none z-0 bg-black" />
    ),
  }
);

export function InfiniteUniverseWrapper() {
  return <InfiniteScrollUniverseComponent />;
}
