'use client'
import React, { useContext } from 'react';
import UserInfoContext from '../../contexts/UserInfoContext';
import Link from 'next/link'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CustomButton from '@/components/ui/custom-button';

const SecondDemonstration = () => {
  const { skinTrouble, setSkinTrouble } = useContext(UserInfoContext);

  const handleSkinTroubleChange = (value: string) => {
		setSkinTrouble(value);
		console.log(value);
	};

  const handleSubmit = () => {
		console.log(skinTrouble)
	}

  return (
    <div className='bg-background-color min-h-screen text-text-color text-center'>
      <p className="text-xl font-bold text-center justify-between p-10">
        あなたのお悩み・スキンケアに求めるものを一つあげるなら？
      </p>
      <ul className="text-center flex justify-center">
        <RadioGroup defaultValue="comfortable" onValueChange={handleSkinTroubleChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="保湿" id="r1" />
            <Label htmlFor="r1"><li>
              <div className="text-base sm:text-lg">保湿</div>
            </li></Label></div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ニキビ" id="r2" />
            <Label htmlFor="r2"><li>
              <div className="text-base sm:text-lg">ニキビ</div>
            </li></Label></div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="毛穴・黒ずみ" id="r3" />
            <Label htmlFor="r3"><li>
              <div className="text-base sm:text-lg">毛穴・黒ずみ</div>
            </li></Label></div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="美白" id="r4" />
            <Label htmlFor="r4"><li>
              <div className="text-base sm:text-lg">美白</div>
            </li></Label></div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="肌のハリ・弾力" id="r5" />
            <Label htmlFor="r5"><li>
              <div className="text-base sm:text-lg">肌のハリ・弾力</div>
            </li></Label></div>
        </RadioGroup>
      </ul>
      <br />
      <Link href='/demonstration_result'>
        <div className="flex justify-center">
          <CustomButton colorClass="btn-506D7D" onClick={handleSubmit}>結果を見る</CustomButton>
        </div>
      </Link>
    </div>
  );
}

export default SecondDemonstration;