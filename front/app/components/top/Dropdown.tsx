'use client';
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import ProfileContext from '../../contexts/ProfileContext';
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
  const router = useRouter();
  const handleLogout = async () => {
    signOut({ callbackUrl: '/' }),
      toast.loading('ログアウトしています...');
  };

  const { data: session } = useSession();
  const { name, avatar } = useContext(ProfileContext);

  const handleNavigation = async (url: string) => {
    await router.push(url);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    session ? (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='flex items-center justify-center p-2'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    src={avatar || session.user?.image || '/default-avatar.png'}
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
          <DropdownMenuLabel>{name || session.user?.name}さん</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigation('/my_page')}>
            <User className="mr-2 h-4 w-4" />
            My Page
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigation('/home')}>
            <Search className="mr-2 h-4 w-4" />
            Cosmetics search
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ) : null
  );
}