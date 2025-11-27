import React, { useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  isLoading,
  disabled,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // base tailwind classes + our custom utility class for glow
  const base = cn(
    "relative inline-flex items-center justify-center transition-all",
    "text-sm font-semibold text-white select-none",
    "bg-[linear-gradient(90deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))]",
    "border border-[rgba(255,255,255,0.08)]",
    "shadow-soft hover:shadow-softLg",
    "focus:outline-none",
    "glow-btn",
    className
  );

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    if (isLoading) {
      // add loading state classes
      el.classList.add("is-loading", "glow-on");
    } else {
      // remove loading classes to allow CSS morph-out
      el.classList.remove("is-loading");
      // keep glow briefly then remove
      el.classList.remove("glow-on");
    }
  }, [isLoading]);

  return (
    <button
      ref={btnRef}
      className={base}
      disabled={isLoading || disabled}
      {...props}
    >
      {/* when loading: show spinner; when not: show children */}
      {isLoading ? (
        <span className="btn-spinner" aria-hidden />
      ) : (
        <span className="flex items-center gap-2">
          {children}
        </span>
      )}
    </button>
  );
};
