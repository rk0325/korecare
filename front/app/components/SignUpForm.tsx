'use client';
import React, { useCallback, useMemo, useState } from "react";
import axios from 'axios';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomButton from '@/components/ui/custom-button';
import { useAuthContext } from "../contexts/useAuthContext";
import { signUp } from "../services/authService";
import { useRouter } from "next/navigation";

export  const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const router = useRouter();

  const setErrorsWithTimeout = (newErrors: React.SetStateAction<string[]>) => {
    setErrors(newErrors);
    setTimeout(() => {
      setErrors([]);
    }, 5000);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const signUpData = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    };
    console.log(signUpData); // ここで送信データを確認
    await signUp(signUpData);
    }

  const validateEmail = useCallback(
    (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
    []
  );

  const validatePassword = useCallback(
    (password: string) => /^[a-zA-Z\d]{6,}$/.test(password),
    []
  );

return (
  <div className='bg-background-color'>
    <div className="flex justify-center items-center h-screen">
      <Card className="border-line-color bg-background-color text-text-color w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign up</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={name}
                  type="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={email}
                  type="email"
                  placeholder="mail@example.com"
                  className="placeholder-muted"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Password Confirmation</Label>
                <Input
                  value={passwordConfirmation}
                  type="password"
                  placeholder="passwordをもう一度入力してください"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </div>
              <CardFooter>
                <CustomButton
                  colorClass="btn-506D7D w-full"
                >
                  Sign up
                </CustomButton>
              </CardFooter>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  );
};

export default SignUpForm;