import React from 'react';

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>){
	return (<input className="border rounded px-3 py-2 w-full" {...props} />);
}

