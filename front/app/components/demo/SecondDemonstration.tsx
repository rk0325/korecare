import React, { useContext } from 'react';
import UserInfoContext from '../../../contexts/UserInfoContext';
import Link from 'next/link'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const SecondDemonstration = () => {
  const { age, setAge } = useContext(UserInfoContext);

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  return (
    <div className='bg-background-color min-h-screen text-text-color text-center'>
      <p className="text-2xl font-bold text-center justify-between p-20">
        あなたの年代は？
      </p>
      <Link href='/third_demonstration'>
        <ul className="text-center flex justify-center">
          <RadioGroup defaultValue="comfortable" onChange={handleAgeChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="10代" id="r1" />
              <Label htmlFor="r1"><li>10代</li></Label></div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="20代" id="r2" />
              <Label htmlFor="r2"><li>20代</li></Label></div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="30代" id="r3" />
              <Label htmlFor="r3"><li>30代</li></Label></div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="40代" id="r4" />
              <Label htmlFor="r4"><li>40代</li></Label></div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="50代" id="r5" />
              <Label htmlFor="r5"><li>50代</li></Label></div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="60代以上" id="r6" />
              <Label htmlFor="r6"><li>60代以上</li></Label></div>
          </RadioGroup>
        </ul>
      </Link>
    </div>
  );
}

export default SecondDemonstration;