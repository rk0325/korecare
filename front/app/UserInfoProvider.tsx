'use client'

import React, { useState } from 'react'
import UserInfoContext from '../app/contexts/UserInfoContext'
import FirstDemonstration from './components/demo/FirstDemonstration';
import SecondDemonstration from './components/demo/SecondDemonstration';
import ThirdDemonstration from './components/demo/ThirdDemonstration';
import DemonstrationResult from './components/demo/DemonstrationResult';

export default function UserInfoProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [skinType, setSkinType] = useState("");
  const [age, setAge] = useState("");
  const [skinTrouble, setSkinTrouble] = useState("");

  return (
    <UserInfoContext.Provider value={{ skinType, setSkinType, age, setAge, skinTrouble, setSkinTrouble }}>
      <FirstDemonstration />
      <SecondDemonstration />
      <ThirdDemonstration />
      <DemonstrationResult />
    </UserInfoContext.Provider>
  );
}