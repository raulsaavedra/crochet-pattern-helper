import { cva } from "class-variance-authority";
import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ComponentProps<"button"> {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
  variant?: "filled" | "outlined" | "ghost";
  as?: React.ElementType;
  href?: string;
  disabled?: boolean;
}

const Button = ({
  onClick,
  children,
  className,
  size,
  variant,
  as,
  href,
  disabled,
  ...delegated
}: ButtonProps) => {
  const classes = cva(
    "rounded-xl font-semibold flex justify-center items-center transition-all duration-300",
    {
      variants: {
        variant: {
          filled: "bg-primary text-white hover:bg-primary/80",
          outlined: "border-2 border-primary text-primary hover:bg-primary/10",
          ghost: "bg-transparent text-white hover:text-primary",
        },
        size: {
          small: "p-2 px-4 gap-2.5",
          medium: "p-3 md:px-6 text-base md:text-lg gap-3",
          large: "p-4 md:px-8 text-base md:text-lg gap-3",
        },
        disabled: {
          true: "pointer-events-none cursor-not-allowed opacity-50",
        },
      },
      compoundVariants: [
        {
          variant: "ghost",
          size: ["small", "medium", "large"],
          className: "px-0 py-0 md:px-0 md:py-0",
        },
      ],
      defaultVariants: {
        size: "medium",
        variant: "filled",
      },
    }
  );

  let Tag: React.ElementType;

  if (as === "link") {
    if (href) {
      Tag = Link;
    } else {
      Tag = "a";
    }
  } else {
    Tag = as || "button";
  }

  return (
    <Tag
      className={twMerge(classes({ variant, size, className, disabled }))}
      onClick={onClick}
      href={href}
      {...delegated}
    >
      {children}
    </Tag>
  );
};

export default Button;
