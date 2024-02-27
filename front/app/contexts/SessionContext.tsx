'use client';
import { createContext } from 'react';
import { Session } from 'next-auth';

export const SessionContext = createContext<Session | null>(null);

export default SessionContext;