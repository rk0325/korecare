import React from 'react'
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function AuthenticateLink() {
  const handleLogin = async () => {
		signIn('google', { callbackUrl: '/home' }),
			toast.loading('ログインしています...');
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className='p-2 cursor-pointer' onClick={handleLogin}>Login</p>
        </TooltipTrigger>
        <TooltipContent >
          <p>Googleでログインする</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
