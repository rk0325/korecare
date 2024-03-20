'use client';
import { createContext } from 'react'
import { UserInfoContextType } from '../types/index';

export const UserInfoContext = createContext<UserInfoContextType>({
  skinType: "",
  setSkinType: () => {},
  skinTrouble: "",
  setSkinTrouble: () => {},
});

export default UserInfoContext;