'use client';
import { createContext } from 'react'

type UserInfoContextType = {
  skinType: string;
  setSkinType: (value: string) => void;
  skinTrouble: string;
  setSkinTrouble: (value: string) => void;
};

export const UserInfoContext = createContext<UserInfoContextType>({
  skinType: "",
  setSkinType: () => {},
  skinTrouble: "",
  setSkinTrouble: () => {},
});

export default UserInfoContext;