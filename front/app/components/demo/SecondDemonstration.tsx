import React from 'react';
import Link from 'next/link'

const SecondDemonstration = () => {
	return (
		<div className='bg-background-color min-h-screen text-text-color text-center'>
			<p className="text-2xl font-bold text-center justify-between p-20">
				あなたの年代は？
      </p>
      <Link href='/third_demonstration'>
      <ul className="text-center">
				<li>10代</li>
				<li>20代</li>
        <li>30代</li>
        <li>40代</li>
        <li>50代</li>
        <li>60代以上</li>
      </ul>
      </Link>
		</div>
	);
};

export default SecondDemonstration;