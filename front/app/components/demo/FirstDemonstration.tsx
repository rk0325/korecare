'use client'
import React, { useContext, useState } from 'react';
import UserInfoContext from '../../contexts/UserInfoContext';
import Link from 'next/link'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import CustomButton from '@/components/ui/custom-button';
import {
	AlertTriangle,
	Diamond,
	SearchCheck,
	HelpCircle,
	X
} from "lucide-react"

const FirstDemonstration = () => {
	const { skinType, setSkinType } = useContext(UserInfoContext);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSkinTypeChange = (value: string) => {
		setSkinType(value);
	};

	const handleSubmit = () => {
		console.log(skinType)
	};

	const handleCloseModal = () => {
    setIsModalOpen(false);
  };

	return (
		<div className='bg-background-color min-h-screen text-text-color text-center font-genjyuu'>
			<p className="text-xl text-center justify-between p-10">
				あなたの肌質は？
			</p>
			<ul className="text-center flex justify-center">
				<RadioGroup defaultValue="comfortable" onValueChange={handleSkinTypeChange}>
					<div className="flex items-center space-x-2 pb-2">
						<RadioGroupItem value="乾燥肌" id="r1" />
						<Label htmlFor="r1"><li>
							<div className="text-base sm:text-lg">乾燥肌</div>
						</li></Label>
					</div>
					<div className="flex items-center space-x-2 pb-2">
						<RadioGroupItem value="混合肌" id="r2" />
						<Label htmlFor="r2"><li>
							<div className="text-base sm:text-lg">混合肌</div>
						</li></Label>
					</div>
					<div className="flex items-center space-x-2 pb-2">
						<RadioGroupItem value="脂性肌" id="r3" />
						<Label htmlFor="r3"><li>
							<div className="text-base sm:text-lg">脂性肌</div>
						</li></Label>
					</div>
					<div className="flex items-center space-x-2 pb-2">
						<RadioGroupItem value="普通肌" id="r4" />
						<Label htmlFor="r4"><li>
							<div className="text-base sm:text-lg">普通肌</div>
						</li></Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="敏感肌" id="r5" />
						<Label htmlFor="r5"><li>
							<div className="text-base sm:text-lg">敏感肌</div>
						</li></Label>
					</div>
				</RadioGroup>
			</ul>
			<div className="text-l flex items-center space-x-2 justify-center p-6">
				<label htmlFor="my-modal" className="text-md btn modal-button bg-background-color text-text-color shadow-md">
					わからない<HelpCircle className="ml-1 h-5 w-5" />
				</label>
			</div>
			<input type="checkbox" id="my-modal" className="modal-toggle" checked={isModalOpen} onChange={() => setIsModalOpen(!isModalOpen)} />
			<div className="modal" onClick={handleCloseModal}>
				<div className="modal-box text-left" onClick={e => e.stopPropagation()}>
					<div className="flex justify-end">
						<button onClick={handleCloseModal} className="btn btn-ghost btn-circle">
							<X />
						</button>
					</div>
					<div className="flex justify-start items-start mb-2">
						<SearchCheck className="mr-2 h-6 w-6" />
						<div>
							<p className="text-md">あなたの洗顔後の肌の様子に一番近いものは？</p>
							<p className="my-2 text-sm">・全体的につっぱり感があり、目元・口元・頬に乾燥を感じる→乾燥肌</p>
							<p className="my-2 text-sm">・額や鼻はベタつきがあり、目元・口元・頬は乾燥を感じる→混合肌</p>
							<p className="my-2 text-sm">・全体的にベタつきがあり、乾燥は感じない→脂性肌</p>
							<p className="my-2 text-sm">・ベタつきも乾燥もほとんど感じない→普通肌</p>
						</div>
					</div>
					<div className="flex justify-start items-start mb-2">
						<Diamond className="mr-2 h-6 w-6" />
						<div>
							<p className='text-sm'>以下のような特徴がある方は、敏感肌の可能性があります。</p>
							<p className="my-2 text-sm">・いつも使っている化粧品がしみたり、かゆくなったりすることがある</p>
							<p className="my-2 text-sm">・化粧品でかぶれたり、つけるもので刺激を感じることがある</p>
						</div>
					</div>
					<div className="flex justify-start items-start">
						<AlertTriangle className="mr-2 h-6 w-6" />
						<div>
							<p className='text-sm'>こちらの質問は、肌質を断定するものではございません。</p>
						</div>
					</div>
				</div>
			</div>
			<Link href='/second_demonstration'>
				<div className="flex justify-center pt-2">
					<CustomButton colorClass="btn-506D7D" onClick={handleSubmit}>次の質問へ</CustomButton>
				</div>
			</Link>
		</div>
	);
}

export default FirstDemonstration;