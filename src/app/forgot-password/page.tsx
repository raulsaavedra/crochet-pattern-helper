"use client";

import { forgotPassword } from "@/app/actions/auth/forgot-password";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Form";

const statusStyles = {
  error: "text-red-600",
  success: "text-green-600",
  idle: "text-gray-600",
} as const;

type ForgotPasswordData = {
  email: string;
};

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>();

  const onSubmit = async (data: ForgotPasswordData) => {
    await forgotPassword({ email: data.email });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500 max-w-sm mx-auto">
            Enter your email address and we&apos;ll send you instructions to
            reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                className="w-full"
                {...register("email", { required: "Email is required" })}
              />
            </div>
          </div>

          {errors.email && (
            <div className={`text-sm ${statusStyles.error}`}>
              {errors.email.message}
            </div>
          )}

          <div>
            <Button type="submit" className="w-full">
              Send Reset Instructions
            </Button>
          </div>
        </form>

        <div className="text-center">
          <Button variant="ghost" as="link" href="/login">
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
}
