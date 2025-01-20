import React from "react";

function FormField({
  children,
  full,
}: {
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-2 ${full ? "col-span-2" : ""}`}>
      {children}
    </div>
  );
}

export default FormField;
