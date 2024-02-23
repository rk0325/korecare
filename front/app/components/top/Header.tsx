'use client';
import React, { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'
import AuthenticateLink from './AuthenticateLink';
import ResponsiveMenu from './ResponsiveMenu';
import { HelpCircle, X } from "lucide-react";

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname()
  const isHome = pathname === '/home';
  const linkHref = session ? '/home' : '/';
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <button className="p-2" onClick={() => setIsModalOpen(true)}>
                <HelpCircle className="h-6 w-6" />
              </button>
              <input type="checkbox" id="my-modal" className="modal-toggle" checked={isModalOpen} onChange={() => setIsModalOpen(!isModalOpen)} />
              <div className="modal" onClick={handleCloseModal}>
                <div className="modal-box text-left" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-end">
                    <button onClick={handleCloseModal} className="btn btn-ghost btn-circle">
                      <X />
                    </button>
                  </div>
                  <div className="flex items-center">
                    <div className="my-2 text-md flex items-center">
                      <p>マイページにてお住まいを登録していただくと、住んでいる場所の情報が表示されます！<br />
                        登録前は、東京都の情報を表示しています。</p>
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