import React from "react";

function Error({ error }: { error: string }) {
  return <div className="col-span-2 text-red-500 text-sm">{error}</div>;
}

export default Error;
