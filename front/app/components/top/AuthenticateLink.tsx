import React from 'react'
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LogIn } from "lucide-react";

export default function AuthenticateLink() {
  const handleLogin = async () => {
    toast.loading('ログインしています...');
    signIn('line', { callbackUrl: '/home' })
      .catch(() => {
        toast.error('ログインに失敗しました');
      });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center p-2 cursor-pointer font-genjyuu" onClick={handleLogin}>
            <p>ログイン</p>
            <LogIn className="ml-1" />
          </div>
        </TooltipTrigger>
        <TooltipContent >
          <p>LINEでログインする</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}