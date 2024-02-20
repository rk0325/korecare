import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-custom-color text-text-color font-genjyuu w-full shadow-top-shadow">
      <footer className="h-20 items-center flex justify-center p-2">
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
}

export default Footer;