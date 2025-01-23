"use client";

import { forgotPassword } from "@/app/actions/auth/forgot-password";
import Button from "@/components/Button";
import Link from "next/link";
import { useActionState } from "react";
import { ActionState } from "@/types/form";

const initialState: ActionState = {
  status: "idle",
  message: null,
};

const statusStyles = {
  error: "text-red-600",
  success: "text-green-600",
  idle: "text-gray-600",
} as const;

export default function ForgotPasswordPage() {
  const [state, formAction] = useActionState(forgotPassword, initialState);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we&apos;ll send you instructions to
            reset your password.
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                placeholder="Email address"
              />
            </div>
          </div>

          {state?.message && (
            <div className={`text-sm ${statusStyles[state.status]}`}>
              {state.message}
            </div>
          )}

          <div>
            <Button type="submit" className="w-full">
              Send Reset Instructions
            </Button>
          </div>
        </form>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
