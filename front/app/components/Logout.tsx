import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button";

export default function Logout() {
	const { data: session, status } = useSession();

	if (status === 'authenticated') {
		return (
			<div>
				<Button onClick={() => signOut()}>Logout</Button>
			</div>
		);
	}
	return null;
}