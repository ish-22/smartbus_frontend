import Head from 'next/head';
import React from 'react';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

type Props = { title?: string; children: React.ReactNode };

export default function AuthLayout({ title = 'Auth', children }: Props){
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<div className="min-h-screen flex flex-col items-center justify-center p-4">
				<div className="w-full flex justify-end mb-2">
					<LanguageSwitcher />
				</div>
				{children}
			</div>
		</>
	);
}

