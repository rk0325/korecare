'use client';
import React, { useState } from 'react';
import LoadingContext from '../contexts/LoadingContext';

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};