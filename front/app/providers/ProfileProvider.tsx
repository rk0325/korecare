'use client'
import React, { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react'
import axios from 'axios';
import ProfileContext from '../contexts/ProfileContext';

export default function ProfileProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession();
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

  const fetchProfile = async () => {
    const session = await getSession();
    const token = session?.accessToken;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profiles/`, {
        headers: headers,
        withCredentials: true
      });

      const profile = response.data;
      setName(profile.name);
      setAge(profile.age);
      setSkinType(profile.skin_type);
      setSkinTrouble(profile.skin_trouble);
      setAvatar(profile.avatar);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchProfile();
    }
  }, [session]);

  return (
    <ProfileContext.Provider value={{
      name, setName, age, setAge, skinType, setSkinType, skinTrouble, setSkinTrouble, avatar, setAvatar, setProfile}}>
      {children}
    </ProfileContext.Provider>
  );
};
