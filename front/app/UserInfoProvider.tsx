'use client';
import React, { useState } from 'react';
import UserInfoContext from './contexts/UserInfoContext';
import FirstDemonstration from './components/demo/FirstDemonstration';
import SecondDemonstration from './components/demo/SecondDemonstration';
import ThirdDemonstration from './components/demo/ThirdDemonstration';
import DemonstrationResult from './components/demo/DemonstrationResult';

function App() {
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

export default App;