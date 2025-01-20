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
}

const Button = ({
  onClick,
  children,
  className,
  size,
  variant,
  as,
  href,
  ...delegated
}: ButtonProps) => {
  const classes = cva(
    "rounded-xl font-semibold text-lg disabled:opacity-50 flex justify-center items-center gap-3",
    {
      variants: {
        variant: {
          filled: "bg-primary text-white",
          outlined: "border-2 border-primary",
          ghost: "bg-transparent text-white",
        },
        size: {
          small: "p-2 px-6",
          medium: "p-3 px-6",
          large: "p-4 px-8",
        },
      },
      compoundVariants: [
        {
          variant: "ghost",
          size: ["small", "medium", "large"],
          className: "px-0 py-0",
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
      className={twMerge(classes({ variant, size, className }))}
      onClick={onClick}
      href={href}
      {...delegated}
    >
      {children}
    </Tag>
  );
};

export default Button;
