import Head from 'next/head';
import React from 'react';

type Props = { title?: string; children: React.ReactNode };

export default function DriverLayout({ title = 'Driver', children }: Props){
	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<main className="container mx-auto p-4">{children}</main>
		</>
	);
}

