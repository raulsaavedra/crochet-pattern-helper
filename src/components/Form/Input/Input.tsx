import { ComponentProps } from "react";
import Error from "../Error/Error";

function Input({
  className,
  error,
  ...delegated
}: ComponentProps<"input"> & { error?: string }) {
  return (
    <>
      <input
        className={`text-white px-3 py-2 text-lg bg-transparent border-primary-dark 
				border rounded-lg placeholder:opacity-80 disabled:opacity-40 ${className}
			focus:border-primary-light focus:border-2 focus:ring-0 focus:outline-none
				`}
        {...delegated}
      />
      {error && <Error error={error} />}
    </>
  );
}

export default Input;
