import React from 'react';
import Link from 'next/link'

const DemonstrationResult = () => {
	return (
		<div className='bg-background-color min-h-screen text-text-color text-center'>
			<p className="text-2xl font-bold text-center justify-between p-20">
				あなたに合う韓国コスメはこちら！
      </p>
      <Link href='/first_demonstration'>
			<p className="text-center justify-between">
				もう一度診断する
      </p>
      </Link>
		</div>
	);
};

export default DemonstrationResult;