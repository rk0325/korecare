import React from 'react';
import Link from 'next/link'

const FirstDemonstration = () => {
	return (
		<div className='bg-background-color min-h-screen text-text-color text-center'>
			<p className="text-2xl font-bold text-center justify-between p-20">
				あなたの肌質は？
			</p>
			<Link href='/second_demonstration'>
      <ul className="text-center">
				<li>乾燥肌</li>
				<li>混合肌</li>
        <li>脂性肌</li>
        <li>普通肌</li>
				<li>敏感肌</li>
				</ul>
				</Link>
			<p className="text-center justify-between">
				わからない
			</p>
		</div>
	);
};

export default FirstDemonstration;