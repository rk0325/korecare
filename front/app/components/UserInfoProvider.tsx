import React, { useState, ReactNode } from 'react';
import UserInfoContext from '../.././contexts/UserInfoContext';

type UserInfoProviderProps = {
  children: ReactNode;
};

const UserInfoProvider = ({ children }: UserInfoProviderProps) => {
  const [skinType, setSkinType] = useState("");
  const [age, setAge] = useState("");
  const [skinTrouble, setSkinTrouble] = useState("");

  return (
    <UserInfoContext.Provider value={{ skinType, setSkinType, age, setAge, skinTrouble, setSkinTrouble }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;