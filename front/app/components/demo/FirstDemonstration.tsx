'use client'
import React, { useContext } from 'react';
import UserInfoContext from '../../contexts/UserInfoContext';
import Link from 'next/link'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import CustomButton from '@/components/ui/custom-button';

const FirstDemonstration = () => {
	const { skinType, setSkinType } = useContext(UserInfoContext);

  const handleSkinTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkinType(e.target.value);
	};

	const handleSubmit = async () => {
		const response = await fetch('https://graduation-exam-app.onrender.com/api/v1/search_cosmetics', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ skinType }),
		});
		if (response.status === 200) {
			return true;
		} else {
			return false;
		};
	}

	return (
		<div className='bg-background-color min-h-screen text-text-color text-center'>
			<p className="text-2xl font-bold text-center justify-between p-20">
				あなたの肌質は？
			</p>
			<ul className="text-center flex justify-center">
				<RadioGroup defaultValue="comfortable" onChange={handleSkinTypeChange}>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="乾燥肌" id="r1" />
						<Label htmlFor="r1"><li>乾燥肌</li></Label></div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="混合肌" id="r2" />
						<Label htmlFor="r2"><li>混合肌</li></Label></div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="脂性肌" id="r3" />
						<Label htmlFor="r3"><li>脂性肌</li></Label></div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="普通肌" id="r4" />
						<Label htmlFor="r4"><li>普通肌</li></Label></div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="敏感肌" id="r5" />
						<Label htmlFor="r5"><li>敏感肌</li></Label></div>
				</RadioGroup>
			</ul>
			<ul>
					<div className="flex items-center space-x-2 justify-center p-4">
						<Popover>
							<PopoverTrigger>
							<li>わからない</li>
							</PopoverTrigger>
							<PopoverContent className="text-text-color">
								Q.あなたの洗顔後の肌の様子に一番近いものは？<br />
								・全体的につっぱり感があり、目元・口元・頬に乾燥を感じる→乾燥肌<br />
								・額やTゾーンはベタつきがあり、目元・口元・頬は乾燥を感じる→混合肌<br />
								・全体的にベタつきがあり、乾燥は感じない→脂性肌<br />
								・ベタつきも乾燥もほとんど感じない→普通肌<br />
								<br />
								◆敏感肌の方の特徴<br />
								・いつも使っている化粧品がしみたり、かゆくなったりすることがある。<br />
								・化粧品でかぶれたり、つけるもので刺激を感じることがある。<br />
								・化粧品を選ぶ時は、低刺激性であることを重視している。<br />
							</PopoverContent>
						</Popover>
					</div>
			</ul>
			<Link href='/second_demonstration'>
				<div className="flex justify-center">
					<CustomButton colorClass="btn-506D7D" onClick={handleSubmit}>次の質問へ行く</CustomButton>
				</div>
			</Link>
		</div>
	);
}

export default FirstDemonstration;