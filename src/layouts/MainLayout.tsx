import Head from 'next/head';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import React from 'react';

type Props = { title?: string; children: React.ReactNode };

export default function MainLayout({ title = 'SmartBus', children }: Props){
		return (
			<>
				<Head>
					<title>{title}</title>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="manifest" href="/manifest.json" />
					<link rel="icon" href="/favicon.ico" />
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				</Head>
				<Header />
				<Navbar />
				<main>{children}</main>
				<Footer />
			</>
		);
}

