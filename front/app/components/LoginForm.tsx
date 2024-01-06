'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SignIn } from "../services/authService";
import CustomButton from '@/components/ui/custom-button';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const signInData = {
      email,
      password,
    };

    try {
      await SignIn(signInData);
      router.push('/home');
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="grid gap-2 pb-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="mail@example.com"
          className="placeholder-muted"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid gap-2 pb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full" />
        </div>
        <div className="relative flex justify-center text-s">
          <span className="text-text-color bg-background-color px-2 text-muted-foreground">
            Forgot your password?
          </span>
        </div>
      </div>
      <div className="w-full pt-6">
        <CustomButton
          colorClass="btn-506D7D w-full"
        >
          Login
        </CustomButton>
      </div >
    </form>
  );
};

export default LoginForm;