'use client';
import { createContext } from 'react';
import { LoadingContextType } from '../types/index';

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export default LoadingContext;

