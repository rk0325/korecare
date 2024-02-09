import React from 'react'
import Link from 'next/link'
import CustomButton from '@/components/ui/custom-button';

const About = () => {
  return (
    <div className='bg-background-color min-h-screen text-text-color text-center font-genjyuu'>
      <p className="text-2xl font-bold text-center justify-between pt-20">
        ロゴ
      </p>
      <p className="text-center justify-between p-10">
        『韓 RECO（かんれこ）』は韓国コスメに特化した、毎日のスキンケアをサポートするサービスです。<br />
      </p>
      <p className="text-xl text-center justify-between pt-10">
        2つの質問に答えて</p>
      <p className="text-xl text-center justify-between pb-5">
      あなたに合った韓国コスメを探そう</p>
      <Link href='/first_demonstration'>
        <div className="flex justify-center pb-5">
          <CustomButton colorClass="btn-506D7D">試してみる</CustomButton>
        </div>
      </Link>
      <p className="text-2xl text-center justify-between pt-10">
        『韓 RECO』でできること
      </p>
      <ul className="text-center p-10">
        <li>お悩みや肌質別に韓国コスメをレコメンドします。</li>
        <li>スキンケアコスメの買い忘れ・使用期限切れを防ぐサポートをします。</li>
        <li>お肌の大敵である紫外線や乾燥から、ユーザーのお肌を守るサポートをします。</li>
      </ul>
      <p className="text-2xl text-center justify-between pt-10">
        なんで韓国コスメは人気なの？
      </p>
      <ul className="text-center p-10">
        <li>人気の理由</li>
        <li>人気の理由</li>
        <li>人気の理由</li>
      </ul>
    </div>
  );
}

export default About;