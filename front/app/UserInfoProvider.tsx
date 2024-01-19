'use client'
import React, { useState } from 'react'
import UserInfoContext from '../app/contexts/UserInfoContext'
import FirstDemonstration from './components/demo/FirstDemonstration';
import SecondDemonstration from './components/demo/SecondDemonstration';
import DemonstrationResult from './components/demo/DemonstrationResult';

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
}