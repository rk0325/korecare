'use client'
import React, { useContext, useState } from 'react';
import UserInfoContext from '../../contexts/UserInfoContext';
import Link from 'next/link'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CustomButton from '@/components/ui/custom-button';

const SecondDemonstration = () => {
  const { skinTrouble, setSkinTrouble } = useContext(UserInfoContext);
  const [isSkinTroubleSelected, setIsSkinTroubleSelected] = useState(false);

  const handleSkinTroubleChange = (value: string) => {
    setSkinTrouble(value);
    setIsSkinTroubleSelected(true);
  };

  const handleSubmit = () => {
    console.log(skinTrouble)
  }

  return (
    <>
      <p className="text-xl text-center justify-between p-10">
        あなたのお悩み・スキンケアに<br />求めるものを一つあげるなら？
      </p>
      <ul className="text-center flex justify-center">
        <RadioGroup defaultValue="comfortable" onValueChange={handleSkinTroubleChange}>
          <div className="flex items-center space-x-2 pb-2">
            <RadioGroupItem value="保湿" id="r1" />
            <Label htmlFor="r1"><li>
              <div className="text-base sm:text-lg">保湿</div>
            </li></Label></div>
          <div className="flex items-center space-x-2 pb-2">
            <RadioGroupItem value="ニキビ" id="r2" />
            <Label htmlFor="r2"><li>
              <div className="text-base sm:text-lg">ニキビ</div>
            </li></Label></div>
          <div className="flex items-center space-x-2 pb-2">
            <RadioGroupItem value="毛穴・黒ずみ" id="r3" />
            <Label htmlFor="r3"><li>
              <div className="text-base sm:text-lg">毛穴・黒ずみ</div>
            </li></Label></div>
          <div className="flex items-center space-x-2 pb-2">
            <RadioGroupItem value="美白" id="r4" />
            <Label htmlFor="r4"><li>
              <div className="text-base sm:text-lg">美白</div>
            </li></Label></div>
          <div className="flex items-center space-x-2 pb-2">
            <RadioGroupItem value="肌のハリ・弾力" id="r5" />
            <Label htmlFor="r5"><li>
              <div className="text-base sm:text-lg">肌のハリ・弾力</div>
            </li></Label></div>
        </RadioGroup>
      </ul>
      <br />
      <Link href='/demonstration_result'>
        <div className="flex justify-center pt-2">
          <CustomButton
            colorClass={`btn-506D7D flex justify-center items-center rounded-md h-[40px] w-[120px] ${!isSkinTroubleSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={!isSkinTroubleSelected}
          >
            結果を見る
          </CustomButton>
        </div>
      </Link>
    </>
  );
}

export default SecondDemonstration;