import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-white ${className}`} {...props}>
      {children}
    </button>
  );
}
