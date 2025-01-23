import React from "react";

function FormField({
  children,
  full,
  className,
}: {
  children: React.ReactNode;
  full?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-2 ${full ? "col-span-2" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export default FormField;
