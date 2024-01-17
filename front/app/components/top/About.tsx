import React from 'react'
import Link from 'next/link'
import CustomButton from '@/components/ui/custom-button';

const About = () => {
  return (
    <div className='bg-background-color min-h-screen text-text-color text-center'>
      <p className="text-2xl font-bold text-center justify-between pt-20">
        何かロゴ入れたい
      </p>
      <p className="text-center justify-between p-10">
        『アプリ名』は韓国コスメに特化した、ユーザーのスキンケアをサポートするサービスです。<br />
      </p>
      <p className="text-xl font-bold text-center justify-between pt-10">
        3つの質問に答えて</p>
      <p className="text-xl font-bold text-center justify-between pb-5">
      ＼ あなたに合った韓国コスメを探そう！ ／</p>
      <Link href='/first_demonstration'>
        <div className="flex justify-center">
          <CustomButton colorClass="btn-506D7D">診断してみる</CustomButton>
        </div>
      </Link>
      <p className="text-2xl font-bold text-center justify-between pt-10 pb-10">
        『アプリ名』でできること
      </p>
      <ul className="text-center">
        <li>韓国コスメを使用したことがないけれど興味がある方に向けて、お悩みや肌質別に韓国コスメを提案します。</li>
        <li>スキンケアコスメの買い忘れ・使用期限切れを防ぐサポートをします。</li>
        <li>お肌の大敵である紫外線や乾燥から、ユーザーのお肌を守るサポートをします。</li>
      </ul>
      <p className="text-2xl font-bold text-center justify-between p-10">
        なんで韓国コスメは人気なの？
      </p>
      <ul className="text-center pb-10">
        <li>人気の理由書く</li>
        <li>人気の理由書く</li>
        <li>人気の理由書く</li>
      </ul>
    </div>
  );
}

export default About;