import React from 'react';
import { useSession, signIn } from 'next-auth/react';

export default function Login() {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (status !== 'authenticated') {
		return (
			<div>
				<p>あなたはログインしていません</p>
				<button onClick={() => signIn('google', {}, { prompt: 'login' })}>
					Googleでログイン
				</button>
			</div>
		);
	}
	return null;
}