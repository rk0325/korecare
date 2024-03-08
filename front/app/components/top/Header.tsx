'use client';
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'
import AuthenticateLink from './AuthenticateLink';
import ResponsiveMenu from './ResponsiveMenu';
import {
  AlertCircle,
  X,
  Clock,
  MapPinned,
  Smartphone,
  Sparkles,
  HelpCircle,
  SearchCheck,
  Diamond,
  AlertTriangle
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const Header = () => {
  const { data: session } = useSession();
  const linkHref = session ? '/home' : '/';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname()
  const isHome = pathname === '/home';
  const isSearch = pathname === '/search';

    const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className='bg-custom-color text-text-color font-genjyuu shadow-custom w-full mb-2'>
      <div className='h-20 flex items-center justify-between p-4'>
        <ul className='flex'>
          <li className='p-2 cursor-pointer'>
            <Link href={linkHref}>KoreCare</Link>
          </li>
        </ul>
        <div className="flex items-center">
          {isHome && (
            <div className="flex items-center justify-end">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="ml-1 p-1 rounded-full bg-background-color border border-gray-200 shadow" id="info-modal" onClick={() => setIsModalOpen(true)}>
                      <AlertCircle className="h-6 w-6" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>KoreCareについて</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <input type="checkbox" id="info-modal" className="modal-toggle" checked={isModalOpen} onChange={() => setIsModalOpen(!isModalOpen)} />
              <div className="modal" onClick={handleCloseModal}>
                <div className="modal-box text-left" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-end">
                    <div onClick={handleCloseModal} className="btn btn-ghost btn-circle">
                      <X />
                    </div>
                  </div>
                  <div className="my-2 text-md">
                    <p className="mb-6 text-lg">KoreCareへようこそ！</p>
                    <div className="flex items-start mb-4">
                      <Clock className="mr-2 h-6 w-10" />
                      <p>こちらのページでは、天気やUV指数、湿度の情報をほぼリアルタイムでお届けしています。</p>
                    </div>
                    <div className="flex items-start mb-4">
                      <MapPinned className="mr-2 h-6 w-10" />
                      <p>マイページでお住まいを設定すると、設定した場所の情報が表示されます。</p>
                    </div>
                    <div className="flex items-start">
                      <Smartphone className="mr-2 h-6 w-10" />
                      <p>各種LINE通知もマイページから設定できます。さっそく設定してみよう！</p>
                    </div>
                    <div className="flex items-start justify-between mt-6">
                      <p>KoreCareがあなたの毎日のスキンケアに</p>
                    </div>
                    <div className="flex items-start">
                      <p>少しでも役立ちますように</p>
                      <Sparkles className="ml-1 h-6 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isSearch && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="ml-1 p-1 rounded-full bg-background-color border border-gray-200 shadow" id="my-modal" onClick={() => setIsModalOpen(true)}>
                      <HelpCircle className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>肌質とは？</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <input type="checkbox" id="my-modal" className="modal-toggle" checked={isModalOpen} onChange={() => setIsModalOpen(!isModalOpen)} />
              <div className="modal" onClick={handleCloseModal}>
                <div className="modal-box text-left" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-end">
                    <div onClick={handleCloseModal} className="btn btn-ghost btn-circle">
                      <X />
                    </div>
                  </div>
                  <div className="flex justify-start items-start mb-2">
                    <SearchCheck className="mr-2 h-6 w-6" />
                    <div>
                      <p className="mb-2 text-md marked-text">あなたの洗顔後の肌の様子に一番近いものは？</p>
                      <p className="my-4 text-sm">・全体的につっぱり感があり、目元・口元・頬に乾燥を感じる→乾燥肌</p>
                      <p className="my-2 text-sm">・額や鼻はベタつきがあり、目元・口元・頬は乾燥を感じる→混合肌</p>
                      <p className="my-2 text-sm">・全体的にベタつきがあり、乾燥は感じない→脂性肌</p>
                      <p className="my-2 pb-2 text-sm">・ベタつきも乾燥もほとんど感じない→普通肌</p>
                    </div>
                  </div>
                  <div className="flex justify-start items-start mb-2">
                    <Diamond className="mr-2 h-6 w-6" />
                    <div>
                      <p className='text-sm'>以下のような特徴がある方は、敏感肌の可能性があります。</p>
                      <p className="my-4 text-sm">・いつも使っている化粧品がしみたり、かゆくなったりすることがある</p>
                      <p className="my-2 pb-4 text-sm">・化粧品でかぶれたり、つけるもので刺激を感じることがある</p>
                    </div>
                  </div>
                  <div className="flex justify-start items-start mb-2">
                    <AlertTriangle className="mr-2 h-6 w-6" />
                    <div>
                      <p className='text-sm'>こちらの質問は、肌質を断定するものではございません。</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {session ? (
            <ResponsiveMenu />
          ) : (
            <AuthenticateLink />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;