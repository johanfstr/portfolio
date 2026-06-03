'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PreloaderContextType {
  loadingPercent: number;
  isLoading: boolean;
  setLoadingPercent: (percent: number) => void;
  setIsLoading: (loading: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <PreloaderContext.Provider
      value={{
        loadingPercent,
        isLoading,
        setLoadingPercent,
        setIsLoading,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (!context) {
    return {
      loadingPercent: 0,
      isLoading: false,
      setLoadingPercent: () => {},
      setIsLoading: () => {},
    };
  }
  return context;
}
