'use client';
import { createContext } from 'react'

type ProfileContextType = {
  name: string;
  setName: (value: string) => void;
  age: string;
  setAge: (value: string) => void;
  skinType: string;
  setSkinType: (value: string) => void;
  skinTrouble: string;
  setSkinTrouble: (value: string) => void;
  avatar: string;
  setAvatar: (value: string) => void;
  setProfile: (value: {
    name: string;
    age: string;
    skinType: string;
    skinTrouble: string;
    avatar: string;
  }) => void;  // 全てのプロパティを一度に更新する関数
};

export const ProfileContext = createContext<ProfileContextType>({
  name: "",
  setName: () => { },
  age: "",
  setAge: () => { },
  skinType: "",
  setSkinType: () => {},
  skinTrouble: "",
  setSkinTrouble: () => {},
  avatar: "",
  setAvatar: () => {},
  setProfile: () => {},
});

export default ProfileContext;