'use client';
import React from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LogOut,
  User,
  Search,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Dropdown() {
  const handleLogout = async () => {
    signOut({ callbackUrl: '/' }),
      toast.loading('ログアウトしています...');
  };

  const { data: session } = useSession();

  return (
    session ? (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='flex items-center justify-center p-2' style={{ zIndex: 1000, position: 'relative' }}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    src={session.user?.image ?? '/default-avatar.png'}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    style={{ borderRadius: '50%' }}
                  />
                </TooltipTrigger>
                <TooltipContent >
                  <p>アカウントメニューを表示する</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-text-color">
          <DropdownMenuLabel>{session.user?.name}さん</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <Link href='/my_page'>
              <span>My Page</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Search className="mr-2 h-4 w-4" />
            <Link href='/home'>
              <span>Cosmetics search</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span onClick={handleLogout}>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : null
  );
}