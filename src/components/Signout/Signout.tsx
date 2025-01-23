"use client";

import { signOut } from "@/app/actions/auth";
import Button from "../Button";
import { LogOut } from "lucide-react";

function Signout() {
  return (
    <div className="max-w-4xl mx-auto pt-8">
      <form action={signOut} className="flex justify-end pr-4">
        <Button variant="ghost" type="submit">
          Signout
          <LogOut size={20} />
        </Button>
      </form>
    </div>
  );
}

export default Signout;
