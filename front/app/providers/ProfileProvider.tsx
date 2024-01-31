'use client'
import React, { useState } from 'react';
import ProfileContext from '../contexts/ProfileContext';

export default function ProfileProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [skinType, setSkinType] = useState("");
  const [skinTrouble, setSkinTrouble] = useState("");
  const [avatar, setAvatar] = useState("");

  // 全てのプロパティを一度に更新する関数
  const setProfile = (profile: {
    name: string;
    age: string;
    skinType: string;
    skinTrouble: string;
    avatar: string;
  }) => {
    setName(profile.name);
    setAge(profile.age);
    setSkinType(profile.skinType);
    setSkinTrouble(profile.skinTrouble);
    setAvatar(profile.avatar);
  };

  return (
    <ProfileContext.Provider value={{
      name, setName, age, setAge, skinType, setSkinType, skinTrouble, setSkinTrouble, avatar, setAvatar, setProfile}}>
      {children}
    </ProfileContext.Provider>
  );
};
