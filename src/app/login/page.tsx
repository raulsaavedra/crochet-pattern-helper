"use client";

import { FormField, Input } from "@/components/Form";
import { login, signup } from "../actions/auth";
import Button from "@/components/Button";
import { useActionState } from "react";

type ActionState = {
  message: string | null;
};

const initialState: ActionState = {
  message: null,
};

export default function LoginPage() {
  const [loginActionState, loginAction] = useActionState(login, initialState);
  const [signupActionState, signupAction] = useActionState(
    signup,
    initialState
  );

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
      {(loginActionState?.message || signupActionState?.message) && (
        <div className="text-red-500 text-sm font-semibold">
          {loginActionState?.message || signupActionState?.message}
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
