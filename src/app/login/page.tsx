"use client";

import { FormField, Input } from "@/components/Form";
import { login, signup } from "../actions/auth";
import Button from "@/components/Button";
import { useActionState } from "react";
import { ActionState } from "@/types/form";

const initialState: ActionState = {
  status: "idle",
  message: null,
};

const statusStyles = {
  error: "text-red-500",
  success: "text-green-500",
  idle: "text-gray-500",
} as const;

export default function LoginPage() {
  const [loginActionState, loginAction] = useActionState(login, initialState);
  const [signupActionState, signupAction] = useActionState(
    signup,
    initialState
  );

  const getCurrentStatus = () => {
    if (loginActionState.status !== "idle") {
      return loginActionState.status;
    }
    if (signupActionState.status !== "idle") {
      return signupActionState.status;
    }
    return "idle";
  };

  const getCurrentMessage = () => {
    if (loginActionState.message) {
      return loginActionState.message;
    }
    if (signupActionState.message) {
      return signupActionState.message;
    }
  };

  return (
    <form className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <FormField>
          <label htmlFor="email">Email:</label>
          <Input id="email" name="email" type="email" required />
        </FormField>
        <FormField>
          <label htmlFor="password">Password:</label>
          <Input id="password" name="password" type="password" required />
        </FormField>
      </div>
      {getCurrentMessage() && (
        <div
          className={`text-sm font-semibold ${
            statusStyles[getCurrentStatus()]
          }`}
        >
          {getCurrentMessage()}
        </div>
      )}
      <div className="flex flex-col gap-4">
        <Button variant="filled" formAction={loginAction}>
          Log in
        </Button>
        <Button variant="ghost" formAction={signupAction}>
          Sign up
        </Button>
      </div>
    </form>
  );
}
