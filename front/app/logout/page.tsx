'use client';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import CustomButton from '@/components/ui/custom-button';

export default function Logout() {
	const { data: session, status } = useSession();

	if (status === 'authenticated') {
		return (
			<div>
				<CustomButton colorClass="btn-506D7D" onClick={() => signOut()}>Logout</CustomButton>
			</div>
		);
	}
	return null;
}