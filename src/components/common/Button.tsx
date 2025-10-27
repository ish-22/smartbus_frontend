import React from 'react';

export default function Button({ children, ...props }:{ children:React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>){
	return (<button className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50" {...props}>{children}</button>);
}

