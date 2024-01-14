import React from 'react';
import Link from 'next/link'

const ThirdDemonstration = () => {
	return (
		<div className='bg-background-color min-h-screen text-text-color text-center'>
			<p className="text-2xl font-bold text-center justify-between p-20">
				あなたの肌悩み・スキンケアに求めるものは？
      </p>
      <Link href='/demonstration_result'>
      <ul className="text-center">
				<li>保湿</li>
				<li>ニキビ</li>
        <li>毛穴</li>
        <li>美白</li>
        <li>鎮静</li>
        <li>アンチエイジング</li>
      </ul>
      </Link>
		</div>
	);
};

export default ThirdDemonstration;