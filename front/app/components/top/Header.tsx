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
  Wrench,
  Sparkles
} from "lucide-react";

const Header = () => {
  const { data: session } = useSession();
  const linkHref = session ? '/home' : '/';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname()
  const isHome = pathname === '/home';

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
              <button className="p-2" id="info-modal" onClick={() => setIsModalOpen(true)}>
                <AlertCircle className="h-6 w-6" />
              </button>
              <input type="checkbox" id="info-modal" className="modal-toggle" checked={isModalOpen} onChange={() => setIsModalOpen(!isModalOpen)} />
              <div className="modal" onClick={handleCloseModal}>
                <div className="modal-box text-left" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-end">
                    <button onClick={handleCloseModal} className="btn btn-ghost btn-circle">
                      <X />
                    </button>
                  </div>
                  <div className="my-2 text-md">
                    <p className="mb-6 text-lg">KoreCareへようこそ！</p>
                    <div className="flex items-start mb-4">
                      <Clock className="mr-2 h-6 w-10" />
                      <p>こちらのページでは、天気やUV指数、湿度の情報をほぼリアルタイムでお届けしています。</p>
                    </div>
                    <div className="flex items-start mb-4">
                      <MapPinned className="mr-2 h-6 w-10" />
                      <p>マイページにてお住まいを設定していただくと、設定された場所の情報が表示されます。</p>
                    </div>
                    <div className="flex items-start">
                      <Wrench className="mr-2 h-6 w-10" />
                      <p>スマートフォンの方は、メニューボタンの位置をマイページから変更できます。</p>
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