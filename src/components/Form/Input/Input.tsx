import { ComponentProps } from "react";

function Input({ className, ...delegated }: ComponentProps<"input">) {
  return (
    <input
      className={`text-white px-3 py-2 text-lg bg-transparent border-primary-dark 
				border rounded-lg placeholder:opacity-80 disabled:opacity-40 ${className}
			focus:border-primary-light focus:border-2 focus:ring-0 focus:outline-none
				`}
      {...delegated}
    />
  );
}

export default Input;
