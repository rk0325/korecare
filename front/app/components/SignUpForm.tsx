'use client';
import React, { useState } from "react";
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomButton from '@/components/ui/custom-button';
import { SignUp } from "../services/authService";

export  const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const signUpData = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    };
    await SignUp(signUpData);
    }

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
              <div className="grid gap-2 pb-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={name}
                  type="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2 pb-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={email}
                  type="email"
                  placeholder="mail@example.com"
                  className="placeholder-muted"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2 pb-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2 pb-2">
                <Label htmlFor="password_confirmation">Password Confirmation</Label>
                <Input
                  value={passwordConfirmation}
                  type="password"
                  placeholder="passwordをもう一度入力してください"
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </div>
              <div className="w-ful pt-4">
                <CustomButton
                  colorClass="btn-506D7D w-full"
                >
                  Sign up
                </CustomButton>
              </div>
              <div className="text-center pt-6">
              <Link href="/login">
                <div className="text-text-color hover:text-blue-900">Already have an account? Log in</div>
              </Link>
            </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  );
};

export default SignUpForm;