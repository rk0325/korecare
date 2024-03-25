'use client';
import React, { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
