import React from 'react';

type UserInfoContextType = {
  skinType: string;
  setSkinType: (value: string) => void;
  age: string;
  setAge: (value: string) => void;
  skinTrouble: string;
  setSkinTrouble: (value: string) => void;
};

const UserInfoContext = React.createContext<UserInfoContextType>({
  skinType: "",
  setSkinType: () => {},
  age: "",
  setAge: () => {},
  skinTrouble: "",
  setSkinTrouble: () => {},
});

export default UserInfoContext;