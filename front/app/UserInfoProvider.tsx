import React, { useState } from 'react';
import UserInfoContext from '../contexts/UserInfoContext';

function UserInfoProvider() {
  const [skinType, setSkinType] = useState("");
  const [age, setAge] = useState("");
  const [skinTrouble, setSkinTrouble] = useState("");

  return (
    <UserInfoContext.Provider value={{ skinType, setSkinType, age, setAge, skinTrouble, setSkinTrouble }}>
      {/* 他のコンポーネント */}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;