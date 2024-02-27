'use client';
import React from 'react';
import SessionContext from '../contexts/SessionContext';
import { useSession } from 'next-auth/react';

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession();

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};