import React, { useContext } from 'react';
import UserInfoContext from '../../contexts/UserInfoContext';
import Link from 'next/link'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const ThirdDemonstration = () => {
  const { skinTrouble, setSkinTrouble } = useContext(UserInfoContext);

  const handleSkinTroubleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkinTrouble(e.target.value);
  };

  return (
    <div className='bg-background-color min-h-screen text-text-color text-center'>
      <p className="text-2xl font-bold text-center justify-between p-20">
        あなたの肌悩み・スキンケアに求めるものは？
      </p>
      <Link href='/demonstration_result'>
        <ul className="text-center flex justify-center">
          <RadioGroup defaultValue="comfortable" onChange={handleSkinTroubleChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="保湿" id="r1" />
              <Label htmlFor="r1"><li>保湿</li></Label></div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ニキビ" id="r2" />
              <Label htmlFor="r2"><li>ニキビ</li></Label></div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="毛穴・黒ずみ" id="r3" />
              <Label htmlFor="r3"><li>毛穴・黒ずみ</li></Label></div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="美白" id="r4" />
              <Label htmlFor="r4"><li>美白</li></Label></div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="肌のハリ・弾力" id="r5" />
              <Label htmlFor="r5"><li>肌のハリ・弾力</li></Label></div>
          </RadioGroup>
        </ul>
      </Link>
    </div>
  );
}

export default ThirdDemonstration;