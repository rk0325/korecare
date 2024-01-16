'use client';
import React, { useState } from 'react';
import UserInfoContext from '../contexts/UserInfoContext';

function App() {
  const [skinType, setSkinType] = useState("");
  const [age, setAge] = useState("");
  const [skinTrouble, setSkinTrouble] = useState("");

  return (
    <UserInfoContext.Provider value={{ skinType, setSkinType, age, setAge, skinTrouble, setSkinTrouble }}>
      {}
    </UserInfoContext.Provider>
  );
};

export default App;