'use client';

import React from 'react';
import { useTranslate } from '@/hooks/useTranslate';

interface TranslatedTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function TranslatedText({ 
  text, 
  className = '', 
  as: Component = 'span' 
}: TranslatedTextProps) {
  const translatedText = useTranslate(text);

  return React.createElement(Component, { className }, translatedText);
}

// Specialized components
export function T({ children, className, as }: { 
  children: string; 
  className?: string; 
  as?: keyof JSX.IntrinsicElements;
}) {
  return <TranslatedText text={children} className={className} as={as} />;
}

export function TButton({ 
  text, 
  onClick, 
  className = '',
  disabled = false,
  type = 'button'
}: {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) {
  const translatedText = useTranslate(text);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {translatedText}
    </button>
  );
}

export function THeading({ 
  text, 
  level = 1, 
  className = '' 
}: {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  return <TranslatedText text={text} className={className} as={HeadingTag} />;
}