import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-background-color h-20 w-full border-2 border-line-color flex items-center justify-center p-2">
      <footer className="bg-background-color text-text-color font-genjyuu">
        <ul className="flex justify-center">
          <li className="p-2 cursor-pointer">
            <Link href="/term_of_service">利用規約</Link>
          </li>
          <li className="p-2 cursor-pointer">
            <Link href="/privacy_policy">プライバシーポリシー</Link>
          </li>
          <li className="p-2 cursor-pointer">
            <Link href="https://twitter.com/__rk2530" target="_blank">お問い合わせ</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;