'use client'
import React, { useContext, useState } from 'react';
import UserInfoContext from '../../contexts/UserInfoContext';
import Link from 'next/link'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CustomButton from '@/components/ui/custom-button';
import toast from 'react-hot-toast';
import {
  AlertTriangle,
  Diamond,
  SearchCheck,
  HelpCircle,
  X
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const FirstDemonstration = () => {
  const { skinType, setSkinType } = useContext(UserInfoContext);
  const [isSkinTypeSelected, setIsSkinTypeSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSkinTypeChange = (value: string) => {
    setSkinType(value);
    setIsSkinTypeSelected(true);
  };

  const handleSubmit = () => {
    if (!isSkinTypeSelected) {
      toast.error('肌質を選択してください');
      return;
    }
    console.log(skinType);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="text-xl text-center justify-between p-10">
        あなたの肌質は？
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="ml-1 p-1 rounded-full bg-background-color border border-gray-200 shadow" id="my-modal" onClick={() => setIsModalOpen(true)}>
                <HelpCircle className="h-5 w-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>肌質とは？</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <input type="checkbox" id="my-modal" className="modal-toggle" checked={isModalOpen} onChange={() => setIsModalOpen(!isModalOpen)} />
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-box text-left" onClick={e => e.stopPropagation()}>
            <div className="flex justify-end">
              <div onClick={handleCloseModal} className="btn btn-ghost btn-circle">
                <X />
              </div>
            </div>
            <div className="flex justify-start items-start mb-2">
              <SearchCheck className="mr-2 h-6 w-6" />
              <div>
                <p className="mb-4 text-sm marked-text">あなたの洗顔後の肌の様子に一番近いものは？</p>
                <p className="my-4 text-sm">・全体的につっぱり感があり、目元・口元・頬に乾燥を感じる→乾燥肌</p>
                <p className="my-2 text-sm">・額や鼻はベタつきがあり、目元・口元・頬は乾燥を感じる→混合肌</p>
                <p className="my-2 text-sm">・全体的にベタつきがあり、乾燥は感じない→脂性肌</p>
                <p className="my-2 mb-2 text-sm">・ベタつきも乾燥もほとんど感じない→普通肌</p>
              </div>
            </div>
            <div className="flex justify-start items-start mb-2">
              <Diamond className="mr-2 h-6 w-6" />
              <div>
                <p className='text-sm'>以下のような特徴がある方は、敏感肌の可能性があります。</p>
                <p className="my-4 text-sm">・いつも使っている化粧品がしみたり、かゆくなったりすることがある</p>
                <p className="my-2 mb-4 text-sm">・化粧品でかぶれたり、つけるもので刺激を感じることがある</p>
              </div>
            </div>
            <div className="flex justify-start items-start">
              <AlertTriangle className="mr-2 h-6 w-6" />
              <div>
                <p className='text-sm'>こちらの解説は、肌質を断定するものではございません。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className="text-center flex justify-center">
        <RadioGroup defaultValue="comfortable" onValueChange={handleSkinTypeChange}>
          <div className="flex items-center space-x-2 pb-2">
            <RadioGroupItem value="乾燥肌" id="r1" />
            <Label htmlFor="r1">
              <li>
                <div className="text-base sm:text-lg">乾燥肌</div>
              </li>
            </Label>
          </div>
          <div className="flex items-center space-x-2 pb-2">
            <RadioGroupItem value="混合肌" id="r2" />
            <Label htmlFor="r2">
              <li>
                <div className="text-base sm:text-lg">混合肌</div>
              </li>
            </Label>
          </div>
          <div className="flex items-center space-x-2 pb-2">
            <RadioGroupItem value="脂性肌" id="r3" />
            <Label htmlFor="r3">
              <li>
                <div className="text-base sm:text-lg">脂性肌</div>
              </li>
            </Label>
          </div>
          <div className="flex items-center space-x-2 pb-2">
            <RadioGroupItem value="普通肌" id="r4" />
            <Label htmlFor="r4">
              <li>
                <div className="text-base sm:text-lg">普通肌</div>
              </li>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="敏感肌" id="r5" />
            <Label htmlFor="r5">
              <li>
                <div className="text-base sm:text-lg">敏感肌</div>
              </li>
            </Label>
          </div>
        </RadioGroup>
      </ul>
      <Link href='/second_demonstration'>
        <div className="flex justify-center pt-6">
          <CustomButton
            colorClass={`btn-506D7D flex justify-center items-center rounded-md h-[40px] w-[120px] ${!isSkinTypeSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={!isSkinTypeSelected}
          >
            次の質問へ
          </CustomButton>
        </div>
      </Link>
    </>
  );
}

export default FirstDemonstration;