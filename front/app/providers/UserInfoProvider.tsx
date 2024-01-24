'use client'
import React, { useState } from 'react'
import UserInfoContext from '../../app/contexts/UserInfoContext'

export default function UserInfoProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [skinType, setSkinType] = useState("");
  const [skinTrouble, setSkinTrouble] = useState("");

  return (
    <UserInfoContext.Provider value={{ skinType, setSkinType, skinTrouble, setSkinTrouble }}>
      {children}
    </UserInfoContext.Provider>
  );
};