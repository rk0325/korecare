'use client';
import React from 'react';

export default function Column() {
  return (
    <div className="text-text-color bg-background-color flex-grow">
      <div className="p-4 sm:p-10">
        <div className="p-4 sm:p-6">
          <p className="text-text-color text-2xl sm:text-4xl text-center py-5 sm:py-10 font-bold">利用規約</p>
          <div className="bg-background-color">
            <div className="bg-white rounded-lg shadow-md px-5 sm:px-10 py-5 sm:py-10">
              <p className='mt-2 sm:mt-3 pl-5 sm:pl-10'>
                この利用規約(以下、「本規約」といいます。)は、本サービス(本サイトを含むものとし、以下、特に両者を区別しません。)の利用条件を定めるものです。<br />
                本規約は、本サービスを利用するすべてのユーザーに適用されます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}