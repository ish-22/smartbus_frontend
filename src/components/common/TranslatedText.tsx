'use client';

import { useTranslatedText } from '@/hooks/useTranslation';

interface TranslatedTextProps {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  children?: never;
}

export default function TranslatedText({ 
  text, 
  className = '', 
  as: Component = 'span' 
}: TranslatedTextProps) {
  const translatedText = useTranslatedText(text);

  return (
    <Component className={className}>
      {translatedText}
    </Component>
  );
}

// Convenience components for common use cases
export function TranslatedHeading({ text, className = '', level = 1 }: {
  text: string;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}) {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  return <TranslatedText text={text} className={className} as={HeadingTag} />;
}

export function TranslatedButton({ 
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
  const translatedText = useTranslatedText(text);

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

export function TranslatedLabel({ text, htmlFor, className = '' }: {
  text: string;
  htmlFor?: string;
  className?: string;
}) {
  return <TranslatedText text={text} className={className} as="label" />;
}