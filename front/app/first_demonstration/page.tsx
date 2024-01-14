import React from 'react';
import Link from 'next/link'
import FirstDemonstration from '../components/demo/FirstDemonstration';

export default function Demonstration() {
	return (
		<div className='bg-background-color min-h-screen text-text-color text-center'>
      <FirstDemonstration />
		</div>
	);
};
