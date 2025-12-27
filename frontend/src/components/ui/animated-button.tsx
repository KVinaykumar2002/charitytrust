"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "filled" | "outline";
  className?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  type?: "button" | "submit" | "reset";
}

/**
 * AnimatedButton - A button with left-to-right fill animation on hover
 * 
 * Variants:
 * - filled: White background with orange fill on hover (for dark backgrounds)
 * - outline: Transparent with orange border, orange fill on hover (for light backgrounds)
 */
const AnimatedButton = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  AnimatedButtonProps
>(
  (
    {
      children,
      href,
      onClick,
      variant = "outline",
      className,
      icon,
      showIcon = true,
      type = "button",
      ...props
    },
    ref
  ) => {
    const buttonClasses = cn(
      variant === "filled" ? "btn-animated-fill" : "btn-animated-fill-outline",
      className
    );

    const content = (
      <>
        <span className="btn-text">{children}</span>
        {showIcon && (
          <span className="btn-icon-circle">
            {icon || <ArrowRight />}
          </span>
        )}
      </>
    );

    if (href) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={buttonClasses}
          {...props}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        className={buttonClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };

